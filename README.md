# VAYUMED Medical Equipment & Services

Responsive SEO-ready static website using HTML5, Tailwind CSS CDN, custom CSS and vanilla JavaScript.

## Files

- `index.html` — page structure, SEO metadata, Open Graph, Twitter Card and Schema.org structured data
- `assets/styles.css` — custom brand and responsive styles
- `assets/app.js` — mandatory lead gate, validation and Google Sheets integration
- `assets/vayumed-logo.png` — VAYUMED logo
- `assets/vayumed-icon.png` — favicon/app icon
- `robots.txt`
- `sitemap.xml`

## Lead gate

Visitors must submit Full Name, Mobile Number and Email before equipment details are unlocked.
The unlock state is stored in `sessionStorage`.

This is a client-side UX gate, not a security boundary. If product information must be truly private, serve it from a backend after server-side lead verification.

## Google Sheets

Set this value in `assets/app.js`:

`const GOOGLE_SHEETS_WEB_APP_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';`

Recommended columns:

Timestamp | Name | Mobile | Email | Equipment | Source | Page

## SEO launch checklist

1. Replace `https://www.vayumed.com/` with the real domain if different.
2. Keep one clear H1 on the homepage.
3. Submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools.
4. Add real business location/service areas once finalized.
5. Add verified Google Business Profile details if applicable.
6. Replace stock images with product photos you have permission to publish.
7. Do not claim official dealership/authorization for ResMed or Philips Respironics unless verified.
8. For production, compile Tailwind rather than relying on the browser CDN.
