const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { DatabaseSync } = require("node:sqlite");

const root = __dirname;
const dataDir = path.join(root, "data");
fs.mkdirSync(dataDir, { recursive: true });
const db = new DatabaseSync(path.join(dataDir, "terra.sqlite"));
db.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");
db.exec("CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT NOT NULL, name_key TEXT NOT NULL UNIQUE, phone TEXT NOT NULL DEFAULT '', agency_name TEXT NOT NULL DEFAULT '', address TEXT NOT NULL DEFAULT '', agency_state TEXT NOT NULL DEFAULT '', gstin TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL);");
db.exec("CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, expires_at INTEGER NOT NULL, created_at TEXT NOT NULL);");
db.exec("CREATE TABLE IF NOT EXISTS properties (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, title TEXT NOT NULL, category TEXT NOT NULL, intent TEXT NOT NULL, city TEXT NOT NULL, locality TEXT NOT NULL, price INTEGER NOT NULL, area REAL NOT NULL, status TEXT NOT NULL, facing TEXT NOT NULL DEFAULT '', bedrooms INTEGER NOT NULL DEFAULT 0, lat REAL NOT NULL, lng REAL NOT NULL, description TEXT NOT NULL DEFAULT '', contact_phone TEXT NOT NULL, image TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL);");
db.exec("CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, property_id TEXT REFERENCES properties(id) ON DELETE SET NULL, name TEXT NOT NULL, phone TEXT NOT NULL, intent TEXT NOT NULL, status TEXT NOT NULL, source TEXT NOT NULL DEFAULT 'Workspace', created_at TEXT NOT NULL, updated_at TEXT NOT NULL);");
db.exec("CREATE TABLE IF NOT EXISTS deals (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, property_id TEXT REFERENCES properties(id) ON DELETE SET NULL, lead_id TEXT REFERENCES leads(id) ON DELETE SET NULL, client_name TEXT NOT NULL, client_phone TEXT NOT NULL DEFAULT '', stage TEXT NOT NULL, amount INTEGER NOT NULL, commission_rate REAL NOT NULL, commission_amount INTEGER NOT NULL, expected_close TEXT NOT NULL DEFAULT '', notes TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL);");
db.exec("CREATE TABLE IF NOT EXISTS invoices (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, deal_id TEXT REFERENCES deals(id) ON DELETE SET NULL, invoice_no TEXT NOT NULL, invoice_date TEXT NOT NULL, due_date TEXT NOT NULL, seller_name TEXT NOT NULL, seller_address TEXT NOT NULL, seller_state TEXT NOT NULL, seller_gstin TEXT NOT NULL, seller_phone TEXT NOT NULL, client_name TEXT NOT NULL, client_address TEXT NOT NULL, client_state TEXT NOT NULL, client_gstin TEXT NOT NULL, client_phone TEXT NOT NULL, description TEXT NOT NULL, sac_code TEXT NOT NULL DEFAULT '', quantity INTEGER NOT NULL, unit_amount INTEGER NOT NULL, taxable_amount INTEGER NOT NULL, tax_rate REAL NOT NULL, tax_type TEXT NOT NULL, cgst INTEGER NOT NULL, sgst INTEGER NOT NULL, igst INTEGER NOT NULL, total INTEGER NOT NULL, status TEXT NOT NULL, terms TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL, UNIQUE(user_id, invoice_no));");
db.exec("CREATE TABLE IF NOT EXISTS invoice_payments (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, invoice_id TEXT NOT NULL REFERENCES invoices(id) ON DELETE CASCADE, amount INTEGER NOT NULL, paid_on TEXT NOT NULL, method TEXT NOT NULL, reference TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL);");
db.exec("CREATE INDEX IF NOT EXISTS properties_owner_updated ON properties(user_id, updated_at DESC);");
db.exec("CREATE INDEX IF NOT EXISTS leads_owner_created ON leads(user_id, created_at DESC);");
db.exec("CREATE INDEX IF NOT EXISTS deals_owner_updated ON deals(user_id, updated_at DESC);");
db.exec("CREATE INDEX IF NOT EXISTS invoices_owner_date ON invoices(user_id, invoice_date DESC);");
db.exec("CREATE INDEX IF NOT EXISTS invoice_payments_owner_date ON invoice_payments(user_id, paid_on DESC);");
db.exec("CREATE INDEX IF NOT EXISTS sessions_expiry ON sessions(expires_at);");

const SESSION_MS = 30 * 24 * 60 * 60 * 1000;
const PORT = Number(process.env.PORT || 4174);
const MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon" };
const loginAttempts = new Map();

function now() { return new Date().toISOString(); }
function json(res, status, data, extraHeaders = {}) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...extraHeaders });
  res.end(JSON.stringify(data));
}
function cookieOptions(maxAge) {
  return "Path=/; HttpOnly; SameSite=Lax; Max-Age=" + maxAge + (process.env.NODE_ENV === "production" ? "; Secure" : "");
}
function normalizedPhone(value) {
  let digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 10) digits = "91" + digits;
  if (digits.length < 11 || digits.length > 15) return "";
  return "+" + digits;
}
function readCookies(req) {
  const result = {};
  for (const part of String(req.headers.cookie || "").split(";")) {
    const equal = part.indexOf("=");
    if (equal > -1) {
      const key = part.slice(0, equal).trim();
      try { result[key] = decodeURIComponent(part.slice(equal + 1).trim()); } catch { result[key] = ""; }
    }
  }
  return result;
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 1800000) { reject(Object.assign(new Error("Request body is too large."), { status: 413 })); req.destroy(); return; }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try { resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {}); }
      catch { reject(Object.assign(new Error("Request body must be valid JSON."), { status: 400 })); }
    });
    req.on("error", reject);
  });
}
function createSession(userId, res) {
  db.prepare("DELETE FROM sessions WHERE expires_at < ?").run(Date.now());
  const token = crypto.randomBytes(32).toString("base64url");
  db.prepare("INSERT INTO sessions(token_hash, user_id, expires_at, created_at) VALUES(?,?,?,?)").run(crypto.createHash("sha256").update(token).digest("hex"), userId, Date.now() + SESSION_MS, now());
  res.setHeader("Set-Cookie", "terra_session=" + token + "; " + cookieOptions(SESSION_MS / 1000));
}
function getUser(req) {
  const token = readCookies(req).terra_session;
  if (!token) return null;
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const session = db.prepare("SELECT user_id, expires_at FROM sessions WHERE token_hash = ?").get(tokenHash);
  if (!session) return null;
  if (session.expires_at < Date.now()) {
    db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(tokenHash);
    return null;
  }
  return db.prepare("SELECT id,name,phone,agency_name,address,agency_state,gstin,created_at AS createdAt FROM users WHERE id = ?").get(session.user_id) || null;
}
function fields(user) { return { id: user.id, name: user.name, phone: user.phone || "", agencyName: user.agency_name || user.agencyName || "", address: user.address || "", agencyState: user.agency_state || user.agencyState || "", gstin: user.gstin || "", createdAt: user.createdAt || user.created_at }; }
function publicProperty(row) {
  return { id: row.id, title: row.title, category: row.category, intent: row.intent, city: row.city, locality: row.locality, price: row.price, area: row.area, status: row.status, facing: row.facing, bedrooms: row.bedrooms, lat: row.lat, lng: row.lng, description: row.description, contactPhone: row.contact_phone, image: row.image, createdAt: row.created_at, updatedAt: row.updated_at };
}
function propertyInput(body, user) {
  const categories = ["plot", "land", "apartment", "villa", "builder-floor", "office", "shop"];
  const intents = ["sale", "rent"];
  const statuses = ["Published", "Review", "Paused"];
  const title = String(body.title || "").trim().slice(0, 100);
  const city = String(body.city || "").trim().slice(0, 80);
  const locality = String(body.locality || "").trim().slice(0, 120);
  const price = Math.round(Number(body.price));
  const area = Number(body.area);
  const lat = Number(body.lat);
  const lng = Number(body.lng);
  const contactPhone = normalizedPhone(body.contactPhone || user.phone);
  const image = String(body.image || "");
  if (!title || !city || !locality) throw Object.assign(new Error("Add a title, city and locality."), { status: 400 });
  if (!categories.includes(body.category)) throw Object.assign(new Error("Choose a supported property type."), { status: 400 });
  if (!intents.includes(body.intent)) throw Object.assign(new Error("Choose sale or rent."), { status: 400 });
  if (!Number.isFinite(price) || price < 1 || price > 100000000000) throw Object.assign(new Error("Enter a valid price in rupees."), { status: 400 });
  if (!Number.isFinite(area) || area < 1 || area > 100000000) throw Object.assign(new Error("Enter a valid area in square feet."), { status: 400 });
  if (!Number.isFinite(lat) || lat < 5 || lat > 38 || !Number.isFinite(lng) || lng < 67 || lng > 99) throw Object.assign(new Error("Choose a valid location on the India map."), { status: 400 });
  if (!contactPhone) throw Object.assign(new Error("Enter a valid contact mobile number."), { status: 400 });
  if (image && (!image.startsWith("data:image/") || image.length > 1450000)) throw Object.assign(new Error("Choose an image smaller than 1 MB."), { status: 400 });
  return {
    title, category: body.category, intent: body.intent, city, locality, price, area,
    status: statuses.includes(body.status) ? body.status : "Published",
    facing: String(body.facing || "").slice(0, 30), bedrooms: Math.max(0, Math.min(30, Math.round(Number(body.bedrooms) || 0))),
    lat, lng, description: String(body.description || "").trim().slice(0, 1000), contactPhone, image,
  };
}
function leadInput(body) {
  const name = String(body.name || "").trim().slice(0, 80);
  const phone = normalizedPhone(body.phone);
  const intent = String(body.intent || "More information").trim().slice(0, 80);
  if (!name || !phone || !intent) throw Object.assign(new Error("Add a name, mobile number and enquiry type."), { status: 400 });
  return { name, phone, intent };
}
function cleanName(value) { return String(value || "").trim().replace(/\s+/g, " ").normalize("NFKC").slice(0, 80); }
function nameKey(value) { return cleanName(value).toLocaleLowerCase("en-IN"); }
function validDate(value) {
  const date = String(value || "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(date + "T00:00:00.000Z");
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
}
function optionalPhone(value) { if (!String(value || "").trim()) return ""; return normalizedPhone(value); }
function publicDeal(row) {
  return { id: row.id, propertyId: row.property_id, leadId: row.lead_id, clientName: row.client_name, clientPhone: row.client_phone, stage: row.stage, amount: row.amount, commissionRate: row.commission_rate, commissionAmount: row.commission_amount, expectedClose: row.expected_close, notes: row.notes, createdAt: row.created_at, updatedAt: row.updated_at };
}
function publicInvoice(row) {
  const paid = Number(row.paid_amount || 0);
  const total = Number(row.total || 0);
  let status = row.status;
  if (status !== "Draft" && status !== "Void") {
    if (paid >= total && total > 0) status = "Paid";
    else if (row.due_date < new Date().toISOString().slice(0, 10)) status = "Overdue";
    else if (paid > 0) status = "Part paid";
    else status = "Issued";
  }
  return { id: row.id, dealId: row.deal_id, invoiceNo: row.invoice_no, invoiceDate: row.invoice_date, dueDate: row.due_date, sellerName: row.seller_name, sellerAddress: row.seller_address, sellerState: row.seller_state, sellerGstin: row.seller_gstin, sellerPhone: row.seller_phone, clientName: row.client_name, clientAddress: row.client_address, clientState: row.client_state, clientGstin: row.client_gstin, clientPhone: row.client_phone, description: row.description, sacCode: row.sac_code, quantity: row.quantity, unitAmount: row.unit_amount, taxableAmount: row.taxable_amount, taxRate: row.tax_rate, taxType: row.tax_type, cgst: row.cgst, sgst: row.sgst, igst: row.igst, total, paidAmount: paid, balance: Math.max(0, total - paid), status, terms: row.terms, createdAt: row.created_at, updatedAt: row.updated_at };
}
function invoiceRow(id, userId) {
  return db.prepare("SELECT i.*, COALESCE(SUM(p.amount), 0) AS paid_amount FROM invoices i LEFT JOIN invoice_payments p ON p.invoice_id=i.id AND p.user_id=i.user_id WHERE i.id=? AND i.user_id=? GROUP BY i.id").get(id, userId);
}
function recentLoginAllowed(key) {
  const current = Date.now();
  const existing = (loginAttempts.get(key) || []).filter((time) => current - time < 15 * 60 * 1000);
  if (existing.length >= 8) return false;
  existing.push(current);
  loginAttempts.set(key, existing);
  return true;
}
function sendError(res, error) {
  const status = Number(error.status) || 500;
  if (status >= 500) console.error("Request failed:", error.message);
  json(res, status, { error: status >= 500 ? "The request could not be completed. Please try again." : error.message });
}

async function handleApi(req, res, url) {
  const pathname = url.pathname;
  if (req.method === "GET" && pathname === "/api/session") {
    const user = getUser(req);
    return json(res, 200, { user: user ? fields(user) : null });
  }
  if (req.method === "POST" && pathname === "/api/auth/name") {
    const body = await readBody(req);
    const name = cleanName(body.name);
    const key = nameKey(name);
    if (name.length < 2) return json(res, 400, { error: "Enter at least 2 characters for your workspace name." });
    const address = String(req.socket.remoteAddress || "local");
    if (!recentLoginAllowed(address)) return json(res, 429, { error: "Too many sign-in attempts. Try again in 15 minutes." });
    let user = db.prepare("SELECT id,name,phone,agency_name,address,agency_state,gstin,created_at FROM users WHERE name_key = ?").get(key);
    let created = false;
    if (!user && body.create !== true) return json(res, 404, { error: "No workspace was found with that name. Create a new workspace?" });
    if (!user) {
      const id = crypto.randomUUID();
      try {
        db.prepare("INSERT INTO users(id,name,name_key,created_at) VALUES(?,?,?,?)").run(id,name,key,now());
        created = true;
      } catch (error) {
        if (!String(error.message).includes("UNIQUE")) throw error;
      }
      user = db.prepare("SELECT id,name,phone,agency_name,address,agency_state,gstin,created_at FROM users WHERE name_key = ?").get(key);
    }
    if (!user) return json(res, 409, { error: "This workspace name was just created. Enter it again to open it." });
    loginAttempts.delete(address);
    createSession(user.id, res);
    return json(res, created ? 201 : 200, { user: fields(user) });
  }
  if (req.method === "POST" && pathname === "/api/auth/logout") {
    const token = readCookies(req).terra_session;
    if (token) db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(crypto.createHash("sha256").update(token).digest("hex"));
    return json(res, 200, { ok: true }, { "Set-Cookie": "terra_session=; " + cookieOptions(0) });
  }

  const user = getUser(req);
  if (!user) return json(res, 401, { error: "Sign in to access your workspace." });

  if (req.method === "GET" && pathname === "/api/bootstrap") {
    const properties = db.prepare("SELECT * FROM properties WHERE user_id = ? ORDER BY updated_at DESC").all(user.id).map(publicProperty);
    const leads = db.prepare("SELECT * FROM leads WHERE user_id = ? ORDER BY created_at DESC").all(user.id);
    const deals = db.prepare("SELECT * FROM deals WHERE user_id = ? ORDER BY updated_at DESC").all(user.id).map(publicDeal);
    const invoices = db.prepare("SELECT i.*, COALESCE(SUM(p.amount),0) AS paid_amount FROM invoices i LEFT JOIN invoice_payments p ON p.invoice_id=i.id AND p.user_id=i.user_id WHERE i.user_id = ? GROUP BY i.id ORDER BY i.invoice_date DESC,i.created_at DESC").all(user.id).map(publicInvoice);
    return json(res, 200, { user: fields(user), properties, leads, deals, invoices });
  }
  if (req.method === "PATCH" && pathname === "/api/me") {
    const body = await readBody(req);
    const name = cleanName(body.name);
    const key = nameKey(name);
    const phone = optionalPhone(body.phone);
    const agencyName = String(body.agencyName || "").trim().slice(0, 120);
    const address = String(body.address || "").trim().slice(0, 300);
    const agencyState = String(body.agencyState || "").trim().slice(0, 80);
    const gstin = String(body.gstin || "").trim().toUpperCase().slice(0, 15);
    if (name.length < 2) return json(res, 400, { error: "Enter at least 2 characters for your workspace name." });
    if (String(body.phone || "").trim() && !phone) return json(res, 400, { error: "Enter a valid mobile number or leave the field blank." });
    if (gstin && !/^\d{2}[A-Z0-9]{13}$/.test(gstin)) return json(res, 400, { error: "Enter a valid 15-character GSTIN or leave the field blank." });
    try { db.prepare("UPDATE users SET name=?,name_key=?,phone=?,agency_name=?,address=?,agency_state=?,gstin=? WHERE id=?").run(name,key,phone,agencyName,address,agencyState,gstin,user.id); }
    catch (error) { if (String(error.message).includes("UNIQUE")) return json(res, 409, { error: "Another workspace already uses that name." }); throw error; }
    if (user.phone && phone) db.prepare("UPDATE properties SET contact_phone=?,updated_at=? WHERE user_id=? AND contact_phone=?").run(phone,now(),user.id,user.phone);
    return json(res, 200, { user: fields(db.prepare("SELECT id,name,phone,agency_name,address,agency_state,gstin,created_at AS createdAt FROM users WHERE id=?").get(user.id)) });
  }
  if (req.method === "GET" && pathname === "/api/properties") {
    return json(res, 200, { items: db.prepare("SELECT * FROM properties WHERE user_id = ? ORDER BY updated_at DESC").all(user.id).map(publicProperty) });
  }
  if (req.method === "POST" && pathname === "/api/properties") {
    const body = await readBody(req);
    const input = propertyInput(body, user);
    const id = crypto.randomUUID();
    const stamp = now();
    db.prepare("INSERT INTO properties(id,user_id,title,category,intent,city,locality,price,area,status,facing,bedrooms,lat,lng,description,contact_phone,image,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
      .run(id,user.id,input.title,input.category,input.intent,input.city,input.locality,input.price,input.area,input.status,input.facing,input.bedrooms,input.lat,input.lng,input.description,input.contactPhone,input.image,stamp,stamp);
    return json(res, 201, { item: publicProperty(db.prepare("SELECT * FROM properties WHERE id = ?").get(id)) });
  }
  const propertyMatch = pathname.match(/^\/api\/properties\/([0-9a-f-]+)$/i);
  if (propertyMatch && req.method === "PUT") {
    const existing = db.prepare("SELECT * FROM properties WHERE id = ? AND user_id = ?").get(propertyMatch[1], user.id);
    if (!existing) return json(res, 404, { error: "Property not found." });
    const body = await readBody(req);
    const input = propertyInput(body, user);
    const image = input.image || existing.image;
    db.prepare("UPDATE properties SET title=?,category=?,intent=?,city=?,locality=?,price=?,area=?,status=?,facing=?,bedrooms=?,lat=?,lng=?,description=?,contact_phone=?,image=?,updated_at=? WHERE id=? AND user_id=?")
      .run(input.title,input.category,input.intent,input.city,input.locality,input.price,input.area,input.status,input.facing,input.bedrooms,input.lat,input.lng,input.description,input.contactPhone,image,now(),existing.id,user.id);
    return json(res, 200, { item: publicProperty(db.prepare("SELECT * FROM properties WHERE id = ?").get(existing.id)) });
  }
  if (propertyMatch && req.method === "DELETE") {
    const result = db.prepare("DELETE FROM properties WHERE id = ? AND user_id = ?").run(propertyMatch[1], user.id);
    if (!result.changes) return json(res, 404, { error: "Property not found." });
    return json(res, 200, { ok: true });
  }
  if (req.method === "GET" && pathname === "/api/leads") {
    return json(res, 200, { items: db.prepare("SELECT * FROM leads WHERE user_id = ? ORDER BY created_at DESC").all(user.id) });
  }
  if (req.method === "POST" && pathname === "/api/leads") {
    const body = await readBody(req);
    const input = leadInput(body);
    const propertyId = body.propertyId ? String(body.propertyId) : null;
    if (propertyId && !db.prepare("SELECT id FROM properties WHERE id = ? AND user_id = ?").get(propertyId, user.id)) return json(res, 404, { error: "Choose a property from your workspace." });
    const id = crypto.randomUUID();
    const stamp = now();
    db.prepare("INSERT INTO leads(id,user_id,property_id,name,phone,intent,status,source,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?)").run(id,user.id,propertyId,input.name,input.phone,input.intent,"New",String(body.source || "Workspace").slice(0, 60),stamp,stamp);
    return json(res, 201, { item: db.prepare("SELECT * FROM leads WHERE id = ?").get(id) });
  }
  const leadMatch = pathname.match(/^\/api\/leads\/([0-9a-f-]+)$/i);
  if (leadMatch && req.method === "PATCH") {
    const body = await readBody(req);
    const statuses = ["New", "Contacted", "Visit scheduled", "Closed"];
    if (!statuses.includes(body.status)) return json(res, 400, { error: "Choose a valid enquiry status." });
    const result = db.prepare("UPDATE leads SET status = ?, updated_at = ? WHERE id = ? AND user_id = ?").run(body.status,now(),leadMatch[1],user.id);
    if (!result.changes) return json(res, 404, { error: "Enquiry not found." });
    return json(res, 200, { item: db.prepare("SELECT * FROM leads WHERE id = ?").get(leadMatch[1]) });
  }
  if (req.method === "GET" && pathname === "/api/deals") {
    return json(res, 200, { items: db.prepare("SELECT * FROM deals WHERE user_id=? ORDER BY updated_at DESC").all(user.id).map(publicDeal) });
  }
  if (req.method === "POST" && pathname === "/api/deals") {
    const body = await readBody(req);
    const clientName = cleanName(body.clientName);
    const clientPhone = optionalPhone(body.clientPhone);
    const propertyId = body.propertyId ? String(body.propertyId) : null;
    const leadId = body.leadId ? String(body.leadId) : null;
    const stages = ["Prospecting","Qualified","Negotiation","Token received","Agreement","Won","Lost"];
    const stage = stages.includes(body.stage) ? body.stage : "Prospecting";
    const amount = Math.round(Number(body.amount));
    const commissionRate = Number(body.commissionRate);
    const expectedClose = body.expectedClose ? String(body.expectedClose) : "";
    if (clientName.length < 2) return json(res,400,{error:"Enter the client name."});
    if (String(body.clientPhone || "").trim() && !clientPhone) return json(res,400,{error:"Enter a valid client mobile number."});
    if (!Number.isSafeInteger(amount) || amount < 1 || amount > 100000000000) return json(res,400,{error:"Enter a valid property deal amount in rupees."});
    if (!Number.isFinite(commissionRate) || commissionRate < 0 || commissionRate > 100) return json(res,400,{error:"Enter a commission rate from 0 to 100%."});
    if (expectedClose && !validDate(expectedClose)) return json(res,400,{error:"Choose a valid expected closing date."});
    if (propertyId && !db.prepare("SELECT id FROM properties WHERE id=? AND user_id=?").get(propertyId,user.id)) return json(res,404,{error:"Choose a property from this workspace."});
    if (leadId && !db.prepare("SELECT id FROM leads WHERE id=? AND user_id=?").get(leadId,user.id)) return json(res,404,{error:"Choose an enquiry from this workspace."});
    const id=crypto.randomUUID(); const stamp=now(); const commissionAmount=Math.round(amount*commissionRate/100);
    db.prepare("INSERT INTO deals(id,user_id,property_id,lead_id,client_name,client_phone,stage,amount,commission_rate,commission_amount,expected_close,notes,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
      .run(id,user.id,propertyId,leadId,clientName,clientPhone,stage,amount,commissionRate,commissionAmount,expectedClose,String(body.notes||"").trim().slice(0,1000),stamp,stamp);
    return json(res,201,{item:publicDeal(db.prepare("SELECT * FROM deals WHERE id=?").get(id))});
  }
  const dealMatch=pathname.match(/^\/api\/deals\/([0-9a-f-]+)$/i);
  if (dealMatch && req.method === "PATCH") {
    const body=await readBody(req);
    const stages=["Prospecting","Qualified","Negotiation","Token received","Agreement","Won","Lost"];
    if (!stages.includes(body.stage)) return json(res,400,{error:"Choose a valid deal stage."});
    const result=db.prepare("UPDATE deals SET stage=?,updated_at=? WHERE id=? AND user_id=?").run(body.stage,now(),dealMatch[1],user.id);
    if (!result.changes) return json(res,404,{error:"Deal not found."});
    return json(res,200,{item:publicDeal(db.prepare("SELECT * FROM deals WHERE id=?").get(dealMatch[1]))});
  }
  if (dealMatch && req.method === "DELETE") {
    const result=db.prepare("DELETE FROM deals WHERE id=? AND user_id=?").run(dealMatch[1],user.id);
    if (!result.changes) return json(res,404,{error:"Deal not found."});
    return json(res,200,{ok:true});
  }
  if (req.method === "GET" && pathname === "/api/invoices") {
    const items=db.prepare("SELECT i.*,COALESCE(SUM(p.amount),0) AS paid_amount FROM invoices i LEFT JOIN invoice_payments p ON p.invoice_id=i.id AND p.user_id=i.user_id WHERE i.user_id=? GROUP BY i.id ORDER BY i.invoice_date DESC,i.created_at DESC").all(user.id).map(publicInvoice);
    return json(res,200,{items});
  }
  if (req.method === "POST" && pathname === "/api/invoices") {
    const body=await readBody(req);
    const clientName=cleanName(body.clientName);
    const clientAddress=String(body.clientAddress||"").trim().slice(0,300);
    const clientState=String(body.clientState||"").trim().slice(0,80);
    const clientPhone=optionalPhone(body.clientPhone);
    const clientGstin=String(body.clientGstin||"").trim().toUpperCase().slice(0,15);
    const description=String(body.description||"").trim().slice(0,160);
    const sacCode=String(body.sacCode||"").trim().slice(0,20);
    const invoiceDate=String(body.invoiceDate||"");
    const dueDate=String(body.dueDate||"");
    const quantity=Math.round(Number(body.quantity));
    const unitAmount=Math.round(Number(body.unitAmount));
    const requestedRate=Number(body.taxRate||0);
    const sellerName=String(user.agency_name||user.name).trim().slice(0,120);
    const sellerAddress=String(user.address||"").trim().slice(0,300);
    const sellerState=String(user.agency_state||"").trim().slice(0,80);
    const sellerGstin=String(user.gstin||"").trim().toUpperCase();
    const sellerPhone=String(user.phone||"");
    const dealId=body.dealId?String(body.dealId):null;
    if (clientName.length<2 || !description) return json(res,400,{error:"Enter the client name and service description."});
    if (!clientState) return json(res,400,{error:"Select the client’s state for the invoice."});
    if (String(body.clientPhone||"").trim() && !clientPhone) return json(res,400,{error:"Enter a valid client mobile number."});
    if (clientGstin && !/^\d{2}[A-Z0-9]{13}$/.test(clientGstin)) return json(res,400,{error:"Enter a valid client GSTIN or leave the field blank."});
    if (!validDate(invoiceDate) || !validDate(dueDate) || dueDate<invoiceDate) return json(res,400,{error:"Choose a valid invoice date and a due date on or after it."});
    if (!Number.isSafeInteger(quantity) || quantity<1 || quantity>100) return json(res,400,{error:"Quantity must be from 1 to 100."});
    if (!Number.isSafeInteger(unitAmount) || unitAmount<1 || unitAmount>100000000000) return json(res,400,{error:"Enter a valid service amount in rupees."});
    if (![0,5,12,18,28].includes(requestedRate)) return json(res,400,{error:"Choose an available GST rate."});
    if (requestedRate>0 && !sellerGstin) return json(res,400,{error:"Add your firm GSTIN in Account settings before charging GST."});
    if (requestedRate>0 && !sellerState) return json(res,400,{error:"Add your firm state in Account settings before charging GST."});
    if (dealId && !db.prepare("SELECT id FROM deals WHERE id=? AND user_id=?").get(dealId,user.id)) return json(res,404,{error:"Choose a deal from this workspace."});
    const taxable=quantity*unitAmount;
    let taxType="none",cgst=0,sgst=0,igst=0;
    if (requestedRate>0 && sellerState===clientState) {
      taxType="cgst_sgst"; const tax=Math.round(taxable*requestedRate/100); cgst=Math.ceil(tax/2); sgst=tax-cgst;
    } else if (requestedRate>0) { taxType="igst"; igst=Math.round(taxable*requestedRate/100); }
    const total=taxable+cgst+sgst+igst;
    const count=Number(db.prepare("SELECT COUNT(*) AS count FROM invoices WHERE user_id=? AND invoice_date LIKE ?").get(user.id,invoiceDate.slice(0,4)+"-%").count);
    const invoiceNo="TPM-"+invoiceDate.slice(0,4)+"-"+String(count+1).padStart(4,"0");
    const id=crypto.randomUUID(); const stamp=now();
    db.prepare("INSERT INTO invoices(id,user_id,deal_id,invoice_no,invoice_date,due_date,seller_name,seller_address,seller_state,seller_gstin,seller_phone,client_name,client_address,client_state,client_gstin,client_phone,description,sac_code,quantity,unit_amount,taxable_amount,tax_rate,tax_type,cgst,sgst,igst,total,status,terms,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
      .run(id,user.id,dealId,invoiceNo,invoiceDate,dueDate,sellerName,sellerAddress,sellerState,sellerGstin,sellerPhone,clientName,clientAddress,clientState,clientGstin,clientPhone,description,sacCode,quantity,unitAmount,taxable,requestedRate,taxType,cgst,sgst,igst,total,"Draft",String(body.terms||"").trim().slice(0,500),stamp,stamp);
    return json(res,201,{item:publicInvoice(invoiceRow(id,user.id))});
  }
  const invoiceMatch=pathname.match(/^\/api\/invoices\/([0-9a-f-]+)$/i);
  if (invoiceMatch && req.method === "GET") {
    const row=invoiceRow(invoiceMatch[1],user.id);
    if (!row) return json(res,404,{error:"Invoice not found."});
    const payments=db.prepare("SELECT id,amount,paid_on AS paidOn,method,reference,created_at AS createdAt FROM invoice_payments WHERE invoice_id=? AND user_id=? ORDER BY paid_on,created_at").all(row.id,user.id);
    return json(res,200,{item:{...publicInvoice(row),payments}});
  }
  if (invoiceMatch && req.method === "PATCH") {
    const body=await readBody(req);
    const row=invoiceRow(invoiceMatch[1],user.id);
    if (!row) return json(res,404,{error:"Invoice not found."});
    if (body.status === "Issued" && row.status === "Draft") {
      db.prepare("UPDATE invoices SET status='Issued',updated_at=? WHERE id=? AND user_id=?").run(now(),row.id,user.id);
    } else if (body.status === "Void" && ["Draft","Issued"].includes(row.status) && Number(row.paid_amount||0)===0) {
      db.prepare("UPDATE invoices SET status='Void',updated_at=? WHERE id=? AND user_id=?").run(now(),row.id,user.id);
    } else return json(res,400,{error:"Only unpaid draft or issued invoices can be issued or voided."});
    return json(res,200,{item:publicInvoice(invoiceRow(row.id,user.id))});
  }
  const paymentMatch=pathname.match(/^\/api\/invoices\/([0-9a-f-]+)\/payments$/i);
  if (paymentMatch && req.method === "POST") {
    const body=await readBody(req);
    const row=invoiceRow(paymentMatch[1],user.id);
    if (!row) return json(res,404,{error:"Invoice not found."});
    if (["Draft","Void"].includes(row.status)) return json(res,400,{error:"Issue the invoice before recording a payment."});
    const amount=Math.round(Number(body.amount));
    const paidOn=String(body.paidOn||"");
    const methods=["Cash","UPI","Bank transfer","Card","Cheque","Other"];
    const method=String(body.method||"");
    if (!Number.isSafeInteger(amount)||amount<1||amount>Number(row.total)-Number(row.paid_amount||0)) return json(res,400,{error:"Payment must be a positive amount up to the outstanding balance."});
    if (!validDate(paidOn) || !methods.includes(method)) return json(res,400,{error:"Choose a valid payment date and method."});
    const id=crypto.randomUUID(); const stamp=now();
    db.prepare("INSERT INTO invoice_payments(id,user_id,invoice_id,amount,paid_on,method,reference,created_at) VALUES(?,?,?,?,?,?,?,?)").run(id,user.id,row.id,amount,paidOn,method,String(body.reference||"").trim().slice(0,80),stamp);
    db.prepare("UPDATE invoices SET updated_at=? WHERE id=? AND user_id=?").run(stamp,row.id,user.id);
    return json(res,201,{item:publicInvoice(invoiceRow(row.id,user.id)),payment:db.prepare("SELECT id,amount,paid_on AS paidOn,method,reference,created_at AS createdAt FROM invoice_payments WHERE id=?").get(id)});
  }
  return json(res, 404, { error: "Not found." });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  try {
    if (url.pathname.startsWith("/api/")) return await handleApi(req, res, url);
    const requested = decodeURIComponent(url.pathname);
    if (requested.split("/").includes("data")) { res.writeHead(404); return res.end("Not found"); }
    const candidate = path.resolve(root, "." + (requested === "/" ? "/index.html" : requested));
    if (!candidate.startsWith(root + path.sep)) { res.writeHead(403); return res.end("Forbidden"); }
    fs.readFile(candidate, (error, data) => {
      if (error) { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }); return res.end("Not found"); }
      res.writeHead(200, {
        "Content-Type": MIME[path.extname(candidate)] || "application/octet-stream",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Content-Security-Policy": "default-src 'self'; script-src 'self' https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https://tile.openstreetmap.org; connect-src 'self'; frame-ancestors 'none'",
      });
      res.end(data);
    });
  } catch (error) { if (!res.headersSent) sendError(res, error); else res.destroy(); }
});
server.listen(PORT, "127.0.0.1", () => console.log("Terra Property Manager available at http://127.0.0.1:" + PORT));
