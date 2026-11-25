# Pre-Launch Checklist & Unconfirmed Details

All visible `[placeholder]` markers and draft notices have been removed from the live HTML pages so the site looks production-ready today. Before final domain launch, review and confirm the items below—do **not** invent facts to fill any gap.

## 1. Production Domain (Required Before Launch)

- Confirm the final production domain (for example, `https://graycommercialtire.com`).
- Replace `https://example.com` in:
  - `robots.txt`
  - `sitemap.xml`
- Add `<link rel="canonical" href="https://YOURDOMAIN/...">` and `<meta property="og:url" content="https://YOURDOMAIN/...">` to:
  - `index.html`
  - `tires-and-wheels.html`
  - `auto-repair.html`
  - `truck-upgrades.html`
  - `roadside-service.html`
- Make `og:image`, `twitter:image`, and JSON-LD `logo` / `image` / `@id` / `BreadcrumbList` URLs absolute (`https://YOURDOMAIN/...`).

## 2. Google Business Profile, Map Pin & Reviews

- **Verified GBP URL & Pin:** Currently `index.html` links `"Read Reviews on Google"` to a Maps search query, and the JSON-LD `geo` coordinates (`32.962841`, `-83.578874`) are U.S. Census Bureau interpolated coordinates. Confirm the exact rooftop pin in Google Maps and add `"hasMap"` with the verified Place URL.
- **Review Count & Customer Quotes:** Currently the site displays the confirmed `4.9★ on Google` rating without inventing a review count or testimonials. Once you confirm the exact Google review count and select real customer reviews from Google, you can add `aggregateRating` to the JSON-LD (`ratingValue: "4.9"`, `reviewCount: "<confirmed>"`) and display verbatim quotes.

## 3. Photography & Shop-Specific Details

- **Photography:** Unbranded atmospheric garage, tire, brake, lifted pickup, and roadside WebP visuals (`img/hero-garage.webp`, `img/card-tires.webp`, `img/card-repair.webp`, `img/card-trucks.webp`, `img/card-roadside.webp`) are included for visual impact without claiming to depict the building exterior. Swap in on-site photos of 121 Homer Roberts Rd and shop service trucks anytime.
- **Confirmed Brands & Capabilities:** Tire brands stocked/ordered, fleet account/billing details, warranties, certifications (e.g., ASE/TIA), years in business, roadside coverage radius/after-hours details, and a vanity Facebook URL (currently `https://facebook.com/620062815120284`) remain omitted until verified.

## 4. Netlify Notification Email

- In the Netlify dashboard, configure the form notification email address for the `quote` form (`data-netlify="true"`).
