const BROWSER_STORAGE_KEY = "terra-browser-db-v1";
const BROWSER_SESSION_KEY = "terra-browser-session-v1";

function browserState() {
  try {
    const payload = localStorage.getItem(BROWSER_STORAGE_KEY);
    const parsed = payload ? JSON.parse(payload) : { users: [] };
    if (!parsed || !Array.isArray(parsed.users)) parsed.users = [];
    return parsed;
  } catch {
    return { users: [] };
  }
}
function writeBrowserState(state) {
  try { localStorage.setItem(BROWSER_STORAGE_KEY, JSON.stringify(state)); } catch {}
}
function browserCleanName(value) {
  return String(value || "").trim().replace(/\s+/g, " ").normalize("NFKC").slice(0, 80);
}
function browserNameKey(value) {
  return browserCleanName(value).toLocaleLowerCase("en-IN");
}
function browserNormalizedPhone(value) {
  let digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 10) digits = "91" + digits;
  if (digits.length < 11 || digits.length > 15) return "";
  return "+" + digits;
}
function browserOptionalPhone(value) {
  if (!String(value || "").trim()) return "";
  return browserNormalizedPhone(value);
}
function browserValidDate(value) {
  const date = String(value || "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(date + "T00:00:00.000Z");
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
}
function browserFields(user) {
  return { id: user.id, name: user.name, phone: user.phone || "", agencyName: user.agency_name || "", address: user.address || "", agencyState: user.agency_state || "", gstin: user.gstin || "", createdAt: user.created_at || user.createdAt || new Date().toISOString() };
}
function browserPropertyPublic(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    intent: row.intent,
    city: row.city,
    locality: row.locality,
    price: Number(row.price || 0),
    area: Number(row.area || 0),
    status: row.status,
    facing: row.facing || "",
    bedrooms: Number(row.bedrooms || 0),
    lat: Number(row.lat || 0),
    lng: Number(row.lng || 0),
    description: row.description || "",
    contactPhone: row.contact_phone || "",
    image: row.image || "",
    createdAt: row.created_at || row.createdAt,
    updatedAt: row.updated_at || row.updatedAt,
  };
}
function browserDealPublic(row) {
  return {
    id: row.id,
    propertyId: row.property_id,
    leadId: row.lead_id,
    clientName: row.client_name,
    clientPhone: row.client_phone,
    stage: row.stage,
    amount: Number(row.amount || 0),
    commissionRate: Number(row.commission_rate || 0),
    commissionAmount: Number(row.commission_amount || 0),
    expectedClose: row.expected_close || "",
    notes: row.notes || "",
    createdAt: row.created_at || row.createdAt,
    updatedAt: row.updated_at || row.updatedAt,
  };
}
function browserInvoicePublic(row) {
  const payments = Array.isArray(row.payments) ? row.payments : [];
  const paid = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const total = Number(row.total || 0);
  let status = row.status;
  if (status !== "Draft" && status !== "Void") {
    if (paid >= total && total > 0) status = "Paid";
    else if (String(row.due_date || "") < new Date().toISOString().slice(0, 10)) status = "Overdue";
    else if (paid > 0) status = "Part paid";
    else status = "Issued";
  }
  return {
    id: row.id,
    dealId: row.deal_id,
    invoiceNo: row.invoice_no,
    invoiceDate: row.invoice_date,
    dueDate: row.due_date,
    sellerName: row.seller_name,
    sellerAddress: row.seller_address,
    sellerState: row.seller_state,
    sellerGstin: row.seller_gstin,
    sellerPhone: row.seller_phone,
    clientName: row.client_name,
    clientAddress: row.client_address,
    clientState: row.client_state,
    clientGstin: row.client_gstin,
    clientPhone: row.client_phone,
    description: row.description,
    sacCode: row.sac_code,
    quantity: Number(row.quantity || 0),
    unitAmount: Number(row.unit_amount || 0),
    taxRate: Number(row.tax_rate || 0),
    taxType: row.tax_type,
    taxable: Number(row.taxable || 0),
    cgst: Number(row.cgst || 0),
    sgst: Number(row.sgst || 0),
    igst: Number(row.igst || 0),
    total: Number(row.total || 0),
    paidAmount: paid,
    balance: Math.max(0, Number(row.total || 0) - paid),
    status,
    payments: payments.map((payment) => ({
      id: payment.id,
      amount: Number(payment.amount || 0),
      paidOn: payment.paid_on || payment.paidOn,
      method: payment.method,
      reference: payment.reference || "",
      createdAt: payment.created_at || payment.createdAt,
    })),
    createdAt: row.created_at || row.createdAt,
    updatedAt: row.updated_at || row.updatedAt,
  };
}
function browserCurrentUser() {
  const sessionId = localStorage.getItem(BROWSER_SESSION_KEY);
  if (!sessionId) return null;
  const state = browserState();
  return (state.users || []).find((user) => user.id === sessionId) || null;
}
function browserPersistUser(user) {
  const state = browserState();
  const users = (state.users || []).filter((entry) => entry.id !== user.id);
  users.push(user);
  state.users = users;
  writeBrowserState(state);
}
function browserApi(path, method, body) {
  const url = new URL(path, "http://localhost");
  const pathname = url.pathname;
  const state = browserState();
  const currentUser = browserCurrentUser();

  function ensureUser() {
    if (!currentUser) throw Object.assign(new Error("Sign in to access your workspace."), { status: 401 });
    return currentUser;
  }

  if (method === "GET" && pathname === "/api/session") {
    return { user: currentUser ? browserFields(currentUser) : null };
  }

  if (method === "POST" && pathname === "/api/auth/name") {
    const name = browserCleanName(body && body.name);
    const key = browserNameKey(name);
    if (name.length < 2) throw Object.assign(new Error("Enter at least 2 characters for your workspace name."), { status: 400 });
    let user = (state.users || []).find((entry) => browserNameKey(entry.name) === key);
    let created = false;
    if (!user && body && body.create !== true) throw Object.assign(new Error("No workspace was found with that name. Create a new workspace?"), { status: 404 });
    if (!user) {
      user = { id: crypto.randomUUID(), name, phone: "", agency_name: "", address: "", agency_state: "", gstin: "", created_at: new Date().toISOString(), properties: [], leads: [], deals: [], invoices: [] };
      state.users = [...(state.users || []), user];
      created = true;
      writeBrowserState(state);
    }
    localStorage.setItem(BROWSER_SESSION_KEY, user.id);
    return { user: browserFields(user), created };
  }

  if (method === "POST" && pathname === "/api/auth/logout") {
    localStorage.removeItem(BROWSER_SESSION_KEY);
    return { ok: true };
  }

  const user = ensureUser();

  if (method === "GET" && pathname === "/api/bootstrap") {
    return {
      user: browserFields(user),
      properties: (user.properties || []).map(browserPropertyPublic),
      leads: user.leads || [],
      deals: (user.deals || []).map(browserDealPublic),
      invoices: (user.invoices || []).map((invoice) => browserInvoicePublic(invoice)),
    };
  }

  if (method === "PATCH" && pathname === "/api/me") {
    const name = browserCleanName(body && body.name);
    const phone = browserOptionalPhone(body && body.phone);
    const agencyName = String(body && body.agencyName || "").trim().slice(0, 120);
    const address = String(body && body.address || "").trim().slice(0, 300);
    const agencyState = String(body && body.agencyState || "").trim().slice(0, 80);
    const gstin = String(body && body.gstin || "").trim().toUpperCase().slice(0, 15);
    if (name.length < 2) throw Object.assign(new Error("Enter at least 2 characters for your workspace name."), { status: 400 });
    if (String(body && body.phone || "").trim() && !phone) throw Object.assign(new Error("Enter a valid mobile number or leave the field blank."), { status: 400 });
    if (gstin && !/^\d{2}[A-Z0-9]{13}$/.test(gstin)) throw Object.assign(new Error("Enter a valid 15-character GSTIN or leave the field blank."), { status: 400 });
    const duplicate = (state.users || []).find((entry) => entry.id !== user.id && browserNameKey(entry.name) === browserNameKey(name));
    if (duplicate) throw Object.assign(new Error("Another workspace already uses that name."), { status: 409 });
    user.name = name;
    user.phone = phone;
    user.agency_name = agencyName;
    user.address = address;
    user.agency_state = agencyState;
    user.gstin = gstin;
    user.updated_at = new Date().toISOString();
    browserPersistUser(user);
    return { user: browserFields(user) };
  }

  if (method === "GET" && pathname === "/api/properties") {
    return { items: (user.properties || []).map(browserPropertyPublic) };
  }

  if (method === "POST" && pathname === "/api/properties") {
    const bodyData = body || {};
    const categories = ["plot", "land", "apartment", "villa", "builder-floor", "office", "shop"];
    const intents = ["sale", "rent"];
    const statuses = ["Published", "Review", "Paused"];
    const title = String(bodyData.title || "").trim().slice(0, 100);
    const city = String(bodyData.city || "").trim().slice(0, 80);
    const locality = String(bodyData.locality || "").trim().slice(0, 120);
    const price = Math.round(Number(bodyData.price));
    const area = Number(bodyData.area);
    const lat = Number(bodyData.lat);
    const lng = Number(bodyData.lng);
    const contactPhone = browserNormalizedPhone(bodyData.contactPhone || user.phone);
    const image = String(bodyData.image || "");
    if (!title || !city || !locality) throw Object.assign(new Error("Add a title, city and locality."), { status: 400 });
    if (!categories.includes(bodyData.category)) throw Object.assign(new Error("Choose a supported property type."), { status: 400 });
    if (!intents.includes(bodyData.intent)) throw Object.assign(new Error("Choose sale or rent."), { status: 400 });
    if (!Number.isFinite(price) || price < 1 || price > 100000000000) throw Object.assign(new Error("Enter a valid price in rupees."), { status: 400 });
    if (!Number.isFinite(area) || area < 1 || area > 100000000) throw Object.assign(new Error("Enter a valid area in square feet."), { status: 400 });
    if (!Number.isFinite(lat) || lat < 5 || lat > 38 || !Number.isFinite(lng) || lng < 67 || lng > 99) throw Object.assign(new Error("Choose a valid location on the India map."), { status: 400 });
    if (!contactPhone) throw Object.assign(new Error("Enter a valid contact mobile number."), { status: 400 });
    if (image && (!image.startsWith("data:image/") || image.length > 1450000)) throw Object.assign(new Error("Choose an image smaller than 1 MB."), { status: 400 });
    const item = {
      id: crypto.randomUUID(),
      user_id: user.id,
      title,
      category: bodyData.category,
      intent: bodyData.intent,
      city,
      locality,
      price,
      area,
      status: statuses.includes(bodyData.status) ? bodyData.status : "Published",
      facing: String(bodyData.facing || "").slice(0, 30),
      bedrooms: Math.max(0, Math.min(30, Math.round(Number(bodyData.bedrooms) || 0))),
      lat,
      lng,
      description: String(bodyData.description || "").trim().slice(0, 1000),
      contact_phone: contactPhone,
      image,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    user.properties = [item, ...(user.properties || [])];
    browserPersistUser(user);
    return { item: browserPropertyPublic(item) };
  }

  const propertyMatch = pathname.match(/^\/api\/properties\/([0-9a-f-]+)$/i);
  if (propertyMatch && method === "PUT") {
    const existing = (user.properties || []).find((item) => item.id === propertyMatch[1]);
    if (!existing) throw Object.assign(new Error("Property not found."), { status: 404 });
    const bodyData = body || {};
    const next = { ...existing, ...{
      title: String(bodyData.title || existing.title).trim().slice(0, 100),
      category: bodyData.category || existing.category,
      intent: bodyData.intent || existing.intent,
      city: String(bodyData.city || existing.city).trim().slice(0, 80),
      locality: String(bodyData.locality || existing.locality).trim().slice(0, 120),
      price: Math.round(Number(bodyData.price || existing.price)),
      area: Number(bodyData.area || existing.area),
      status: bodyData.status || existing.status,
      facing: String(bodyData.facing || existing.facing || "").slice(0, 30),
      bedrooms: Math.max(0, Math.min(30, Math.round(Number(bodyData.bedrooms || existing.bedrooms || 0)))),
      lat: Number(bodyData.lat || existing.lat),
      lng: Number(bodyData.lng || existing.lng),
      description: String(bodyData.description || existing.description || "").trim().slice(0, 1000),
      contact_phone: browserNormalizedPhone(bodyData.contactPhone || existing.contact_phone || user.phone),
      image: String(bodyData.image || existing.image || ""),
      updated_at: new Date().toISOString(),
    }};
    user.properties = (user.properties || []).map((item) => item.id === existing.id ? next : item);
    browserPersistUser(user);
    return { item: browserPropertyPublic(next) };
  }
  if (propertyMatch && method === "DELETE") {
    const countBefore = (user.properties || []).length;
    user.properties = (user.properties || []).filter((item) => item.id !== propertyMatch[1]);
    browserPersistUser(user);
    if ((user.properties || []).length === countBefore) throw Object.assign(new Error("Property not found."), { status: 404 });
    return { ok: true };
  }

  if (method === "GET" && pathname === "/api/leads") {
    return { items: user.leads || [] };
  }

  if (method === "POST" && pathname === "/api/leads") {
    const bodyData = body || {};
    const name = browserCleanName(bodyData.name);
    const phone = browserNormalizedPhone(bodyData.phone);
    const intent = String(bodyData.intent || "More information").trim().slice(0, 80);
    if (!name || !phone || !intent) throw Object.assign(new Error("Add a name, mobile number and enquiry type."), { status: 400 });
    const propertyId = bodyData.propertyId ? String(bodyData.propertyId) : null;
    if (propertyId && !(user.properties || []).some((property) => property.id === propertyId)) throw Object.assign(new Error("Choose a property from your workspace."), { status: 404 });
    const item = {
      id: crypto.randomUUID(),
      user_id: user.id,
      property_id: propertyId,
      name,
      phone,
      intent,
      status: "New",
      source: String(bodyData.source || "").trim().slice(0, 80),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    user.leads = [item, ...(user.leads || [])];
    browserPersistUser(user);
    return { item };
  }

  const leadMatch = pathname.match(/^\/api\/leads\/([0-9a-f-]+)$/i);
  if (leadMatch && method === "PATCH") {
    const statuses = ["New", "Contacted", "Visit scheduled", "Closed"];
    if (!statuses.includes(body && body.status)) throw Object.assign(new Error("Choose a valid enquiry status."), { status: 400 });
    const match = (user.leads || []).find((item) => item.id === leadMatch[1]);
    if (!match) throw Object.assign(new Error("Enquiry not found."), { status: 404 });
    match.status = body.status;
    match.updated_at = new Date().toISOString();
    browserPersistUser(user);
    return { item: match };
  }

  if (method === "GET" && pathname === "/api/deals") {
    return { items: (user.deals || []).map(browserDealPublic) };
  }

  if (method === "POST" && pathname === "/api/deals") {
    const bodyData = body || {};
    const clientName = browserCleanName(bodyData.clientName);
    const clientPhone = browserOptionalPhone(bodyData.clientPhone);
    const propertyId = bodyData.propertyId ? String(bodyData.propertyId) : null;
    const leadId = bodyData.leadId ? String(bodyData.leadId) : null;
    const stages = ["Prospecting", "Qualified", "Negotiation", "Token received", "Agreement", "Won", "Lost"];
    const stage = stages.includes(bodyData.stage) ? bodyData.stage : "Prospecting";
    const amount = Math.round(Number(bodyData.amount));
    const commissionRate = Number(bodyData.commissionRate);
    const expectedClose = bodyData.expectedClose ? String(bodyData.expectedClose) : "";
    if (clientName.length < 2) throw Object.assign(new Error("Enter the client name."), { status: 400 });
    if (String(bodyData.clientPhone || "").trim() && !clientPhone) throw Object.assign(new Error("Enter a valid client mobile number."), { status: 400 });
    if (!Number.isSafeInteger(amount) || amount < 1 || amount > 100000000000) throw Object.assign(new Error("Enter a valid property deal amount in rupees."), { status: 400 });
    if (!Number.isFinite(commissionRate) || commissionRate < 0 || commissionRate > 100) throw Object.assign(new Error("Enter a commission rate from 0 to 100%."), { status: 400 });
    if (expectedClose && !browserValidDate(expectedClose)) throw Object.assign(new Error("Choose a valid expected closing date."), { status: 400 });
    if (propertyId && !(user.properties || []).some((property) => property.id === propertyId)) throw Object.assign(new Error("Choose a property from this workspace."), { status: 404 });
    if (leadId && !(user.leads || []).some((lead) => lead.id === leadId)) throw Object.assign(new Error("Choose an enquiry from this workspace."), { status: 404 });
    const commissionAmount = Math.round(amount * commissionRate / 100);
    const item = {
      id: crypto.randomUUID(),
      user_id: user.id,
      property_id: propertyId,
      lead_id: leadId,
      client_name: clientName,
      client_phone: clientPhone,
      stage,
      amount,
      commission_rate: commissionRate,
      commission_amount: commissionAmount,
      expected_close: expectedClose,
      notes: String(bodyData.notes || "").trim().slice(0, 1000),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    user.deals = [item, ...(user.deals || [])];
    browserPersistUser(user);
    return { item: browserDealPublic(item) };
  }

  const dealMatch = pathname.match(/^\/api\/deals\/([0-9a-f-]+)$/i);
  if (dealMatch && method === "PATCH") {
    const stages = ["Prospecting", "Qualified", "Negotiation", "Token received", "Agreement", "Won", "Lost"];
    if (!stages.includes(body && body.stage)) throw Object.assign(new Error("Choose a valid deal stage."), { status: 400 });
    const match = (user.deals || []).find((item) => item.id === dealMatch[1]);
    if (!match) throw Object.assign(new Error("Deal not found."), { status: 404 });
    match.stage = body.stage;
    match.updated_at = new Date().toISOString();
    browserPersistUser(user);
    return { item: browserDealPublic(match) };
  }
  if (dealMatch && method === "DELETE") {
    const before = (user.deals || []).length;
    user.deals = (user.deals || []).filter((item) => item.id !== dealMatch[1]);
    browserPersistUser(user);
    if ((user.deals || []).length === before) throw Object.assign(new Error("Deal not found."), { status: 404 });
    return { ok: true };
  }

  if (method === "GET" && pathname === "/api/invoices") {
    return { items: (user.invoices || []).map((invoice) => browserInvoicePublic(invoice)) };
  }

  if (method === "POST" && pathname === "/api/invoices") {
    const bodyData = body || {};
    const clientName = browserCleanName(bodyData.clientName);
    const clientAddress = String(bodyData.clientAddress || "").trim().slice(0, 300);
    const clientState = String(bodyData.clientState || "").trim().slice(0, 80);
    const clientPhone = browserOptionalPhone(bodyData.clientPhone);
    const clientGstin = String(bodyData.clientGstin || "").trim().toUpperCase().slice(0, 15);
    const description = String(bodyData.description || "").trim().slice(0, 160);
    const sacCode = String(bodyData.sacCode || "").trim().slice(0, 20);
    const invoiceDate = String(bodyData.invoiceDate || "");
    const dueDate = String(bodyData.dueDate || "");
    const quantity = Math.round(Number(bodyData.quantity));
    const unitAmount = Math.round(Number(bodyData.unitAmount));
    const requestedRate = Number(bodyData.taxRate || 0);
    const sellerName = String(user.agency_name || user.name).trim().slice(0, 120);
    const sellerAddress = String(user.address || "").trim().slice(0, 300);
    const sellerState = String(user.agency_state || "").trim().slice(0, 80);
    const sellerGstin = String(user.gstin || "").trim().toUpperCase();
    const sellerPhone = String(user.phone || "");
    const dealId = bodyData.dealId ? String(bodyData.dealId) : null;
    if (clientName.length < 2 || !description) throw Object.assign(new Error("Enter the client name and service description."), { status: 400 });
    if (!clientState) throw Object.assign(new Error("Select the client’s state for the invoice."), { status: 400 });
    if (String(bodyData.clientPhone || "").trim() && !clientPhone) throw Object.assign(new Error("Enter a valid client mobile number."), { status: 400 });
    if (clientGstin && !/^\d{2}[A-Z0-9]{13}$/.test(clientGstin)) throw Object.assign(new Error("Enter a valid client GSTIN or leave the field blank."), { status: 400 });
    if (!browserValidDate(invoiceDate) || !browserValidDate(dueDate) || dueDate < invoiceDate) throw Object.assign(new Error("Choose a valid invoice date and a due date on or after it."), { status: 400 });
    if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 100) throw Object.assign(new Error("Quantity must be from 1 to 100."), { status: 400 });
    if (!Number.isSafeInteger(unitAmount) || unitAmount < 1 || unitAmount > 100000000000) throw Object.assign(new Error("Enter a valid service amount in rupees."), { status: 400 });
    if (![0, 5, 12, 18, 28].includes(requestedRate)) throw Object.assign(new Error("Choose an available GST rate."), { status: 400 });
    if (requestedRate > 0 && !sellerGstin) throw Object.assign(new Error("Add your firm GSTIN in Account settings before charging GST."), { status: 400 });
    if (requestedRate > 0 && !sellerState) throw Object.assign(new Error("Add your firm state in Account settings before charging GST."), { status: 400 });
    if (dealId && !(user.deals || []).some((deal) => deal.id === dealId)) throw Object.assign(new Error("Choose a deal from this workspace."), { status: 404 });
    const taxable = quantity * unitAmount;
    let taxType = "none", cgst = 0, sgst = 0, igst = 0;
    if (requestedRate > 0 && sellerState === clientState) {
      taxType = "cgst_sgst"; const tax = Math.round(taxable * requestedRate / 100); cgst = Math.ceil(tax / 2); sgst = tax - cgst;
    } else if (requestedRate > 0) {
      taxType = "igst"; igst = Math.round(taxable * requestedRate / 100);
    }
    const total = taxable + cgst + sgst + igst;
    const count = (user.invoices || []).filter((invoice) => String(invoice.invoice_date || "").slice(0, 4) === String(invoiceDate).slice(0, 4)).length;
    const invoiceNo = "TPM-" + invoiceDate.slice(0, 4) + "-" + String(count + 1).padStart(4, "0");
    const item = {
      id: crypto.randomUUID(),
      user_id: user.id,
      deal_id: dealId,
      invoice_no: invoiceNo,
      invoice_date: invoiceDate,
      due_date: dueDate,
      seller_name: sellerName,
      seller_address: sellerAddress,
      seller_state: sellerState,
      seller_gstin: sellerGstin,
      seller_phone: sellerPhone,
      client_name: clientName,
      client_address: clientAddress,
      client_state: clientState,
      client_gstin: clientGstin,
      client_phone: clientPhone,
      description,
      sac_code: sacCode,
      quantity,
      unit_amount: unitAmount,
      tax_rate: requestedRate,
      tax_type: taxType,
      taxable,
      cgst,
      sgst,
      igst,
      total,
      status: "Draft",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      payments: [],
    };
    user.invoices = [item, ...(user.invoices || [])];
    browserPersistUser(user);
    return { item: browserInvoicePublic(item) };
  }

  const invoiceMatch = pathname.match(/^\/api\/invoices\/([0-9a-f-]+)$/i);
  if (invoiceMatch && method === "GET") {
    const invoice = (user.invoices || []).find((entry) => entry.id === invoiceMatch[1]);
    if (!invoice) throw Object.assign(new Error("Invoice not found."), { status: 404 });
    return { item: { ...browserInvoicePublic(invoice), payments: browserInvoicePublic(invoice).payments } };
  }

  if (invoiceMatch && method === "PATCH") {
    const invoice = (user.invoices || []).find((entry) => entry.id === invoiceMatch[1]);
    if (!invoice) throw Object.assign(new Error("Invoice not found."), { status: 404 });
    if (body && body.status === "Issued" && invoice.status === "Draft") {
      invoice.status = "Issued";
      invoice.updated_at = new Date().toISOString();
      browserPersistUser(user);
      return { item: browserInvoicePublic(invoice) };
    }
    if (body && body.status === "Void" && ["Draft", "Issued"].includes(invoice.status) && Number(invoice.total || 0) === Number((invoice.payments || []).reduce((sum, payment) => sum + Number(payment.amount || 0), 0))) {
      invoice.status = "Void";
      invoice.updated_at = new Date().toISOString();
      browserPersistUser(user);
      return { item: browserInvoicePublic(invoice) };
    }
    throw Object.assign(new Error("Only unpaid draft or issued invoices can be issued or voided."), { status: 400 });
  }

  const paymentMatch = pathname.match(/^\/api\/invoices\/([0-9a-f-]+)\/payments$/i);
  if (paymentMatch && method === "POST") {
    const invoice = (user.invoices || []).find((entry) => entry.id === paymentMatch[1]);
    if (!invoice) throw Object.assign(new Error("Invoice not found."), { status: 404 });
    if (["Draft", "Void"].includes(invoice.status)) throw Object.assign(new Error("Issue the invoice before recording a payment."), { status: 400 });
    const amount = Math.round(Number(body && body.amount));
    const paidOn = String(body && body.paidOn || "");
    const methods = ["Cash", "UPI", "Bank transfer", "Card", "Cheque", "Other"];
    const method = String(body && body.method || "");
    const currentPaid = (invoice.payments || []).reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
    if (!Number.isSafeInteger(amount) || amount < 1 || amount > Number(invoice.total) - currentPaid) throw Object.assign(new Error("Payment must be a positive amount up to the outstanding balance."), { status: 400 });
    if (!browserValidDate(paidOn) || !methods.includes(method)) throw Object.assign(new Error("Choose a valid payment date and method."), { status: 400 });
    const payment = {
      id: crypto.randomUUID(),
      invoice_id: invoice.id,
      amount,
      paid_on: paidOn,
      method,
      reference: String(body && body.reference || "").trim().slice(0, 80),
      created_at: new Date().toISOString(),
    };
    invoice.payments = [...(invoice.payments || []), payment];
    invoice.updated_at = new Date().toISOString();
    browserPersistUser(user);
    return { item: browserInvoicePublic(invoice), payment: { id: payment.id, amount: Number(payment.amount || 0), paidOn: payment.paid_on, method: payment.method, reference: payment.reference, createdAt: payment.created_at } };
  }

  throw Object.assign(new Error("Not found."), { status: 404 });
}

async function request(path, options) {
  const settings = Object.assign({ method: "GET", credentials: "same-origin", headers: {} }, options || {});
  if (settings.body && typeof settings.body !== "string") {
    settings.headers["Content-Type"] = "application/json";
    settings.body = JSON.stringify(settings.body);
  }

  try {
    const response = await fetch(path, settings);
    let payload = {};
    try { payload = await response.json(); } catch { payload = {}; }
    if (response.ok) return payload;
    if (path.startsWith("/api/")) {
      try {
        const fallback = browserApi(path, settings.method || "GET", settings.body ? JSON.parse(settings.body) : {});
        return fallback;
      } catch (fallbackError) {
        const error = new Error(payload.error || fallbackError.message || "Could not complete the request.");
        error.status = payload.status || fallbackError.status || response.status;
        throw error;
      }
    }
    const error = new Error(payload.error || "Could not complete the request.");
    error.status = response.status;
    throw error;
  } catch (error) {
    if (path.startsWith("/api/")) {
      try {
        return browserApi(path, settings.method || "GET", settings.body ? JSON.parse(settings.body) : {});
      } catch (fallbackError) {
        throw fallbackError;
      }
    }
    throw error;
  }
}

function initializeStaticFallbackStorage() {
  const state = browserState();
  if (!state.users) state.users = [];
  writeBrowserState(state);
}

if (typeof window !== "undefined") {
  initializeStaticFallbackStorage();
}

async function request(path, options) {
  const settings = Object.assign({ method: "GET", credentials: "same-origin", headers: {} }, options || {});
  if (settings.body && typeof settings.body !== "string") {
    settings.headers["Content-Type"] = "application/json";
    settings.body = JSON.stringify(settings.body);
  }

  const parsedBody = settings.body ? (() => { try { return JSON.parse(settings.body); } catch { return {}; } })() : {};

  try {
    const response = await fetch(path, settings);
    let payload = {};
    try { payload = await response.json(); } catch { payload = {}; }
    if (response.ok) return payload;
    if (path.startsWith("/api/")) {
      try {
        return browserApi(path, settings.method || "GET", parsedBody);
      } catch (fallbackError) {
        const error = new Error(payload.error || fallbackError.message || "Could not complete the request.");
        error.status = payload.status || fallbackError.status || response.status;
        throw error;
      }
    }
    const error = new Error(payload.error || "Could not complete the request.");
    error.status = response.status;
    throw error;
  } catch (error) {
    if (path.startsWith("/api/")) {
      try {
        return browserApi(path, settings.method || "GET", parsedBody);
      } catch (fallbackError) {
        throw fallbackError;
      }
    }
    throw error;
  }
}

function rememberName(name) {
  try { localStorage.setItem("terra-last-name", name); } catch {}
}

function rememberedName() {
  try { return localStorage.getItem("terra-last-name") || ""; } catch { return ""; }
}

function money(value, intent) {
  const amount = Number(value || 0);
  if (intent === "rent") return "₹" + formatNumber.format(amount) + " / month";
  if (amount >= 10000000) return "₹" + Number((amount / 10000000).toFixed(amount < 100000000 ? 2 : 1)) + " Cr";
  if (amount >= 100000) return "₹" + Number((amount / 100000).toFixed(amount < 10000000 ? 1 : 0)) + " L";
  return "₹" + formatNumber.format(amount);
}

function exactMoney(value) { return "₹" + formatNumber.format(Math.round(Number(value || 0))); }
