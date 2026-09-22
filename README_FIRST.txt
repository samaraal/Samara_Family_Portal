SAMARA FAMILY PORTAL v1.0.18 — FAMILY-PORTAL-ONLY SAFE UPDATE

ERP: DO NOT CHANGE.
Supabase Edge Functions: DO NOT CHANGE.
SQL: NONE.

Replace only these Family Portal repository files, preserving folders:
1. index.html
2. js/family-app-v1.0.6.js
3. service-worker.js

Changes:
- Intelligent Report now has a true Report Date input with Previous Day / Today.
- It continues to request only the existing original ERP-generated PDF; it does not generate a new report.
- Admin Preview data is cached only in the current browser tab (sessionStorage), so Refresh keeps the read-only Admin Preview instead of returning to the Family login page.
- For security, Admin Preview does not impersonate a family session to access protected report PDFs. Normal authorised family login continues to use the existing report service.
