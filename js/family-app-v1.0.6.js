const FAMILY_PORTAL_VERSION = "1.0.16";


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
let latestDashboardData = null;
let activityTimelineDate = todayISO();
let activityTimelineCategory = 'all';
let overviewTimelineCategory = 'all';
let intelligentReportDate = todayISO();

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
function billingSummary(rows){let charges=0,payments=0,advances=0,discounts=0,refunds=0;for(const x of rows){const a=Number(x.amount||0);const t=String(x.transaction_type||'').toLowerCase();if(t==='charge')charges+=a;else if(t==='payment')payments+=a;else if(t==='advance')advances+=a;else if(t==='discount')discounts+=a;else if(t==='refund')refunds+=a;}return{charges,payments,advances,discounts,refunds,outstanding:charges-payments-advances-discounts+refunds};}


function setFamilyPayButtonState(){
  const btn=document.querySelector('#family-pay-online');
  if(!btn)return;
  const bill=billingSummary(latestDashboardData?.billing||[]);
  const outstanding=Math.max(0,Number(bill.outstanding||0));
  btn.disabled=adminPreviewMode||!familySession?.session_token||outstanding<1;
  btn.textContent=outstanding>=1?`Pay Outstanding ${money(outstanding)}`:'No Amount Due';
  const advanceBtn=document.querySelector('#family-pay-advance');
  if(advanceBtn){advanceBtn.disabled=adminPreviewMode||!familySession?.session_token;advanceBtn.title=adminPreviewMode?'Online payment is disabled in Admin Preview':'Pay an advance securely through Razorpay';}
  btn.title=adminPreviewMode?'Online payment is disabled in Admin Preview':(outstanding<1?'No outstanding amount is payable':'Pay the current outstanding securely through Razorpay');
}

async function callRazorpayFunction(name,payload){
  if(!cfg.supabaseUrl||!cfg.supabasePublishableKey)throw new Error('Payment service is not configured.');
  const response=await fetch(`${cfg.supabaseUrl}/functions/v1/${name}`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'apikey':cfg.supabasePublishableKey,
      'Authorization':`Bearer ${cfg.supabasePublishableKey}`
    },
    body:JSON.stringify(payload)
  });
  const data=await response.json().catch(()=>({}));
  if(!response.ok||data.success===false)throw new Error(data.error||'Online payment request failed.');
  return data;
}



// v1.0.18 — Samara secure payment modal experience for every Razorpay payment
function ensureSamaraPaymentModal(){
  let root=document.querySelector('#samara-payment-modal');
  if(root)return root;
  root=document.createElement('div');
  root.id='samara-payment-modal';
  root.className='samara-payment-modal';
  root.setAttribute('aria-hidden','true');
  root.innerHTML=`<div class="samara-payment-backdrop"></div><section class="samara-payment-card" role="dialog" aria-modal="true" aria-labelledby="samara-payment-title"><button type="button" class="samara-payment-close" aria-label="Close">×</button><img class="samara-payment-logo" src="samara-logo.png" alt="Samara Assisted Living"><div class="samara-payment-body"></div></section>`;
  document.body.appendChild(root);
  root.querySelector('.samara-payment-close').addEventListener('click',()=>closeSamaraPaymentModal(null));
  root.querySelector('.samara-payment-backdrop').addEventListener('click',()=>closeSamaraPaymentModal(null));
  return root;
}
let samaraPaymentResolve=null;
function closeSamaraPaymentModal(value){
  const root=document.querySelector('#samara-payment-modal');
  if(root){root.classList.remove('open');root.setAttribute('aria-hidden','true');}
  const resolve=samaraPaymentResolve;samaraPaymentResolve=null;if(resolve)resolve(value);
}
function showSamaraPaymentModal(html,{closable=true}={}){
  const root=ensureSamaraPaymentModal();
  root.querySelector('.samara-payment-body').innerHTML=html;
  root.querySelector('.samara-payment-close').style.display=closable?'flex':'none';
  root.classList.add('open');root.setAttribute('aria-hidden','false');
  return root;
}
function samaraAdvanceAmountDialog(){
  return new Promise(resolve=>{
    samaraPaymentResolve=resolve;
    const root=showSamaraPaymentModal(`<div class="samara-payment-heading"><div class="samara-payment-icon">₹</div><div><h2 id="samara-payment-title">Enter Advance Payment</h2><p>Enter the amount you would like to pay in advance to Samara Assisted Living.</p></div></div><label class="samara-amount-field"><span>₹</span><input id="samara-advance-amount" inputmode="decimal" autocomplete="off" placeholder="0" aria-label="Advance amount"></label><p class="samara-payment-note">You can pay any amount as advance. This will be adjusted against future bills.</p><div class="samara-payment-actions"><button type="button" class="samara-btn secondary" data-action="cancel">Cancel</button><button type="button" class="samara-btn primary" data-action="continue">Continue <span>→</span></button></div>`);
    const input=root.querySelector('#samara-advance-amount');setTimeout(()=>input?.focus(),50);
    root.querySelector('[data-action="cancel"]').onclick=()=>closeSamaraPaymentModal(null);
    root.querySelector('[data-action="continue"]').onclick=()=>{const amount=Number(String(input.value||'').replace(/,/g,'').trim());if(!Number.isFinite(amount)||amount<1||amount>500000){input.classList.add('invalid');root.querySelector('.samara-payment-note').textContent='Please enter an amount between ₹1 and ₹5,00,000.';return;}closeSamaraPaymentModal(amount);};
    input.addEventListener('keydown',e=>{if(e.key==='Enter')root.querySelector('[data-action="continue"]').click();});
  });
}
function samaraConfirmPaymentDialog(paymentType,amount){
  return new Promise(resolve=>{
    samaraPaymentResolve=resolve;
    const isAdvance=paymentType==='advance';
    const root=showSamaraPaymentModal(`<div class="samara-payment-heading"><div class="samara-payment-icon secure">▣</div><div><h2 id="samara-payment-title">Confirm ${isAdvance?'Advance':'Outstanding'} Payment</h2><p>Please confirm the details below.</p></div></div><div class="samara-payment-amount-row"><strong>Amount</strong><b>${money(amount)}</b></div><p class="samara-payment-note">${isAdvance?'This amount will be recorded as an advance payment to Samara Assisted Living and adjusted against future bills.':'This payment will be applied against the current outstanding amount in the Samara ERP ledger.'}</p><div class="samara-payment-actions"><button type="button" class="samara-btn secondary" data-action="cancel">Cancel</button><button type="button" class="samara-btn primary" data-action="confirm">Confirm &amp; Pay <span>→</span></button></div>`);
    root.querySelector('[data-action="cancel"]').onclick=()=>closeSamaraPaymentModal(false);
    root.querySelector('[data-action="confirm"]').onclick=()=>closeSamaraPaymentModal(true);
  });
}
function showSamaraPaymentRedirect(){
  showSamaraPaymentModal(`<div class="samara-payment-loading"><img src="samara-logo.png" alt="Samara Assisted Living"><div class="samara-payment-spinner" aria-hidden="true"></div><h2 id="samara-payment-title">Redirecting to secure payment gateway</h2><p>Please wait for a moment…</p><p>You will be taken to Razorpay's secure payment page to complete your payment.</p><div class="samara-secure-strip">🔒 <span>Your payment is secured and encrypted.<br>Do not close this window.</span></div></div>`,{closable:false});
}
function hideSamaraPaymentRedirect(){
  const root=document.querySelector('#samara-payment-modal');if(root){root.classList.remove('open');root.setAttribute('aria-hidden','true');}
}

async function startFamilyRazorpayPayment(paymentType='outstanding',advanceAmount=null){
  const btn=document.querySelector(paymentType==='advance'?'#family-pay-advance':'#family-pay-online');
  if(!btn||btn.disabled)return;
  if(adminPreviewMode){alert('Online payment is disabled in Admin Preview.');return;}
  if(!familySession?.session_token){alert('Your Family Portal session has expired. Please sign in again.');return;}
  if(typeof window.Razorpay!=='function'){alert('Razorpay Checkout could not be loaded. Please check your internet connection and try again.');return;}
  const originalText=btn.textContent;
  const bill=billingSummary(latestDashboardData?.billing||[]);
  const displayAmount=paymentType==='advance'?Number(advanceAmount):Math.max(0,Number(bill.outstanding||0));
  if(!Number.isFinite(displayAmount)||displayAmount<1)return;
  const confirmed=await samaraConfirmPaymentDialog(paymentType,displayAmount);
  if(!confirmed)return;
  btn.disabled=true;btn.textContent='Preparing secure payment…';
  showSamaraPaymentRedirect();
  try{
    const order=await callRazorpayFunction('razorpay-create-order',{session_token:familySession.session_token,payment_type:paymentType,...(paymentType==='advance'?{advance_amount:Number(advanceAmount)}:{})});
    if(!order?.order_id||!order?.key_id||!Number(order.amount))throw new Error('Razorpay order could not be prepared.');
    const options={
      key:order.key_id,
      amount:order.amount,
      currency:order.currency||'INR',
      // Use Samara's full logo in Razorpay Checkout branding.
      // Keep the checkout title unset so we do not duplicate "Samara Assisted Living" beside the logo.
      image:'https://family.samaraassistedliving.com/samara-logo.png',
      description:`${paymentType==='advance'?'Advance payment':'Outstanding payment'}${order.patient_name?` — ${order.patient_name}`:''}`,
      order_id:order.order_id,
      handler:async function(response){
        btn.disabled=true;btn.textContent='Verifying payment…';
        try{
          const verified=await callRazorpayFunction('razorpay-verify-payment',{
            session_token:familySession.session_token,
            razorpay_payment_id:response.razorpay_payment_id,
            razorpay_order_id:response.razorpay_order_id,
            razorpay_signature:response.razorpay_signature
          });
          if(!verified?.verified&&!verified?.success)throw new Error('Payment could not be verified.');
          alert(`${paymentType==='advance'?'Advance':'Payment'} received successfully.${verified.payment_id?`\nReference: ${verified.payment_id}`:''}`);
          await loadDashboard(false);
          setFamilyPayButtonState();
        }catch(error){
          console.error('Razorpay verification:',error);
          alert(`Payment was not posted to Samara Accounts. ${error.message||'Verification failed.'}\nPlease contact Samara with your Razorpay payment reference before attempting another payment.`);
        }finally{
          btn.disabled=false;setFamilyPayButtonState();
        }
      },
      modal:{ondismiss:function(){btn.disabled=false;setFamilyPayButtonState();}},
      theme:{color:'#b01867'}
    };
    const checkout=new window.Razorpay(options);
    checkout.on('payment.failed',function(response){
      console.error('Razorpay payment failed:',response?.error);
      alert(response?.error?.description||'Payment was not completed. No payment has been posted to Samara Accounts.');
      btn.disabled=false;setFamilyPayButtonState();
    });
    hideSamaraPaymentRedirect();
    checkout.open();
  }catch(error){
    hideSamaraPaymentRedirect();
    console.error('Razorpay checkout:',error);
    alert(error.message||'Unable to start online payment.');
    btn.disabled=false;btn.textContent=originalText;setFamilyPayButtonState();
  }
}


async function startFamilyAdvancePayment(){
  if(adminPreviewMode){alert('Online payment is disabled in Admin Preview.');return;}
  if(!familySession?.session_token){alert('Your Family Portal session has expired. Please sign in again.');return;}
  const amount=await samaraAdvanceAmountDialog();
  if(amount===null)return;
  await startFamilyRazorpayPayment('advance',amount);
}

function buildTimeline(data){
  const events=[];
  const push=(category,at,title,note='',status='')=>{if(at)events.push({category,at,title,note,status});};
  const medicationOrders=data.medication_orders||[];
  const medicationOrderById=new Map(medicationOrders.map(order=>[String(order.id),order]));
  (data.care_logs||[]).forEach(x=>push('care',x.completed_at||x.recorded_at||x.created_at,`${x.care_type||x.task_name||'Daily care'} — ${x.status||'Recorded'}`,x.remarks||x.shift||'',x.status||''));
  (data.medication_administrations||[]).forEach(x=>{
    const order=x.order_id!=null?medicationOrderById.get(String(x.order_id)):null;
    const medicineName=String(x.medicine_name||order?.medicine_name||'').trim();
    const strength=String(x.strength||x.dose||order?.strength||order?.dose||'').trim();
    const medicineDetails=[medicineName,strength && !medicineName.toLowerCase().includes(strength.toLowerCase())?strength:''].filter(Boolean).join(' ');
    const status=x.status||'Recorded';
    const scheduled=x.scheduled_time||x.scheduled_at||'';
    const note=[scheduled?`Scheduled ${scheduled}`:'',x.remarks||''].filter(Boolean).join(' · ');
    push('medicines',x.administered_at||x.created_at,`Medicine: ${medicineDetails||'Medicine details unavailable'} — ${status}`,note,status);
  });
  (data.vitals||[]).forEach(x=>{const bits=[];if(x.systolic!=null||x.diastolic!=null)bits.push(`BP ${x.systolic??'—'}/${x.diastolic??'—'}`);if(x.pulse!=null)bits.push(`Pulse ${x.pulse}`);if(x.spo2!=null)bits.push(`SpO₂ ${x.spo2}%`);if(x.temperature!=null)bits.push(`Temp ${x.temperature}`);if(x.blood_sugar!=null)bits.push(`${x.blood_sugar_type||'Sugar'} ${x.blood_sugar}`);push('vitals',x.recorded_at,'Vitals recorded',bits.join(' · ')||x.remarks||'Observation recorded');});
  (data.physio_sessions||[]).forEach(x=>push('physiotherapy',x.session_at||x.completed_at||x.created_at||x.session_date,`Physiotherapy: ${x.therapy_type||x.session_type||'Session'} — ${x.status||'Recorded'}`,x.notes||x.physiotherapist_name||'',x.status||''));
  (data.meals||data.meal_records||[]).forEach(x=>push('food',x.served_at||x.recorded_at||x.created_at||(x.meal_date?`${x.meal_date}T12:00:00`:null),`Food & Diet: ${x.meal_type||x.item_type||'Meal'} — ${x.consumption_status||x.status||'Recorded'}`,[x.menu||x.item_name,x.quantity,x.remarks].filter(Boolean).join(' · '),x.consumption_status||x.status||''));
  const nursing=[...(data.nursing_procedures||[]),...(data.nursing_procedure_logs||[]),...(data.procedure_logs||[])];
  nursing.forEach(x=>push('nursing',x.completed_at||x.performed_at||x.recorded_at||x.created_at,`Nursing Procedure: ${x.procedure_name||x.procedure_type||x.nursing_procedure||x.name||'Procedure'} — ${x.status||'Recorded'}`,[x.details||x.notes||x.remarks,x.duration?`Duration ${x.duration}`:''].filter(Boolean).join(' · '),x.status||''));
  (data.daily_moments||data.moments||[]).forEach(x=>push('moments',x.created_at||x.recorded_at,'Daily Moment',x.caption||'A moment shared by Samara'));
  return events.filter(x=>x.at).sort((a,b)=>new Date(b.at)-new Date(a.at));
}

const ACTIVITY_CATEGORIES=[
  ['all','All'],['medicines','Medicines'],['vitals','Vitals'],['nursing','Nursing Procedures'],['care','Care'],['food','Food & Diet'],['physiotherapy','Physiotherapy'],['moments','Daily Moments']
];
function activityDateISO(value){const d=new Date(value);if(Number.isNaN(d.getTime()))return '';return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function shiftActivityDate(days){const d=new Date(`${activityTimelineDate}T12:00:00`);d.setDate(d.getDate()+days);activityTimelineDate=activityDateISO(d);renderActivityTimeline();}
function openActivityTimeline(){activityTimelineDate=todayISO();activityTimelineCategory='all';let modal=document.querySelector('#activity-timeline-modal');if(!modal){modal=document.createElement('div');modal.id='activity-timeline-modal';modal.className='activity-modal';modal.innerHTML=`<div class="activity-modal-card"><div class="activity-modal-head"><div><span class="eyebrow">Patient Activity</span><h2>Care Timeline — View All</h2></div><button type="button" class="activity-close" aria-label="Close">×</button></div><div id="activity-timeline-controls"></div><div id="activity-timeline-results"></div></div>`;document.body.appendChild(modal);modal.querySelector('.activity-close').addEventListener('click',()=>modal.classList.remove('open'));modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open');});}modal.classList.add('open');renderActivityTimeline();}
function renderActivityTimeline(){
  const modal=document.querySelector('#activity-timeline-modal');if(!modal)return;
  const controls=modal.querySelector('#activity-timeline-controls'),results=modal.querySelector('#activity-timeline-results');
  controls.innerHTML=`<div class="activity-datebar"><button type="button" data-day="-1">← Previous Day</button><label>Date <input type="date" value="${esc(activityTimelineDate)}" max="${esc(todayISO())}"></label><button type="button" data-today="1">Today</button><button type="button" data-day="1" ${activityTimelineDate>=todayISO()?'disabled':''}>Next Day →</button></div><div class="activity-filters">${ACTIVITY_CATEGORIES.map(([key,label])=>`<button type="button" data-category="${key}" class="${activityTimelineCategory===key?'active':''}">${esc(label)}</button>`).join('')}</div>`;
  controls.querySelectorAll('[data-day]').forEach(b=>b.addEventListener('click',()=>shiftActivityDate(Number(b.dataset.day))));
  controls.querySelector('[data-today]').addEventListener('click',()=>{activityTimelineDate=todayISO();renderActivityTimeline();});
  controls.querySelector('input[type="date"]').addEventListener('change',e=>{activityTimelineDate=e.target.value||todayISO();renderActivityTimeline();});
  controls.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{activityTimelineCategory=b.dataset.category;renderActivityTimeline();}));
  const all=buildTimeline(latestDashboardData||{});const rows=all.filter(x=>activityDateISO(x.at)===activityTimelineDate&&(activityTimelineCategory==='all'||x.category===activityTimelineCategory));
  const label=ACTIVITY_CATEGORIES.find(x=>x[0]===activityTimelineCategory)?.[1]||'All';
  results.innerHTML=`<div class="activity-result-head"><strong>${esc(dateIN(activityTimelineDate))}</strong><span>${esc(label)} · ${rows.length} record${rows.length===1?'':'s'}</span></div>${rows.length?`<div class="activity-list">${rows.map(x=>`<article class="activity-row"><div class="activity-time">${esc(timeIN(x.at))}</div><div class="activity-copy"><span class="activity-badge ${esc(x.category)}">${esc(ACTIVITY_CATEGORIES.find(c=>c[0]===x.category)?.[1]||x.category)}</span><b>${esc(x.title)}</b>${x.note?`<small>${esc(x.note)}</small>`:''}</div></article>`).join('')}</div>`:`<div class="activity-empty">No ${activityTimelineCategory==='all'?'patient activity':label.toLowerCase()} records for this date.</div>`}`;
}

function renderOverviewTimeline(){
  const host=document.querySelector('#overview-timeline');if(!host)return;
  const today=todayISO();
  const rows=buildTimeline(latestDashboardData||{}).filter(x=>activityDateISO(x.at)===today&&(overviewTimelineCategory==='all'||x.category===overviewTimelineCategory));
  host.innerHTML=rows.length?rows.slice(0,6).map(x=>`<div class="done"><span>${esc(timeIN(x.at))}</span><p><b>${esc(x.title)}</b><small>${esc(x.note||'')}</small></p></div>`).join(''):'<div class="pending"><span>—</span><p><b>No records in this category today</b><small>Choose another category or View all for date-wise history.</small></p></div>';
  document.querySelectorAll('#overview-activity-filters [data-overview-category]').forEach(b=>b.classList.toggle('active',b.dataset.overviewCategory===overviewTimelineCategory));
}
function initOverviewActivityFilters(){
  const host=document.querySelector('#overview-activity-filters');if(!host)return;
  host.innerHTML=ACTIVITY_CATEGORIES.map(([key,label])=>`<button type="button" data-overview-category="${key}" class="${overviewTimelineCategory===key?'active':''}">${esc(label)}</button>`).join('');
  host.querySelectorAll('[data-overview-category]').forEach(b=>b.addEventListener('click',()=>{overviewTimelineCategory=b.dataset.overviewCategory;renderOverviewTimeline();}));
}
function intelligentReportRows(date){return buildTimeline(latestDashboardData||{}).filter(x=>activityDateISO(x.at)===date);}
function renderIntelligentReport(){
  const host=document.querySelector('#intelligent-report-content');if(!host)return;
  const data=latestDashboardData||{}, rows=intelligentReportRows(intelligentReportDate), p=data.patient||{};
  const vitals=(data.vitals||[]).filter(x=>activityDateISO(x.recorded_at)===intelligentReportDate);
  const meds=rows.filter(x=>x.category==='medicines'), nursing=rows.filter(x=>x.category==='nursing'), care=rows.filter(x=>x.category==='care'), food=rows.filter(x=>x.category==='food'), physio=rows.filter(x=>x.category==='physiotherapy'), moments=rows.filter(x=>x.category==='moments');
  const section=(title,items)=>`<section class="family-report-section"><h3>${esc(title)}</h3>${items.length?items.map(x=>`<article><b>${esc(timeIN(x.at))} · ${esc(x.title)}</b>${x.note?`<small>${esc(x.note)}</small>`:''}</article>`).join(''):'<p>No records for this date.</p>'}</section>`;
  host.innerHTML=`<div class="family-report-cover"><span>Samara Assisted Living</span><h2>Intelligent Patient Report</h2><b>${esc(p.patient_name||familySession?.patient_name||'Resident')}</b><small>${esc(p.patient_code||familySession?.patient_code||'')} · ${esc(dateIN(intelligentReportDate))}</small><p>View-only family report generated from the resident's Family Portal-visible ERP records.</p></div>
  <div class="family-report-summary"><article><span>Medicines</span><strong>${meds.length}</strong></article><article><span>Vitals</span><strong>${vitals.length}</strong></article><article><span>Nursing Procedures</span><strong>${nursing.length}</strong></article><article><span>Care</span><strong>${care.length}</strong></article><article><span>Food & Diet</span><strong>${food.length}</strong></article></div>
  ${section('Medicines',meds)}${section('Vitals',rows.filter(x=>x.category==='vitals'))}${section('Nursing Procedures',nursing)}${section('Daily Care',care)}${section('Food & Diet',food)}${section('Physiotherapy',physio)}${section('Daily Moments',moments)}`;
}
function initIntelligentReport(){
  const input=document.querySelector('#intelligent-report-date');if(!input)return;
  input.max=todayISO();input.value=intelligentReportDate;
  input.addEventListener('change',()=>{intelligentReportDate=input.value||todayISO();renderIntelligentReport();});
  document.querySelector('#intelligent-report-prev')?.addEventListener('click',()=>{const d=new Date(`${intelligentReportDate}T12:00:00`);d.setDate(d.getDate()-1);intelligentReportDate=activityDateISO(d);input.value=intelligentReportDate;renderIntelligentReport();});
  document.querySelector('#intelligent-report-today')?.addEventListener('click',()=>{intelligentReportDate=todayISO();input.value=intelligentReportDate;renderIntelligentReport();});
}

async function enrichDischargeSummary(data){
  if(!data||!supabaseClient)return data;
  const p=data.patient||{};
  // Newer dashboard RPCs may already expose the final departure details.
  const existing=data.discharge||data.final_discharge||p.discharge||null;
  if(existing?.actual_departure_at||existing?.discharged_at)return {...data,discharge:existing};
  const candidates=[p.id,p.patient_uuid,familySession?.patient_uuid,familySession?.patient_record_id].filter(Boolean);
  const uuid=candidates.find(v=>/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(v)));
  if(!uuid)return data;
  try{
    const {data:rows,error}=await supabaseClient.from('patient_discharges').select('id,patient_id,status,management_status,accounts_status,actual_departure_at,updated_at,created_at').eq('patient_id',uuid).order('updated_at',{ascending:false}).limit(1);
    if(error){console.info('Family discharge summary is not directly readable; using dashboard data.',error.message);return data;}
    return rows?.[0]?{...data,discharge:rows[0]}:data;
  }catch(err){console.info('Family discharge summary lookup skipped.',err);return data;}
}

function renderDischargeBanner(data,bill){
  const p=data?.patient||{};
  const d=data?.discharge||data?.final_discharge||p?.discharge||{};
  const inactive=p.is_active===false||String(p.admission_status||'').toLowerCase()==='discharged'||String(p.status||'').toLowerCase()==='discharged';
  const departure=d.actual_departure_at||d.discharged_at||p.actual_departure_at||p.discharged_at||null;
  const discharged=Boolean(departure||inactive||String(d.status||'').toLowerCase()==='completed');
  const banner=document.querySelector('.resident-banner');
  const pill=banner?.querySelector('.status-pill');
  if(!banner||!pill)return false;
  banner.classList.toggle('is-discharged',discharged);
  pill.textContent=discharged?'Discharged':'Currently at Samara';
  let card=document.querySelector('#discharge-summary-card');
  let thanks=document.querySelector('#discharge-thankyou');
  if(!discharged){card?.remove();thanks?.remove();return false;}
  if(!card){card=document.createElement('div');card.id='discharge-summary-card';card.className='discharge-summary-card';const cond=document.querySelector('#condition-card');banner.insertBefore(card,cond||null);}
  const outstanding=Number(bill?.outstanding||0);
  const finalAmount=Math.max(0,Number(bill?.charges||0)-Number(bill?.discounts||0)+Number(bill?.refunds||0));
  const paid=Number(bill?.payments||0)+Number(bill?.advances||0);
  const settled=Math.abs(outstanding)<0.01;
  const departureText=departure?dateTimeIN(departure):(p.discharge_date?dateIN(p.discharge_date):'Discharged');
  card.innerHTML=`<div class="discharge-date"><span class="discharge-icon">↪</span><div><span>Discharged on</span><strong>${esc(departureText)}</strong></div></div><div class="discharge-finance"><b class="${settled?'settled':'pending'}">${settled?'✓ All bills settled':'● Payment pending'}</b></div>`;
  const cond=document.querySelector('#condition-card');
  if(cond){cond.innerHTML=`<span>Final Bill Amount</span><strong>${money(finalAmount)}</strong><small>Amount Paid&nbsp;&nbsp;: &nbsp;${money(paid)}<br>Outstanding&nbsp;&nbsp;: &nbsp;${money(outstanding)}</small>`;}
  const latest=document.querySelector('#latest-update')?.closest('.panel');
  if(latest&&!thanks){thanks=document.createElement('div');thanks.id='discharge-thankyou';thanks.className='discharge-thankyou';thanks.innerHTML='<span>♥</span><em>Thank you for trusting us with<br>your loved one’s care.</em><small>COMPASSION • COMFORT • DIGNITY</small>';latest.appendChild(thanks);}
  const metricCards=document.querySelectorAll('#overview-metrics .metric-card');
  if(metricCards[3]) metricCards[3].querySelector('small').textContent=settled?'All bills settled':'Payment pending';
  return true;
}
function renderDashboard(data){
  if(!data)return;
  latestDashboardData=data;
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
  const dischargedNow=renderDischargeBanner(data,bill);
  const cond=document.querySelector('#condition-card');if(cond&&!dischargedNow){const level=String(latest.alert_level||'').toLowerCase();const condition=!vitals.length?'No recent vitals':(['critical','high','abnormal'].some(x=>level.includes(x))?'Requires review':'Stable');cond.innerHTML=`<span>Current Condition</span><strong>${esc(condition)}</strong><small>${latest.recorded_at?`Last vitals ${dateTimeIN(latest.recorded_at)}`:'No recent vital-sign entry'}</small>`;}
  const timeline=buildTimeline(data);renderOverviewTimeline();renderIntelligentReport();
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

  const bm=document.querySelector('#billing-metrics');if(bm)bm.innerHTML=`<article class="metric-card"><span>Total Charges</span><strong>${money(bill.charges)}</strong><small>ERP ledger</small></article><article class="metric-card"><span>Payments / Advance</span><strong>${money(bill.payments+bill.advances)}</strong><small>Received</small></article><article class="metric-card"><span>Outstanding</span><strong>${money(bill.outstanding)}</strong><small>Current balance</small></article>`;
  setFamilyPayButtonState();
  const bb=document.querySelector('#billing-body');if(bb)bb.innerHTML=billing.length?billing.map(x=>`<tr><td>${esc(dateIN(x.transaction_date))}</td><td>—</td><td>${esc([x.category,x.description].filter(Boolean).join(' · ')||'Transaction')}</td><td>${String(x.transaction_type).toLowerCase()==='charge'?money(x.amount):'—'}</td><td>${['payment','advance'].includes(String(x.transaction_type).toLowerCase())?money(x.amount):'—'}</td><td>${esc(x.payment_mode||'—')}</td></tr>`).join(''):emptyRow(6,'No billing transactions recorded.');

  const docs=data.documents||[]; const dg=document.querySelector('#documents-grid');if(dg)dg.innerHTML=docs.length?docs.map(x=>`<article><span>▤</span><div><b>${esc(x.document_type||'Document')}</b><small>${esc(x.document_name||'File')} · ${esc(dateIN(x.created_at))}</small></div></article>`).join(''):'<article><span>▤</span><div><b>No documents available</b><small>No family-visible document metadata recorded.</small></div></article>';
}



function familyLedgerPdf(){
  const data=latestDashboardData||{}, p=data.patient||{}, billing=[...(data.billing||[])];
  if(!billing.length){alert('No patient ledger transactions are available to download.');return;}
  const bill=billingSummary(billing);
  const sorted=billing.slice().sort((a,b)=>new Date(a.transaction_date||a.created_at||0)-new Date(b.transaction_date||b.created_at||0));
  let running=0;
  const rows=sorted.map((x,i)=>{
    const type=String(x.transaction_type||'').toLowerCase();
    const amount=Number(x.amount||0);
    const isDebit=type==='charge'||type==='refund';
    const isCredit=type==='payment'||type==='discount'||type==='advance';
    if(isDebit)running+=amount; else if(isCredit)running-=amount;
    const particulars=[x.category,x.description].filter(Boolean).join(' · ')||x.transaction_type||'Transaction';
    const ref=x.reference_no||x.reference||x.payment_reference||x.bill_number||'—';
    return `<tr><td>${i+1}</td><td>${esc(dateIN(x.transaction_date||x.created_at))}</td><td>${esc(particulars)}</td><td>${esc(ref)}</td><td class="num">${isDebit?money(amount):'—'}</td><td class="num">${isCredit?money(amount):'—'}</td><td class="num">${money(running)}</td></tr>`;
  }).join('');
  const patientName=p.patient_name||familySession?.patient_name||'Resident';
  const residentId=p.patient_code||p.patient_id||familySession?.patient_code||'—';
  const room=[p.room_no||familySession?.room_no,p.bed_no||familySession?.bed_no].filter(Boolean).join(' / ')||'—';
  const admission=p.admission_date||familySession?.admission_date;
  const generated=new Date().toLocaleString('en-IN',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:true});
  const logo=new URL('./assets/samara-logo.png',window.location.href).href;
  const safeFile=String(patientName).replace(/[^a-z0-9]+/gi,'_').replace(/^_|_$/g,'');
  const html=`<!doctype html><html><head><meta charset="utf-8"><title>${esc(safeFile)} Patient Ledger</title><style>
    @page{size:A4;margin:12mm}*{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#392531;margin:0;font-size:10px}.head{display:flex;align-items:center;border-bottom:3px solid #b70b61;padding-bottom:10px;margin-bottom:12px}.logo{width:120px;height:auto}.headtext{flex:1;text-align:center}.headtext h1{font-size:18px;color:#b70b61;margin:0 0 3px}.headtext h2{font-size:16px;margin:0}.headtext p{margin:3px 0 0;color:#6f5b65}.meta{border:1px solid #edc8da;border-radius:8px;padding:9px 11px;display:grid;grid-template-columns:1fr 1fr;gap:6px 24px;margin-bottom:12px}.meta b{display:inline-block;min-width:92px}.section{font-size:12px;color:#9d0c53;font-weight:700;margin:12px 0 6px}table{width:100%;border-collapse:collapse;table-layout:fixed}th{background:#f8e3ed;color:#6c1642;border:1px solid #dca9c2;padding:6px 5px;text-align:left}td{border:1px solid #ead5df;padding:6px 5px;vertical-align:top;word-wrap:break-word}.num{text-align:right;white-space:nowrap}.summary{width:48%;margin:12px 0 0 auto}.summary td:first-child{font-weight:700}.summary tr:last-child td{font-size:12px;font-weight:800;color:#9d0c53;border-top:2px solid #b70b61}.note{margin-top:14px;border:1px solid #edc8da;border-radius:7px;padding:8px}.sign{display:grid;grid-template-columns:1fr 1fr 1fr;gap:28px;margin-top:34px;text-align:center}.sign div{border-top:1px solid #5d4a53;padding-top:7px}.foot{margin-top:22px;border-top:1px solid #edc8da;padding-top:8px;text-align:center;color:#6f5b65;font-size:9px}@media print{.no-print{display:none}}
  </style></head><body><div class="head"><img class="logo" src="${logo}" alt="Samara"><div class="headtext"><h1>SAMARA HEALTH CARE LLP</h1><p>Assisted Living Management System</p><h2>PATIENT ACCOUNT LEDGER</h2><p>Generated on: ${esc(generated)}</p></div></div>
  <div class="meta"><div><b>Patient Name</b> ${esc(patientName)}</div><div><b>Resident ID</b> ${esc(residentId)}</div><div><b>Room / Bed</b> ${esc(room)}</div><div><b>Admission Date</b> ${esc(dateIN(admission))}</div></div>
  <div class="section">Patient Ledger</div><table><thead><tr><th style="width:5%">Sl.</th><th style="width:11%">Date</th><th style="width:35%">Particulars</th><th style="width:12%">Reference</th><th style="width:12%">Debit</th><th style="width:12%">Credit</th><th style="width:13%">Balance</th></tr></thead><tbody>${rows}</tbody></table>
  <table class="summary"><tr><td>Total Charges</td><td class="num">${money(bill.charges)}</td></tr><tr><td>Payments Received</td><td class="num">${money(bill.payments)}</td></tr><tr><td>Advance Received</td><td class="num">${money(bill.advances)}</td></tr><tr><td>Discounts</td><td class="num">${money(bill.discounts)}</td></tr><tr><td>Refunds</td><td class="num">${money(bill.refunds)}</td></tr><tr><td>OUTSTANDING BALANCE</td><td class="num">${money(bill.outstanding)}</td></tr></table>
  <div class="note"><b>Important:</b> This ledger reflects financial transactions recorded in the Samara Care ERP as at ${esc(generated)}.</div><div class="sign"><div>Prepared By</div><div>Accounts / Administrator</div><div>Patient / Attendant</div></div><div class="foot">Samara Health Care LLP · Computer-generated patient ledger · No manual alteration permitted</div><script>window.addEventListener('load',()=>setTimeout(()=>window.print(),350));<\/script></body></html>`;
  const w=window.open('','_blank');
  if(!w){alert('Please allow pop-ups to download the Patient Ledger PDF.');return;}
  w.document.open();w.document.write(html);w.document.close();
}

function initFamilyLedgerPdf(){
  document.querySelector('#family-ledger-pdf')?.addEventListener('click',familyLedgerPdf);
}

async function loadDashboard(showStatus=false){
  if(!familySession?.session_token||!supabaseClient)return false;
  const btn=document.querySelector('#refresh-button');const old=btn?.textContent;if(btn&&showStatus)btn.textContent='Refreshing…';
  try{
    const {data,error}=await supabaseClient.rpc('family_portal_dashboard',{p_session_token:familySession.session_token});
    if(error)throw error; if(!data)throw new Error('Family Portal session expired or access disabled.');
    const enriched=await enrichDischargeSummary(data);
    renderDashboard(enriched); loadDailyMoments(); if(btn&&showStatus)btn.textContent='✓ Updated'; setTimeout(()=>{if(btn)btn.textContent=old||'↻ Refresh';},1200); return true;
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
    // Audit only a real successful family login. Admin Preview never reaches this path.
    try{await supabaseClient.rpc('record_family_portal_login_event',{p_session_token:familySession.session_token,p_access_id:familySession.access_id,p_user_agent:navigator.userAgent||null});}catch(auditError){console.warn('Family Portal login audit unavailable',auditError);}
    if(await firstLoginRequired()){status.textContent='';showFirstLoginChange();return;}
    const {data:dashboard,error:dashError}=await supabaseClient.rpc('family_portal_dashboard',{p_session_token:familySession.session_token});if(dashError)throw dashError;if(!dashboard)throw new Error('Unable to read the resident record.');
    openPortal(familySession);renderDashboard(dashboard);status.textContent='';
  }catch(err){console.error(err);status.textContent='Unable to load the resident information. Please contact Samara if the problem continues.';}finally{submit.disabled=false;}
});
document.querySelector('#signout-button')?.addEventListener('click',closePortal);
document.querySelector('#mobile-menu')?.addEventListener('click',()=>sidebar.classList.toggle('open'));
function showView(name){if(name==='feedback')loadFamilyFeedbackHistory();if(name==='report')renderIntelligentReport();if(name==='visits')loadFamilyVisitHistory();if(name==='messages')loadFamilyMessages();document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));document.querySelector(`#view-${name}`)?.classList.add('active');document.querySelectorAll('.side-nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===name));const active=document.querySelector(`.side-nav button[data-view="${name}"]`);pageTitle.textContent=active?.textContent.trim()||'Family Portal';sidebar.classList.remove('open');window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('.side-nav button[data-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));
initOverviewActivityFilters();
initIntelligentReport();
document.querySelectorAll('[data-open-view]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.openView==='activity'){openActivityTimeline();return;}showView(b.dataset.openView);}));
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

document.querySelector('#family-pay-online')?.addEventListener('click',()=>startFamilyRazorpayPayment('outstanding'));
document.querySelector('#family-pay-advance')?.addEventListener('click',startFamilyAdvancePayment);
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

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initFamilyLedgerPdf);else initFamilyLedgerPdf();
