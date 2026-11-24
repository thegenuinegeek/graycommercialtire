# Placeholders to confirm before launch

Visible gaps on the site use bracketed text. Do not invent a fact to fill one. Replace the bracketed text with the confirmed wording, or remove the slot.

## Confirmed

These are no longer placeholders:

- **Hours:** Monday–Friday, 8 AM–6 PM. The page shows **Sat-Sun: Closed**. `openingHoursSpecification` lists Monday–Friday 08:00–18:00 only. Closed days are omitted on purpose. The HTML comment above the AutoRepair JSON-LD says so.
- **Main number:** (478) 936-0014. It is the shop’s main phone number.
- **Roadside service** is offered and listed with the other services. The page does not state a coverage area or a response time, because those were not provided.

## Reviews

- The rating is shown only as **4.9★ on Google**, with the sentence “The Google rating is about 4.9 stars.”
- The review count is `[review count placeholder]`. No number was invented.
- Three cards are labeled `[Customer review placeholder]`. No review quotes, reviewer names, or dates were written.

## Photos

- The hero uses the shop logo, not a storefront photo. Real shop photos can be added later.
- Hours and location: `[Shop photo placeholder — interior or work area]`
- `og:image` and the JSON-LD `logo` point at `img/logo-og.png`. Make both URLs absolute when the production domain is confirmed.

## Domain

- The production domain is unknown.
- `sitemap.xml` and `robots.txt` use `https://example.com`. Replace that host before launch.
- Canonical URL and `og:url` are omitted on purpose. A comment in `index.html` marks that.

## Contact

- The shop email is unknown and is not published. The quote form is the written contact method.
- After the Netlify deploy, choose a notification address in the Netlify Forms dashboard. Do not put a guessed address in the site.

## Social

- Facebook is linked only as `https://facebook.com/620062815120284`. A page name or vanity URL was not provided.

## Map pin in the business schema

- Latitude `32.962841`, longitude `-83.578874`.
- Source: U.S. Census Bureau Geocoder, Public AR Current benchmark, matched address `121 HOMER ROBERTS RD, GRAY, GA, 31032`, interpolated on the 101–123 range (retrieved 2026-11-24).
- This is not a surveyed door pin. Confirm it sits on the shop. Delete the `geo` block if it should be omitted.
- The on-page map is a Google Maps embed that loads when someone clicks **Show map**, plus a directions link. It searches the street address, not the Census point.

## Left out on purpose

These were not verified, so they are not on the site: years in business, certifications, warranties, tire or parts brands, and prices. Roadside coverage area and response time were not provided, so they are not stated either.
