# liameissner.me

Personal homepage for Lia Meißner — Zukunftsforscherin, Psychologin, Strategin.
Single-page editorial site with three pillars (Strategic Foresight, Systemic Therapy, Speculative Design), a mission statement, an about section, current activities, and a contact form. German-language.

## Tech stack (baseline)

- **Astro 6** — static site generator, zero-JS by default
- **Tailwind CSS 4** — via `@tailwindcss/vite`, design tokens in `src/styles/global.css` `@theme` block
- **Vanilla JS** — small inline scripts for the pillar accordion, chip-group radio, and mobile nav toggle (no framework runtime)
- **Google Fonts** — Instrument Serif (display) + Inter (sans), preconnected
- **GitHub Pages** — static hosting via Actions workflow on push to `main`
- **Custom domain** — `liameissner.me` (CNAME file in `public/`)
- **Contact form** — third-party endpoint (Web3Forms or Formspree); set in `src/components/Kontakt.astro`

## Repository

- Initial home: `github.com/carecodeconnect/liameissner.me` (public)
- Later transfer: `github.com/heartfeltfutures/liameissner.me`
- Local git identity for this repo: `carecodeconnect@pm.me`

## Possible future migration

The site may move from Astro → SvelteKit (with `@sveltejs/adapter-static`). To keep that door open:
- Keep section components small and free of Astro-specific APIs where possible
- Keep interactive logic in plain `.js` modules (not in Astro frontmatter)
- Keep all design tokens in CSS custom properties so they survive a framework swap

## Project layout

```
src/
  layouts/BaseLayout.astro     # html shell, fonts, nav, footer
  components/
    Nav.astro                  # sticky nav + mobile menu
    Hero.astro                 # display headline + portrait
    Mission.astro              # #wofur
    Pillars.astro              # #arbeit — three-pillar accordion
    About.astro                # #uber — about Lia
    Aktuell.astro              # current teaching/podcast
    Kontakt.astro              # contact form + direct links
    Footer.astro
  scripts/site.js              # accordion / chip / mobile nav
  styles/global.css            # @theme tokens + base CSS
  pages/index.astro            # composes the components
public/
  CNAME                        # custom domain
  robots.txt
.github/workflows/deploy.yml   # Pages deploy
docs/
  TODO.md                      # 0-to-production checklist
  design/                      # LOCAL ONLY (gitignored) — wireframes / handoff
```

## Conventions

- All copy is German. Don't translate without asking.
- Design tokens (`--paper`, `--ink`, `--accent`, etc.) come from the wireframe — preserve them.
- Headlines use `Instrument Serif`; body uses `Inter`. Don't introduce new families.
- The accent blue `#1747ff` is load-bearing — used for hover states, links, accordion-open numerals, and form-submit hover.
- Mobile breakpoint is `880px` for layout, `760px` for nav, `700px` for form, `540px` for footer.

## Commands

```
npm run dev       # dev server at http://localhost:4321
npm run build     # build to dist/
npm run preview   # preview built site
```

## Deployment

Push to `main` → `.github/workflows/deploy.yml` builds + deploys to GitHub Pages. DNS: `liameissner.me` (and `www`) CNAME → `<owner>.github.io`. The `public/CNAME` file tells Pages to serve the custom domain.

## Not yet wired

- Contact form submission endpoint (Web3Forms / Formspree access key) — placeholder action set in `Kontakt.astro`
- Real photography (hero portrait, about portrait) — placeholders in place
- Final URLs for: ResearchGate, FU Berlin Anmeldung, Podcast, Newsletter, LinkedIn, Instagram, Substack, Impressum, Datenschutz
