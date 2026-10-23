## 1.0.47 — Intake / Output history with chart and Printable PDF (needs ERP SQL 278)

For Guests on the nurses' Intake / Output chart, the Overview gets an **Intake / Output** box (today's intake / output since 7 AM and the balance) and a new **Intake / Output** page in the menu:
- Period filter — Last 7 days / This month / Selected period — with an **Apply** button.
- Summary boxes (days shown, average intake and output per day, net balance), a bar chart of intake vs output per day, and a day-wise table (7 AM to 7 AM) with the breakdown: Oral (incl. tea / milk / juice), IV, Tube feed; Urine, Drain, Vomit, Stool (count and type).
- **Print / Save PDF** with the Samara header, Guest details, summary, chart and table.
No staff names, remarks or alert limits are shown to families. The box and page appear only for Guests on the I/O chart. Run ERP SQL 278_family_portal_io_history.sql first.

## 1.0.46 — Vitals boxes navigable, Samara pink gradient

The Vitals page boxes (Blood Pressure, Pulse, SpO₂, Blood Sugar) now have the Samara pink gradient used on the nurse screensaver. Tapping a box shows only that reading's history in the table below (the column is highlighted, with a "Show all vitals" button); tapping it again shows everything.

Each box now shows the latest entry that actually has that reading, with its date / time. Before, when the last entry was sugar-only (e.g. RBS 320), Pulse and SpO₂ showed "—". The history table gets a **Sugar** column (e.g. "RBS 320"), which was missing. No database change.

## 1.0.45 — Back and Home buttons

Every page except Overview now has **← Back** (returns to the previous page) and **⌂ Home** (returns to Overview) at the top. The phone's own Back button also steps back through the pages instead of leaving the portal. Tamil: "பின்செல்" / "முகப்பு". No database change.

## 1.0.44 — Overview boxes open their pages; Latest BP fixed

All Overview dashboard boxes are now clickable (tap, click or Enter): **Medicines Today** → Medicines, **Daily Care** → Daily Care, **Latest BP** → Vitals, **Outstanding / Advance Balance** → Billing, and the **Current Condition** box → Vitals. The boxes lift slightly on hover and show a › arrow.

**Latest BP** now shows the most recent entry that actually has a BP reading. Before, when the last vitals entry was sugar-only (e.g. RBS 320), the box showed "—/—" with the RBS value. Sugar is no longer shown in the BP box (it stays on the Vitals page); the date is shown when the BP reading is not from today. Admin Preview shows the same. No database change.

## 1.0.43 — Procedure plan times in clock order

Today's planned Nursing Procedure times are listed in clock order (6:00 AM, 7:00 AM … 10:00 PM), the same as the ERP 2.18.32. No database change.

## 1.0.42 — Nursing Procedures shown to families

The **Nursing Procedures** category (Overview "Care Timeline", Activity timeline, Intelligent Report) now shows procedures done for the Guest: planned procedures recorded by the nurses (with their scheduled time, e.g. "Scheduled 1:00 PM") and procedures started through Approval Requests. Before, this category was always empty. Planned procedures no longer appear under Care. With "Nursing Procedures" selected on the Overview, today's plan is listed too ("Plan · 7:00 AM, 1:00 PM · done today 1 of 3"), and Daily Care lists each planned procedure with today's progress. No codes, rates or staff names. Admin Preview from the ERP shows the same. Requires ERP SQL 251, 252, 253 (installed) and ERP 2.18.28 for Admin Preview.

## 1.0.40 — Outside bills with the original bill

Billing now lists the outside bills Samara paid for the Guest (outside pharmacy, lab, scan, ambulance / taxi, hospital) with the actual bill amount, the handling charge, and a **View Bill** button that opens the original bill photo / PDF. Bills the family paid directly are shown as "Paid by family — not charged". Only verified bills of the family's own Guest are shown; no staff names. Matches ERP 2.17.5. Requires ERP SQL 247.

## 1.0.39 — Clean item names on bills

Internal remarks typed into a charge description (e.g. "admission …", "user-authorised consolidation; correction recorded …") are no longer shown to families; real item details such as "Suction Catheter - 14 Fr" stay. Matches ERP 2.17.4. No database change.

## 1.0.38 — Room rent shows only the final rate

When a room tariff is revised (e.g. a double room converted to single occupancy), each day's room / nursing charge is shown at the final rate only — the old rate and the separate "Room tariff adjustment" lines are no longer shown. Totals and balance are unchanged; ledger entries are not altered. Matches ERP 2.17.3. No database change required.

## 1.0.37 — Billing lines show quantity and unit price

Family billing groups same-item charges using approved quantities and unit prices when available, making each billed amount easier to understand. No database change required.

## 1.0.36 — Centre code (MOG) compulsory in the Guest ID

- The centre code must be typed (MOG for Mogappair), so future centres stay distinct. Typing only the numbers (e.g. 202610008) now shows "Please start the Guest ID with the centre code, e.g. MOG." — the portal no longer assumes MOG.
- Small letters, spaces and missing dashes are still fine (mog202610008, MOG 2026 10 8). Remembered Guest ID and the personal link work as in 1.0.35. No SQL.

## 1.0.35 — Easy Guest ID: remembered on the phone, filled from a link, typed any way

- After the first successful login, the portal **remembers the Guest ID on that phone** (never the PIN). Next time the Guest ID is already filled and the cursor waits in the PIN box — the family types only the PIN. "Change Guest ID" clears it (e.g. a shared phone).
- **Personal link** from the ERP WhatsApp text (ERP 2.16.18): https://family.samaraassistedliving.com/?id=MOG-2026-10-008 fills the Guest ID automatically; the ID is then removed from the address bar.
- The Guest ID can be **typed any way**: small letters, spaces, without dashes (mog202610008, MOG 2026 10 8, or only 202610008 for Mogappair). The portal tries the matching forms and signs in with the right one.
- Login wording: "Patient ID" → "Guest ID"; example MOG-2026-10-008. Tamil words added. No SQL.

## 1.0.34 — Fluid intake / output in simple words

- Activity timeline (Food & Diet) shows one line per day for Guests on the nurses' Intake / Output chart: "Fluid intake X ml, output Y ml" (7 AM to 7 AM; "so far today" for the current day).
- Needs ERP 2.16.11 SQL 211 (family_portal_fluid_balance). Before SQL 211 is run, nothing changes.

## 1.0.33 — Medicine held by the nurse: shown in simple words

- A medicine dose that the nurse **held** (e.g. low BP before a BP tablet) is no longer shown as a raw "Withheld" entry.
- It appears only **after the doctor's instruction is recorded**, as one simple line under Medicines, e.g. "Medicine: Amlodipine 5 mg — Held (doctor informed) · Held because the blood pressure was low (BP 90/58 mmHg). Dr. Kumar was informed and advised to give it at 12:00 PM."
- No staff names or internal remarks; nothing is shown while the doctor's instruction is still pending. Admin preview shows the same.
- Needs ERP **SQL 210** (family_portal_medicine_notes). Until it is run, held doses are simply hidden.

## 1.0.32 — Ledger PDF: balance in words

The Ledger PDF summary shows the balance in words (e.g. "Rupees Nine Hundred Thirty Only"); a credit balance is labelled "Advance balance (in your favour)" instead of a minus amount. Same wording as the ERP Final Bill (2.15.81). No SQL.

## 1.0.31 — Back button on the Ledger PDF page

The Ledger PDF page (opens as a new tab) now has a top bar with "← Back to Portal" and "Print / Save PDF"; hidden when printing. No SQL.

## 1.0.30 — Units × price on bill lines

Bills & Charges items now show quantity × unit price, e.g. "Examination Gloves (9 × ₹30)" (same day + same item + same price grouped). Items without a recorded quantity keep "Item × N". Needs ERP SQL 201 (family_portal_bill_units); until it is run the portal simply shows the item name. Same wording as the ERP Final Bill and Patient Ledger (ERP 2.15.77).

## 1.0.29 — Advance counted as Advance

An advance recorded as a Payment with category "Advance" is now counted as Advance Received (Ledger PDF summary), matching the ERP Final Bill (ERP 2.15.76). No SQL.

## 1.0.28 — Simple bill lines for families

- Billing table and Ledger PDF show only the item name (e.g. "Examination Gloves"). Accounts names, "Admin-fixed tariff", approval remarks and internal discount notes are no longer shown to families.
- Same-day charges for the same item are grouped into one line with the total, e.g. "Examination Gloves × 7 — ₹510".
- Room rent shows as "Room rent · 06-10-2026 · Room 109-B"; tariff discounts as "Room tariff adjustment · date · Room (₹3,200 → ₹2,500 per day)"; payments as "Advance received · Ref …".
- Last column renamed Mode: shows Cash / UPI etc. for payments only (no more "Not applicable").
- All Family Portal dates now DD-MM-YYYY. No SQL.

## 1.0.27 — Colourful Overview dashboard

- Overview cards now use the same colourful style as Billing: Medicines Today (pink), Daily Care (amber), Latest BP (blue), Outstanding (red), each with its own icon. 4 across on desktop, 2 on tablets, 1 on phones.
- Discounts / Adjustments moved off the Overview; it stays on the Billing page.
- When the family has paid more than the charges, the card now shows "Advance Balance ₹X · In your favour" in green (Overview and Billing) instead of a red minus amount. Fully settled shows ₹0 "All bills settled" in green.
- Fixed: Medicines Today and Daily Care now count today only (they were counting every day loaded, e.g. "59 / 9").
- Tamil wording added for the new labels. No SQL.

## 1.0.26 — Resident tariff dates and adjustment visibility

Show the resident-applicable tariff date from admission or the later tariff date. Preserve original audit entries and balances. Family Portal displays discount credits, refund debits and a separate discount total. No additional SQL migration is required; migration 182 remains the billing prerequisite.

