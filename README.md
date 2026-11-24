# Gray Commercial Tire and Auto

A static marketing site for Gray Commercial Tire and Auto at 121 Homer Roberts Rd, Gray, GA 31032. Plain HTML, CSS, and JavaScript. No build step and no framework.

## Preview locally

From this folder:

```bash
python3 -m http.server 47814
```

Open [http://127.0.0.1:47814/](http://127.0.0.1:47814/).

The quote form is marked up for Netlify Forms (`data-netlify="true"`, honeypot, hidden `form-name`). On this local server, a valid submit opens `thanks.html` in preview mode and does not store the message. On Netlify, the same form is posted and then opens `thanks.html`.

## Deploy

Publish this folder on Netlify with no build command. `netlify.toml` already sets the publish directory to the project root. After deploy, set the form notification address in the Netlify dashboard. The shop email is not in this project.

Read [PLACEHOLDERS.md](PLACEHOLDERS.md) before the site goes live. Bracketed notes on the page are facts or photos that still need confirmation.

## Pages

- `index.html` — landing page
- `thanks.html` — form thank-you page (`noindex`)
