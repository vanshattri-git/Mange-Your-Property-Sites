const CITIES = [
  { name: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946 },
  { name: "Mumbai", state: "Maharashtra", lat: 19.076, lng: 72.8777 },
  { name: "Delhi", state: "Delhi", lat: 28.6139, lng: 77.209 },
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567 },
  { name: "Hyderabad", state: "Telangana", lat: 17.385, lng: 78.4867 },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707 },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639 },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714 },
  { name: "Gurugram", state: "Haryana", lat: 28.4595, lng: 77.0266 },
  { name: "Noida", state: "Uttar Pradesh", lat: 28.5355, lng: 77.391 },
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873 },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462 },
  { name: "Surat", state: "Gujarat", lat: 21.1702, lng: 72.8311 },
  { name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577 },
  { name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673 },
  { name: "Chandigarh", state: "Chandigarh", lat: 30.7333, lng: 76.7794 },
  { name: "Nagpur", state: "Maharashtra", lat: 21.1458, lng: 79.0882 },
  { name: "Dehradun", state: "Uttarakhand", lat: 30.3165, lng: 78.0322 },
  { name: "Amritsar", state: "Punjab", lat: 31.634, lng: 74.8723 },
  { name: "Ludhiana", state: "Punjab", lat: 30.901, lng: 75.8573 },
  { name: "Jammu", state: "Jammu and Kashmir", lat: 32.7266, lng: 74.857 },
  { name: "Srinagar", state: "Jammu and Kashmir", lat: 34.0837, lng: 74.7973 },
  { name: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lng: 77.1734 },
  { name: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126 },
  { name: "Gwalior", state: "Madhya Pradesh", lat: 26.2183, lng: 78.1828 },
  { name: "Raipur", state: "Chhattisgarh", lat: 21.2514, lng: 81.6296 },
  { name: "Bhubaneswar", state: "Odisha", lat: 20.2961, lng: 85.8245 },
  { name: "Ranchi", state: "Jharkhand", lat: 23.3441, lng: 85.3096 },
  { name: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376 },
  { name: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362 },
  { name: "Siliguri", state: "West Bengal", lat: 26.7271, lng: 88.3953 },
  { name: "Thiruvananthapuram", state: "Kerala", lat: 8.5241, lng: 76.9366 },
  { name: "Kozhikode", state: "Kerala", lat: 11.2588, lng: 75.7804 },
  { name: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558 },
  { name: "Madurai", state: "Tamil Nadu", lat: 9.9252, lng: 78.1198 },
  { name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185 },
  { name: "Vijayawada", state: "Andhra Pradesh", lat: 16.5062, lng: 80.648 },
  { name: "Mangaluru", state: "Karnataka", lat: 12.9141, lng: 74.856 },
  { name: "Mysuru", state: "Karnataka", lat: 12.2958, lng: 76.6394 },
  { name: "Kanpur", state: "Uttar Pradesh", lat: 26.4499, lng: 80.3319 },
  { name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739 },
  { name: "Prayagraj", state: "Uttar Pradesh", lat: 25.4358, lng: 81.8463 },
  { name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081 },
  { name: "Meerut", state: "Uttar Pradesh", lat: 28.9845, lng: 77.7064 },
  { name: "Faridabad", state: "Haryana", lat: 28.4089, lng: 77.3178 },
  { name: "Jodhpur", state: "Rajasthan", lat: 26.2389, lng: 73.0243 },
  { name: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125 },
  { name: "Vadodara", state: "Gujarat", lat: 22.3072, lng: 73.1812 },
  { name: "Rajkot", state: "Gujarat", lat: 22.3039, lng: 70.8022 },
  { name: "Nashik", state: "Maharashtra", lat: 19.9975, lng: 73.7898 },
  { name: "Thane", state: "Maharashtra", lat: 19.2183, lng: 72.9781 },
  { name: "Navi Mumbai", state: "Maharashtra", lat: 19.033, lng: 73.0297 },
  { name: "Panaji", state: "Goa", lat: 15.4909, lng: 73.8278 },
  { name: "Puducherry", state: "Puducherry", lat: 11.9416, lng: 79.8083 },
  { name: "Port Blair", state: "Andaman and Nicobar Islands", lat: 11.6234, lng: 92.7265 },
  { name: "Gangtok", state: "Sikkim", lat: 27.3389, lng: 88.6065 },
  { name: "Shillong", state: "Meghalaya", lat: 25.5788, lng: 91.8933 },
  { name: "Imphal", state: "Manipur", lat: 24.817, lng: 93.9368 },
  { name: "Aizawl", state: "Mizoram", lat: 23.7271, lng: 92.7176 },
  { name: "Kohima", state: "Nagaland", lat: 25.6751, lng: 94.1086 },
  { name: "Itanagar", state: "Arunachal Pradesh", lat: 27.0844, lng: 93.6053 },
  { name: "Agartala", state: "Tripura", lat: 23.8315, lng: 91.2868 },
];
const INDIAN_STATES = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"];
const state = { user: null, properties: [], leads: [], deals: [], invoices: [], page: "dashboard", propertyQuery: "", propertyType: "all", propertyCity: "all", propertyStatus: "all", leadQuery: "", leadStatus: "all", mapCity: "India", mapPlots: false, pinCoords: null, map: null, markers: [], selectedImage: "", invoiceFilter: "all" };
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const esc = (value) => String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const icon = (name, extra) => '<svg class="icon ' + (extra || "") + '" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
const formatNumber = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
function rememberedName() { try { return localStorage.getItem("terra-last-name") || ""; } catch { return ""; } }
function rememberName(name) { try { localStorage.setItem("terra-last-name", name); } catch {} }
function money(value, intent) {
  const amount = Number(value || 0);
  if (intent === "rent") return "₹" + formatNumber.format(amount) + " / month";
  if (amount >= 10000000) return "₹" + Number((amount / 10000000).toFixed(amount < 100000000 ? 2 : 1)) + " Cr";
  if (amount >= 100000) return "₹" + Number((amount / 100000).toFixed(amount < 10000000 ? 1 : 0)) + " L";
  return "₹" + formatNumber.format(amount);
}
function exactMoney(value) { return "₹" + formatNumber.format(Math.round(Number(value || 0))); }
function dateText(value) { return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value || Date.now())); }
function ageText(value) {
  const diff = Math.max(0, Date.now() - new Date(value || Date.now()).getTime());
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return Math.floor(diff / 60000) + " min ago";
  if (diff < 86400000) return Math.floor(diff / 3600000) + " hr ago";
  return dateText(value);
}
function categoryText(category) {
  return ({ plot: "Plot", land: "Land", apartment: "Apartment", villa: "Independent home", "builder-floor": "Builder floor", office: "Office", shop: "Retail" })[category] || "Property";
}
function initials(name) { return String(name || "").trim().split(/\s+/).map((part) => part[0] || "").join("").slice(0, 2).toUpperCase(); }
function cityInfo(name) { return CITIES.find((city) => city.name === name) || CITIES[0]; }
function nearestCity(point) {
  if (!point) return null;
  let closest = null;
  CITIES.forEach((city) => {
    const dy = city.lat - point.lat;
    const dx = (city.lng - point.lng) * Math.cos(point.lat * Math.PI / 180);
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (!closest || distance < closest.distance) closest = { city: city, distance: distance };
  });
  return closest && closest.distance < 1.8 ? closest.city : null;
}
function notify(message) {
  const host = $("#toast-region");
  host.innerHTML = '<div class="toast">' + icon("check") + '<span>' + esc(message) + "</span></div>";
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => { host.innerHTML = ""; }, 3000);
}
function prepareWelcomeAudio() {
  const AudioContextType = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextType) return null;
  try {
    const context = new AudioContextType();
    const ready = context.state === "suspended" ? context.resume().catch(() => null) : Promise.resolve();
    return { context, ready };
  } catch { return null; }
}
function playWelcomeSound(prepared) {
  if (!prepared || prepared.context.state === "closed") return;
  const context = prepared.context;
  const firstNote = context.currentTime + 0.025;
  [523.25, 659.25, 783.99].forEach((frequency, index) => {
    const startAt = firstNote + index * 0.11;
    const oscillator = context.createOscillator();
    const volume = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, startAt);
    volume.gain.setValueAtTime(0.0001, startAt);
    volume.gain.linearRampToValueAtTime(0.055, startAt + 0.025);
    volume.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.38);
    oscillator.connect(volume);
    volume.connect(context.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + 0.4);
  });
  setTimeout(() => { if (context.state !== "closed") context.close().catch(() => {}); }, 1100);
}
function launchDashboardGlitter() {
  const canvas = $("#celebration-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duration = reducedMotion ? 700 : 1550;
  const count = reducedMotion ? 24 : 84;
  const palette = ["#285a43", "#5f9570", "#c89457", "#e6c785", "#91b59a", "#f1dba9"];
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(window.innerWidth * pixelRatio);
  canvas.height = Math.round(window.innerHeight * pixelRatio);
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  canvas.style.display = "block";
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  const particles = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: -16 - Math.random() * window.innerHeight * 0.35,
    vx: (Math.random() - 0.5) * 2.8,
    vy: 1.4 + Math.random() * 2.8,
    gravity: 0.035 + Math.random() * 0.045,
    size: 2 + Math.random() * 4.5,
    rotation: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.16,
    color: palette[Math.floor(Math.random() * palette.length)],
    sparkle: Math.random() > 0.64,
  }));
  let beganAt = null;
  function draw(timestamp) {
    if (beganAt === null) beganAt = timestamp;
    const elapsed = timestamp - beganAt;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += particle.gravity;
      particle.rotation += particle.spin;
      ctx.globalAlpha = Math.max(0, 1 - elapsed / duration);
      ctx.fillStyle = particle.color;
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      if (particle.sparkle) {
        ctx.beginPath();
        ctx.moveTo(0, -particle.size);
        ctx.lineTo(particle.size * 0.38, -particle.size * 0.3);
        ctx.lineTo(particle.size, 0);
        ctx.lineTo(particle.size * 0.38, particle.size * 0.3);
        ctx.lineTo(0, particle.size);
        ctx.lineTo(-particle.size * 0.38, particle.size * 0.3);
        ctx.lineTo(-particle.size, 0);
        ctx.lineTo(-particle.size * 0.38, -particle.size * 0.3);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillRect(-particle.size * 0.45, -particle.size, particle.size * 0.9, particle.size * 2);
      }
      ctx.restore();
    });
    ctx.globalAlpha = 1;
    if (elapsed < duration) requestAnimationFrame(draw);
    else {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      canvas.style.display = "none";
    }
  }
  requestAnimationFrame(draw);
}
async function celebrateDashboard(preparedAudio) {
  launchDashboardGlitter();
  if (!preparedAudio) return;
  try {
    await preparedAudio.ready;
    playWelcomeSound(preparedAudio);
  } catch {}
}
async function request(path, options) {
  const settings = Object.assign({ method: "GET", credentials: "same-origin", headers: {} }, options || {});
  if (settings.body && typeof settings.body !== "string") {
    settings.headers["Content-Type"] = "application/json";
    settings.body = JSON.stringify(settings.body);
  }
  let response;
  try { response = await fetch(path, settings); }
  catch { throw new Error("Terra could not connect to its local service. Run start.bat, then reopen this page."); }
  let body = {};
  try { body = await response.json(); } catch { body = {}; }
  if (!response.ok) {
    const error = new Error(body.error || "Could not complete the request.");
    error.status = response.status;
    throw error;
  }
  return body;
}
function renderAuth(mode, message) {
  $("#app-shell").classList.add("hidden");
  $("#auth-screen").classList.remove("hidden");
  const remembered = rememberedName();
  $("#auth-screen").innerHTML = '<div class="auth-layout"><section class="auth-visual"><a class="brand" href="#"><span class="brand-mark">' + icon("mark") + '</span><span class="brand-name">terra<span>.</span><small>PROPERTY MANAGER</small></span></a><div class="auth-message"><div class="eyebrow auth-kicker">' + icon("check") + '<span>PROPERTY OPERATIONS</span></div><h1>Your properties,<br>all in one place.</h1><p>Manage plots, listings, enquiries and deals from one clear workspace.</p><div class="auth-pitch"><strong>One clear view.</strong> Your property work, organised together.</div></div><div class="auth-visual-foot"><span>' + icon("check", "tiny") + '</span>Saved in your local workspace on this device.</div></section><section class="auth-form-side"><div class="auth-form"><div class="eyebrow">OPEN YOUR WORKSPACE</div><h2>What is your name?</h2><p class="intro">Use the same name next time to reopen your saved workspace.</p><form id="auth-form" class="stack-form"><div class="field"><label for="auth-name">Your name</label><input id="auth-name" name="name" type="text" autocomplete="given-name" autocapitalize="words" required minlength="2" maxlength="80" placeholder="Enter your name" value="' + esc(remembered) + '"></div><div id="auth-error" class="auth-error" role="alert">' + esc(message || "") + '</div><button class="button button-primary button-wide" type="submit">Open my workspace <span aria-hidden="true">→</span></button></form><p class="auth-footnote">Your records stay on this device. A name is not a password, so use Terra on a device you trust.</p></div></section></div>';
  $("#auth-form").addEventListener("submit", submitAuth);
  $("#auth-name").focus({ preventScroll: true });
}
async function submitAuth(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const name = String(values.get("name") || "").trim();
  const welcomeAudio = prepareWelcomeAudio();
  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  button.textContent = "Opening workspace…";
  try {
    const result = await request("/api/auth/name", { method: "POST", body: { name, create: true } });
    rememberName(result.user.name);
    await openWorkspace(result.user, "dashboard");
    location.hash = "dashboard";
    await celebrateDashboard(welcomeAudio);
    notify("Welcome, " + state.user.name.split(/\s+/)[0] + ". Your workspace is ready.");
  } catch (error) {
    if (welcomeAudio && welcomeAudio.context.state !== "closed") welcomeAudio.context.close().catch(() => {});
    const errorNode = $("#auth-error");
    if (errorNode) errorNode.textContent = error.message;
    button.disabled = false;
    button.textContent = "Continue to workspace";
  }
}
async function openWorkspace(user, initialPage) {
  state.user = user;
  const data = await request("/api/bootstrap");
  state.user = data.user;
  state.properties = data.properties || [];
  state.leads = data.leads || [];
  state.deals = data.deals || [];
  state.invoices = data.invoices || [];
  $("#auth-screen").classList.add("hidden");
  $("#app-shell").classList.remove("hidden");
  $("#workspace-name").textContent = state.user.name;
  $("#workspace-mobile").textContent = state.user.agencyName || state.user.phone || "Workspace account";
  $("#workspace-initial").textContent = initials(state.user.name) || "T";
  updateCounts();
  renderPage(initialPage || location.hash.replace("#", "") || "dashboard");
}
function updateCounts() {
  $("#property-count").textContent = state.properties.length;
  $("#lead-count").textContent = state.leads.filter((lead) => lead.status !== "Closed").length;
  $("#deal-count").textContent = state.deals.filter((deal) => !["Won", "Lost"].includes(deal.stage)).length;
  $("#invoice-count").textContent = state.invoices.filter((invoice) => ["Issued", "Part paid", "Overdue"].includes(invoice.status)).length;
}
async function start() {
  if (location.protocol === "file:") {
    $("#auth-screen").innerHTML = '<div class="launch-notice"><span class="brand-mark">' + icon("mark") + '</span><div class="eyebrow">LOCAL WORKSPACE</div><h1>Start Terra Property Manager</h1><p>Opening this file directly cannot reach the local database. First run <strong>start.bat</strong> from the project folder, then open the workspace below.</p><a class="button button-primary" href="http://127.0.0.1:4174">Open my workspace</a><p class="launch-help">Your saved records stay in this project’s <strong>data</strong> folder. Start the app with <strong>start.bat</strong> whenever the service is stopped.</p></div>';
    return;
  }
  try {
    const session = await request("/api/session");
    if (session.user) await openWorkspace(session.user);
    else renderAuth("login");
  } catch (error) { renderAuth("login", error.message || "Terra could not connect to its local service. Run start.bat, then reopen this page."); }
}

function statusBadge(value) {
  const key = value === "Review" ? "review" : value === "Paused" ? "paused" : "";
  return '<span class="status-badge ' + key + '">' + esc(value) + "</span>";
}
function propertyById(id) { return state.properties.find((property) => property.id === id); }
function propertyCard(property) {
  const photo = property.image ? '<img src="' + esc(property.image) + '" alt="' + esc(categoryText(property.category) + " in " + property.locality) + '" loading="lazy">' : "";
  const land = ["plot", "land"].includes(property.category);
  return '<article class="property-card"><div class="property-photo">' + photo + '<span class="photo-tag">' + esc(categoryText(property.category).toUpperCase()) + '</span></div><div class="property-info"><div class="property-price">' + esc(money(property.price, property.intent)) + '</div><div class="property-title" title="' + esc(property.title) + '">' + esc(property.title) + '</div><div class="property-location">' + icon("pin", "tiny") + " " + esc(property.locality) + ", " + esc(property.city) + '</div><div class="property-meta"><span><strong>' + formatNumber.format(property.area) + '</strong> sq ft</span><span>' + (land ? esc(property.facing || "Facing not set") : esc((property.bedrooms || 0) + " BHK")) + '</span></div><div class="property-bottom">' + statusBadge(property.status) + '<button class="button button-secondary button-small" data-action="view-property" data-id="' + esc(property.id) + '">Details</button></div></div></article>';
}
function dashboardPage() {
  const published = state.properties.filter((property) => property.status === "Published");
  const open = state.leads.filter((lead) => lead.status !== "Closed");
  const plotCount = state.properties.filter((property) => ["plot", "land"].includes(property.category)).length;
  const needsCall = state.leads.filter((lead) => lead.status === "New").slice(0, 5);
  const recent = state.properties.slice(0, 5);
  const activeDeals = state.deals.filter((deal) => !["Won", "Lost"].includes(deal.stage));
  const pipeline = activeDeals.reduce((sum, deal) => sum + Number(deal.amount || 0), 0);
  const outstanding = state.invoices.filter((invoice) => !["Draft", "Void", "Paid"].includes(invoice.status)).reduce((sum, invoice) => sum + Number(invoice.balance || 0), 0);
  const propertyRows = recent.map((property) => '<tr><td><div class="table-name"><strong>' + esc(property.title) + '</strong><small>' + esc(property.locality + ", " + property.city) + '</small></div></td><td>' + esc(money(property.price, property.intent)) + '</td><td>' + statusBadge(property.status) + '</td><td>' + esc(ageText(property.updatedAt)) + '</td><td><button class="inline-button" data-action="view-property" data-id="' + esc(property.id) + '">Open</button></td></tr>').join("");
  const leadItems = needsCall.map((lead) => '<div class="quick-item"><span class="lead-avatar">' + esc(initials(lead.name)) + '</span><span class="quick-copy"><strong>' + esc(lead.name) + '</strong><small>' + esc(lead.intent + " · " + (propertyById(lead.property_id)?.title || "General enquiry")) + '</small></span><a class="quick-time" href="tel:' + esc(lead.phone) + '">' + esc(lead.phone || ageText(lead.created_at)) + '</a></div>').join("");
  const dealItems = activeDeals.slice(0, 4).map((deal) => '<div class="quick-item"><span class="deal-dot"></span><span class="quick-copy"><strong>' + esc(deal.clientName) + '</strong><small>' + esc(deal.stage + " · " + money(deal.amount)) + '</small></span><span class="quick-time">' + esc(deal.expectedClose ? dateText(deal.expectedClose) : "Open") + '</span></div>').join("");
  const cta = state.properties.length ? '<button class="button button-primary button-small" data-action="add-property">' + icon("plus") + ' Add property</button>' : '<button class="button button-primary button-small" data-action="add-property">' + icon("plus") + ' Add your first property</button>';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  return '<div class="page-heading"><div><div class="eyebrow">' + esc(dateText(Date.now())) + ' · YOUR BUSINESS AT A GLANCE</div><h1>' + greeting + ', ' + esc(state.user.name.split(/\s+/)[0]) + '</h1><p>See what needs attention and keep every deal moving.</p></div><div class="heading-actions">' + cta + '<button class="button button-secondary button-small" data-action="add-lead">' + icon("plus") + ' Add enquiry</button></div></div>' +
    '<section class="stats-grid"><button class="stat-card stat-card-link" data-page="properties"><div class="stat-label">Active inventory</div><div class="stat-number">' + published.length + '</div><div class="stat-note">' + state.properties.length + ' total · ' + plotCount + ' plots and land</div></button><button class="stat-card stat-card-link" data-page="leads"><div class="stat-label">Open enquiries</div><div class="stat-number">' + open.length + '</div><div class="stat-note">' + needsCall.length + ' need a first response</div></button><button class="stat-card stat-card-link" data-page="deals"><div class="stat-label">Active deal pipeline</div><div class="stat-number stat-currency">' + esc(money(pipeline)) + '</div><div class="stat-note">' + activeDeals.length + ' active deals</div></button><button class="stat-card stat-card-link" data-page="billing"><div class="stat-label">Outstanding invoices</div><div class="stat-number stat-currency">' + esc(money(outstanding)) + '</div><div class="stat-note">Review balances and payments</div></button></section>' +
    '<section class="dashboard-grid"><div class="panel"><div class="panel-head"><div><h2>Recently updated properties</h2><div class="panel-subtitle">Your latest listing changes</div></div><button class="panel-link" data-page="properties">All properties →</button></div><div class="panel-body"><div class="table-wrap"><table class="overview-table"><thead><tr><th>Property</th><th>Price</th><th>Status</th><th>Updated</th><th></th></tr></thead><tbody>' + (propertyRows || '<tr><td colspan="5"><div class="empty-state"><strong>Your inventory starts here</strong><p>Add a property or plot. It will be here when you return.</p><button class="button button-primary button-small" data-action="add-property">Add a property</button></div></td></tr>') + '</tbody></table></div></div></div>' +
    '<div class="panel"><div class="panel-head"><div><h2>Needs a response</h2><div class="panel-subtitle">New enquiries ready for a first call</div></div><button class="panel-link" data-page="leads">View inbox →</button></div><div class="panel-body"><div class="quick-list">' + (leadItems || '<div class="empty-state"><strong>Inbox is clear</strong><p>New enquiries will appear here.</p></div>') + '</div></div></div></section>' +
    '<section class="dashboard-grid dashboard-grid-bottom"><div class="panel"><div class="panel-head"><div><h2>Active deals</h2><div class="panel-subtitle">Clients with a next step in progress</div></div><button class="panel-link" data-page="deals">Open pipeline →</button></div><div class="panel-body"><div class="quick-list">' + (dealItems || '<div class="empty-state"><strong>No deals in progress</strong><p>Convert a qualified buyer into a tracked deal.</p><button class="button button-primary button-small" data-action="add-deal">Add deal</button></div>') + '</div></div></div><div class="panel"><div class="panel-head"><div><h2>Quick actions</h2><div class="panel-subtitle">Common tasks take one step</div></div></div><div class="quick-actions-grid"><button class="button button-secondary" data-action="add-property">' + icon("house") + ' Add a property</button><button class="button button-secondary" data-action="add-map-plot">' + icon("pin") + ' Pin a plot on India map</button><button class="button button-secondary" data-action="add-lead">' + icon("users") + ' Add buyer enquiry</button><button class="button button-secondary" data-action="new-invoice">' + icon("receipt") + ' Create an invoice</button></div></div></section>';
}
function getFilteredProperties() {
  const query = state.propertyQuery.trim().toLowerCase();
  return state.properties.filter((property) => {
    const text = [property.title, property.city, property.locality, categoryText(property.category)].join(" ").toLowerCase();
    return (!query || text.includes(query))
      && (state.propertyType === "all" || property.category === state.propertyType)
      && (state.propertyCity === "all" || property.city === state.propertyCity)
      && (state.propertyStatus === "all" || property.status === state.propertyStatus);
  });
}
function propertiesPage() {
  const properties = getFilteredProperties();
  const cityOptions = ['<option value="all">All cities</option>'].concat(CITIES.filter((city) => state.properties.some((property) => property.city === city.name)).map((city) => '<option value="' + esc(city.name) + '" ' + (state.propertyCity === city.name ? "selected" : "") + '>' + esc(city.name) + "</option>")).join("");
  const cards = properties.length ? '<div class="property-grid">' + properties.map(propertyCard).join("") + '</div>' : '<div class="empty-state"><strong>' + (state.properties.length ? "No matching properties" : "Start with your first property") + '</strong><p>' + (state.properties.length ? "Change a filter or clear your search." : "Add one clear listing to get your workspace started.") + '</p><button class="button button-primary button-small" data-action="add-property">' + icon("plus") + ' Add property</button></div>';
  return '<div class="page-heading"><div><div class="eyebrow">INVENTORY</div><h1>Properties</h1><p>Find and update sale, rental, plot and land listings.</p></div><div class="heading-actions"><button class="button button-primary button-small" data-action="add-property">' + icon("plus") + ' Add property</button></div></div>' +
    '<div class="toolbar"><div class="toolbar-group"><input id="property-search" class="input" type="search" placeholder="Search title, locality or city" value="' + esc(state.propertyQuery) + '" aria-label="Search properties"><select id="property-type" class="select" aria-label="Property type"><option value="all">All types</option>' + ["plot", "land", "apartment", "villa", "builder-floor", "office", "shop"].map((type) => '<option value="' + type + '" ' + (state.propertyType === type ? "selected" : "") + '>' + categoryText(type) + "</option>").join("") + '</select><select id="property-city" class="select" aria-label="Filter by city">' + cityOptions + '</select><select id="property-status" class="select" aria-label="Filter by status"><option value="all">All statuses</option><option ' + (state.propertyStatus === "Published" ? "selected" : "") + '>Published</option><option ' + (state.propertyStatus === "Review" ? "selected" : "") + '>Review</option><option ' + (state.propertyStatus === "Paused" ? "selected" : "") + '>Paused</option></select></div></div>' +
    '<div class="result-count">Showing <strong>' + properties.length + '</strong> of ' + state.properties.length + ' properties</div>' + cards;
}
function leadsPage() {
  const all = state.leads.slice().filter((lead) => state.leadStatus === "all" || lead.status === state.leadStatus).filter((lead) => {
    const property = propertyById(lead.property_id);
    return !state.leadQuery || (lead.name + " " + lead.phone + " " + (property?.title || "")).toLowerCase().includes(state.leadQuery.toLowerCase());
  });
  const counts = { all: state.leads.length, New: state.leads.filter((lead) => lead.status === "New").length, Contacted: state.leads.filter((lead) => lead.status === "Contacted").length, "Visit scheduled": state.leads.filter((lead) => lead.status === "Visit scheduled").length, Closed: state.leads.filter((lead) => lead.status === "Closed").length };
  const rows = all.map((lead) => {
    const property = propertyById(lead.property_id);
    return '<tr><td><div class="lead-person"><span class="lead-avatar">' + esc(initials(lead.name)) + '</span><span><strong>' + esc(lead.name) + '</strong><small>' + esc(lead.phone) + '</small></span></div></td><td><div class="table-name"><strong>' + esc(property?.title || "General enquiry") + '</strong><small>' + esc(property ? property.locality + ", " + property.city : "No property selected") + '</small></div></td><td>' + esc(lead.intent) + '</td><td>' + esc(ageText(lead.created_at)) + '</td><td><select class="status-select" data-status="' + esc(lead.status) + '" data-lead-id="' + esc(lead.id) + '" aria-label="Update enquiry status"><option ' + (lead.status === "New" ? "selected" : "") + '>New</option><option ' + (lead.status === "Contacted" ? "selected" : "") + '>Contacted</option><option ' + (lead.status === "Visit scheduled" ? "selected" : "") + '>Visit scheduled</option><option ' + (lead.status === "Closed" ? "selected" : "") + '>Closed</option></select></td><td><button class="inline-button" data-action="deal-from-lead" data-id="' + esc(lead.id) + '">Start deal</button></td></tr>';
  }).join("");
  const tabs = ["all", "New", "Contacted", "Visit scheduled", "Closed"].map((status) => '<button type="button" data-lead-filter="' + status + '" class="' + (state.leadStatus === status ? "active" : "") + '">' + (status === "all" ? "All" : status) + " (" + counts[status] + ")</button>").join("");
  return '<div class="page-heading"><div><div class="eyebrow">FOLLOW UP</div><h1>Enquiries</h1><p>Record buyer details and keep the next step clear.</p></div><div class="heading-actions"><button class="button button-secondary button-small" data-action="export-leads">Export CSV</button><button class="button button-primary button-small" data-action="add-lead">' + icon("plus") + ' Add enquiry</button></div></div>' +
    '<section class="lead-summary"><div class="lead-summary-card"><small>Total enquiries</small><strong>' + counts.all + '</strong></div><div class="lead-summary-card"><small>New</small><strong>' + counts.New + '</strong></div><div class="lead-summary-card"><small>Contacted</small><strong>' + counts.Contacted + '</strong></div><div class="lead-summary-card"><small>Visits arranged</small><strong>' + counts["Visit scheduled"] + '</strong></div></section>' +
    '<div class="panel"><div class="panel-head"><div><h2>Buyer and tenant enquiries</h2><div class="panel-subtitle">Saved in this workspace, ready for a follow-up call.</div></div><input id="lead-search" class="input" type="search" placeholder="Search enquiries" aria-label="Search enquiries" value="' + esc(state.leadQuery) + '"></div><div class="panel-body"><div class="lead-tabs">' + tabs + '</div><div class="table-wrap"><table class="lead-table"><thead><tr><th>Person</th><th>Property</th><th>Request</th><th>Received</th><th>Status</th><th>Next step</th></tr></thead><tbody>' + (rows || '<tr><td colspan="6"><div class="empty-state"><strong>No enquiries in this view</strong><p>Add an enquiry to keep a follow-up record.</p><button class="button button-primary button-small" data-action="add-lead">Add enquiry</button></div></td></tr>') + '</tbody></table></div></div></div>';
}
const DEAL_STAGES = ["Prospecting", "Qualified", "Negotiation", "Token received", "Agreement", "Won", "Lost"];
function dealsPage() {
  const active = state.deals.filter((deal) => !["Won", "Lost"].includes(deal.stage));
  const pipeline = active.reduce((sum, deal) => sum + Number(deal.amount || 0), 0);
  const commission = active.reduce((sum, deal) => sum + Number(deal.commissionAmount || 0), 0);
  const rows = state.deals.map((deal) => {
    const property = propertyById(deal.propertyId);
    return '<tr><td><div class="table-name"><strong>' + esc(deal.clientName) + '</strong><small>' + esc(deal.clientPhone || "No mobile saved") + '</small></div></td><td><div class="table-name"><strong>' + esc(property?.title || "Direct deal") + '</strong><small>' + esc(property ? property.locality + ", " + property.city : "No linked property") + '</small></div></td><td><strong>' + esc(money(deal.amount)) + '</strong><small class="muted-line">' + esc(deal.commissionRate) + '% · ' + esc(money(deal.commissionAmount)) + '</small></td><td><select class="status-select deal-stage-select" data-deal-id="' + esc(deal.id) + '" aria-label="Update deal stage">' + DEAL_STAGES.map((stage) => '<option ' + (deal.stage === stage ? "selected" : "") + '>' + esc(stage) + '</option>').join("") + '</select></td><td>' + (deal.expectedClose ? esc(dateText(deal.expectedClose)) : "—") + '</td><td><div class="invoice-actions"><button class="inline-button" data-action="invoice-from-deal" data-id="' + esc(deal.id) + '">Invoice</button><button class="inline-button" data-action="delete-deal" data-id="' + esc(deal.id) + '">Remove</button></div></td></tr>';
  }).join("");
  const stageCounts = DEAL_STAGES.slice(0, 5).map((stage) => {
    const count = state.deals.filter((deal) => deal.stage === stage).length;
    return '<div class="pipeline-step"><span>' + esc(stage) + '</span><strong>' + count + '</strong><i style="--fill:' + (state.deals.length ? Math.max(8, count / state.deals.length * 100) : 8) + '%"></i></div>';
  }).join("");
  return '<div class="page-heading"><div><div class="eyebrow">SALES PIPELINE</div><h1>Deals</h1><p>Track the next step from first conversation to closed sale.</p></div><div class="heading-actions"><button class="button button-secondary button-small" data-action="export-deals">Export CSV</button><button class="button button-primary button-small" data-action="add-deal">' + icon("plus") + ' Add deal</button></div></div>' +
    '<section class="stats-grid"><div class="stat-card"><div class="stat-label">Active deals</div><div class="stat-number">' + active.length + '</div><div class="stat-note">Across your open pipeline</div></div><div class="stat-card"><div class="stat-label">Pipeline value</div><div class="stat-number stat-currency">' + esc(money(pipeline)) + '</div><div class="stat-note">Won and lost deals excluded</div></div><div class="stat-card"><div class="stat-label">Expected commission</div><div class="stat-number stat-currency">' + esc(money(commission)) + '</div><div class="stat-note">Based on each deal’s rate</div></div><div class="stat-card"><div class="stat-label">Closed deals</div><div class="stat-number">' + state.deals.filter((deal) => deal.stage === "Won").length + '</div><div class="stat-note">Marked won</div></div></section>' +
    '<div class="panel pipeline-panel"><div class="panel-head"><div><h2>Pipeline health</h2><div class="panel-subtitle">Move each deal forward as the conversation progresses.</div></div></div><div class="pipeline-track">' + stageCounts + '</div></div>' +
    '<div class="panel"><div class="panel-head"><div><h2>All deals</h2><div class="panel-subtitle">Linked clients, properties, values and follow-up stages.</div></div></div><div class="panel-body"><div class="table-wrap"><table class="deal-table"><thead><tr><th>Client</th><th>Property</th><th>Deal / commission</th><th>Stage</th><th>Expected close</th><th></th></tr></thead><tbody>' + (rows || '<tr><td colspan="6"><div class="empty-state"><strong>No deals yet</strong><p>Start a deal from a buyer enquiry or add a client directly.</p><button class="button button-primary button-small" data-action="add-deal">Add your first deal</button></div></td></tr>') + '</tbody></table></div></div></div>';
}
function invoiceStatusClass(status) { return String(status || "").toLowerCase().replace(/\s+/g, "-"); }
function billingPage() {
  const filtered = state.invoices.filter((invoice) => state.invoiceFilter === "all" || (state.invoiceFilter === "open" ? ["Issued", "Part paid", "Overdue"].includes(invoice.status) : invoice.status === state.invoiceFilter));
  const outstanding = state.invoices.filter((invoice) => !["Draft", "Void", "Paid"].includes(invoice.status)).reduce((sum, invoice) => sum + Number(invoice.balance || 0), 0);
  const collected = state.invoices.reduce((sum, invoice) => sum + Number(invoice.paidAmount || 0), 0);
  const invoiceRows = filtered.map((invoice) => '<tr><td><button class="invoice-link" data-action="view-invoice" data-id="' + esc(invoice.id) + '">' + esc(invoice.invoiceNo) + '</button><small class="muted-line">' + esc(dateText(invoice.invoiceDate)) + '</small></td><td><div class="table-name"><strong>' + esc(invoice.clientName) + '</strong><small>' + esc(invoice.description) + '</small></div></td><td><strong>' + esc(money(invoice.total)) + '</strong><small class="muted-line">Balance ' + esc(money(invoice.balance)) + '</small></td><td><span class="status-badge invoice-status ' + invoiceStatusClass(invoice.status) + '">' + esc(invoice.status) + '</span></td><td><div class="invoice-actions"><button class="inline-button" data-action="view-invoice" data-id="' + esc(invoice.id) + '">View</button>' + (invoice.status === "Draft" ? '<button class="inline-button" data-action="issue-invoice" data-id="' + esc(invoice.id) + '">Issue</button>' : invoice.balance > 0 && invoice.status !== "Void" ? '<button class="inline-button" data-action="record-payment" data-id="' + esc(invoice.id) + '">Record payment</button>' : "") + '</div></td></tr>').join("");
  const filters = [["all", "All"], ["open", "Outstanding"], ["Paid", "Paid"], ["Draft", "Draft"], ["Void", "Void"]].map(([id,label]) => '<button class="filter-pill ' + (state.invoiceFilter === id ? "active" : "") + '" data-invoice-filter="' + esc(id) + '">' + esc(label) + '</button>').join("");
  return '<div class="page-heading"><div><div class="eyebrow">ACCOUNTS RECEIVABLE</div><h1>Billing</h1><p>Create a clear service invoice, issue it, and record payments against the balance.</p></div><div class="heading-actions"><button class="button button-secondary button-small" data-action="export-invoices">Export CSV</button><button class="button button-secondary button-small" data-action="account">Agency details</button><button class="button button-primary button-small" data-action="new-invoice">' + icon("plus") + ' New invoice</button></div></div>' +
    '<section class="stats-grid"><div class="stat-card"><div class="stat-label">Invoices</div><div class="stat-number">' + state.invoices.length + '</div><div class="stat-note">Drafts and issued invoices</div></div><div class="stat-card"><div class="stat-label">Outstanding</div><div class="stat-number stat-currency">' + esc(money(outstanding)) + '</div><div class="stat-note">Issued balances to collect</div></div><div class="stat-card"><div class="stat-label">Payments recorded</div><div class="stat-number stat-currency">' + esc(money(collected)) + '</div><div class="stat-note">Total marked as received</div></div><div class="stat-card"><div class="stat-label">Overdue</div><div class="stat-number">' + state.invoices.filter((invoice) => invoice.status === "Overdue").length + '</div><div class="stat-note">Past the payment due date</div></div></section>' +
    '<div class="panel"><div class="panel-head billing-head"><div><h2>Invoices</h2><div class="panel-subtitle">GST and payment totals are calculated and saved with each invoice.</div></div><div class="filter-row">' + filters + '</div></div><div class="panel-body"><div class="table-wrap"><table class="invoice-table"><thead><tr><th>Invoice</th><th>Bill to</th><th>Total / balance</th><th>Status</th><th>Actions</th></tr></thead><tbody>' + (invoiceRows || '<tr><td colspan="5"><div class="empty-state"><strong>No invoices in this view</strong><p>Set your agency name and state in Agency details before creating a GST invoice.</p><button class="button button-primary button-small" data-action="new-invoice">Create an invoice</button></div></td></tr>') + '</tbody></table></div></div></div>' +
    '<p class="billing-note">This tool prepares an invoice document and tracks the amounts you record. Confirm GST classification, SAC/HSN and tax treatment with your accountant before issuing real invoices.</p>';
}
function mapPage() {
  const options = ['<option value="India" ' + (state.mapCity === "India" ? "selected" : "") + '>All India</option>'].concat(CITIES.map((city) => '<option value="' + esc(city.name) + '" ' + (state.mapCity === city.name ? "selected" : "") + '>' + esc(city.name + ", " + city.state) + "</option>")).join("");
  return '<div class="page-heading"><div><div class="eyebrow">LOCATION</div><h1>India map</h1><p>Explore listings across India, search major cities, or click the map to pin a plot accurately.</p></div><div class="heading-actions"><button class="button button-primary button-small" data-action="add-map-plot">' + icon("plus") + ' Add plot</button></div></div><div class="map-layout"><aside class="map-controls"><h2>Map filters</h2><p>Pan and zoom across India. Choose a city or search one of your saved localities.</p><label class="map-label" for="map-city-select">Jump to a city</label><select id="map-city-select" class="select">' + options + '</select><span class="map-label">Listing type</span><div class="map-chips"><button type="button" class="map-chip ' + (state.mapPlots ? "active" : "") + '" data-map-type="plots">Plots and land</button><button type="button" class="map-chip ' + (!state.mapPlots ? "active" : "") + '" data-map-type="all">All listings</button></div><label class="map-label" for="map-locality">Find a city or locality</label><input id="map-locality" class="input" list="locality-list" placeholder="Search Indian cities"><datalist id="locality-list">' + CITIES.map((city) => '<option value="' + esc(city.name) + '"></option>').join("") + state.properties.map((property) => '<option value="' + esc(property.locality + ", " + property.city) + '"></option>').join("") + '</datalist><div class="map-count"><span>' + icon("pin") + '</span><div><strong id="map-count-value">' + mapItems().length + '</strong><small>published listings shown</small></div></div></aside><div class="map-canvas"><div class="map-label-overlay"><span id="map-title">' + (state.mapCity === "India" ? "India overview" : esc(state.mapCity)) + '</span><small id="map-subtitle">Property locations from your account</small></div><div id="india-map" class="india-map" aria-label="Interactive map of India"></div><div id="map-message" class="map-disclaimer"></div></div></div><p class="map-disclaimer">Map tiles © OpenStreetMap contributors. Location search uses the included India city directory and saved listing locations. Click the map for a precise plot pin.</p>';
}
function mapItems() {
  return state.properties.filter((property) => property.status === "Published" && (state.mapCity === "India" || property.city === state.mapCity) && (!state.mapPlots || ["plot", "land"].includes(property.category)));
}
function renderPage(page) {
  const allowed = ["dashboard", "properties", "leads", "deals", "billing", "map"];
  state.page = allowed.includes(page) ? page : "dashboard";
  if (state.map) { state.map.remove(); state.map = null; state.markers = []; }
  const names = { dashboard: "Overview", properties: "Properties", leads: "Enquiries", deals: "Deals", billing: "Billing", map: "India map" };
  $("#current-section").textContent = names[state.page];
  $$(".nav-item[data-page]").forEach((link) => link.classList.toggle("active", link.dataset.page === state.page));
  const views = { dashboard: dashboardPage, properties: propertiesPage, leads: leadsPage, deals: dealsPage, billing: billingPage, map: mapPage };
  $("#page-content").innerHTML = views[state.page]();
  $("#page-content").focus({ preventScroll: true });
  if (state.page === "properties") bindPropertyFilters();
  if (state.page === "leads") bindLeadFilters();
  if (state.page === "deals") bindDealControls();
  if (state.page === "billing") $$('[data-invoice-filter]').forEach((button) => button.addEventListener("click", () => { state.invoiceFilter = button.dataset.invoiceFilter; renderPage("billing"); }));
  if (state.page === "map") setTimeout(initMap, 80);
}
function navigate(page) { location.hash = page; }
window.addEventListener("hashchange", () => { if (state.user) renderPage(location.hash.slice(1)); });

function bindPropertyFilters() {
  $("#property-search").addEventListener("input", (event) => { state.propertyQuery = event.target.value; const cursor = event.target.selectionStart; renderPage("properties"); const next = $("#property-search"); next.focus(); next.setSelectionRange(cursor, cursor); });
  $("#property-type").addEventListener("change", (event) => { state.propertyType = event.target.value; renderPage("properties"); });
  $("#property-city").addEventListener("change", (event) => { state.propertyCity = event.target.value; renderPage("properties"); });
  $("#property-status").addEventListener("change", (event) => { state.propertyStatus = event.target.value; renderPage("properties"); });
}
function bindLeadFilters() {
  $("#lead-search").addEventListener("input", (event) => { state.leadQuery = event.target.value; const cursor = event.target.selectionStart; renderPage("leads"); const next = $("#lead-search"); next.focus(); next.setSelectionRange(cursor, cursor); });
  $$(".status-select").forEach((select) => select.addEventListener("change", async (event) => {
    try { await request("/api/leads/" + encodeURIComponent(event.target.dataset.leadId), { method: "PATCH", body: { status: event.target.value } }); await refreshWorkspace(); notify("Enquiry status updated."); }
    catch (error) { notify(error.message); }
  }));
}
function bindDealControls() {
  $$(".deal-stage-select").forEach((select) => select.addEventListener("change", async (event) => {
    try {
      await request("/api/deals/" + encodeURIComponent(event.target.dataset.dealId), { method: "PATCH", body: { stage: event.target.value } });
      await refreshWorkspace(); notify("Deal stage updated.");
    } catch (error) { notify(error.message); }
  }));
}
async function refreshWorkspace() {
  const data = await request("/api/bootstrap");
  state.user = data.user; state.properties = data.properties || []; state.leads = data.leads || []; state.deals = data.deals || []; state.invoices = data.invoices || [];
  updateCounts();
  renderPage(state.page);
}

function initMap() {
  const node = $("#india-map");
  if (!node) return;
  if (!window.L) { $("#map-message").textContent = "The map needs an internet connection to load. Your saved property data is still available in Properties."; return; }
  state.map = L.map(node, { minZoom: 4, maxZoom: 18, maxBounds: [[5.4, 67.1], [37.8, 98.4]], maxBoundsViscosity: .55 }).setView([22.8, 79.1], 4.6);
  const startingCity = CITIES.find((city) => city.name === state.mapCity);
  if (startingCity) state.map.setView([startingCity.lat, startingCity.lng], 10);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>' }).addTo(state.map);
  state.map.on("click", (event) => {
    state.pinCoords = { lat: Number(event.latlng.lat.toFixed(5)), lng: Number(event.latlng.lng.toFixed(5)) };
    state.pinCity = nearestCity(state.pinCoords)?.name || (state.mapCity === "India" ? "" : state.mapCity);
    $("#map-subtitle").textContent = "Plot point selected" + (state.pinCity ? " · near " + state.pinCity : " · choose a city when adding") + " · " + state.pinCoords.lat + ", " + state.pinCoords.lng;
  });
  $("#map-city-select").addEventListener("change", (event) => {
    state.mapCity = event.target.value;
    const city = CITIES.find((item) => item.name === state.mapCity);
    if (city) state.map.setView([city.lat, city.lng], 10, { animate: true });
    else { state.map.setView([22.8, 79.1], 4.6, { animate: true }); state.pinCoords = null; }
    $("#map-title").textContent = state.mapCity === "India" ? "India overview" : state.mapCity + " overview";
    $("#map-subtitle").textContent = "Property locations from your account";
    updateMarkers();
  });
  $("#map-locality").addEventListener("change", (event) => {
    const query = event.target.value.trim().toLowerCase();
    const property = state.properties.find((item) => (item.locality + ", " + item.city).toLowerCase() === query || item.city.toLowerCase() === query);
    if (property) {
      state.mapCity = property.city; $("#map-city-select").value = property.city;
      state.map.setView([property.lat, property.lng], 13, { animate: true }); return;
    }
    const city = CITIES.find((item) => item.name.toLowerCase() === query);
    if (city) {
      state.mapCity = city.name; $("#map-city-select").value = city.name;
      state.map.setView([city.lat, city.lng], 11, { animate: true });
      $("#map-title").textContent = city.name + ", " + city.state; updateMarkers(); return;
    }
    if (query) notify("Choose a city or locality from the list.");
  });
  $$('[data-map-type]').forEach((button) => button.addEventListener("click", () => {
    state.mapPlots = button.dataset.mapType === "plots";
    $$('[data-map-type]').forEach((item) => item.classList.toggle("active", item === button));
    updateMarkers();
  }));
  updateMarkers();
  setTimeout(() => state.map && state.map.invalidateSize(), 60);
}
function updateMarkers() {
  if (!state.map) return;
  state.markers.forEach((marker) => marker.remove()); state.markers = [];
  const properties = mapItems();
  properties.forEach((property) => {
    const isPlot = ["plot", "land"].includes(property.category);
    const label = isPlot ? "PLOT" : "HOME";
    const markerIcon = L.divIcon({ className: "terra-marker" + (isPlot ? " plot" : ""), html: "<span><i>" + label + "</i></span>", iconSize: [29, 29], iconAnchor: [14, 27], popupAnchor: [0, -25] });
    const marker = L.marker([property.lat, property.lng], { icon: markerIcon }).addTo(state.map);
    marker.bindPopup('<div class="map-popup-title">' + esc(property.title) + '</div><div class="map-popup-detail">' + esc(property.locality + ", " + property.city) + '</div><div class="map-popup-price">' + esc(money(property.price, property.intent)) + '</div>');
    marker.on("click", () => showProperty(property.id));
    state.markers.push(marker);
  });
  const counter = $("#map-count-value"); if (counter) counter.textContent = properties.length;
}

function modal(title, description, body, footer) {
  $("#modal-root").innerHTML = '<div class="modal" role="dialog" aria-modal="true"><div class="modal-head"><div><h2>' + title + '</h2><p>' + description + '</p></div><button class="close-button" data-action="close-modal" aria-label="Close">' + icon("close") + '</button></div><div class="modal-body">' + body + '</div><div class="modal-footer"><small>' + (footer || "Your changes are saved to your account.") + '</small><div class="modal-footer-actions"><button class="button button-secondary button-small" data-action="close-modal">Cancel</button><button class="button button-primary button-small" type="submit" form="active-form">Save</button></div></div></div>';
}
function openPropertyForm(property, fromMap) {
  const editing = Boolean(property);
  const current = property || {};
  const chosenCity = current.city || (fromMap && state.pinCoords && !state.pinCity && state.mapCity === "India" ? "" : fromMap && state.pinCity ? state.pinCity : state.mapCity !== "India" ? state.mapCity : CITIES[0].name);
  const coordinates = state.pinCoords || { lat: current.lat || cityInfo(chosenCity).lat, lng: current.lng || cityInfo(chosenCity).lng };
  const cityOptions = (chosenCity ? "" : '<option value="" selected disabled>Select nearest city</option>') + CITIES.map((city) => '<option value="' + esc(city.name) + '" ' + (chosenCity === city.name ? "selected" : "") + '>' + esc(city.name + ", " + city.state) + '</option>').join("");
  const photoLine = '<label class="photo-drop" for="listing-photo">' + icon("plus") + '<span><strong id="photo-label">' + (current.image ? "Keep current photo or choose another" : "Add a cover photo") + '</strong><small>Optional · JPG, PNG or WebP</small></span><input id="listing-photo" type="file" accept="image/jpeg,image/png,image/webp"></label><img id="photo-preview" class="photo-preview" alt="Listing photo preview" style="display:' + (current.image ? "block" : "none") + '" src="' + esc(current.image || "") + '">';
  const body = '<form id="active-form" class="form-grid"><input type="hidden" name="id" value="' + esc(current.id || "") + '"><div class="field full"><label for="listing-title">Property title</label><input id="listing-title" name="title" required maxlength="100" placeholder="A short, clear title" value="' + esc(current.title || "") + '"></div><div class="field"><label for="listing-category">Property type</label><select id="listing-category" name="category"><option value="plot" ' + (current.category === "plot" ? "selected" : "") + '>Plot</option><option value="land" ' + (current.category === "land" ? "selected" : "") + '>Land</option><option value="apartment" ' + (current.category === "apartment" ? "selected" : "") + '>Apartment</option><option value="villa" ' + (current.category === "villa" ? "selected" : "") + '>Independent home</option><option value="builder-floor" ' + (current.category === "builder-floor" ? "selected" : "") + '>Builder floor</option><option value="office" ' + (current.category === "office" ? "selected" : "") + '>Office</option><option value="shop" ' + (current.category === "shop" ? "selected" : "") + '>Retail</option></select></div><div class="field"><label for="listing-intent">Listing goal</label><select id="listing-intent" name="intent"><option value="sale" ' + (current.intent !== "rent" ? "selected" : "") + '>For sale</option><option value="rent" ' + (current.intent === "rent" ? "selected" : "") + '>For rent / lease</option></select></div><div class="field"><label for="listing-city">City</label><select id="listing-city" name="city">' + cityOptions + '</select></div><div class="field"><label for="listing-locality">Locality</label><input id="listing-locality" name="locality" required maxlength="120" placeholder="Neighbourhood or project" value="' + esc(current.locality || "") + '"></div><div class="field"><label for="listing-area">Area (sq ft)</label><input id="listing-area" name="area" type="number" min="1" required placeholder="e.g. 2400" value="' + esc(current.area || "") + '"></div><div class="field"><label for="listing-price">' + (current.intent === "rent" ? "Monthly rent (₹)" : "Asking price (₹)") + '</label><input id="listing-price" name="price" type="number" min="1" required placeholder="Full amount in rupees" value="' + esc(current.price || "") + '"></div><div class="field" id="bedrooms-field"><label for="listing-bedrooms">Bedrooms / BHK</label><input id="listing-bedrooms" name="bedrooms" type="number" min="0" max="30" step="1" value="' + esc(current.bedrooms || 0) + '" placeholder="0 for plots"></div><div class="field"><label for="listing-facing">Facing</label><select id="listing-facing" name="facing"><option value="">Not specified</option>' + ["North", "South", "East", "West", "North-East", "South-East", "North-West", "South-West"].map((facing) => '<option ' + (current.facing === facing ? "selected" : "") + '>' + facing + '</option>').join("") + '</select></div><div class="field"><label for="listing-status">Status</label><select id="listing-status" name="status"><option ' + (current.status === "Published" ? "selected" : "") + '>Published</option><option ' + (current.status === "Review" ? "selected" : "") + '>Review</option><option ' + (current.status === "Paused" ? "selected" : "") + '>Paused</option></select></div><div class="field"><label for="listing-mobile">Contact mobile</label><input id="listing-mobile" name="contactPhone" type="tel" required value="' + esc(current.contactPhone || state.user.phone) + '"><span class="field-hint">Defaults to the mobile number on your agency profile.</span></div><div class="field full"><label for="listing-description">Description <span class="field-hint">(optional)</span></label><textarea id="listing-description" name="description" maxlength="1000" placeholder="Key details for a buyer or tenant">' + esc(current.description || "") + '</textarea></div><div class="field full"><label>Photo</label>' + photoLine + '</div><div class="field"><label for="listing-lat">Map latitude</label><input id="listing-lat" name="lat" type="number" step="0.00001" min="5" max="38" required value="' + esc(coordinates.lat) + '"></div><div class="field"><label for="listing-lng">Map longitude</label><input id="listing-lng" name="lng" type="number" step="0.00001" min="67" max="99" required value="' + esc(coordinates.lng) + '"></div><div class="field full"><div id="form-error" class="form-error" role="alert"></div></div></form>';
  modal(editing ? "Edit property" : fromMap ? "Add a plot" : "Add a property", editing ? "Update the listing details below." : "Add the details buyers ask for most. You can edit them later.", body, "Saved to your account and available after you sign in again.");
  const form = $("#active-form");
  $("#listing-title").focus();
  const updateBedroomVisibility = () => { $("#bedrooms-field").style.display = ["plot", "land", "office", "shop"].includes($("#listing-category").value) ? "none" : "grid"; };
  updateBedroomVisibility();
  $("#listing-category").addEventListener("change", updateBedroomVisibility);
  $("#listing-city").addEventListener("change", (event) => {
    if (state.pinCoords && fromMap) return;
    const info = cityInfo(event.target.value); $("#listing-lat").value = info.lat; $("#listing-lng").value = info.lng;
  });
  $("#listing-intent").addEventListener("change", (event) => { $("label[for='listing-price']").textContent = event.target.value === "rent" ? "Monthly rent (₹)" : "Asking price (₹)"; });
  $("#listing-photo").addEventListener("change", (event) => {
    const file = event.target.files && event.target.files[0]; if (!file) return;
    $("#photo-label").textContent = file.name;
    resizeImage(file).then((dataUrl) => { state.selectedImage = dataUrl; $("#photo-preview").src = dataUrl; $("#photo-preview").style.display = "block"; }).catch(() => { $("#form-error").textContent = "This photo could not be opened. Choose a different image."; });
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const payload = {
      title: String(data.get("title")).trim(), category: data.get("category"), intent: data.get("intent"), city: data.get("city"), locality: String(data.get("locality")).trim(),
      price: Number(data.get("price")), area: Number(data.get("area")), status: data.get("status"), facing: data.get("facing"), bedrooms: Number(data.get("bedrooms")) || 0,
      lat: Number(data.get("lat")), lng: Number(data.get("lng")), description: String(data.get("description") || "").trim(), contactPhone: data.get("contactPhone"), image: state.selectedImage || current.image || "",
    };
    const submit = $(".modal-footer [type=submit]"); submit.disabled = true; submit.textContent = "Saving…";
    try {
      if (editing) await request("/api/properties/" + encodeURIComponent(current.id), { method: "PUT", body: payload });
      else await request("/api/properties", { method: "POST", body: payload });
      state.selectedImage = ""; state.pinCoords = null; state.pinCity = null; $("#modal-root").innerHTML = "";
      await refreshWorkspace();
      if (!editing) notify("Property saved to your account."); else notify("Property details updated.");
      if (!editing) { state.propertyQuery = ""; state.propertyType = "all"; state.propertyCity = "all"; state.propertyStatus = "all"; }
      if (fromMap) navigate("map"); else navigate("properties");
    } catch (error) { $("#form-error").textContent = error.message; submit.disabled = false; submit.textContent = "Save"; }
  });
}
function openLeadForm(propertyId) {
  const options = ['<option value="">General enquiry</option>'].concat(state.properties.map((property) => '<option value="' + esc(property.id) + '" ' + (property.id === propertyId ? "selected" : "") + '>' + esc(property.title) + '</option>')).join("");
  const body = '<form id="active-form" class="form-grid"><div class="field"><label for="lead-name">Name</label><input id="lead-name" name="name" required maxlength="80" placeholder="Buyer or tenant name"></div><div class="field"><label for="lead-phone">Mobile number</label><input id="lead-phone" name="phone" type="tel" required placeholder="+91 98765 43210"></div><div class="field full"><label for="lead-property">Property</label><select id="lead-property" name="propertyId">' + options + '</select></div><div class="field full"><label for="lead-intent">Enquiry type</label><select id="lead-intent" name="intent"><option>More information</option><option>Site visit</option><option>Price details</option><option>Availability</option><option>Rental viewing</option></select></div><div class="field full"><div id="form-error" class="form-error" role="alert"></div></div></form>';
  modal("Add an enquiry", "Save the contact and request so you can follow up later.", body, "Enquiry details are private to your account.");
  $("#lead-name").focus();
  $("#active-form").addEventListener("submit", async (event) => {
    event.preventDefault(); const form = event.currentTarget; if (!form.reportValidity()) return;
    const data = new FormData(form); const button = $(".modal-footer [type=submit]"); button.disabled = true; button.textContent = "Saving…";
    try {
      await request("/api/leads", { method: "POST", body: { name: String(data.get("name")).trim(), phone: data.get("phone"), propertyId: data.get("propertyId") || null, intent: data.get("intent"), source: "Workspace" } });
      $("#modal-root").innerHTML = ""; await refreshWorkspace(); navigate("leads"); notify("Enquiry saved.");
    } catch (error) { $("#form-error").textContent = error.message; button.disabled = false; button.textContent = "Save"; }
  });
}
function openDealForm(leadId) {
  const selectedLead = state.leads.find((lead) => lead.id === leadId);
  const leadOptions = ['<option value="">No linked enquiry</option>'].concat(state.leads.map((lead) => '<option value="' + esc(lead.id) + '" ' + (lead.id === leadId ? "selected" : "") + '>' + esc(lead.name + " · " + lead.intent) + '</option>')).join("");
  const propertyOptions = ['<option value="">Direct / property not selected</option>'].concat(state.properties.map((property) => '<option value="' + esc(property.id) + '" ' + (selectedLead && selectedLead.property_id === property.id ? "selected" : "") + '>' + esc(property.title + " · " + property.city) + '</option>')).join("");
  const linkedProperty = selectedLead && propertyById(selectedLead.property_id);
  const body = '<form id="active-form" class="form-grid"><div class="field"><label for="deal-lead">Start from an enquiry</label><select id="deal-lead" name="leadId">' + leadOptions + '</select></div><div class="field"><label for="deal-property">Property</label><select id="deal-property" name="propertyId">' + propertyOptions + '</select></div><div class="field"><label for="deal-client">Client name</label><input id="deal-client" name="clientName" required minlength="2" maxlength="80" value="' + esc(selectedLead?.name || "") + '" placeholder="Buyer or tenant"></div><div class="field"><label for="deal-phone">Client mobile</label><input id="deal-phone" name="clientPhone" type="tel" value="' + esc(selectedLead?.phone || "") + '" placeholder="Optional"></div><div class="field"><label for="deal-amount">Expected transaction value (₹)</label><input id="deal-amount" name="amount" type="number" required min="1" step="1" value="' + esc(linkedProperty?.price || "") + '" placeholder="Full amount in rupees"></div><div class="field"><label for="deal-rate">Commission rate (%)</label><input id="deal-rate" name="commissionRate" type="number" required min="0" max="100" step="0.1" value="1" placeholder="e.g. 1"></div><div class="field full commission-preview" id="commission-preview">Expected commission: <strong>₹0</strong></div><div class="field"><label for="deal-stage">Deal stage</label><select id="deal-stage" name="stage">' + DEAL_STAGES.map((stage) => '<option ' + (stage === "Prospecting" ? "selected" : "") + '>' + esc(stage) + '</option>').join("") + '</select></div><div class="field"><label for="deal-close">Expected close date</label><input id="deal-close" name="expectedClose" type="date"></div><div class="field full"><label for="deal-notes">Notes</label><textarea id="deal-notes" name="notes" maxlength="1000" placeholder="Next step, documents needed, or call notes"></textarea></div><div class="field full"><div id="form-error" class="form-error" role="alert"></div></div></form>';
  modal("Add a deal", "Keep the client, property, value, expected commission and next stage together.", body, "Saved to your local workspace database.");
  const form = $("#active-form");
  const updateCommission = () => {
    const amount = Number($("#deal-amount").value || 0);
    const rate = Number($("#deal-rate").value || 0);
    $("#commission-preview").innerHTML = 'Expected commission: <strong>' + esc(money(Math.round(amount * rate / 100))) + '</strong>';
  };
  $("#deal-amount").addEventListener("input", updateCommission);
  $("#deal-rate").addEventListener("input", updateCommission);
  $("#deal-lead").addEventListener("change", (event) => {
    const lead = state.leads.find((item) => item.id === event.target.value);
    if (!lead) return;
    $("#deal-client").value = lead.name; $("#deal-phone").value = lead.phone;
    if (lead.property_id) $("#deal-property").value = lead.property_id;
    const property = propertyById(lead.property_id); if (property && !$("#deal-amount").value) $("#deal-amount").value = property.price;
    updateCommission();
  });
  updateCommission();
  $("#active-form").addEventListener("submit", async (event) => {
    event.preventDefault(); if (!form.reportValidity()) return;
    const data = new FormData(form); const button = $(".modal-footer [type=submit]"); button.disabled = true; button.textContent = "Saving…";
    try {
      await request("/api/deals", { method: "POST", body: { clientName: data.get("clientName"), clientPhone: data.get("clientPhone"), leadId: data.get("leadId") || null, propertyId: data.get("propertyId") || null, amount: Number(data.get("amount")), commissionRate: Number(data.get("commissionRate")), stage: data.get("stage"), expectedClose: data.get("expectedClose"), notes: data.get("notes") } });
      $("#modal-root").innerHTML = ""; await refreshWorkspace(); navigate("deals"); notify("Deal saved to your pipeline.");
    } catch (error) { $("#form-error").textContent = error.message; button.disabled = false; button.textContent = "Save"; }
  });
}
function dateInputValue(date) { const value = new Date(date); return value.getFullYear() + "-" + String(value.getMonth() + 1).padStart(2, "0") + "-" + String(value.getDate()).padStart(2, "0"); }
function openInvoiceForm(dealId) {
  const deal = state.deals.find((item) => item.id === dealId);
  const defaultAmount = deal ? Number(deal.commissionAmount || 0) : 0;
  const dealOptions = ['<option value="">No linked deal</option>'].concat(state.deals.map((item) => '<option value="' + esc(item.id) + '" ' + (item.id === dealId ? "selected" : "") + '>' + esc(item.clientName + " · " + money(item.commissionAmount)) + '</option>')).join("");
  const stateOptions = ['<option value="">Select state / UT</option>'].concat(INDIAN_STATES.map((item) => '<option ' + ((deal && deal.clientState === item) ? "selected" : "") + '>' + esc(item) + '</option>')).join("");
  const today = dateInputValue(new Date()); const due = dateInputValue(new Date(Date.now() + 15 * 86400000));
  const body = '<form id="active-form" class="form-grid"><div class="field full"><label for="invoice-deal">Link to deal</label><select id="invoice-deal" name="dealId">' + dealOptions + '</select><span class="field-hint">If selected, the client and commission amount will be copied in.</span></div><div class="field"><label for="invoice-client">Bill to: client / business name</label><input id="invoice-client" name="clientName" required minlength="2" maxlength="80" value="' + esc(deal?.clientName || "") + '"></div><div class="field"><label for="invoice-phone">Client mobile</label><input id="invoice-phone" name="clientPhone" type="tel" value="' + esc(deal?.clientPhone || "") + '"></div><div class="field full"><label for="invoice-address">Client billing address</label><input id="invoice-address" name="clientAddress" maxlength="300" placeholder="Street, locality, city and PIN code"></div><div class="field"><label for="invoice-state">Client state / UT</label><select id="invoice-state" name="clientState" required>' + stateOptions + '</select></div><div class="field"><label for="invoice-gstin">Client GSTIN (optional)</label><input id="invoice-gstin" name="clientGstin" maxlength="15" autocomplete="off" placeholder="15-character GSTIN"></div><div class="field full"><label for="invoice-description">Service description</label><input id="invoice-description" name="description" required maxlength="160" value="' + esc(deal ? "Brokerage services · " + (propertyById(deal.propertyId)?.title || deal.clientName) : "Real estate brokerage services") + '"></div><div class="field"><label for="invoice-sac">SAC code (optional)</label><input id="invoice-sac" name="sacCode" maxlength="20" placeholder="Your accountant can confirm"></div><div class="field"><label for="invoice-quantity">Quantity</label><input id="invoice-quantity" name="quantity" type="number" min="1" max="100" step="1" value="1" required></div><div class="field"><label for="invoice-rate">Unit amount (₹)</label><input id="invoice-rate" name="unitAmount" type="number" min="1" step="1" value="' + esc(defaultAmount || "") + '" required></div><div class="field"><label for="invoice-tax">GST rate</label><select id="invoice-tax" name="taxRate"><option value="0">No GST</option><option value="5">5%</option><option value="12">12%</option><option value="18">18%</option><option value="28">28%</option></select></div><div class="field"><label for="invoice-date">Invoice date</label><input id="invoice-date" name="invoiceDate" type="date" value="' + today + '" required></div><div class="field"><label for="invoice-due">Due date</label><input id="invoice-due" name="dueDate" type="date" value="' + due + '" required></div><div class="field full"><label for="invoice-terms">Payment terms / note</label><textarea id="invoice-terms" name="terms" maxlength="500" placeholder="Payment instructions or additional terms"></textarea></div><div class="field full invoice-form-hint">Seller: <strong>' + esc(state.user.agencyName || state.user.name) + '</strong> · ' + esc(state.user.agencyState || "Set your agency state in Agency details") + ' · GSTIN ' + esc(state.user.gstin || "not added") + '</div><div class="field full"><div id="form-error" class="form-error" role="alert"></div></div></form>';
  modal("Create invoice", "Prepare a numbered Indian-format service invoice. It starts as a draft until you issue it.", body, "Seller details are copied from Agency details and saved on the invoice.");
  $("#invoice-deal").addEventListener("change", (event) => {
    const selected = state.deals.find((item) => item.id === event.target.value); if (!selected) return;
    $("#invoice-client").value = selected.clientName; $("#invoice-phone").value = selected.clientPhone || "";
    $("#invoice-rate").value = selected.commissionAmount || "";
    const property = propertyById(selected.propertyId); if (property) $("#invoice-description").value = "Brokerage services · " + property.title;
  });
  $("#active-form").addEventListener("submit", async (event) => {
    event.preventDefault(); const form = event.currentTarget; if (!form.reportValidity()) return;
    const data = new FormData(form); const button = $(".modal-footer [type=submit]"); button.disabled = true; button.textContent = "Preparing…";
    try {
      const result = await request("/api/invoices", { method: "POST", body: { dealId: data.get("dealId") || null, clientName: data.get("clientName"), clientPhone: data.get("clientPhone"), clientAddress: data.get("clientAddress"), clientState: data.get("clientState"), clientGstin: data.get("clientGstin"), description: data.get("description"), sacCode: data.get("sacCode"), quantity: Number(data.get("quantity")), unitAmount: Number(data.get("unitAmount")), taxRate: Number(data.get("taxRate")), invoiceDate: data.get("invoiceDate"), dueDate: data.get("dueDate"), terms: data.get("terms") } });
      $("#modal-root").innerHTML = ""; await refreshWorkspace(); showInvoice(result.item.id); notify("Draft invoice " + result.item.invoiceNo + " created.");
    } catch (error) { $("#form-error").textContent = error.message; button.disabled = false; button.textContent = "Save"; }
  });
}
function numberWords(value) {
  const n = Math.floor(Number(value) || 0);
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const small = (x) => x < 20 ? ones[x] : tens[Math.floor(x / 10)] + (x % 10 ? " " + ones[x % 10] : "");
  const underThousand = (x) => (x >= 100 ? ones[Math.floor(x / 100)] + " Hundred" + (x % 100 ? " " : "") : "") + (x % 100 ? small(x % 100) : "");
  if (!n) return "Zero";
  let rest = n; const parts = [];
  [[10000000,"Crore"],[100000,"Lakh"],[1000,"Thousand"],[1,""]].forEach(([unit,label]) => { const count = Math.floor(rest / unit); rest %= unit; if (count) parts.push(underThousand(count) + (label ? " " + label : "")); });
  return parts.join(" ");
}
function invoicePaper(invoice) {
  const localTax = invoice.taxType === "cgst_sgst";
  const taxLines = localTax ? '<div><span>CGST (' + esc(invoice.taxRate / 2) + '%)</span><strong>' + esc(exactMoney(invoice.cgst)) + '</strong></div><div><span>SGST (' + esc(invoice.taxRate / 2) + '%)</span><strong>' + esc(exactMoney(invoice.sgst)) + '</strong></div>' : invoice.igst ? '<div><span>IGST (' + esc(invoice.taxRate) + '%)</span><strong>' + esc(exactMoney(invoice.igst)) + '</strong></div>' : '';
  return '<article class="invoice-paper" id="invoice-print"><div class="invoice-topline"><div><div class="invoice-brand">terra<span>.</span></div><small>PROPERTY MANAGEMENT</small></div><div class="invoice-title"><span>TAX INVOICE</span><strong>' + esc(invoice.invoiceNo) + '</strong><small class="status-badge invoice-status ' + invoiceStatusClass(invoice.status) + '">' + esc(invoice.status) + '</small></div></div><div class="invoice-party-grid"><section><span class="invoice-label">FROM</span><h3>' + esc(invoice.sellerName) + '</h3><p>' + esc(invoice.sellerAddress || "Address not provided") + '</p><p>State: ' + esc(invoice.sellerState || "—") + '</p><p>GSTIN: ' + esc(invoice.sellerGstin || "Not registered / not provided") + '</p><p>Mobile: ' + esc(invoice.sellerPhone || "—") + '</p></section><section><span class="invoice-label">BILL TO</span><h3>' + esc(invoice.clientName) + '</h3><p>' + esc(invoice.clientAddress || "Address not provided") + '</p><p>State: ' + esc(invoice.clientState) + '</p><p>GSTIN: ' + esc(invoice.clientGstin || "Not provided") + '</p><p>Mobile: ' + esc(invoice.clientPhone || "—") + '</p></section></div><div class="invoice-meta"><div><small>Invoice date</small><strong>' + esc(dateText(invoice.invoiceDate)) + '</strong></div><div><small>Due date</small><strong>' + esc(dateText(invoice.dueDate)) + '</strong></div><div><small>Place of supply</small><strong>' + esc(invoice.clientState) + '</strong></div><div><small>Reference</small><strong>' + esc(invoice.dealId ? "Linked deal" : "—") + '</strong></div></div><table class="invoice-lines"><thead><tr><th>Description of service</th><th>SAC</th><th>Qty</th><th>Rate</th><th>Taxable value</th></tr></thead><tbody><tr><td>' + esc(invoice.description) + '</td><td>' + esc(invoice.sacCode || "—") + '</td><td>' + esc(invoice.quantity) + '</td><td>' + esc(exactMoney(invoice.unitAmount)) + '</td><td>' + esc(exactMoney(invoice.taxableAmount)) + '</td></tr></tbody></table><div class="invoice-bottom"><div class="invoice-words"><small>AMOUNT IN WORDS</small><p>Indian Rupees ' + esc(numberWords(invoice.total)) + ' only</p><small>' + esc(invoice.terms || "Thank you for your business.") + '</small></div><div class="invoice-totals"><div><span>Taxable value</span><strong>' + esc(exactMoney(invoice.taxableAmount)) + '</strong></div>' + taxLines + '<div class="invoice-grand"><span>Total invoice value</span><strong>' + esc(exactMoney(invoice.total)) + '</strong></div><div><span>Amount received</span><strong>' + esc(exactMoney(invoice.paidAmount)) + '</strong></div><div class="invoice-balance"><span>Balance due</span><strong>' + esc(exactMoney(invoice.balance)) + '</strong></div></div></div><div class="invoice-footer"><span>Computer-generated invoice · Thank you for your business.</span><span>' + esc(invoice.sellerName) + '</span></div></article>';
}
async function showInvoice(id) {
  try {
    const result = await request("/api/invoices/" + encodeURIComponent(id));
    const invoice = result.item;
    const actions = '<div class="invoice-toolbar"><button class="button button-secondary button-small" data-action="print-invoice" data-id="' + esc(id) + '">Print / Save PDF</button>' + (invoice.status === "Draft" ? '<button class="button button-primary button-small" data-action="issue-invoice" data-id="' + esc(id) + '">Issue invoice</button>' : invoice.balance > 0 && invoice.status !== "Void" ? '<button class="button button-primary button-small" data-action="record-payment" data-id="' + esc(id) + '">Record payment</button>' : "") + '</div>';
    modal("Invoice " + esc(invoice.invoiceNo), "Review the invoice, then print it or save it as a PDF from your browser.", actions + invoicePaper(invoice), "Invoice details and payment records are saved in this workspace.");
  } catch (error) { notify(error.message); }
}
function openPaymentForm(invoiceId) {
  const invoice = state.invoices.find((item) => item.id === invoiceId);
  if (!invoice || invoice.balance <= 0) { notify("This invoice has no outstanding balance."); return; }
  const today = dateInputValue(new Date());
  const body = '<form id="active-form" class="form-grid"><div class="field full payment-balance-box"><span>Balance due</span><strong>' + esc(money(invoice.balance)) + '</strong></div><div class="field"><label for="payment-amount">Amount received (₹)</label><input id="payment-amount" name="amount" type="number" min="1" max="' + esc(invoice.balance) + '" step="1" required value="' + esc(invoice.balance) + '"></div><div class="field"><label for="payment-method">Method</label><select id="payment-method" name="method">' + ["UPI", "Bank transfer", "Cash", "Card", "Cheque", "Other"].map((method) => '<option>' + esc(method) + '</option>').join("") + '</select></div><div class="field"><label for="payment-date">Payment date</label><input id="payment-date" name="paidOn" type="date" value="' + today + '" required></div><div class="field"><label for="payment-reference">Reference (optional)</label><input id="payment-reference" name="reference" maxlength="80" placeholder="UPI / bank reference"></div><div class="field full"><div id="form-error" class="form-error" role="alert"></div></div></form>';
  modal("Record a payment", "Log a received payment against " + invoice.invoiceNo + ".", body, "This updates the amount received and remaining balance.");
  $("#active-form").addEventListener("submit", async (event) => {
    event.preventDefault(); const form = event.currentTarget; if (!form.reportValidity()) return;
    const data = new FormData(form); const button = $(".modal-footer [type=submit]"); button.disabled = true; button.textContent = "Saving…";
    try {
      await request("/api/invoices/" + encodeURIComponent(invoiceId) + "/payments", { method: "POST", body: { amount: Number(data.get("amount")), paidOn: data.get("paidOn"), method: data.get("method"), reference: data.get("reference") } });
      $("#modal-root").innerHTML = ""; await refreshWorkspace(); await showInvoice(invoiceId); notify("Payment recorded.");
    } catch (error) { $("#form-error").textContent = error.message; button.disabled = false; button.textContent = "Save"; }
  });
}
function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const scale = Math.min(1, 1280 / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale)); canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (!blob || blob.size > 950000) { resolve(canvas.toDataURL("image/jpeg", .58)); return; }
          const encoded = new FileReader(); encoded.onerror = reject; encoded.onload = () => resolve(encoded.result); encoded.readAsDataURL(blob);
        }, "image/jpeg", .72);
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
function openAccountForm() {
  const states = ['<option value="">Select state / UT</option>'].concat(INDIAN_STATES.map((item) => '<option ' + (state.user.agencyState === item ? "selected" : "") + '>' + esc(item) + '</option>')).join("");
  const body = '<form id="active-form" class="form-grid"><div class="field full"><label for="account-name">Workspace owner name</label><input id="account-name" name="name" value="' + esc(state.user.name) + '" required minlength="2" maxlength="80"><span class="field-hint">Use this same name on the entry screen to reopen this saved workspace.</span></div><div class="field"><label for="account-agency">Agency / billing name</label><input id="account-agency" name="agencyName" value="' + esc(state.user.agencyName) + '" maxlength="120" placeholder="Optional registered business name"></div><div class="field"><label for="account-phone">Mobile number</label><input id="account-phone" name="phone" type="tel" inputmode="tel" value="' + esc(state.user.phone) + '" placeholder="+91 98765 43210"><span class="field-hint">Used as the default listing and invoice contact.</span></div><div class="field full"><label for="account-address">Agency billing address</label><textarea id="account-address" name="address" maxlength="300" placeholder="Address to show on invoices">' + esc(state.user.address) + '</textarea></div><div class="field"><label for="account-state">Business state / UT</label><select id="account-state" name="agencyState">' + states + '</select></div><div class="field"><label for="account-gstin">Agency GSTIN</label><input id="account-gstin" name="gstin" value="' + esc(state.user.gstin) + '" maxlength="15" autocapitalize="characters" placeholder="Optional 15-character GSTIN"></div><div class="field full"><div id="form-error" class="form-error" role="alert"></div></div></form>';
  modal("Agency and billing details", "Add the contact and tax details used on listings and invoices.", body, "GST rate, registration and SAC should be confirmed with your accountant.");
  $("#active-form").addEventListener("submit", async (event) => {
    event.preventDefault(); const data = new FormData(event.currentTarget); const button = $(".modal-footer [type=submit]"); button.disabled = true; button.textContent = "Saving…";
    try {
      const result = await request("/api/me", { method: "PATCH", body: { name: data.get("name"), phone: data.get("phone"), agencyName: data.get("agencyName"), address: data.get("address"), agencyState: data.get("agencyState"), gstin: String(data.get("gstin") || "").toUpperCase() } });
      state.user = result.user; rememberName(state.user.name); $("#workspace-name").textContent = state.user.agencyName || state.user.name; $("#workspace-mobile").textContent = state.user.phone || "Workspace account"; $("#workspace-initial").textContent = initials(state.user.agencyName || state.user.name);
      $("#modal-root").innerHTML = ""; await refreshWorkspace(); notify("Account details updated.");
    } catch (error) { $("#form-error").textContent = error.message; button.disabled = false; button.textContent = "Save"; }
  });
}
function showProperty(id) {
  const property = propertyById(id); if (!property) return;
  const photo = property.image ? '<img class="drawer-image" src="' + esc(property.image) + '" alt="' + esc(property.title) + '">' : '<div class="drawer-image"></div>';
  $("#drawer-root").innerHTML = '<aside class="drawer" role="dialog" aria-modal="true" aria-label="Property details"><div class="drawer-image-wrap">' + photo + '<button class="close-button" data-action="close-drawer" aria-label="Close">' + icon("close") + '</button></div><div class="drawer-content"><div>' + statusBadge(property.status) + '</div><h2>' + esc(property.title) + '</h2><div class="drawer-location">' + esc(property.locality + ", " + property.city + " · " + cityInfo(property.city).state) + '</div><div class="drawer-price">' + esc(money(property.price, property.intent)) + '<small>' + (property.intent === "rent" ? "monthly" : "asking price") + '</small></div><div class="drawer-facts"><div><small>Type</small><strong>' + esc(categoryText(property.category)) + '</strong></div><div><small>Area</small><strong>' + formatNumber.format(property.area) + ' sq ft</strong></div><div><small>Contact mobile</small><strong>' + esc(property.contactPhone) + '</strong></div></div><div class="drawer-section-title">Property details</div><div class="drawer-copy">' + esc(property.description || "No description added.") + '</div><div class="contact-card"><span><strong>Listing contact</strong><small>' + esc(state.user.name) + '</small></span><a class="button button-secondary button-small" href="tel:' + esc(property.contactPhone) + '">' + icon("phone") + ' Call</a></div><div class="drawer-actions"><button class="button button-primary" data-action="add-lead-for-property" data-id="' + esc(property.id) + '">' + icon("plus") + ' Add enquiry</button><button class="button button-secondary" data-action="edit-property" data-id="' + esc(property.id) + '">' + icon("edit") + ' Edit</button></div><div class="drawer-actions"><button class="button button-secondary" data-action="toggle-property" data-id="' + esc(property.id) + '">' + (property.status === "Paused" ? "Publish listing" : "Pause listing") + '</button><button class="button button-danger" data-action="delete-property" data-id="' + esc(property.id) + '">' + icon("trash") + ' Delete</button></div></div></aside>';
}

function exportCsv(kind) {
  const leads = kind === "leads";
  const deals = kind === "deals";
  const invoices = kind === "invoices";
  const header = leads ? ["Name", "Mobile", "Property", "Request", "Status", "Received"] : deals ? ["Client", "Mobile", "Property", "Deal value INR", "Commission rate", "Commission INR", "Stage", "Expected close"] : invoices ? ["Invoice", "Invoice date", "Due date", "Client", "Taxable INR", "Tax INR", "Total INR", "Paid INR", "Balance INR", "Status"] : ["Title", "Type", "Goal", "Locality", "City", "Price INR", "Area sqft", "Status", "Contact mobile"];
  const rows = leads ? state.leads.map((lead) => [lead.name, lead.phone, propertyById(lead.property_id)?.title || "", lead.intent, lead.status, dateText(lead.created_at)]) : deals ? state.deals.map((deal) => [deal.clientName, deal.clientPhone, propertyById(deal.propertyId)?.title || "", deal.amount, deal.commissionRate, deal.commissionAmount, deal.stage, deal.expectedClose]) : invoices ? state.invoices.map((invoice) => [invoice.invoiceNo, invoice.invoiceDate, invoice.dueDate, invoice.clientName, invoice.taxableAmount, invoice.cgst + invoice.sgst + invoice.igst, invoice.total, invoice.paidAmount, invoice.balance, invoice.status]) : state.properties.map((property) => [property.title, categoryText(property.category), property.intent, property.locality, property.city, property.price, property.area, property.status, property.contactPhone]);
  const csv = [header].concat(rows).map((row) => row.map((value) => '"' + String(value == null ? "" : value).replace(/"/g, '""') + '"').join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a"); anchor.href = url; anchor.download = "terra-" + kind + "-" + new Date().toISOString().slice(0, 10) + ".csv"; anchor.click(); URL.revokeObjectURL(url);
  notify(({ leads: "Enquiries", deals: "Deals", invoices: "Invoices", properties: "Properties" })[kind] + " exported as CSV.");
}
async function handleAction(action, id) {
  if (action === "add-property") { state.pinCoords = null; state.pinCity = null; state.selectedImage = ""; openPropertyForm(null, false); }
  if (action === "add-map-plot") { if (!state.pinCoords) { state.pinCity = state.mapCity === "India" ? CITIES[0].name : state.mapCity; state.pinCoords = cityInfo(state.pinCity); } state.selectedImage = ""; openPropertyForm(null, true); }
  if (action === "view-property") showProperty(id);
  if (action === "edit-property") { $("#drawer-root").innerHTML = ""; state.selectedImage = ""; openPropertyForm(propertyById(id), false); }
  if (action === "add-lead") openLeadForm("");
  if (action === "add-lead-for-property") { $("#drawer-root").innerHTML = ""; openLeadForm(id); }
  if (action === "add-deal") openDealForm("");
  if (action === "deal-from-lead") openDealForm(id);
  if (action === "new-invoice") openInvoiceForm("");
  if (action === "invoice-from-deal") openInvoiceForm(id);
  if (action === "view-invoice") await showInvoice(id);
  if (action === "print-invoice") window.print();
  if (action === "record-payment") { $("#modal-root").innerHTML = ""; openPaymentForm(id); }
  if (action === "issue-invoice") {
    try { await request("/api/invoices/" + encodeURIComponent(id), { method: "PATCH", body: { status: "Issued" } }); await refreshWorkspace(); notify("Invoice issued."); if (state.page !== "billing") await showInvoice(id); }
    catch (error) { notify(error.message); }
  }
  if (action === "delete-deal") {
    const deal = state.deals.find((item) => item.id === id); if (!deal || !window.confirm("Remove the deal for " + deal.clientName + "?")) return;
    try { await request("/api/deals/" + encodeURIComponent(id), { method: "DELETE" }); await refreshWorkspace(); notify("Deal removed."); }
    catch (error) { notify(error.message); }
  }
  if (action === "account") openAccountForm();
  if (action === "close-modal") $("#modal-root").innerHTML = "";
  if (action === "close-drawer") $("#drawer-root").innerHTML = "";
  if (action === "export-leads") exportCsv("leads");
  if (action === "export-properties") exportCsv("properties");
  if (action === "export-deals") exportCsv("deals");
  if (action === "export-invoices") exportCsv("invoices");
  if (action === "toggle-property") {
    const property = propertyById(id); if (!property) return;
    try {
      await request("/api/properties/" + encodeURIComponent(id), { method: "PUT", body: Object.assign({}, property, { status: property.status === "Paused" ? "Published" : "Paused" }) });
      $("#drawer-root").innerHTML = ""; await refreshWorkspace(); notify("Property status updated.");
    } catch (error) { notify(error.message); }
  }
  if (action === "delete-property") {
    const property = propertyById(id); if (!property || !window.confirm("Delete “" + property.title + "” from this account?")) return;
    try { await request("/api/properties/" + encodeURIComponent(id), { method: "DELETE" }); $("#drawer-root").innerHTML = ""; await refreshWorkspace(); notify("Property deleted."); }
    catch (error) { notify(error.message); }
  }
  if (action === "logout") {
    try { await request("/api/auth/logout", { method: "POST" }); } catch (error) { console.warn(error); }
    state.user = null; state.properties = []; state.leads = []; $("#drawer-root").innerHTML = ""; $("#modal-root").innerHTML = ""; renderAuth("login");
  }
}

document.addEventListener("click", (event) => {
  const page = event.target.closest("[data-page]");
  if (page) { event.preventDefault(); navigate(page.dataset.page); return; }
  const mode = event.target.closest("[data-auth-mode]");
  if (mode) { renderAuth(mode.dataset.authMode); return; }
  const mapType = event.target.closest("[data-map-type]");
  if (mapType && state.page === "map") { state.mapPlots = mapType.dataset.mapType === "plots"; $$('[data-map-type]').forEach((button) => button.classList.toggle("active", button === mapType)); updateMarkers(); return; }
  const filter = event.target.closest("[data-lead-filter]");
  if (filter) { state.leadStatus = filter.dataset.leadFilter; renderPage("leads"); return; }
  const action = event.target.closest("[data-action]");
  if (action) { event.preventDefault(); handleAction(action.dataset.action, action.dataset.id || ""); return; }
  if (event.target.classList.contains("modal-root")) event.target.innerHTML = "";
  if (event.target.classList.contains("drawer-root")) event.target.innerHTML = "";
});
document.addEventListener("input", (event) => {
  if (event.target.id === "global-search") {
    state.propertyQuery = event.target.value;
    if (state.page !== "properties") navigate("properties"); else renderPage("properties");
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") { $("#modal-root").innerHTML = ""; $("#drawer-root").innerHTML = ""; }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); $("#global-search").focus(); }
});

start();
