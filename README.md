# VAYUMED Medical Equipment Website

Static responsive website using HTML, Tailwind CSS browser CDN, custom CSS, and vanilla JavaScript.

## Pages
- `index.html` — home / category preview
- `equipment.html` — equipment tiles and search
- `product.html?id=...` — dynamic product detail page for each equipment item

## Equipment catalog included
- Oxygen concentrators: 5 LPM, 10 LPM
- Oxygen cylinders: B Type, Jumbo
- Wheelchairs
- Beds: 2-function manual, 3-function electric, 5-function electric
- Suction machines: single jar, double jar
- BiPAP: ResMed, Philips, Oxymed, BMC
- CPAP: ResMed, Philips
- DVT compression machine
- Syringe pumps
- Patient monitors: 3-parameter, 5-parameter
- ABPM machine

## Run locally
Open `index.html` directly or use VS Code Live Server.

## Lead gate / Google Sheets
The site requires Full Name, a valid Indian mobile number, and Email before unlocking the catalogue. The unlock is saved in `sessionStorage` for the current browser tab session.

In `assets/app.js`, set `GOOGLE_SHEETS_WEB_APP_URL` to your deployed Google Apps Script Web App URL. The frontend currently logs leads to the console if no endpoint is configured; it does not persist leads to a sheet until configured.

Important: a client-side gate is not real security. The product metadata is shipped to the browser in JavaScript. If product details must be inaccessible before form submission, move the product data behind a backend and verify access server-side.

## SEO
Includes page titles/descriptions, canonical URLs, OG metadata, MedicalBusiness schema, robots.txt and sitemap.xml. Replace `https://www.vayumed.com/` if the production domain differs. Add product detail URLs to the sitemap if you later use separate static detail pages. This dynamic product page uses query parameters, which are less ideal for product-specific SEO than individual HTML pages.

## Tailwind
The browser CDN is used for easy editing. Compile Tailwind for production with the official Tailwind CLI: https://tailwindcss.com/docs/installation/tailwind-cli

## Reference-inspired layout
The design uses common healthcare UX patterns: service-led hero, clear rental/purchase CTA, scannable category cards, detail pages, phone CTA and support steps. It does not copy the reference websites' text, code or proprietary design assets.
