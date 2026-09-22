Samara Family Portal - Care Timeline Medication Details Fix

Replace these files in the Family Portal repository:
1. js/family-app-v1.0.6.js
2. index.html
3. service-worker.js

No SQL. No ERP changes. No Edge Function changes.

Change: Medication administration timeline now resolves the medication order by order_id and displays medicine name + strength/dose + administration status. The same buildTimeline function feeds the dashboard timeline, Latest Update and View All timeline.
