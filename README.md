# Terra Property Manager

A lightweight, local-first property dealer workspace for listings, plots, enquiries, deals and billing. Property and account records are stored in SQLite on this computer so they remain available after leaving the page or restarting the app.

## Start the app

Requirements: Node.js 22.13 or newer.

1. Open this folder in File Explorer.
2. Double-click `start.bat`. It starts the local service in the background; startup logs are written to `data/server.log` and `data/server-error.log`.
3. Open <http://127.0.0.1:4174> in your browser.
4. Enter your name. The first visit creates a workspace; entering the same name again opens its saved records.

Opening `index.html` directly shows startup instructions because the browser cannot start the local database service on its own. Start the app with `start.bat` before opening the address above.

The app uses Node's built-in SQLite module and has no npm packages to install. The first run creates `data/terra.sqlite`.

## What it includes

- Overview for inventory, open enquiries, deal pipeline and invoice balances.
- Property listings for sale or rent, including plot and land type, price, area, locality, BHK, mobile contact, notes and a cover image.
- Enquiry capture, search, status updates and CSV export.
- Deal pipeline linked to a buyer enquiry or property, with deal value, commission estimate, stage and expected close date.
- Invoice creation from a deal or from scratch, Indian state selection, seller and client details, optional GST, CGST/SGST or IGST totals, issue status, payment entries, remaining balance, print / save as PDF and CSV export.
- India-wide interactive map using OpenStreetMap tiles, city navigation and click-to-pin coordinates for plots.
- Account settings for agency name, contact mobile, billing address, state and GSTIN.

## Data and access

All workspace records stay in `data/terra.sqlite`. Stop the app and copy the complete `data` folder to make a backup. Do not delete or share it if it contains client details.

Entry is intentionally name-only, as requested. A name is not a password: another person who enters the same name on this computer can open that workspace. Use this local version on a trusted device; it is not suitable as public internet account authentication or a multi-user cloud service. A valid mobile number is optional for entry and can be added in Agency details for listing contacts and invoices.

## Services and scope

The map uses OpenStreetMap map tiles and needs an internet connection to display the basemap. Property records still work if the map service is unavailable. The included city directory covers major Indian cities and state/UT capitals; precise plot pins come from clicking the map.

Invoices can be printed or saved to PDF through the browser. The app does not submit tax returns, verify GSTINs, collect online payments, send OTPs, publish listings to Square Yards or other portals, or send WhatsApp/SMS messages. Confirm GST registration, tax rate, SAC code and invoice treatment with your accountant before issuing real invoices.

## Reference

The project adapts the supplied Square Yards documentation for a property dealer's operations. It focuses on listing data, enquiry follow-up, broker pipeline, mapped inventory and billing rather than recreating the consumer marketplace, finance, or services portals.
