/* VAYUMED catalogue, detail pages, lead gate and Google Sheets integration. */
const GOOGLE_SHEETS_WEB_APP_URL = ""; // Add your deployed Apps Script Web App URL before launch.
const PHONE = "+919989271777";
const products = [
  {
    id: "oxygen-concentrator",
    title: "Oxygen Concentrators",
    category: "Oxygen Therapy",
    desc: "Oxygen concentrator options for home-care requirements. Confirm flow-rate availability and suitability with your healthcare professional.",
    variants: ["5 LPM oxygen concentrator", "10 LPM oxygen concentrator"],
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1100&q=85",
    keywords: "oxygen concentrator 5 lpm 10 lpm",
    seo: "Oxygen Concentrators for Rental & Purchase | VAYUMED",
  },
  {
    id: "oxygen-cylinders",
    title: "Oxygen Cylinders",
    category: "Oxygen Therapy",
    desc: "Cylinder options for respiratory support requirements, subject to availability and applicable safety guidance.",
    variants: ["B Type oxygen cylinder", "Jumbo oxygen cylinder"],
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1100&q=85",
    keywords: "B type oxygen cylinder jumbo cylinder",
    seo: "Oxygen Cylinders – B Type & Jumbo | VAYUMED",
  },
  {
    id: "wheelchairs",
    title: "Wheelchairs",
    category: "Mobility & Home Care",
    desc: "Mobility support options for home use. Ask us about available models, features and rental or purchase options.",
    variants: ["Wheelchairs – enquire for available models"],
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1100&q=85",
    keywords: "wheelchair rental purchase",
    seo: "Wheelchairs for Rental & Purchase | VAYUMED",
  },
  {
    id: "beds",
    title: "Hospital Beds",
    category: "Beds & Patient Care",
    desc: "Hospital bed options for home-care settings. Available configuration and delivery should be confirmed with our team.",
    variants: [
      "2-function manual bed",
      "3-function electric bed",
      "5-function electric bed",
    ],
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1100&q=85",
    keywords:
      "hospital bed 2 function manual 3 function electric 5 function electric rental",
    seo: "Hospital Beds – Manual & Electric | VAYUMED",
  },
  {
    id: "suction-machines",
    title: "Suction Machines",
    category: "Respiratory Care",
    desc: "Suction machine options for appropriate care settings. Please confirm the required configuration with your care provider.",
    variants: ["Single-jar suction machine", "Double-jar suction machine"],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1100&q=85",
    keywords: "single jar double jar suction machine",
    seo: "Suction Machines – Single & Double Jar | VAYUMED",
  },
  {
    id: "bpap",
    title: "BiPAP Machines",
    category: "Sleep & Respiratory Care",
    desc: "BiPAP machine options from the brands listed below, subject to availability. Device selection and settings must be guided by a qualified clinician.",
    variants: ["ResMed BiPAP", "Philips BiPAP", "Oxymed BiPAP", "BMC BiPAP"],
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1100&q=85",
    keywords: "BiPAP ResMed Philips Oxymed BMC rental",
    seo: "BiPAP Machines – ResMed, Philips, Oxymed & BMC | VAYUMED",
  },
  {
    id: "cpap",
    title: "CPAP Machines",
    category: "Sleep & Respiratory Care",
    desc: "CPAP machine options for sleep therapy enquiries. Please consult your healthcare professional for assessment and device recommendations.",
    variants: ["ResMed CPAP", "Philips CPAP"],
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1100&q=85",
    keywords: "CPAP ResMed Philips rental",
    seo: "CPAP Machines – ResMed & Philips | VAYUMED",
  },
  {
    id: "dvt-machine",
    title: "DVT Compression Machines",
    category: "Recovery & Compression",
    desc: "DVT compression equipment enquiries for suitable clinical or home-care use. Confirm prescribed use and sizing with your care team.",
    variants: ["DVT compression machine – enquire for availability"],
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1100&q=85",
    keywords: "DVT compression machine rental",
    seo: "DVT Compression Machines | VAYUMED",
  },
  {
    id: "syringe-pumps",
    title: "Syringe Pumps",
    category: "Clinical Equipment",
    desc: "Syringe pump availability for clinical requirements. Operation and use must be managed by appropriately trained professionals.",
    variants: ["Syringe pump – enquire for available models"],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1100&q=85",
    keywords: "syringe pump medical equipment rental",
    seo: "Syringe Pumps | VAYUMED Medical Equipment",
  },
  {
    id: "monitors",
    title: "Patient Monitors",
    category: "Monitoring Equipment",
    desc: "Patient monitor options for relevant care environments. Ask about available parameters and configuration before ordering.",
    variants: ["3-parameter patient monitor", "5-parameter patient monitor"],
    image:
      "https://images.unsplash.com/photo-1580281657527-47f249e8f9f1?auto=format&fit=crop&w=1100&q=85",
    keywords: "3 para 5 para patient monitor rental",
    seo: "Patient Monitors – 3 & 5 Parameter | VAYUMED",
  },
  {
    id: "abpm-machine",
    title: "ABPM Machines",
    category: "Monitoring Equipment",
    desc: "Ambulatory blood pressure monitoring equipment enquiries. Monitoring and interpretation should follow a clinician’s instructions.",
    variants: [
      "ABPM (Ambulatory Blood Pressure Monitor) – enquire for availability",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1100&q=85",
    keywords: "ABPM ambulatory blood pressure monitor",
    seo: "ABPM Machines | VAYUMED Medical Equipment",
  },
];
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const verified = () => sessionStorage.getItem("vayumedLeadVerified") === "true";
const gate = $("#leadGate");
let afterGate = null;
function showGate(next) {
  afterGate = next || null;
  gate?.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  setTimeout(() => $("#leadName")?.focus(), 80);
}
function hideGate() {
  gate?.classList.add("hidden");
  document.body.style.overflow = "";
}
function toast(message) {
  const t = $("#toast");
  if (!t) return;
  t.textContent = message;
  t.classList.remove("hidden");
  setTimeout(() => t.classList.add("hidden"), 4200);
}
function safeText(value) {
  return String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function card(p) {
  return `<article class="tile-card"><a href="product.html?id=${encodeURIComponent(p.id)}" class="product-card-link protected-link" aria-label="View ${safeText(p.title)} details"><div class="tile-image"><img src="${p.image}" alt="${safeText(p.title)} medical equipment" loading="lazy"></div><div class="tile-body"><span class="tile-category">${safeText(p.category.toUpperCase())}</span><h3>${safeText(p.title)}</h3><p>${safeText(p.variants.slice(0, 3).join(" · "))}</p><span class="tile-link">View details →</span></div></a></article>`;
}
function renderTiles() {
  const home = $("#homeTiles"),
    grid = $("#equipmentTiles");
  if (home) home.innerHTML = products.slice(0, 8).map(card).join("");
  if (grid) grid.innerHTML = products.map(card).join("");
  const search = $("#categorySearch");
  if (search && grid)
    search.addEventListener("input", () => {
      const q = search.value.toLowerCase().trim();
      grid.innerHTML =
        products
          .filter((p) =>
            (p.title + " " + p.category + " " + p.variants.join(" "))
              .toLowerCase()
              .includes(q),
          )
          .map(card)
          .join("") || "<p>No matching equipment. Try another search.</p>";
      applyGate();
    });
}
function renderDetail() {
  const root = $("#productDetail");
  if (!root) return;
  const id = new URLSearchParams(location.search).get("id");
  const p = products.find((x) => x.id === id);
  if (!p) {
    root.innerHTML =
      '<div class="detail-copy"><p class="eyebrow">VAYUMED EQUIPMENT</p><h1>Explore our equipment catalogue</h1><p class="detail-desc">Choose a category to view product details.</p><a class="btn btn-primary" href="equipment.html">Browse equipment</a></div>';
    return;
  }
  document.title = p.seo + " | VAYUMED";
  const meta = $('meta[name="description"]');
  if (meta) meta.content = p.desc;
  const crumb = $("#detailCrumb");
  if (crumb) crumb.textContent = p.title;
  root.innerHTML = `<div><img class="detail-photo" src="${p.image}" alt="${safeText(p.title)}" width="900" height="650"><p class="detail-note">Image is illustrative. Actual product appearance, brand and availability may vary.</p></div><div class="detail-copy"><p class="eyebrow">${safeText(p.category.toUpperCase())}</p><h1>${safeText(p.title)}</h1><p class="detail-desc">${safeText(p.desc)}</p><h2>Available types / brands</h2><div class="variant-list">${p.variants.map((v) => `<div class="variant">${safeText(v)}</div>`).join("")}</div><h2>Enquire about rental or purchase</h2><p class="detail-desc">Contact VAYUMED to confirm current availability, rental terms, price and delivery options.</p><div class="detail-actions"><button class="btn btn-primary" id="rentalEnquiry">Enquire for rental</button><button class="btn btn-outline-dark" id="salesEnquiry">Enquire to buy</button><a class="btn btn-outline-dark" href="tel:${PHONE}">Call us</a></div><p class="detail-note">Medical disclaimer: this page is for general equipment information, not medical advice. Consult a qualified healthcare professional about equipment suitability.</p></div>`;
  $("#rentalEnquiry")?.addEventListener("click", () => enquire(p, "Rental"));
  $("#salesEnquiry")?.addEventListener("click", () => enquire(p, "Purchase"));
}
function enquire(p, type) {
  if (!verified()) {
    showGate(() => enquire(p, type));
    return;
  }
  const text = `Hello VAYUMED, I would like to enquire about ${p.title} (${type}). Please share availability and details.`;
  location.href = `https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(text)}`;
}
function applyGate() {
  const unlocked = verified();
  $$(".protected-content").forEach((el) =>
    el.classList.toggle("locked", !unlocked),
  );
  $("#homeGateHint")?.classList.toggle(
    "visible",
    !unlocked && !!$("#homeTiles"),
  );
  $("#equipmentGateHint")?.classList.toggle(
    "visible",
    !unlocked && !!$("#equipmentTiles"),
  );
  $("#detailGateHint")?.classList.toggle(
    "visible",
    !unlocked && !!$("#productDetail"),
  );
  $$(".protected-link").forEach((a) => {
    a.addEventListener(
      "click",
      (e) => {
        if (!verified()) {
          e.preventDefault();
          showGate(() => {
            if (a.href) location.href = a.href;
          });
        }
      },
      { once: true },
    );
  });
}
function wireGate() {
  $$(".open-gate").forEach((b) =>
    b.addEventListener("click", (e) => {
      if (!verified()) {
        e.preventDefault();
        showGate();
      }
    }),
  );
  $("#closeGate")?.addEventListener("click", hideGate);
  gate?.addEventListener("click", (e) => {
    if (e.target === gate) hideGate();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !gate?.classList.contains("hidden")) hideGate();
  });
  $("#leadForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.currentTarget,
      fd = new FormData(form),
      name = String(fd.get("name") || "").trim(),
      mobile = String(fd.get("mobile") || "").replace(/\D/g, ""),
      email = String(fd.get("email") || "").trim(),
      interest = String(fd.get("interest") || "");
    const err = $("#leadError");
    err.textContent = "";
    if (name.length < 2) {
      err.textContent = "Please enter your full name.";
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      err.textContent = "Please enter a valid 10-digit Indian mobile number.";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err.textContent = "Please enter a valid email address.";
      return;
    }
    const lead = {
      timestamp: new Date().toISOString(),
      name,
      mobile,
      email,
      interest,
      source: "VAYUMED website",
      page: location.pathname + location.search,
    };
    if (GOOGLE_SHEETS_WEB_APP_URL) {
      try {
        await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(lead),
        });
      } catch (ex) {
        console.error("Lead submission error", ex);
      }
    } else {
      console.info(
        "Google Sheets URL is not configured. Lead captured for demo only:",
        lead,
      );
    }
    sessionStorage.setItem("vayumedLeadVerified", "true");
    sessionStorage.setItem("vayumedLeadName", name);
    hideGate();
    form.reset();
    renderTiles();
    applyGate();
    toast(`Thank you, ${name}. Equipment catalogue unlocked.`);
    if (afterGate) {
      const callback = afterGate;
      afterGate = null;
      setTimeout(callback, 100);
    }
  });
}
function init() {
  renderTiles();
  renderDetail();
  wireGate();
  $("#year") && ($("#year").textContent = new Date().getFullYear());
  const menu = $("#menuToggle"),
    nav = $("#mainNav");
  menu?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });
  applyGate();
  if (!verified() && location.pathname.endsWith("product.html")) showGate();
  if (!verified() && location.pathname.endsWith("equipment.html")) showGate();
}
document.addEventListener("DOMContentLoaded", init);
