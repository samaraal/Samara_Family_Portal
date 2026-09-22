Samara Family Portal v1.0.17 — Intelligent Report connection fix

Replace ONLY these Family Portal files, preserving folders:
1. index.html
2. js/family-app-v1.0.6.js
3. service-worker.js

No SQL.
No new Edge Function.
No change to daily-patient-report is required if the currently deployed function already contains mode: family_list_existing_reports.

Fix: Family Portal now calls the existing daily-patient-report Edge Function through the Supabase JS client's functions.invoke() transport, which supplies the correct Supabase function gateway headers and avoids trying to parse an HTML gateway response as JSON.

After deployment, confirm sidebar says Family Portal v1.0.17, then open Intelligent Report.
