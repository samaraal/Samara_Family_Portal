SAMARA FAMILY PORTAL v1.0.0
Standalone Phase-1 prototype

PURPOSE
- Secure family login concept
- Resident overview
- Daily care updates
- Medicines
- Vitals
- Physiotherapy
- Billing
- Documents
- Visit requests
- Secure messages

DEMO LOGIN
Patient ID: PAT-2026-08-0002
Mobile: 9841235577
PIN: 123456

IMPORTANT
This is a static demonstration portal. It does not yet read live patient information from Supabase and must not be used for real family access until authentication, Row-Level Security and ERP integration are completed.

RECOMMENDED HOSTING
Create a separate GitHub repository:
Samara_Family_Portal

Recommended address:
family.samaraassistedliving.com

NEXT INTEGRATION PHASE
1. Supabase family_users / family_access table
2. OTP or secure password authentication
3. Row-Level Security restricted to approved resident data
4. Family-visible approval flags for clinical notes and documents
5. Live bills, receipts, medicines, vitals and care updates
6. Visit requests and messages flowing into Samara ERP
7. Audit log for every family login and document access

UPLOAD
Extract the ZIP and upload index.html, assets/, css/ and js/ to the repository root.
