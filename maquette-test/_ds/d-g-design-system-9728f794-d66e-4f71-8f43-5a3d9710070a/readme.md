# D-g Design System

**D-g** est une application web qui centralise le suivi des réparations de vélos. Elle simplifie l'organisation de l'atelier et offre aux clients un accès autonome à l'état d'avancement de leur réparation.

Two audiences, two surfaces:

| Surface | Who | What it does |
|---|---|---|
| **Atelier** (app) | Mechanics, workshop manager | Repair register, intake, status changes, parts, planning |
| **Espace client** | Bike owners | Look up a repair by reference, follow its status, approve a quote |
| **Site vitrine** | Prospective workshops | Marketing hero, features, pricing |

## Sources

- `uploads/DESIGN-notion.md` — the visual-language specification supplied by the user (a structured analysis of a warm, paper-calm productivity aesthetic: off-white canvas, near-black Inter type, one confident blue, a decorative multi-colour "sticker" palette). Every colour, type, radius, spacing, elevation and component spec in this system is lifted from that file verbatim; nothing was rounded or re-invented.
- No codebase, Figma file, screenshots, logo files or font binaries were provided. Anything not present in that document is flagged below as a substitution or an intentional addition.

## Index

- `styles.css` — the single entry point consumers link. `@import` list only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `elevation.css`, `motion.css`
- `components/` — React primitives, grouped by concern (see below)
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Shape, Brand)
- `ui_kits/atelier/` — workshop app recreation (`index.html` + screens)
- `ui_kits/espace-client/` — customer-facing repair tracking
- `thumbnail.html` — homepage tile
- `SKILL.md` — Agent Skills entry point

### Components

| Group | Components |
|---|---|
| `components/buttons/` | **Button**, **IconButton** |
| `components/forms/` | **TextInput**, **Select**, **Checkbox** |
| `components/badges/` | **Badge**, **StatusPill** (+ `DG_STATUSES`) |
| `components/cards/` | **Card**, **PricingPlanCard**, **HeroBand**, **EmptyState** |
| `components/navigation/` | **NavBar**, **SidebarRow**, **Footer** |
| `components/feedback/` | **Toast**, **Modal** |
| `components/data/` | **DataTable** |

Each directory holds `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md` and one `@dsCard` HTML.

**Intentional additions** (not named in the source spec, added because D-g's flows require them):

- **StatusPill** — the six repair states. The spec has no semantic ramp; status is carried by the sticker palette, so each state gets a sticker dot on a 5px tinted pill.
- **Select**, **Checkbox** — intake and settings forms need them; both wear the exact `text-input` chrome (4px corners, `#dddddd` border).
- **EmptyState**, **Toast**, **Modal**, **DataTable** — specified in the source as `ex-*` illustrative surfaces; promoted to real components.

## Content fundamentals

**Language.** French, always. `vous` for customers, never `tu`. The interface addresses the reader directly ("Votre vélo est prêt"), and refers to the workshop in the third person ("L'atelier a commandé la pièce") — never "nous" in product chrome.

**Tone.** Factual and calm. D-g exists to stop phone calls, so every string answers a question a customer would otherwise have to ask: what state is my bike in, what happens next, when. State the fact, then the consequence. No enthusiasm, no apology, no marketing voice inside the app.

- ✅ « Pièce commandée, réception prévue vendredi. »
- ✅ « Votre vélo est prêt. Récupération aux horaires de l'atelier. »
- ❌ « Super, ton vélo est prêt ! 🚲 »
- ❌ « Nous avons le plaisir de vous informer que… »

**Casing.** Sentence case everywhere — headings, buttons, labels. The only uppercase is the 12px eyebrow role (table headers, section labels), where it is a typographic device, not emphasis. French spacing rules apply: narrow space before `: ; ! ?`, `«` `»` for quotes.

**Buttons.** Verb-first infinitives: « Créer une fiche », « Marquer prêt », « Valider le devis ». Never « OK » or « Soumettre ». Destructive actions name the object: « Supprimer la fiche ».

**Numbers & dates.** French formats — `39 €`, `12/03`, « Ven. 31 », « il y a 4 minutes ». Repair references are `DG-1042`, always in tabular figures.

**Emoji.** Never. Not in the product, not in marketing, not in notifications. Personality lives in colour and illustration, never in punctuation or emoji.

**Marketing voice.** Slightly warmer, still short. Display headlines are one clause, no full stop when standing alone: « Vos réparations, au clair ». Subtitles are one sentence stating the mechanic's benefit.

## Visual foundations

**Canvas & figure/ground.** The page is warm paper `--canvas` (#f6f5f4), never clinical white. Cards, fields and the nav bar are pure white `--surface-card` on top of it. That single half-step of contrast is what defines every surface — the system uses figure/ground, not shadow.

**Colour.** Exactly one structural accent: `--action` #0075de. It paints the primary CTA, inline links, the active sidebar row and the focus ring — nothing else. Pressed goes to #005bab. Deep indigo #213183 appears once per page maximum, as the full-bleed hero band. The sticker palette (sky, purple, pink, orange, teal, green, brown) is decoration only: illustration blocks, card accent bands, category dots, status dots. It never fills a button and never carries structure. Ink runs black → #31302e → #615d59 → #a39e98.

**Type.** One family, Inter, from 64px display to 12px eyebrow. Headlines are 700 with aggressive negative tracking that scales with size (−2.125px at 64px, −1px at 40px, −0.25px at 22px) — apply it explicitly; Inter at default tracking reads too loose. Body stays 400 at 1.5. The 700/400 contrast is the only expressive lever; there is no decorative type, no serif, no mono.

**Spacing & layout.** 8px base. Cards pad at 24px, fields at 6px, utility buttons at 4px/14px. Sections are separated by ~80px of whitespace rather than rules. Content centres in a ~1200px container with generous gutters; the hero goes full-bleed while body sections respect the container. Whitespace is the grouping device.

**Backgrounds.** Flat colour only. No photographic backgrounds, no repeating textures, no grain. The one gradient permitted in the whole system is the soft radial glow inside the indigo hero band (a lit-night effect, `radial-gradient(… rgba(98,174,240,.35) …)`); nowhere else. No bluish-purple SaaS gradients.

**Borders & elevation.** Every surface is a 1px `--border-hairline` (#e6e6e6); form fields use a slightly darker #dddddd. Elevation is barely-there: Level 1 is four near-transparent layers ending in `rgba(0,0,0,.04) 0 4px 18px`, Level 2 adds a fifth ending in `rgba(0,0,0,.05) 0 23px 52px`. Most cards use no shadow at all. Never a hard cast shadow, never an inner shadow.

**Corners.** 4px form fields · 5px list rows and status pills · 8px utility buttons and pricing columns · 12px cards · 16px large wells, modals, toasts · pill for marketing CTAs, badges and circular icon buttons. The contrast between pill CTAs and tight 4px inputs is deliberate — never round a field.

**Cards.** White, hairline, 12px, 24px padding, flat by default. Optional 8px colour-blocked accent band in a sticker colour along the top edge. Footers are separated by a hairline, not a fill.

**Hover.** Primary buttons darken to `--action-pressed`; secondary deepens its shadow from Level 1 to Level 2; utility and ghost pick up a faint fill (`--canvas` or 5% black); table rows tint to `--canvas`; links darken and underline. Never scale on hover, never lighten.

**Press.** `transform: scale(0.96)` plus the darker fill, 120ms. That small squeeze is the system's signature interaction.

**Focus.** `0 0 0 3px rgba(0,117,222,.25)` ring, no outline offset games. Fields keep their border colour.

**Animation.** Short and unshowy: 120ms for state changes, 180ms default, 260ms for surfaces entering. Easing `cubic-bezier(.2,0,0,1)` — quick out, gentle settle. Fades and small translations only; no bounce, no spring, no parallax, no scroll-triggered reveals.

**Transparency & blur.** Rare. Translucent black at 5% for circular icon buttons and ghost hovers, translucent white at 14% on the indigo band, and a 2px backdrop blur behind modals. Nothing else is glassy.

**Imagery.** Product screenshots sit in 12–16px rounded wells with a hairline edge, no crop art-direction. Photography, when used, is neutral daylight — warm-neutral, unfiltered, no duotone, no grain. Illustration is flat colour-blocked shapes from the sticker palette. **No image assets were supplied**; kits use plain tinted placeholder wells and say so.

**Fixed elements.** One sticky element per view: the top nav on marketing/client pages, the sidebar in the atelier app. Toasts anchor bottom-right. Nothing else floats.

## Iconography

The source document specifies **no icon set, no icon font, no SVG assets and no illustration files** — it describes decorative "sticker" illustrations without shipping any.

**Substitution (please confirm):** D-g uses **[Lucide](https://lucide.dev) 0.454.0 from CDN** — `https://unpkg.com/lucide@0.454.0/dist/umd/lucide.min.js` — at **1.5px stroke**, 16–20px in UI chrome, 20–24px in empty states, always `currentColor`. Lucide is the closest match to the system's quiet, thin-stroke, geometric chrome, and it carries the bike-shop vocabulary the product needs (`bike`, `wrench`, `package`, `clipboard-list`, `bell`, `clock`).

- Icons never carry colour on their own: they inherit the text colour of their row. The only coloured glyph-like element is the status dot, which is a filled circle, not an icon.
- **No emoji, ever** — in product, marketing or notifications.
- Unicode characters are used only as typographic marks (`×` close, `✓` in feature checklists, `›` chevrons where a real icon would be noise).
- No PNG icons, no icon font, no sprite sheet.
- **No logo mark exists.** None was supplied, and none was drawn. Everywhere a mark would go, the wordmark **D-g** is set in Inter 700 at −0.5px tracking (see the Wordmark card). If a real logo exists, drop the SVG into `assets/` and swap the `brand` prop on `NavBar` / `Footer`.

## Substitutions to confirm

1. **Typeface** — the spec names `NotionInter`, a proprietary tuning. Substituted with **Inter** (Google Fonts, weights 400/500/600/700) loaded via `@import` in `tokens/fonts.css`. Send the real font files and I'll self-host them.
2. **Icons** — Lucide via CDN, as above.
3. **Logo & imagery** — absent; wordmark type and empty placeholder wells used instead.

## Do / Don't

**Do** reserve blue for the one action · keep pages on warm paper · let the sticker palette live in illustration, accent bands and status dots only · apply the negative tracking explicitly · use pill CTAs and 8px utility buttons together · define surfaces with hairlines · use the indigo band once.

**Don't** paint a CTA in a sticker colour · introduce a second structural accent · round form fields into pills · cast a hard shadow · set body copy at 700 · run full pages on pure white · use emoji.
