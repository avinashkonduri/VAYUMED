const GOOGLE_SHEETS_WEB_APP_URL = "";
const gate = document.getElementById("gate");
const form = document.getElementById("leadForm");
const grid = document.getElementById("productGrid");
const lockPanel = document.getElementById("equipmentLock");
const toast = document.getElementById("toast");
const errorBox = document.getElementById("formError");
let verified = sessionStorage.getItem("vayumedLeadVerified") === "true";

function unlock() {
  verified = true;
  sessionStorage.setItem("vayumedLeadVerified", "true");
  document.body.classList.add("lead-verified");
  grid.classList.remove("locked");
  if (lockPanel) lockPanel.classList.add("hidden-lock");
}

function openGate() {
  if (verified) {
    document.querySelector("#equipment").scrollIntoView({ behavior: "smooth" });
    return;
  }
  gate.classList.remove("hidden");
  gate.classList.add("flex");
  setTimeout(
    () => document.querySelector('#leadForm input[name="name"]')?.focus(),
    100,
  );
}

function closeGate() {
  gate.classList.add("hidden");
  gate.classList.remove("flex");
}
function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}
function clearError() {
  errorBox.textContent = "";
  errorBox.classList.add("hidden");
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 3500);
}

document
  .querySelectorAll("[data-open-gate]")
  .forEach((b) => b.addEventListener("click", openGate));
document.querySelectorAll("[data-gated]").forEach((a) =>
  a.addEventListener("click", (e) => {
    if (!verified) {
      e.preventDefault();
      openGate();
    }
  }),
);
document.getElementById("closeGate").addEventListener("click", closeGate);
document
  .getElementById("menuBtn")
  .addEventListener("click", () =>
    document.getElementById("mobileMenu").classList.toggle("hidden"),
  );

gate.addEventListener("click", (e) => {
  if (e.target === gate) closeGate();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !gate.classList.contains("hidden")) closeGate();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError();
  const data = Object.fromEntries(new FormData(form));
  const name = (data.name || "").trim();
  const mobile = (data.mobile || "").replace(/\D/g, "");
  const email = (data.email || "").trim();
  if (name.length < 2) return showError("Please enter your full name.");
  if (!/^[6-9]\d{9}$/.test(mobile))
    return showError("Please enter a valid 10-digit Indian mobile number.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return showError("Please enter a valid email address.");

  const lead = {
    timestamp: new Date().toISOString(),
    name,
    mobile,
    email,
    equipment: data.equipment || "",
    source: "VAYUMED Website",
    page: location.pathname,
  };
  if (GOOGLE_SHEETS_WEB_APP_URL) {
    try {
      await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      console.warn("Lead sync failed", err);
    }
  } else {
    console.info(
      "Google Sheets Web App URL not configured. Lead captured locally for testing:",
      lead,
    );
  }

  sessionStorage.setItem("vayumedLeadName", name);
  unlock();
  closeGate();
  form.reset();
  showToast(`Thank you, ${name}. Equipment details are now unlocked.`);
  setTimeout(
    () =>
      document
        .querySelector("#equipment")
        .scrollIntoView({ behavior: "smooth" }),
    200,
  );
});

if (verified) unlock();

const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((x) => observer.observe(x));
