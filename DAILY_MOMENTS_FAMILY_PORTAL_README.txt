SAMARA FAMILY PORTAL v1.0.6 — DAILY MOMENTS

1. Upload the updated Family Portal files to the existing Family Portal GitHub repository.
2. Deploy Supabase Edge Function: family-daily-moments using supabase/functions/family-daily-moments/index.ts.
3. The function uses Supabase built-in SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY.
4. It validates the existing Family Portal session through family_portal_dashboard.
5. It reads family-visible, unexpired records from patient_daily_moments and creates 15-minute signed URLs from private bucket patient-daily-moments.
6. Family members see only the resident linked to their valid Family Portal session.
7. Clips are shown newest first and the UI states that Daily Moments are available for 7 days.

NOTE: This package assumes the ERP Daily Moments SQL/storage setup has already been installed, as prepared in ERP v2.8.38.
