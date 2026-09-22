Samara Family Portal v1.0.12 — Date-wise Patient Activity Timeline

Replace these 4 files in the Family Portal repository, preserving the js/ folder path:
1. index.html
2. styles.css
3. service-worker.js
4. js/family-app-v1.0.6.js

What changed:
- Care Timeline > View all now opens a date-wise activity viewer.
- Previous Day / Today / Next Day + calendar date selector.
- Dedicated filters: All, Medicines, Vitals, Nursing Procedures, Care, Food & Diet, Physiotherapy, Daily Moments.
- All view is chronological and shows category badges.
- Medicine name/strength mapping from v1.0.11 is preserved.
- Empty categories show "No records for this date" rather than placeholders.
- Mobile-friendly horizontally scrollable category buttons.

No SQL / Edge Function change is included in this package.
Note: Nursing Procedures and Daily Moments appear in the activity timeline when those record arrays are supplied by the existing Family Portal dashboard payload. Existing Medicines, Vitals, Care, Food & Diet and Physiotherapy data are included immediately.
