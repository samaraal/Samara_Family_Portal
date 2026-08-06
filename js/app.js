const FAMILY_PORTAL_VERSION = "1.0.0";
const DEMO_CREDENTIALS = {
  patient_id: "PAT-2026-08-0002",
  mobile: "9841235577",
  pin: "123456"
};

const loginScreen = document.querySelector("#login-screen");
const portalScreen = document.querySelector("#portal-screen");
const sidebar = document.querySelector(".sidebar");
const pageTitle = document.querySelector("#page-title");

function openPortal() {
  loginScreen.classList.add("hidden");
  portalScreen.classList.remove("hidden");
  sessionStorage.setItem("samara_family_demo_session", "active");
}

function closePortal() {
  portalScreen.classList.add("hidden");
  loginScreen.classList.remove("hidden");
  sessionStorage.removeItem("samara_family_demo_session");
}

document.querySelector("#login-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const status = document.querySelector("#login-status");

  const patientId = String(form.get("patient_id") || "").trim().toUpperCase();
  const mobile = String(form.get("mobile") || "").trim();
  const pin = String(form.get("pin") || "").trim();

  if (
    patientId === DEMO_CREDENTIALS.patient_id &&
    mobile === DEMO_CREDENTIALS.mobile &&
    pin === DEMO_CREDENTIALS.pin
  ) {
    status.textContent = "Login successful. Opening secure family portal…";
    setTimeout(openPortal, 300);
  } else {
    status.textContent = "Demo credentials do not match. Please use the details shown below.";
  }
});

document.querySelector("#signout-button")?.addEventListener("click", closePortal);

document.querySelector("#mobile-menu")?.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

function showView(name) {
  document.querySelectorAll(".view").forEach(view => view.classList.remove("active"));
  document.querySelector(`#view-${name}`)?.classList.add("active");

  document.querySelectorAll(".side-nav button").forEach(button => {
    button.classList.toggle("active", button.dataset.view === name);
  });

  const activeButton = document.querySelector(`.side-nav button[data-view="${name}"]`);
  pageTitle.textContent = activeButton?.textContent.trim() || "Family Portal";
  sidebar.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".side-nav button[data-view]").forEach(button => {
  button.addEventListener("click", () => showView(button.dataset.view));
});

document.querySelectorAll("[data-open-view]").forEach(button => {
  button.addEventListener("click", () => showView(button.dataset.openView));
});

document.querySelector("#refresh-button")?.addEventListener("click", event => {
  const original = event.currentTarget.textContent;
  event.currentTarget.textContent = "Refreshing…";
  setTimeout(() => {
    event.currentTarget.textContent = original;
    alert("Family portal data refreshed. Demo information is unchanged.");
  }, 650);
});

document.querySelector("#visit-request-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const status = event.currentTarget.querySelector(".form-status");
  const requestId = `VIS-${Date.now().toString().slice(-6)}`;
  status.textContent = `Visit request ${requestId} prepared successfully. ERP integration will submit it directly in the next phase.`;
});

document.querySelector("#message-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const message = String(form.get("message") || "").trim();
  const status = event.currentTarget.querySelector(".form-status");

  if (!message) return;

  const thread = document.querySelector(".message-thread");
  const wrapper = document.createElement("div");
  wrapper.className = "message sent";
  wrapper.innerHTML = `<b>You</b><small>Just now</small><p></p>`;
  wrapper.querySelector("p").textContent = message;
  thread.appendChild(wrapper);

  event.currentTarget.reset();
  status.textContent = "Message added in demo mode. Secure ERP delivery will be enabled during integration.";
});

if (sessionStorage.getItem("samara_family_demo_session") === "active") {
  openPortal();
}

console.info(`Samara Family Portal ${FAMILY_PORTAL_VERSION}`);
