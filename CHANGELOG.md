## 1.0.27 — Colourful Overview dashboard

- Overview cards now use the same colourful style as Billing: Medicines Today (pink), Daily Care (amber), Latest BP (blue), Outstanding (red), each with its own icon. 4 across on desktop, 2 on tablets, 1 on phones.
- Discounts / Adjustments moved off the Overview; it stays on the Billing page.
- When the family has paid more than the charges, the card now shows "Advance Balance ₹X · In your favour" in green (Overview and Billing) instead of a red minus amount. Fully settled shows ₹0 "All bills settled" in green.
- Fixed: Medicines Today and Daily Care now count today only (they were counting every day loaded, e.g. "59 / 9").
- Tamil wording added for the new labels. No SQL.

## 1.0.26 — Resident tariff dates and adjustment visibility

Show the resident-applicable tariff date from admission or the later tariff date. Preserve original audit entries and balances. Family Portal displays discount credits, refund debits and a separate discount total. No additional SQL migration is required; migration 182 remains the billing prerequisite.

