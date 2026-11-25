# Gray Commercial Tire and Auto

A fast, static multi-page marketing website for **Gray Commercial Tire and Auto** at `121 Homer Roberts Rd, Gray, GA 31032`. Plain HTML, CSS, and JavaScript with zero build step and zero framework dependencies.

## Preview Locally

From this folder:

```bash
python3 -m http.server 47814
```

Open `http://127.0.0.1:47814/`.

The quote form on `index.html` is configured for Netlify Forms (`data-netlify="true"`, honeypot, hidden `form-name`). On a local server, a valid submission redirects to `thanks.html?preview=local` without storing form data.

## Pages & AIO Files

- `index.html` — Main landing page (`TireShop` + `AutoRepair` + `FAQPage` JSON-LD)
- `tires-and-wheels.html` — Passenger, commercial, and agricultural tires, balancing, and rotation
- `auto-repair.html` — Brakes, wheel alignments, front end, suspension, diagnostics, oil changes, and mechanical repair
- `truck-upgrades.html` — Lift kits, leveling kits, and bumpers
- `roadside-service.html` — Roadside service across Gray, Jones County, Macon, and Milledgeville
- `thanks.html` — Form confirmation page (`noindex`)
- `404.html` — Custom not-found page (`noindex`)
- `llms.txt` — Structured Markdown entity summary for AI search engines
- `robots.txt` & `sitemap.xml` — Crawler and sitemap directives
- `site.webmanifest` — App/icon manifest

## Deploy

Publish this directory on Netlify (`netlify.toml` sets `publish = "."` with caching and security headers, plus 404 rules keeping `PLACEHOLDERS.md` and `README.md` private on Netlify). Review [PLACEHOLDERS.md](PLACEHOLDERS.md) before connecting the final production domain.
