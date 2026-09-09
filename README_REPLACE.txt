SAMARA FAMILY PORTAL - DAILY CARE FIX
Version: 1.0.8
Date: 09-09-2026

Replace only these files in the Family Portal:
1. index.html
2. js/family-app-v1.0.6.js

What this fixes:
- Daily Care now displays actual ERP care_logs even when no care_order / care plan exists.
- Multiple completed entries for the same care activity are shown separately.
- Active care-plan items with no matching completion remain visible as Pending.
- Overview no longer shows an illogical value such as 2 / 0 when completed care exists without a care plan.
- Cache-busting query updated so the corrected JavaScript is fetched immediately.

No ERP files or database SQL changes are required for this correction.
