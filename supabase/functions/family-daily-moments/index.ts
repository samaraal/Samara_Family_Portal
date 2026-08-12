import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const cors={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type","Access-Control-Allow-Methods":"POST, OPTIONS"};
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{...cors,"Content-Type":"application/json"}});

Deno.serve(async(req)=>{
  if(req.method==="OPTIONS")return new Response("ok",{headers:cors});
  if(req.method!=="POST")return json({success:false,error:"Method not allowed"},405);
  try{
    const url=Deno.env.get("SUPABASE_URL")!;
    const anon=Deno.env.get("SUPABASE_ANON_KEY")!;
    const service=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const {session_token}=await req.json();
    if(!session_token)return json({success:false,error:"Family Portal session is required."},401);

    // Validate the Family Portal session through the same RPC already used by the portal.
    const publicClient=createClient(url,anon,{auth:{persistSession:false}});
    const {data:dashboard,error:dashError}=await publicClient.rpc("family_portal_dashboard",{p_session_token:String(session_token)});
    if(dashError||!dashboard?.patient)return json({success:false,error:"Family Portal session has expired."},401);
    const patientId=dashboard.patient.id||dashboard.patient.patient_id||dashboard.patient.uuid;
    if(!patientId)return json({success:false,error:"Resident could not be identified."},400);

    const admin=createClient(url,service,{auth:{persistSession:false}});
    const now=new Date().toISOString();
    const {data,error}=await admin.from("patient_daily_moments").select("*").eq("patient_id",patientId).eq("family_visible",true).gt("expires_at",now).order("created_at",{ascending:false}).limit(21);
    if(error)throw error;

    const moments=[];
    for(const row of data||[]){
      const path=row.storage_path||row.file_path||row.video_path;
      if(!path)continue;
      const {data:signed,error:signError}=await admin.storage.from("patient-daily-moments").createSignedUrl(path,900);
      if(signError)continue;
      moments.push({id:row.id,caption:row.caption||row.remarks||"",created_at:row.created_at,expires_at:row.expires_at,signed_url:signed.signedUrl});
    }
    return json({success:true,moments});
  }catch(error){console.error(error);return json({success:false,error:error instanceof Error?error.message:"Unable to load Daily Moments."},500);}
});
