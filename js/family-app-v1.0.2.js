const FAMILY_PORTAL_VERSION = "1.0.1";
const cfg = window.SAMARA_FAMILY_CONFIG || {};
const supabaseClient =
  window.supabase && cfg.supabaseUrl && cfg.supabasePublishableKey
    ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabasePublishableKey)
    : null;

const loginScreen = document.querySelector("#login-screen");
const portalScreen = document.querySelector("#portal-screen");
const sidebar = document.querySelector(".sidebar");
const pageTitle = document.querySelector("#page-title");

function initials(name) {
  return String(name || "Family Member")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join("") || "FM";
}

function formatDateIN(value) {
  if (!value) return "—";
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function applyFamilySession(session) {
  if (!session) return;
  const name = session.patient_name || "Resident";
  const room = [session.room_no, session.bed_no].filter(Boolean).join(" · Bed ");
  const summary = [session.patient_code, room ? `Room ${room}` : null].filter(Boolean).join(" · ");

  const residentName = document.querySelector("#resident-name");
  const residentSummary = document.querySelector("#resident-summary");
  const residentContact = document.querySelector("#resident-contact");
  const familyName = document.querySelector("#family-name");
  const familyRelationship = document.querySelector("#family-relationship");
  const familyAvatar = document.querySelector("#family-avatar");
  const residentPhoto = document.querySelector(".resident-photo");

  if (residentName) residentName.textContent = name;
  if (residentSummary) residentSummary.textContent = summary || "Resident";
  if (residentContact) {
    const admitted = session.admission_date ? `Admitted on ${formatDateIN(session.admission_date)} · ` : "";
    residentContact.textContent = `${admitted}Authorised family: ${session.relative_name || "Family Member"}`;
  }
  if (familyName) familyName.textContent = session.relative_name || "Family Member";
  if (familyRelationship) familyRelationship.textContent = session.relationship || "Authorised Relative";
  if (familyAvatar) familyAvatar.textContent = initials(session.relative_name);
  if (residentPhoto) residentPhoto.textContent = initials(name);
}

function openPortal(session) {
  if (session) {
    sessionStorage.setItem("samara_family_session", JSON.stringify(session));
    applyFamilySession(session);
  } else {
    try {
      applyFamilySession(JSON.parse(sessionStorage.getItem("samara_family_session") || "null"));
    } catch (_) {}
  }
  loginScreen.classList.add("hidden");
  portalScreen.classList.remove("hidden");
}

function closePortal() {
  portalScreen.classList.add("hidden");
  loginScreen.classList.remove("hidden");
  sessionStorage.removeItem("samara_family_session");
}

document.querySelector("#login-form")?.addEventListener("submit", async event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const status = document.querySelector("#login-status");
  const submit = event.currentTarget.querySelector('button[type="submit"]');

  const patientId = String(form.get("patient_id") || "").trim().toUpperCase();
  const pin = String(form.get("pin") || "").trim();

  if (!patientId) {
    status.textContent = "Please enter the Patient ID.";
    return;
  }
  if (!/^\d{6}$/.test(pin)) {
    status.textContent = "Please enter the 6-digit Access PIN.";
    return;
  }
  if (!supabaseClient) {
    status.textContent = "Family Portal connection is not available. Please contact Samara.";
    return;
  }

  submit.disabled = true;
  status.textContent = "Checking secure family access…";

  try {
    const { data, error } = await supabaseClient.rpc("family_portal_login_by_patient", {
      p_patient_id: patientId,
      p_pin: pin
    });
    if (error) throw error;

    const row = Array.isArray(data) ? data[0] : data;
    if (!row) {
      status.textContent = "Patient ID or Access PIN is incorrect, or Family Portal access is disabled.";
      return;
    }

    const session = {
      access_id: row.access_id,
      patient_uuid: row.patient_uuid,
      patient_code: row.patient_code,
      patient_name: row.patient_name,
      room_no: row.room_no,
      bed_no: row.bed_no,
      admission_date: row.admission_date,
      relative_name: row.relative_name,
      relationship: row.relationship
    };

    status.textContent = "Login successful. Opening secure family portal…";
    setTimeout(() => openPortal(session), 250);
  } catch (err) {
    console.error("Family Portal login failed", err);
    status.textContent = "Unable to sign in right now. Please contact Samara if the problem continues.";
  } finally {
    submit.disabled = false;
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
    alert("Family portal refreshed.");
  }, 650);
});

document.querySelector("#visit-request-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const status = event.currentTarget.querySelector(".form-status");
  const requestId = `VIS-${Date.now().toString().slice(-6)}`;
  status.textContent = `Visit request ${requestId} prepared. Live ERP submission will be enabled separately.`;
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
  status.textContent = "Message prepared. Secure ERP delivery will be enabled separately.";
});

try {
  const savedSession = JSON.parse(sessionStorage.getItem("samara_family_session") || "null");
  if (savedSession?.patient_uuid) openPortal(savedSession);
} catch (_) {
  sessionStorage.removeItem("samara_family_session");
}

console.info(`Samara Family Portal ${FAMILY_PORTAL_VERSION}`);
