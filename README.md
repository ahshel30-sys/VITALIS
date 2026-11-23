# VITALIS Medical Center

A premium, accessible healthcare website concept for a fictional medical center. Built as a flagship portfolio piece: editorial typography, a soft warm-white/teal palette, locally hosted photography and a complete demonstration booking flow.

## Design source

Built from **Design One — Oberfeld** in [fable-5.2-projects / web-design-5](https://github.com/h4ni0/fable-5.2-projects/tree/main/web-design-5): a 12-column Swiss typographic grid, hairline rules instead of boxes, numbered section heads, an expandable work index, a dark team section, oversized statistics, a proportional method scale and a giant contact/footer wordmark. Its neutral paper/red system was translated into warm white, deep navy and muted teal with soft mint accents — a visual language entirely distinct from the earlier NOIRÉ and NOVALINK projects.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide icons, next/font (Inter Tight), next/image with 24 locally processed WebP photographs. No database, auth, paid API or external booking service.

## Run locally

```bash
npm install
npm run dev
# http://localhost:3000
```

Production:

```bash
npm run lint
npm run build
npm run start -- -H 127.0.0.1 -p 3000
```

`--webpack` is used for ARM environments where Turbopack native bindings are unavailable.

## Sections & functionality

- **Hero** — oversized two-line headline, mint disc, arched consultation image, trust facts and both CTAs.
- **About / trust** — editorial statement with highlighted words, care pillars and a photograph.
- **Specialties** — eight departments in an expandable index with filter groups; "Discover More" carries the selection into the booking flow.
- **Doctors** — dark section with six fictional profiles and accessible detail dialogs; "Book with this doctor" pre-selects the doctor and department.
- **Booking** — six-step flow (specialty → doctor → date → time → details → confirmation), per-step validation, back navigation, loading, success and a non-sensitive local summary.
- **Patient services & facilities** — seven editorial service rows and five locally photographed spaces.
- **Journey & testimonials** — interactive five-step timeline and clearly fictional sample impressions.
- **Insights & FAQ** — three general-information article previews with a reading dialog, plus an accessible native `<details>` FAQ.
- **Contact** — fictional details, validated contact form and an illustrative SVG demo map with a real OpenStreetMap coordinate link.
- **Footer** — newsletter demo, complete navigation, privacy/terms dialogs and oversized wordmark.

## Accessibility & privacy

Keyboard-operable navigation and dialogs with focus return, visible focus rings, labelled form controls, inline errors, semantic landmarks, reduced-motion support and a skip link. Booking notes are never stored or transmitted; only a non-sensitive summary (specialty, doctor, date, time, reference) is kept in `localStorage`. The contact message and newsletter email are also local-only demos.

## Demo-only features

The center, address, phone, email, doctors, departments, facilities, testimonials, articles and hours are fictional. To make this production-ready: connect the booking and contact handlers to a server action/API with encrypted storage, real availability, identity verification and HIPAA/GDPR-grade safeguards; integrate a verified maps provider and insurance checks; replace all sample content and imagery with real, consented assets; add analytics and a real newsletter provider; and replace the demo domain in metadata routes.

## Deployment

### Vercel

Import the repository into Vercel and keep the detected Next.js framework preset and default root directory. Vercel uses `npm install` and `npm run build`; no additional configuration or environment variables are required. The canonical URL, sitemap and robots file use Vercel's `VERCEL_PROJECT_PRODUCTION_URL` when available and fall back to `https://vitalis-demo.vercel.app` for local builds. Set the production domain in the Vercel project settings to have the generated metadata reflect your domain.

For another Node host, run `npm install`, `npm run build` and `npm run start`.

## Verification

`npm run lint` and `npm run build` pass. Browser checks covered rendering, navigation, specialty filtering, doctor profiles, the booking flow, FAQ and form validation at desktop and mobile widths.

## Photography credits

Locally hosted WebP images derived from [Unsplash](https://unsplash.com) photographs, colour-graded for this concept. All people depicted are presented as fictional demonstration profiles.
