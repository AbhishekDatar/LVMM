# Las Vegas Marathi Mandal — refreshed website

A modern, static redesign of https://lasvegasmm.org. Plain HTML/CSS/JS with no build step.

## Run locally
```bash
python3 -m http.server 8765
```
Then open http://localhost:8765. Pages also open directly from disk.

## Deploy (GitHub Pages)
1. On GitHub, open **Settings → Pages** for `AbhishekDatar/LVMM`.
2. Under **Source**, choose **Deploy from a branch**, then pick `main` and `/ (root)`, and save.
3. The site goes live at https://abhishekdatar.github.io/LVMM/ in about a minute.
4. Optional: to use a custom domain such as lasvegasmm.org, add it under **Custom domain** and point your DNS at GitHub Pages.

All paths are relative, so the site also works as-is on Netlify, Vercel, Cloudflare Pages or any static host.

## Pages
| File | Replaces (old site) |
|---|---|
| `index.html` | Home |
| `about.html` | About Us |
| `events.html` | Events (Diwali / दीपोत्सव 2026, Ganeshotsav, annual festivals) |
| `membership.html` | Membership & Tickets (`/purchasing/`) |
| `cart.html` | Cart / Checkout |
| `marathi-shala.html` | Las Vegas Marathi Shala and its enrollment form |
| `gallery.html` | Gallery (21 photos with a lightbox) |
| `committee.html` | Executive Committee 2026 |
| `youth.html` | Vegas Yuva youth group |
| `marathi-vrutta.html` | मराठी वृत्त |
| `sponsorship.html` | Sponsorship |
| `bylaws.html` | Bylaws (embedded PDF) |
| `privacy.html` | Privacy Notice |

## Shared code
- `assets/css/styles.css` holds the design tokens and every component (maroon, saffron and marigold on cream; Fraunces, Plus Jakarta Sans and Tiro Devanagari Marathi fonts).
- `assets/js/site.js` handles:
  - **Header, nav and footer:** edit the `NAV` or `SITE` objects once and every page updates.
  - **Announcement bar:** `SITE.announcement`.
  - **Products and prices:** `PRODUCTS`.
  - **Page behaviour:** icons (`<i data-icon="…">`), the lightbox, copy buttons and the localStorage cart.

## To do (deliberately left out)
- **Payments:** `cart.html` has a "Checkout — coming soon" button. Connect Stripe, Square, Zeffy or WooCommerce there. Cart contents are in `localStorage["lvmm-cart"]`.
- **Forms:** the Shala enrollment and sponsor inquiry forms use `data-demo-form` and only show a success message. Point them at a backend such as Formspree, Google Apps Script or Netlify Forms.
- **Diwali tickets:** these still link to and embed the existing Zeffy page.
- **Committee photos:** the committee page shows initials avatars. Swap in real photos when you have them.
