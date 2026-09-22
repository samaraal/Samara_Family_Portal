const FAMILY_PORTAL_VERSION = "1.0.10";


const SAMARA_INVITATION_END = new Date(2026, 8, 1, 0, 0, 0); // Visible through 31-Aug-2026; stops from 01-Sep-2026.
const SAMARA_INVITATION_SESSION_KEY = 'samara_inauguration_invitation_27aug2026';

function showSamaraInaugurationInvitation(){
  try{
    if(new Date() >= SAMARA_INVITATION_END)return;
    if(sessionStorage.getItem(SAMARA_INVITATION_SESSION_KEY)==='shown')return;
    if(document.getElementById('samara-inauguration-modal'))return;
    if(!document.body)return;

    sessionStorage.setItem(SAMARA_INVITATION_SESSION_KEY,'shown');

    if(!document.getElementById('samara-inauguration-style')){
      const style=document.createElement('style');
      style.id='samara-inauguration-style';
      style.textContent=`
        #samara-inauguration-modal{
          position:fixed;inset:0;z-index:2147483500;
          display:flex;align-items:center;justify-content:center;
          padding:max(12px,env(safe-area-inset-top)) 12px max(12px,env(safe-area-inset-bottom));
          background:rgba(38,16,29,.78);
          backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
          animation:samaraInviteFade .28s ease both;
        }
        #samara-inauguration-modal .samara-invite-card{
          position:relative;display:flex;align-items:center;justify-content:center;
          width:min(94vw,780px);height:min(92vh,1080px);
          border-radius:18px;overflow:hidden;background:#fff;
          box-shadow:0 28px 80px rgba(0,0,0,.38);
          animation:samaraInviteRise .35s ease both;
        }
        #samara-inauguration-modal img{
          display:block;max-width:100%;max-height:100%;
          width:auto;height:auto;object-fit:contain;background:#fff;
        }
        #samara-inauguration-modal .samara-invite-close{
          position:absolute;top:10px;right:10px;z-index:2;
          min-width:46px;height:46px;padding:0 13px;border:0;border-radius:999px;
          display:flex;align-items:center;justify-content:center;
          background:rgba(255,255,255,.96);color:#7a1247;
          box-shadow:0 5px 20px rgba(40,10,28,.22);
          font:800 28px/1 Arial,sans-serif;cursor:pointer;
          opacity:0;visibility:hidden;transform:scale(.88);
          transition:.2s ease;
        }
        #samara-inauguration-modal .samara-invite-close.ready{
          opacity:1;visibility:visible;transform:scale(1);
        }
        #samara-inauguration-modal .samara-invite-close:focus-visible{
          outline:3px solid #f08ab9;outline-offset:3px;
        }
        @keyframes samaraInviteFade{from{opacity:0}to{opacity:1}}
        @keyframes samaraInviteRise{from{opacity:0;transform:translateY(12px) scale(.985)}to{opacity:1;transform:none}}
        @media(max-width:600px){
          #samara-inauguration-modal{padding:8px}
          #samara-inauguration-modal .samara-invite-card{
            width:96vw;height:92dvh;border-radius:14px;
          }
          #samara-inauguration-modal .samara-invite-close{
            top:8px;right:8px;min-width:44px;height:44px;font-size:26px;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const modal=document.createElement('div');
    modal.id='samara-inauguration-modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-label','Samara Assisted Living inauguration invitation');

    const card=document.createElement('div');
    card.className='samara-invite-card';

    const image=document.createElement('img');
    image.src='./assets/samara-inauguration-27-08-2026.png';
    image.alt='Invitation to the inauguration of Samara Assisted Living on 27 August 2026, Mogappair, Chennai';
    image.decoding='async';

    const close=document.createElement('button');
    close.type='button';
    close.className='samara-invite-close';
    close.setAttribute('aria-label','Close inauguration invitation');
    close.title='Close';
    close.textContent='×';

    const remove=()=>{
      modal.style.opacity='0';
      modal.style.transition='opacity .18s ease';
      window.setTimeout(()=>modal.remove(),190);
    };

    close.addEventListener('click',remove);
    document.addEventListener('keydown',function escHandler(event){
      if(event.key==='Escape'&&close.classList.contains('ready')){
        document.removeEventListener('keydown',escHandler);
        remove();
      }
    });

    card.append(image,close);
    modal.appendChild(card);
    document.body.appendChild(modal);

    window.setTimeout(()=>{
      if(document.body.contains(close)){
        close.classList.add('ready');
        close.focus({preventScroll:true});
      }
    },4000);
  }catch(error){
    console.warn('Samara inauguration invitation could not be displayed.',error);
  }
}

function initSamaraInaugurationInvitation(){
  window.setTimeout(showSamaraInaugurationInvitation,650);
}

const cfg = window.SAMARA_FAMILY_CONFIG || {};
const supabaseClient = window.supabase && cfg.supabaseUrl && cfg.supabasePublishableKey
  ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabasePublishableKey) : null;

const loginScreen = document.querySelector("#login-screen");
const firstLoginScreen = document.querySelector("#first-login-screen");
const portalScreen = document.querySelector("#portal-screen");
const sidebar = document.querySelector(".sidebar");
const pageTitle = document.querySelector("#page-title");
let familySession = null;
let refreshTimer = null;
let adminPreviewMode = false;

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
  const medicationOrders=data.medication_orders||[];
  const medicationOrderById=new Map(medicationOrders.map(order=>[String(order.id),order]));
  (data.care_logs||[]).forEach(x=>events.push({at:x.completed_at||x.created_at,title:`${x.care_type||'Daily care'} — ${x.status||'Recorded'}`,note:x.remarks||x.shift||''}));
  (data.medication_administrations||[]).forEach(x=>{
    const order=x.order_id!=null?medicationOrderById.get(String(x.order_id)):null;
    const medicineName=String(x.medicine_name||order?.medicine_name||'').trim();
    const strength=String(x.strength||x.dose||order?.strength||order?.dose||'').trim();
    const medicineDetails=[medicineName,strength && !medicineName.toLowerCase().includes(strength.toLowerCase())?strength:''].filter(Boolean).join(' ');
    const status=x.status||'Recorded';
    const scheduled=x.scheduled_time||x.scheduled_at||'';
    const note=[scheduled?`Scheduled ${scheduled}`:'',x.remarks||''].filter(Boolean).join(' · ');
    events.push({at:x.administered_at||x.created_at,title:`Medicine: ${medicineDetails||'Medicine details unavailable'} — ${status}`,note});
  });
  (data.vitals||[]).forEach(x=>{const bits=[];if(x.systolic!=null||x.diastolic!=null)bits.push(`BP ${x.systolic??'—'}/${x.diastolic??'—'}`);if(x.pulse!=null)bits.push(`Pulse ${x.pulse}`);if(x.spo2!=null)bits.push(`SpO₂ ${x.spo2}%`);if(x.blood_sugar!=null)bits.push(`${x.blood_sugar_type||'Sugar'} ${x.blood_sugar}`);events.push({at:x.recorded_at,title:'Vitals recorded',note:bits.join(' · ')||x.remarks||'Observation recorded'});});
  (data.physio_sessions||[]).forEach(x=>events.push({at:x.session_at||x.created_at,title:`Physiotherapy — ${x.status||'Recorded'}`,note:x.notes||x.physiotherapist_name||''}));
  (data.meals||[]).forEach(x=>events.push({at:x.served_at,title:`${x.meal_type||'Meal'} — ${x.consumption_status||'Recorded'}`,note:[x.menu,x.remarks].filter(Boolean).join(' · ')}));
  return events.filter(x=>x.at).sort((a,b)=>new Date(b.at)-new Date(a.at));
}

function renderDashboard(data){
  if(!data)return;
  const p=data.patient||{}; if(familySession){familySession={...familySession,patient_name:p.patient_name||familySession.patient_name,room_no:p.room_no||familySession.room_no,bed_no:p.bed_no||familySession.bed_no,admission_date:p.admission_date||familySession.admission_date};applyFamilySession(familySession);saveFamilySession();}
  const orders=data.medication_orders||[], mar=data.medication_administrations||[], careOrders=data.care_orders||[], careLogs=data.care_logs||[], vitals=data.vitals||[], billing=data.billing||[];
  const today=todayISO();
  const activeOrders=orders.filter(x=>x.is_active!==false && (!x.start_date||x.start_date<=today) && (!x.end_date||x.end_date>=today));
  const scheduled=activeOrders.reduce((n,x)=>n+(Array.isArray(x.scheduled_times)?x.scheduled_times.length:0),0);
  const given=mar.filter(x=>['given','administered','completed'].includes(String(x.status||'').toLowerCase())).length;
  const completedCare=careLogs.filter(x=>String(x.status||'').toLowerCase()==='completed').length;
  const latest=vitals[0]||{}; const bill=billingSummary(billing);
  const bp=(latest.systolic!=null||latest.diastolic!=null)?`${latest.systolic??'—'}/${latest.diastolic??'—'}`:'—/—';
  const vitalSmall=latest.recorded_at?`${latest.blood_sugar!=null?`${latest.blood_sugar_type||'Sugar'} ${latest.blood_sugar} · `:''}Recorded ${timeIN(latest.recorded_at)}`:'No vital signs recorded';
  const activeCareOrders=careOrders.filter(x=>x.is_active!==false);
  const careMetricValue=activeCareOrders.length?`${completedCare} / ${activeCareOrders.length}`:`${completedCare}`;
  const careMetricNote=careLogs.length?`${careLogs.length} care activit${careLogs.length===1?'y':'ies'} recorded today`:(activeCareOrders.length?'No care activity recorded today':'No care plan or activity recorded');
  const metrics=document.querySelector('#overview-metrics');if(metrics)metrics.innerHTML=`<article class="metric-card"><span>Medicines Today</span><strong>${given} / ${scheduled||activeOrders.length}</strong><small>${activeOrders.length?`${activeOrders.length} active medicine order${activeOrders.length===1?'':'s'}`:'No active medicine orders'}</small></article><article class="metric-card"><span>Daily Care</span><strong>${careMetricValue}</strong><small>${careMetricNote}</small></article><article class="metric-card"><span>Latest BP</span><strong>${esc(bp)}</strong><small>${esc(vitalSmall)}</small></article><article class="metric-card"><span>Outstanding</span><strong>${money(bill.outstanding)}</strong><small>Based on ERP ledger</small></article>`;
  const cond=document.querySelector('#condition-card');if(cond){const level=String(latest.alert_level||'').toLowerCase();const condition=!vitals.length?'No recent vitals':(['critical','high','abnormal'].some(x=>level.includes(x))?'Requires review':'Stable');cond.innerHTML=`<span>Current Condition</span><strong>${esc(condition)}</strong><small>${latest.recorded_at?`Last vitals ${dateTimeIN(latest.recorded_at)}`:'No recent vital-sign entry'}</small>`;}
  const timeline=buildTimeline(data);const ot=document.querySelector('#overview-timeline');if(ot)ot.innerHTML=timeline.length?timeline.slice(0,6).map(x=>`<div class="done"><span>${esc(timeIN(x.at))}</span><p><b>${esc(x.title)}</b><small>${esc(x.note||'')}</small></p></div>`).join(''):'<div class="pending"><span>—</span><p><b>No care updates recorded yet</b><small>New ERP entries will appear here after refresh.</small></p></div>';
  const lu=document.querySelector('#latest-update');if(lu){const x=timeline[0];lu.innerHTML=x?`<span class="avatar small">SC</span><div><b>Latest ERP Update</b><small>${esc(dateTimeIN(x.at))}</small><p>${esc(x.title)}${x.note?` — ${esc(x.note)}`:''}</p></div>`:'<div><b>No updates recorded yet</b><small>Updates will appear from the Samara ERP.</small></div>';}

  const cb=document.querySelector('#care-body');
  if(cb){
    const careRows=[];
    const sortedLogs=[...careLogs].sort((a,b)=>new Date(b.completed_at||b.created_at||0)-new Date(a.completed_at||a.created_at||0));
    sortedLogs.forEach(log=>{
      const order=careOrders.find(o=>o.id===log.care_order_id);
      const status=log.status||'Recorded';
      careRows.push(`<tr><td>${esc(log.care_type||order?.care_type||'Daily care')}</td><td>${esc(log.shift||order?.shift||'—')}</td><td><span class="status ${String(status).toLowerCase()==='completed'?'done':'pending'}">${esc(status)}</span></td><td>${esc(log.completed_at?timeIN(log.completed_at):(log.created_at?timeIN(log.created_at):'—'))}</td><td>${esc(log.remarks||order?.instruction||'—')}</td></tr>`);
    });
    activeCareOrders.filter(order=>!careLogs.some(log=>log.care_order_id===order.id)).forEach(order=>{
      careRows.push(`<tr><td>${esc(order.care_type||'Care')}</td><td>${esc(order.shift||'—')}</td><td><span class="status pending">Pending</span></td><td>—</td><td>${esc(order.instruction||'—')}</td></tr>`);
    });
    cb.innerHTML=careRows.length?careRows.join(''):emptyRow(5,'No daily care plan or activity has been recorded for this resident.');
  }
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
    renderDashboard(data); loadDailyMoments(); if(btn&&showStatus)btn.textContent='✓ Updated'; setTimeout(()=>{if(btn)btn.textContent=old||'↻ Refresh';},1200); return true;
  }catch(err){console.error('Family dashboard load failed',err);if(btn)btn.textContent=old||'↻ Refresh';return false;}
}
function saveFamilySession(){
  if(!familySession)return;
  const safe={...familySession};
  delete safe.login_pin;
  sessionStorage.setItem('samara_family_session',JSON.stringify(safe));
}
function openPortal(session){familySession=session||familySession;if(familySession){if(!adminPreviewMode)saveFamilySession();applyFamilySession(familySession);}loginScreen.classList.add('hidden');firstLoginScreen?.classList.add('hidden');portalScreen.classList.remove('hidden');clearInterval(refreshTimer);refreshTimer=adminPreviewMode?null:setInterval(()=>loadDashboard(false),30000);}
function showFirstLoginChange(){
  if(!familySession)return;
  loginScreen.classList.add('hidden');portalScreen.classList.add('hidden');firstLoginScreen?.classList.remove('hidden');clearInterval(refreshTimer);refreshTimer=null;
  const welcome=document.querySelector('#first-login-welcome');if(welcome)welcome.textContent=`Welcome ${familySession.relative_name||'Family Member'}. Please replace the temporary PIN with your own private 6-digit PIN.`;
  document.querySelector('#first-login-form')?.querySelector('input[name="new_pin"]')?.focus();
}
function closePortal(){portalScreen.classList.add('hidden');firstLoginScreen?.classList.add('hidden');loginScreen.classList.remove('hidden');sessionStorage.removeItem('samara_family_session');familySession=null;clearInterval(refreshTimer);refreshTimer=null;}
async function firstLoginRequired(){
  if(!familySession?.session_token||!familySession?.access_id||!supabaseClient)return false;
  try{
    const {data,error}=await supabaseClient.rpc('family_portal_first_login_status',{p_session_token:familySession.session_token,p_access_id:familySession.access_id});
    if(error){console.warn('First-login status check unavailable',error);return false;}
    const row=Array.isArray(data)?data[0]:data;
    return Boolean(row?.must_change_pin);
  }catch(error){console.warn('First-login status check failed',error);return false;}
}


function renderAdminPreviewMoments(rows){
  const grid=document.querySelector('#daily-moments-grid');
  const status=document.querySelector('#daily-moments-status');
  if(!grid)return;
  const moments=Array.isArray(rows)?rows:[];
  if(status)status.textContent='Admin preview uses the same family-visible Daily Moments already loaded in ERP.';
  grid.innerHTML=moments.length?moments.map((row,index)=>`<article class="moment-card"><div class="moment-video-wrap"><video controls playsinline preload="metadata" src="${esc(row.signed_url||'')}" aria-label="Daily Moment ${index+1}"></video></div><div class="moment-copy"><div class="moment-meta"><span>${esc(momentDateLabel(row.created_at))}</span><span>${esc(momentDaysLeft(row.expires_at))}</span></div><h3>${esc(row.caption||'A moment from Samara')}</h3><small>Shared with care by Samara Assisted Living</small></div></article>`).join(''):'<article class="moment-empty"><div class="moment-empty-icon">♥</div><b>No Daily Moments have been shared during the last 7 days.</b></article>';
}
function enableAdminFamilyPreview(previewId){
  adminPreviewMode=true;
  document.body.classList.add('admin-preview-mode');
  const banner=document.createElement('div');banner.id='admin-family-preview-banner';banner.textContent='ADMIN PREVIEW — VIEWING EXACT FAMILY PORTAL · READ ONLY';document.body.prepend(banner);
  const style=document.createElement('style');style.textContent=`#admin-family-preview-banner{position:sticky;top:0;z-index:2147483000;background:#b01264;color:#fff;padding:10px 14px;text-align:center;font:800 13px/1.25 Arial,sans-serif;letter-spacing:.02em}.admin-preview-mode form button[type=submit],.admin-preview-mode form input,.admin-preview-mode form textarea,.admin-preview-mode form select{pointer-events:none!important;opacity:.68}.admin-preview-mode #refresh-button{display:none!important}`;document.head.appendChild(style);
  document.querySelectorAll('form button[type="submit"],form input,form textarea,form select').forEach(el=>{el.disabled=true;});
  const allowedOrigins=['https://app.samaraassistedliving.com','https://samaraassistedliving.com'];
  const receive=event=>{
    if(!allowedOrigins.includes(event.origin))return;
    const d=event.data||{};if(d.type!=='SAMARA_FAMILY_ADMIN_PREVIEW_DATA'||d.preview_id!==previewId)return;
    window.removeEventListener('message',receive);
    const session={...(d.session||{}),session_token:'ADMIN-PREVIEW-NO-FAMILY-SESSION'};
    openPortal(session);renderDashboard(d.dashboard||{});renderAdminPreviewMoments(d.dashboard?.daily_moments||[]);
    const note=document.querySelector('#resident-contact');if(note)note.textContent=`Admin preview · Viewing as ${session.relative_name||'authorised family member'} · No family login or Last Login update`;
  };
  window.addEventListener('message',receive);
  if(window.opener){for(const origin of allowedOrigins){try{window.opener.postMessage({type:'SAMARA_FAMILY_ADMIN_PREVIEW_REQUEST',preview_id:previewId},origin)}catch(_){}}}
  window.setTimeout(()=>{if(loginScreen&&!loginScreen.classList.contains('hidden')){const st=document.querySelector('#login-status');if(st)st.textContent='Unable to load Admin Preview. Please close this tab and open Preview Family Portal again from ERP.';}},5000);
}
const adminPreviewId=new URLSearchParams(window.location.search).get('admin_preview');
if(adminPreviewId)enableAdminFamilyPreview(adminPreviewId);

document.querySelectorAll('[data-password-toggle]').forEach(button=>button.addEventListener('click',()=>{
  const field=button.closest('.password-field')?.querySelector('input');if(!field)return;
  const showing=field.type==='text';field.type=showing?'password':'text';button.classList.toggle('is-visible',!showing);button.textContent=showing?'◉':'◉';button.setAttribute('aria-label',showing?'Show Access PIN':'Hide Access PIN');
}));

document.querySelector('#first-login-signout')?.addEventListener('click',closePortal);
document.querySelector('#first-login-form')?.addEventListener('submit',async event=>{
  event.preventDefault();const form=event.currentTarget,status=document.querySelector('#first-login-status'),button=form.querySelector('button[type="submit"]');
  const fd=new FormData(form),newPin=String(fd.get('new_pin')||'').trim(),confirmPin=String(fd.get('confirm_pin')||'').trim();
  if(!/^\d{6}$/.test(newPin)){status.textContent='Please choose a new 6-digit Access PIN.';return;}
  if(newPin!==confirmPin){status.textContent='The two PINs do not match.';return;}
  if(familySession?.login_pin&&newPin===familySession.login_pin){status.textContent='Please choose a different PIN from the temporary PIN.';return;}
  if(!familySession?.session_token||!familySession?.access_id){status.textContent='Your secure session has expired. Please sign in again.';return;}
  button.disabled=true;status.textContent='Saving your new private PIN…';
  try{
    const {data,error}=await supabaseClient.rpc('family_portal_change_own_pin',{p_session_token:familySession.session_token,p_access_id:familySession.access_id,p_new_pin:newPin});
    if(error)throw error;
    const row=Array.isArray(data)?data[0]:data;if(row===false||row?.success===false)throw new Error(row?.message||'Unable to change PIN.');
    form.reset();sessionStorage.removeItem('samara_family_session');familySession=null;firstLoginScreen?.classList.add('hidden');loginScreen.classList.remove('hidden');
    const loginStatus=document.querySelector('#login-status');if(loginStatus)loginStatus.textContent='✓ New Access PIN saved successfully. Please sign in with your new PIN.';
  }catch(error){console.error(error);status.textContent=error.message||'Unable to save the new PIN. Please try again.';}finally{button.disabled=false;}
});

document.querySelector('#login-form')?.addEventListener('submit',async event=>{
  event.preventDefault();const form=new FormData(event.currentTarget);const status=document.querySelector('#login-status');const submit=event.currentTarget.querySelector('button[type="submit"]');
  const patientId=String(form.get('patient_id')||'').trim().toUpperCase();const pin=String(form.get('pin')||'').trim();
  if(!patientId){status.textContent='Please enter the Patient ID.';return;}if(!/^\d{6}$/.test(pin)){status.textContent='Please enter the 6-digit Access PIN.';return;}if(!supabaseClient){status.textContent='Family Portal connection is unavailable. Please contact Samara.';return;}
  submit.disabled=true;status.textContent='Checking secure family access…';
  try{const {data,error}=await supabaseClient.rpc('family_portal_login_by_patient',{p_patient_id:patientId,p_pin:pin});if(error)throw error;const row=Array.isArray(data)?data[0]:data;if(!row){status.textContent='Patient ID or Access PIN is incorrect, or Family Portal access is disabled.';return;}
    familySession={access_id:row.access_id,patient_uuid:row.patient_uuid,patient_code:row.patient_code,patient_name:row.patient_name,room_no:row.room_no,bed_no:row.bed_no,admission_date:row.admission_date,relative_name:row.relative_name,relationship:row.relationship,session_token:row.session_token,login_pin:pin};
    if(await firstLoginRequired()){status.textContent='';showFirstLoginChange();return;}
    const {data:dashboard,error:dashError}=await supabaseClient.rpc('family_portal_dashboard',{p_session_token:familySession.session_token});if(dashError)throw dashError;if(!dashboard)throw new Error('Unable to read the resident record.');
    openPortal(familySession);renderDashboard(dashboard);status.textContent='';
  }catch(err){console.error(err);status.textContent='Unable to load the resident information. Please contact Samara if the problem continues.';}finally{submit.disabled=false;}
});
document.querySelector('#signout-button')?.addEventListener('click',closePortal);
document.querySelector('#mobile-menu')?.addEventListener('click',()=>sidebar.classList.toggle('open'));
function showView(name){if(name==='feedback')loadFamilyFeedbackHistory();if(name==='visits')loadFamilyVisitHistory();if(name==='messages')loadFamilyMessages();document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));document.querySelector(`#view-${name}`)?.classList.add('active');document.querySelectorAll('.side-nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===name));const active=document.querySelector(`.side-nav button[data-view="${name}"]`);pageTitle.textContent=active?.textContent.trim()||'Family Portal';sidebar.classList.remove('open');window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('.side-nav button[data-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));
document.querySelectorAll('[data-open-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.openView)));
document.querySelector('#refresh-button')?.addEventListener('click',()=>loadDashboard(true));

// Admission enquiries are created only from the public Website or secure Family Portal.
document.querySelector('#family-enquiry-form')?.addEventListener('submit',async event=>{
  event.preventDefault();
  const form=event.currentTarget,status=form.querySelector('.form-status'),button=form.querySelector('button[type="submit"]'),fd=new FormData(form);
  if(!familySession?.session_token||!supabaseClient){status.textContent='Your secure Family Portal session is unavailable. Please sign in again.';return;}
  const ageRaw=String(fd.get('age')||'').trim();
  try{
    button.disabled=true;button.textContent='Sending…';status.textContent='Sending your admission enquiry securely to Samara…';
    const {data,error}=await supabaseClient.rpc('family_submit_admission_enquiry',{
      p_session_token:familySession.session_token,
      p_resident_name:String(fd.get('resident_name')||'').trim(),
      p_age:ageRaw?Number(ageRaw):null,
      p_contact_person:String(fd.get('contact_person')||'').trim(),
      p_mobile:String(fd.get('mobile')||'').trim(),
      p_care_type:String(fd.get('care_type')||'').trim(),
      p_preferred_room:String(fd.get('preferred_room')||'').trim(),
      p_condition:String(fd.get('condition')||'').trim()
    });
    if(error)throw error;
    form.reset();
    status.textContent='✓ Admission enquiry sent successfully. Samara Admin / Manager can now see it in ERP Overview and Enquiries.';
  }catch(err){console.error(err);status.textContent=err.message||'Unable to send admission enquiry.';}
  finally{button.disabled=false;button.textContent='Send Admission Enquiry';}
});
async function loadFamilyVisitHistory(){
 const host=document.querySelector('#family-visit-history');if(!host||!familySession?.session_token)return;
 host.innerHTML='<p>Loading visit requests…</p>';try{const {data,error}=await supabaseClient.rpc('family_list_visit_requests',{p_session_token:familySession.session_token});if(error)throw error;const rows=Array.isArray(data)?data:[];host.innerHTML=rows.length?rows.map(r=>`<div><span class="status ${String(r.status||'Pending').toLowerCase()==='approved'?'done':'pending'}">${esc(r.status||'Pending')}</span><p><b>${esc(formatDateIN(r.visit_date))} · ${esc(r.visit_time||'—')}</b><small>${esc(r.management_remarks||(r.status==='Pending'?'Awaiting manager confirmation':''))}</small></p></div>`).join(''):'<p>No visit requests submitted yet.</p>';}catch(e){host.innerHTML=`<p>${esc(e.message||'Unable to load visit requests.')}</p>`;}
}
document.querySelector('#visit-request-form')?.addEventListener('submit',async event=>{event.preventDefault();const form=event.currentTarget,s=form.querySelector('.form-status'),b=form.querySelector('button[type="submit"]'),fd=new FormData(form);try{b.disabled=true;s.textContent='Sending securely to Samara…';const {error}=await supabaseClient.rpc('family_submit_visit_request',{p_session_token:familySession.session_token,p_visitor_name:String(fd.get('visitor_name')||''),p_visitor_mobile:String(fd.get('visitor_mobile')||''),p_visit_date:String(fd.get('visit_date')||''),p_visit_time:String(fd.get('visit_time')||'Morning'),p_message:String(fd.get('message')||'')});if(error)throw error;s.textContent='✓ Visit request sent to Samara management for confirmation.';form.querySelector('[name="message"]').value='';await loadFamilyVisitHistory();}catch(e){s.textContent=e.message||'Unable to send visit request.';}finally{b.disabled=false;}});
async function loadFamilyMessages(){
 const host=document.querySelector('#family-message-thread');if(!host||!familySession?.session_token)return;host.innerHTML='<p>Loading secure messages…</p>';try{const {data,error}=await supabaseClient.rpc('family_list_messages',{p_session_token:familySession.session_token});if(error)throw error;const rows=Array.isArray(data)?data:[];host.innerHTML=rows.length?rows.map(r=>`<div class="message ${r.direction==='FAMILY_TO_ERP'?'sent':'received'}"><b>${esc(r.direction==='FAMILY_TO_ERP'?'You':(r.sender_name||'Samara Team'))}</b><small>${esc(dateTimeIN(r.created_at))}</small><p>${esc(r.message||'')}</p></div>`).join(''):'<p>No messages yet. You can send a secure message below.</p>';host.scrollTop=host.scrollHeight;}catch(e){host.innerHTML=`<p>${esc(e.message||'Unable to load messages.')}</p>`;}
}
document.querySelector('#message-form')?.addEventListener('submit',async event=>{event.preventDefault();const form=event.currentTarget,s=form.querySelector('.form-status'),b=form.querySelector('button'),text=form.querySelector('textarea');try{b.disabled=true;s.textContent='Sending securely…';const {error}=await supabaseClient.rpc('family_send_message',{p_session_token:familySession.session_token,p_message:text.value});if(error)throw error;text.value='';s.textContent='✓ Message sent securely to Samara.';await loadFamilyMessages();}catch(e){s.textContent=e.message||'Unable to send message.';}finally{b.disabled=false;}});
try{const saved=JSON.parse(sessionStorage.getItem('samara_family_session')||'null');if(saved?.session_token){familySession=saved;(async()=>{if(await firstLoginRequired()){showFirstLoginChange();return;}openPortal(saved);const ok=await loadDashboard(false);if(!ok)closePortal();})();}}catch(_){sessionStorage.removeItem('samara_family_session');}
initSamaraInaugurationInvitation();
console.info(`Samara Family Portal ${FAMILY_PORTAL_VERSION}`);




// Automatic feedback classification — the family member does not choose Positive/Negative.
function samaraFamilyClassifyFeedbackNature({rating,category,subject,message}){
  const r=Number(rating||0);
  const text=`${category||''} ${subject||''} ${message||''}`.toLowerCase();
  let score=0;
  if(r>=5)score+=4; else if(r===4)score+=3; else if(r===2)score-=3; else if(r===1)score-=4;
  const positive=['excellent','very good','great','wonderful','fantastic','superb','happy','satisfied','thank','appreciate','caring','kind','compassion','comfortable','helpful','supportive','professional','clean','compliment','well cared','reassured'];
  const negative=['bad','poor','terrible','worst','unhappy','dissatisfied','complaint','concern','problem','delay','rude','unclean','dirty','missed','not given','not done','no response','unresponsive','overcharge','wrong','disappointed','unsafe'];
  positive.forEach(term=>{if(text.includes(term))score+= term==='excellent'||term==='wonderful'||term==='fantastic'||term==='superb'?3:1});
  negative.forEach(term=>{if(text.includes(term))score-= term==='terrible'||term==='worst'||term==='unsafe'?4:2});
  if(String(category||'').toLowerCase().includes('compliment'))score+=3;
  if(String(category||'').toLowerCase().includes('complaint'))score-=3;
  return score>=0?'Positive':'Negative';
}

// v1.2.0 — Secure Family / Resident Feedback with Management Replies.
async function loadFamilyFeedbackHistory(){
  const host=document.querySelector('#family-feedback-history');
  if(!host)return;
  if(!familySession?.session_token||!supabaseClient){host.innerHTML='<p class="family-feedback-empty">Please sign in to view feedback history.</p>';return;}
  host.innerHTML='<p class="family-feedback-empty">Loading feedback history…</p>';
  try{
    const {data,error}=await supabaseClient.rpc('family_list_feedback',{p_session_token:familySession.session_token});
    if(error)throw error;
    const rows=Array.isArray(data)?data:[];
    host.innerHTML=rows.length?rows.map(row=>`
      <article class="family-feedback-history-item">
        <div class="family-feedback-history-top">
          <div><b>${esc(row.feedback_reference||'Feedback')}</b><small>${esc(dateTimeIN(row.created_at))}</small></div>
          <span class="family-feedback-status">${esc(row.status||'New')}</span>
        </div>
        <div class="family-feedback-meta">${esc(row.feedback_nature||'—')} · ${esc(row.category||'General')}${row.rating?` · ${esc(row.rating)} ★`:''}</div>
        <h4>${esc(row.subject||'Feedback')}</h4>
        <p>${esc(row.message||'—')}</p>
        ${row.admin_reply?`<div class="family-management-reply"><small>Samara Management Response${row.replied_at?` · ${esc(dateTimeIN(row.replied_at))}`:''}</small><p>${esc(row.admin_reply)}</p></div>`:'<div class="family-awaiting-reply">Awaiting management response</div>'}
      </article>`).join(''):'<p class="family-feedback-empty">No feedback submitted yet.</p>';
  }catch(err){console.error(err);host.innerHTML=`<p class="family-feedback-empty">${esc(err.message||'Unable to load feedback history.')}</p>`;}
}

document.querySelector('#family-feedback-refresh')?.addEventListener('click',loadFamilyFeedbackHistory);

document.querySelector('#family-feedback-form')?.addEventListener('submit',async event=>{
  event.preventDefault();
  const form=event.currentTarget,status=form.querySelector('.form-status'),button=form.querySelector('button[type="submit"]');
  const fd=new FormData(form);
  if(!familySession?.session_token||!supabaseClient){status.textContent='Your secure Family Portal session is unavailable. Please sign in again.';return;}
  try{
    button.disabled=true;button.textContent='Submitting…';status.textContent='Saving your feedback securely…';
    const rating=fd.get('rating');
    const {data,error}=await supabaseClient.rpc('family_submit_feedback',{
      p_session_token:familySession.session_token,
      p_respondent_type:String(fd.get('respondent_type')||'Relative'),
      p_feedback_nature:samaraFamilyClassifyFeedbackNature({rating:rating?Number(rating):null,category:String(fd.get('category')||'General'),subject:String(fd.get('subject')||''),message:String(fd.get('message')||'')}),
      p_category:String(fd.get('category')||'General'),
      p_rating:rating?Number(rating):null,
      p_subject:String(fd.get('subject')||''),
      p_message:String(fd.get('message')||''),
      p_consent_to_contact:!!fd.get('consent')
    });
    if(error)throw error;
    form.reset();
    status.textContent='✓ Thank you. Your feedback has been sent securely to Samara management.';
    await loadFamilyFeedbackHistory();
  }catch(err){console.error(err);status.textContent=err.message||'Unable to submit feedback.';}
  finally{button.disabled=false;button.textContent='Submit Feedback';}
});


// Daily Moments v1.0.6 — private 7-day family video clips
function momentDateLabel(value){
  if(!value)return 'Recent moment';
  const d=new Date(value); if(Number.isNaN(d.getTime()))return 'Recent moment';
  return `${d.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})} · ${d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true})}`;
}
function momentDaysLeft(expiresAt){
  if(!expiresAt)return '';
  const ms=new Date(expiresAt).getTime()-Date.now();
  if(ms<=0)return 'Expires today';
  const days=Math.ceil(ms/86400000);
  return days===1?'Available today':`Available for ${days} more days`;
}
async function loadDailyMoments(){
  const grid=document.querySelector('#daily-moments-grid');
  const status=document.querySelector('#daily-moments-status');
  if(!grid)return;
  if(!familySession?.session_token||!cfg.supabaseUrl||!cfg.supabasePublishableKey){
    grid.innerHTML='<article class="moment-empty"><b>Please sign in to view Daily Moments.</b></article>';return;
  }
  grid.innerHTML='<article class="moment-empty"><b>Loading Daily Moments…</b><small>Opening recent clips securely.</small></article>';
  if(status)status.textContent='';
  try{
    const response=await fetch(`${cfg.supabaseUrl}/functions/v1/family-daily-moments`,{
      method:'POST',
      headers:{'Content-Type':'application/json','apikey':cfg.supabasePublishableKey,'Authorization':`Bearer ${cfg.supabasePublishableKey}`},
      body:JSON.stringify({session_token:familySession.session_token,access_id:familySession.access_id,patient_uuid:familySession.patient_uuid})
    });
    const payload=await response.json().catch(()=>({}));
    if(!response.ok||payload.success===false)throw new Error(payload.error||'Unable to load Daily Moments.');
    const rows=Array.isArray(payload.moments)?payload.moments:[];
    if(!rows.length){
      grid.innerHTML='<article class="moment-empty"><div class="moment-empty-icon">♥</div><b>No Daily Moments have been shared during the last 7 days.</b><small>When the care team shares a new short clip, it will appear here automatically.</small></article>';
      return;
    }
    grid.innerHTML=rows.map((row,index)=>`<article class="moment-card">
      <div class="moment-video-wrap"><video controls playsinline preload="metadata" src="${esc(row.signed_url||'')}" aria-label="Daily Moment ${index+1}"></video></div>
      <div class="moment-copy"><div class="moment-meta"><span>${esc(momentDateLabel(row.created_at))}</span><span>${esc(momentDaysLeft(row.expires_at))}</span></div>
      <h3>${esc(row.caption||'A moment from Samara')}</h3>
      <small>Shared with care by Samara Assisted Living</small></div>
    </article>`).join('');
  }catch(error){
    console.error('Daily Moments:',error);
    grid.innerHTML='<article class="moment-empty"><b>Daily Moments are temporarily unavailable.</b><small>Please refresh after a little while. Your other Family Portal information is unaffected.</small></article>';
    if(status)status.textContent=error.message||'Unable to load Daily Moments.';
  }
}
