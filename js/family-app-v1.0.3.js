const FAMILY_PORTAL_VERSION = "1.0.3";
const cfg = window.SAMARA_FAMILY_CONFIG || {};
const supabaseClient = window.supabase && cfg.supabaseUrl && cfg.supabasePublishableKey
  ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabasePublishableKey) : null;

const loginScreen = document.querySelector("#login-screen");
const portalScreen = document.querySelector("#portal-screen");
const sidebar = document.querySelector(".sidebar");
const pageTitle = document.querySelector("#page-title");
let familySession = null;
let refreshTimer = null;

const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const money = value => `₹${Number(value || 0).toLocaleString('en-IN',{maximumFractionDigits:2})}`;
function initials(name){return String(name||'Family Member').trim().split(/\s+/).slice(0,2).map(x=>x[0]?.toUpperCase()||'').join('')||'FM';}
function dateIN(value){if(!value)return '—';const d=new Date(value.length===10?`${value}T00:00:00`:value);return Number.isNaN(d.getTime())?String(value):d.toLocaleDateString('en-IN',{day:'2-digit',month:'2-digit',year:'numeric'});}
function timeIN(value){if(!value)return '—';const d=new Date(value);return Number.isNaN(d.getTime())?'—':d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true});}
function dateTimeIN(value){if(!value)return '—';return `${dateIN(value)} ${timeIN(value)}`;}
function todayISO(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function isToday(value){if(!value)return false;const d=new Date(value);return !Number.isNaN(d.getTime()) && dateIN(value)===dateIN(new Date().toISOString());}

function clearStaticDemo(){
  const cond=document.querySelector('#condition-card'); if(cond)cond.innerHTML='<span>Current Condition</span><strong>Loading…</strong><small>Reading latest ERP information</small>';
  const metrics=document.querySelector('#overview-metrics'); if(metrics)metrics.innerHTML='<article class="metric-card"><span>Medicines Today</span><strong>—</strong><small>Loading live data</small></article><article class="metric-card"><span>Daily Care</span><strong>—</strong><small>Loading live data</small></article><article class="metric-card"><span>Latest Vitals</span><strong>—</strong><small>Loading live data</small></article><article class="metric-card"><span>Outstanding</span><strong>—</strong><small>Loading live data</small></article>';
  const timeline=document.querySelector('#overview-timeline'); if(timeline)timeline.innerHTML='<div class="pending"><span>—</span><p><b>Loading current care information…</b><small>Please wait</small></p></div>';
  const update=document.querySelector('#latest-update'); if(update)update.innerHTML='<div><b>Loading latest update…</b><small>Reading ERP records</small></div>';
  ['care-body','medicines-body','vitals-body','billing-body'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML='<tr><td colspan="8">Loading live ERP data…</td></tr>';});
  const vg=document.querySelector('#vital-grid');if(vg)vg.innerHTML='<article><span>Latest Vitals</span><strong>Loading…</strong><small>ERP data</small></article>';
  const pp=document.querySelector('#physio-plan');if(pp)pp.innerHTML='<h3>Current Plan</h3><p>Loading live ERP data…</p>';
  const pg=document.querySelector('#physio-progress');if(pg)pg.innerHTML='<h3>Latest Progress Note</h3><p>Loading live ERP data…</p>';
  const bm=document.querySelector('#billing-metrics');if(bm)bm.innerHTML='<article class="metric-card"><span>Total Charges</span><strong>—</strong></article><article class="metric-card"><span>Payments</span><strong>—</strong></article><article class="metric-card"><span>Outstanding</span><strong>—</strong></article>';
  const dg=document.querySelector('#documents-grid');if(dg)dg.innerHTML='<article><span>▤</span><div><b>Loading documents…</b><small>ERP data</small></div></article>';
}
clearStaticDemo();

function applyFamilySession(s){
  if(!s)return; const name=s.patient_name||'Resident'; const room=[s.room_no,s.bed_no].filter(Boolean).join(' · Bed ');
  const summary=[s.patient_code,room?`Room ${room}`:null].filter(Boolean).join(' · ');
  const set=(id,text)=>{const e=document.querySelector(id);if(e)e.textContent=text;};
  set('#resident-name',name);set('#resident-summary',summary||'Resident');
  set('#resident-contact',`${s.admission_date?`Admitted on ${dateIN(s.admission_date)} · `:''}Authorised family: ${s.relative_name||'Family Member'}`);
  set('#family-name',s.relative_name||'Family Member');set('#family-relationship',s.relationship||'Authorised Relative');set('#family-avatar',initials(s.relative_name));
  const photo=document.querySelector('.resident-photo');if(photo)photo.textContent=initials(name);
}

function emptyRow(cols,text){return `<tr><td colspan="${cols}">${esc(text)}</td></tr>`;}
function medStatusFor(order, mar){
  const logs=mar.filter(x=>x.order_id===order.id); if(!logs.length)return 'No administration recorded today';
  const given=logs.filter(x=>['given','administered','completed'].includes(String(x.status||'').toLowerCase())).length;
  return `${given}/${logs.length} recorded`;
}
function billingSummary(rows){let charges=0,payments=0,discounts=0,refunds=0;for(const x of rows){const a=Number(x.amount||0);const t=String(x.transaction_type||'').toLowerCase();if(t==='charge')charges+=a;else if(t==='payment')payments+=a;else if(t==='discount')discounts+=a;else if(t==='refund')refunds+=a;}return{charges,payments,discounts,refunds,outstanding:charges-payments-discounts+refunds};}

function buildTimeline(data){
  const events=[];
  (data.care_logs||[]).forEach(x=>events.push({at:x.completed_at||x.created_at,title:`${x.care_type||'Daily care'} — ${x.status||'Recorded'}`,note:x.remarks||x.shift||''}));
  (data.medication_administrations||[]).forEach(x=>events.push({at:x.administered_at||x.created_at,title:`Medicine: ${x.medicine_name||'Medication'} — ${x.status||'Recorded'}`,note:x.scheduled_time?`Scheduled ${x.scheduled_time}`:(x.remarks||'')}));
  (data.vitals||[]).forEach(x=>{const bits=[];if(x.systolic!=null||x.diastolic!=null)bits.push(`BP ${x.systolic??'—'}/${x.diastolic??'—'}`);if(x.pulse!=null)bits.push(`Pulse ${x.pulse}`);if(x.spo2!=null)bits.push(`SpO₂ ${x.spo2}%`);if(x.blood_sugar!=null)bits.push(`${x.blood_sugar_type||'Sugar'} ${x.blood_sugar}`);events.push({at:x.recorded_at,title:'Vitals recorded',note:bits.join(' · ')||x.remarks||'Observation recorded'});});
  (data.physio_sessions||[]).forEach(x=>events.push({at:x.session_at||x.created_at,title:`Physiotherapy — ${x.status||'Recorded'}`,note:x.notes||x.physiotherapist_name||''}));
  (data.meals||[]).forEach(x=>events.push({at:x.served_at,title:`${x.meal_type||'Meal'} — ${x.consumption_status||'Recorded'}`,note:[x.menu,x.remarks].filter(Boolean).join(' · ')}));
  return events.filter(x=>x.at).sort((a,b)=>new Date(b.at)-new Date(a.at));
}

function renderDashboard(data){
  if(!data)return;
  const p=data.patient||{}; if(familySession){familySession={...familySession,patient_name:p.patient_name||familySession.patient_name,room_no:p.room_no||familySession.room_no,bed_no:p.bed_no||familySession.bed_no,admission_date:p.admission_date||familySession.admission_date};applyFamilySession(familySession);sessionStorage.setItem('samara_family_session',JSON.stringify(familySession));}
  const orders=data.medication_orders||[], mar=data.medication_administrations||[], careOrders=data.care_orders||[], careLogs=data.care_logs||[], vitals=data.vitals||[], billing=data.billing||[];
  const today=todayISO();
  const activeOrders=orders.filter(x=>x.is_active!==false && (!x.start_date||x.start_date<=today) && (!x.end_date||x.end_date>=today));
  const scheduled=activeOrders.reduce((n,x)=>n+(Array.isArray(x.scheduled_times)?x.scheduled_times.length:0),0);
  const given=mar.filter(x=>['given','administered','completed'].includes(String(x.status||'').toLowerCase())).length;
  const completedCare=careLogs.filter(x=>String(x.status||'').toLowerCase()==='completed').length;
  const latest=vitals[0]||{}; const bill=billingSummary(billing);
  const bp=(latest.systolic!=null||latest.diastolic!=null)?`${latest.systolic??'—'}/${latest.diastolic??'—'}`:'—/—';
  const vitalSmall=latest.recorded_at?`${latest.blood_sugar!=null?`${latest.blood_sugar_type||'Sugar'} ${latest.blood_sugar} · `:''}Recorded ${timeIN(latest.recorded_at)}`:'No vital signs recorded';
  const metrics=document.querySelector('#overview-metrics');if(metrics)metrics.innerHTML=`<article class="metric-card"><span>Medicines Today</span><strong>${given} / ${scheduled||activeOrders.length}</strong><small>${activeOrders.length?`${activeOrders.length} active medicine order${activeOrders.length===1?'':'s'}`:'No active medicine orders'}</small></article><article class="metric-card"><span>Daily Care</span><strong>${completedCare} / ${careOrders.filter(x=>x.is_active!==false).length}</strong><small>${careOrders.length?'Today\'s recorded care':'No care plan recorded'}</small></article><article class="metric-card"><span>Latest BP</span><strong>${esc(bp)}</strong><small>${esc(vitalSmall)}</small></article><article class="metric-card"><span>Outstanding</span><strong>${money(bill.outstanding)}</strong><small>Based on ERP ledger</small></article>`;
  const cond=document.querySelector('#condition-card');if(cond){const level=String(latest.alert_level||'').toLowerCase();const condition=!vitals.length?'No recent vitals':(['critical','high','abnormal'].some(x=>level.includes(x))?'Requires review':'Stable');cond.innerHTML=`<span>Current Condition</span><strong>${esc(condition)}</strong><small>${latest.recorded_at?`Last vitals ${dateTimeIN(latest.recorded_at)}`:'No recent vital-sign entry'}</small>`;}
  const timeline=buildTimeline(data);const ot=document.querySelector('#overview-timeline');if(ot)ot.innerHTML=timeline.length?timeline.slice(0,6).map(x=>`<div class="done"><span>${esc(timeIN(x.at))}</span><p><b>${esc(x.title)}</b><small>${esc(x.note||'')}</small></p></div>`).join(''):'<div class="pending"><span>—</span><p><b>No care updates recorded yet</b><small>New ERP entries will appear here after refresh.</small></p></div>';
  const lu=document.querySelector('#latest-update');if(lu){const x=timeline[0];lu.innerHTML=x?`<span class="avatar small">SC</span><div><b>Latest ERP Update</b><small>${esc(dateTimeIN(x.at))}</small><p>${esc(x.title)}${x.note?` — ${esc(x.note)}`:''}</p></div>`:'<div><b>No updates recorded yet</b><small>Updates will appear from the Samara ERP.</small></div>';}

  const cb=document.querySelector('#care-body');if(cb)cb.innerHTML=careOrders.length?careOrders.map(o=>{const log=careLogs.find(l=>l.care_order_id===o.id);return `<tr><td>${esc(o.care_type||'Care')}</td><td>${esc(o.shift||'—')}</td><td><span class="status ${log&&String(log.status).toLowerCase()==='completed'?'done':'pending'}">${esc(log?.status||'Pending')}</span></td><td>${esc(log?.completed_at?timeIN(log.completed_at):'—')}</td><td>${esc(log?.remarks||o.instruction||'—')}</td></tr>`;}).join(''):emptyRow(5,'No care plan has been recorded for this resident.');
  const mb=document.querySelector('#medicines-body');if(mb)mb.innerHTML=activeOrders.length?activeOrders.map(o=>`<tr><td>${esc(o.medicine_name||'—')}</td><td>${esc(o.strength||'—')}</td><td>${esc(o.frequency||'—')}</td><td>${esc((o.scheduled_times||[]).join(', ')||'—')}</td><td>${esc(o.food_instruction||'—')}</td><td><span class="status">${esc(medStatusFor(o,mar))}</span></td></tr>`).join(''):emptyRow(6,'No active medicine orders.');

  const vg=document.querySelector('#vital-grid');if(vg)vg.innerHTML=`<article><span>Blood Pressure</span><strong>${esc(bp)}</strong><small>${latest.alert_level||'—'}</small></article><article><span>Pulse</span><strong>${latest.pulse!=null?`${latest.pulse} bpm`:'—'}</strong><small>${latest.recorded_at?timeIN(latest.recorded_at):'Not recorded'}</small></article><article><span>SpO₂</span><strong>${latest.spo2!=null?`${latest.spo2}%`:'—'}</strong><small>${latest.recorded_at?dateIN(latest.recorded_at):'Not recorded'}</small></article><article><span>${esc(latest.blood_sugar_type||'Blood Sugar')}</span><strong>${latest.blood_sugar!=null?esc(latest.blood_sugar):'—'}</strong><small>${latest.remarks?esc(latest.remarks):'Latest ERP value'}</small></article>`;
  const vb=document.querySelector('#vitals-body');if(vb)vb.innerHTML=vitals.length?vitals.map(v=>`<tr><td>${esc(dateTimeIN(v.recorded_at))}</td><td>${v.systolic!=null||v.diastolic!=null?`${v.systolic??'—'}/${v.diastolic??'—'}`:'—/—'}</td><td>${v.pulse??'—'}</td><td>${v.spo2!=null?`${v.spo2}%`:'—'}</td><td>${v.temperature!=null?`${v.temperature}°F`:'—'}</td><td>${esc(v.recorded_by_name||'Samara staff')}</td></tr>`).join(''):emptyRow(6,'No vital signs recorded.');

  const plan=(data.physio_plans||[])[0]; const sess=(data.physio_sessions||[])[0];
  const pp=document.querySelector('#physio-plan');if(pp)pp.innerHTML=plan?`<h3>Current Plan</h3><div class="detail-grid"><div><span>Therapy Type</span><b>${esc(plan.therapy_type||'—')}</b></div><div><span>Frequency</span><b>${esc(plan.frequency||'—')}</b></div><div><span>Preferred Time</span><b>${esc(plan.preferred_time||'—')}</b></div><div><span>Physiotherapist</span><b>${esc(plan.physiotherapist_name||'—')}</b></div></div>`:'<h3>Current Plan</h3><p>No active physiotherapy plan recorded.</p>';
  const pg=document.querySelector('#physio-progress');if(pg)pg.innerHTML=sess?`<h3>Latest Progress Note</h3><p><b>${esc(dateIN(sess.session_date))} · ${esc(sess.status||'Recorded')}</b><br>${esc(sess.notes||'No notes recorded.')}</p>`:'<h3>Latest Progress Note</h3><p>No physiotherapy sessions recorded.</p>';

  const bm=document.querySelector('#billing-metrics');if(bm)bm.innerHTML=`<article class="metric-card"><span>Total Charges</span><strong>${money(bill.charges)}</strong><small>ERP ledger</small></article><article class="metric-card"><span>Payments</span><strong>${money(bill.payments)}</strong><small>Received</small></article><article class="metric-card"><span>Outstanding</span><strong>${money(bill.outstanding)}</strong><small>Current balance</small></article>`;
  const bb=document.querySelector('#billing-body');if(bb)bb.innerHTML=billing.length?billing.map(x=>`<tr><td>${esc(dateIN(x.transaction_date))}</td><td>—</td><td>${esc([x.category,x.description].filter(Boolean).join(' · ')||'Transaction')}</td><td>${String(x.transaction_type).toLowerCase()==='charge'?money(x.amount):'—'}</td><td>${String(x.transaction_type).toLowerCase()==='payment'?money(x.amount):'—'}</td><td>${esc(x.payment_mode||'—')}</td></tr>`).join(''):emptyRow(6,'No billing transactions recorded.');

  const docs=data.documents||[]; const dg=document.querySelector('#documents-grid');if(dg)dg.innerHTML=docs.length?docs.map(x=>`<article><span>▤</span><div><b>${esc(x.document_type||'Document')}</b><small>${esc(x.document_name||'File')} · ${esc(dateIN(x.created_at))}</small></div></article>`).join(''):'<article><span>▤</span><div><b>No documents available</b><small>No family-visible document metadata recorded.</small></div></article>';
}

async function loadDashboard(showStatus=false){
  if(!familySession?.session_token||!supabaseClient)return false;
  const btn=document.querySelector('#refresh-button');const old=btn?.textContent;if(btn&&showStatus)btn.textContent='Refreshing…';
  try{
    const {data,error}=await supabaseClient.rpc('family_portal_dashboard',{p_session_token:familySession.session_token});
    if(error)throw error; if(!data)throw new Error('Family Portal session expired or access disabled.');
    renderDashboard(data); if(btn&&showStatus)btn.textContent='✓ Updated'; setTimeout(()=>{if(btn)btn.textContent=old||'↻ Refresh';},1200); return true;
  }catch(err){console.error('Family dashboard load failed',err);if(btn)btn.textContent=old||'↻ Refresh';return false;}
}
function openPortal(session){familySession=session||familySession;if(familySession){sessionStorage.setItem('samara_family_session',JSON.stringify(familySession));applyFamilySession(familySession);}loginScreen.classList.add('hidden');portalScreen.classList.remove('hidden');clearInterval(refreshTimer);refreshTimer=setInterval(()=>loadDashboard(false),30000);}
function closePortal(){portalScreen.classList.add('hidden');loginScreen.classList.remove('hidden');sessionStorage.removeItem('samara_family_session');familySession=null;clearInterval(refreshTimer);refreshTimer=null;}

document.querySelector('#login-form')?.addEventListener('submit',async event=>{
  event.preventDefault();const form=new FormData(event.currentTarget);const status=document.querySelector('#login-status');const submit=event.currentTarget.querySelector('button[type="submit"]');
  const patientId=String(form.get('patient_id')||'').trim().toUpperCase();const pin=String(form.get('pin')||'').trim();
  if(!patientId){status.textContent='Please enter the Patient ID.';return;}if(!/^\d{6}$/.test(pin)){status.textContent='Please enter the 6-digit Access PIN.';return;}if(!supabaseClient){status.textContent='Family Portal connection is unavailable. Please contact Samara.';return;}
  submit.disabled=true;status.textContent='Checking secure family access…';
  try{const {data,error}=await supabaseClient.rpc('family_portal_login_by_patient',{p_patient_id:patientId,p_pin:pin});if(error)throw error;const row=Array.isArray(data)?data[0]:data;if(!row){status.textContent='Patient ID or Access PIN is incorrect, or Family Portal access is disabled.';return;}
    familySession={access_id:row.access_id,patient_uuid:row.patient_uuid,patient_code:row.patient_code,patient_name:row.patient_name,room_no:row.room_no,bed_no:row.bed_no,admission_date:row.admission_date,relative_name:row.relative_name,relationship:row.relationship,session_token:row.session_token};
    const {data:dashboard,error:dashError}=await supabaseClient.rpc('family_portal_dashboard',{p_session_token:familySession.session_token});if(dashError)throw dashError;if(!dashboard)throw new Error('Unable to read the resident record.');
    openPortal(familySession);renderDashboard(dashboard);status.textContent='';
  }catch(err){console.error(err);status.textContent='Unable to load the resident information. Please contact Samara if the problem continues.';}finally{submit.disabled=false;}
});
document.querySelector('#signout-button')?.addEventListener('click',closePortal);
document.querySelector('#mobile-menu')?.addEventListener('click',()=>sidebar.classList.toggle('open'));
function showView(name){document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));document.querySelector(`#view-${name}`)?.classList.add('active');document.querySelectorAll('.side-nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===name));const active=document.querySelector(`.side-nav button[data-view="${name}"]`);pageTitle.textContent=active?.textContent.trim()||'Family Portal';sidebar.classList.remove('open');window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('.side-nav button[data-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));
document.querySelectorAll('[data-open-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.openView)));
document.querySelector('#refresh-button')?.addEventListener('click',()=>loadDashboard(true));
// Visit requests and Messages remain intentionally non-live until their ERP workflow is separately approved.
document.querySelector('#visit-request-form')?.addEventListener('submit',event=>{event.preventDefault();const s=event.currentTarget.querySelector('.form-status');s.textContent='Visit-request submission to ERP is not yet enabled. Please contact Samara directly.';});
document.querySelector('#message-form')?.addEventListener('submit',event=>{event.preventDefault();const s=event.currentTarget.querySelector('.form-status');s.textContent='Secure messaging to ERP is not yet enabled. Please contact Samara directly.';});
try{const saved=JSON.parse(sessionStorage.getItem('samara_family_session')||'null');if(saved?.session_token){familySession=saved;openPortal(saved);loadDashboard(false).then(ok=>{if(!ok)closePortal();});}}catch(_){sessionStorage.removeItem('samara_family_session');}
console.info(`Samara Family Portal ${FAMILY_PORTAL_VERSION}`);
