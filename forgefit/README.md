# FORGEFIT — Strength & Conditioning Studio

A premium multi-page website template for gyms, fitness studios, boxing clubs and
personal-training businesses. Dark, high-energy design with a volt-lime accent,
condensed display typography and fully original SVG artwork.

## Pages (6)

| File | Purpose |
|---|---|
| `index.html` | Hero with animated counters, program preview, facilities, trainers preview, pricing teaser, rotating testimonials, CTA |
| `about.html` | Studio story, the ForgeFit code (values), milestone timeline, facility highlights |
| `classes.html` | Six-program catalog + filterable weekly class schedule |
| `trainers.html` | Coach roster with specialty filter and credential tags |
| `membership.html` | Three pricing tiers, interactive BMI calculator, membership FAQ accordion |
| `contact.html` | Free-trial booking form (validated, with success state), contact cards, hours, map placeholder |

## Features

- Bootstrap 5.3 responsive layout (mobile-first, collapsible navbar)
- Original content throughout — no lorem ipsum
- 100% original SVG artwork (hero athlete, 4 coach portraits, 3 facility illustrations) — no stock photos, no licensing issues
- Interactive: scroll-reveal animations, animated stat counters, schedule day filter, trainer specialty filter, BMI calculator with result scale, FAQ accordion, testimonial rotator, validated forms with demo success states, back-to-top button
- SEO basics: semantic HTML, meta descriptions, alt text, aria labels

## Folder structure

```
forgefit/
├── index.html / about.html / classes.html / trainers.html / membership.html / contact.html
├── README.md
└── assets/
    ├── css/style.css      # full design system (custom properties, components)
    ├── js/main.js         # navbar, counters, filters, BMI calc, FAQ, forms, rotator
    └── images/            # 8 original SVG illustrations
```

## Customisation

- **Colours:** edit the `:root` variables at the top of `assets/css/style.css`
  (`--volt` accent, `--ember` secondary, `--bg` / `--surface` backgrounds).
- **Fonts:** headings use Oswald, body uses Inter (Google Fonts links in each page `<head>`).
- **Content:** all copy lives directly in the HTML files; class times in the
  schedule table on `classes.html`; prices in the `.price-card` blocks.
- **Forms:** the trial form and BMI calculator are front-end demos. Connect the
  form's `submit` handler in `assets/js/main.js` to your booking endpoint to go live.
- **Map:** replace the `.map-frame` panel on `contact.html` with a Google Maps embed.

## Credits

- Layout framework: Bootstrap 5.3 (MIT, via jsDelivr CDN)
- Fonts: Oswald + Inter (Google Fonts, SIL Open Font License)
- All artwork, icons and copy are original and created for this template.

## Browser support

Chrome, Firefox, Safari, Edge (latest two versions). Tested responsive at
360px, 768px, 1024px and 1440px widths.
