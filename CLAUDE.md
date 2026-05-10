# liameissner.me

Personal homepage for Lia Meißner — Zukunftsforscherin, Psychologin, Strategin.
Single-page editorial site with three pillars (Strategic Foresight, Systemic Therapy, Speculative Design), a mission statement, an about section, current activities, and a contact form. German-language.

Live: https://liameissner.me — hosted on GitHub Pages, source at `github.com/heartfeltfutures/liameissner.me`.

---

## Operator quickstart (read this first)

This repo is maintained by a non-developer. If you (Claude Code) are running on a fresh Mac:

1. **Verify tooling**: `command -v node && command -v npm && command -v git` — git is required; node/npm may be missing.
2. **If `node_modules/` is missing or `node` isn't installed**: run `./scripts/setup.sh`. It bootstraps Homebrew → Node → `npm ci`. Idempotent.
3. **Preview local changes**: `npm run dev` → http://localhost:4321
4. **Publish a change**: `./scripts/publish.sh "short message describing the change"` — runs build, commits, pushes. Push to `main` triggers GitHub Actions which deploys to Pages within 1–2 minutes.

If a step fails interactively (e.g., Homebrew install needs sudo), surface the exact command for the user to run themselves rather than retrying blindly.

## Editorial workflow — common edits

The site is German. **Do not translate copy without being asked.**

| Task | File |
|---|---|
| Hero headline / tagline | `src/components/Hero.astro` |
| Mission statement (`#wofur`) | `src/components/Mission.astro` |
| Pillar copy / sub-cards / CTAs | `src/components/Pillars.astro` |
| About text (`#uber`) | `src/components/About.astro` |
| Current teaching / podcast (`#aktuell`) | `src/components/Aktuell.astro` |
| Contact form copy + direct links | `src/components/Kontakt.astro` |
| Footer | `src/components/Footer.astro` |
| Nav labels / order | `src/components/Nav.astro` |
| Site-wide CSS tokens (colors, type) | `src/styles/global.css` (`@theme` block) |
| Hero / portrait images | `src/assets/` (referenced via Astro `<Image>`) |

External URLs (LinkedIn, ResearchGate, Life Repair Kit, FU Berlin Anmeldung, podcast episode, etc.) live inline in the relevant component — `grep -rn "https://" src/components/` to find them all.

When swapping an image: drop the new file into `src/assets/`, update the `import` at the top of the component. Astro `<Image>` handles optimisation automatically. Don't put final images in `public/` — that bypasses optimisation.

## Publishing

`git push origin main` is the only deploy mechanism. There is no separate "deploy" step. The `./scripts/publish.sh` wrapper:

1. Runs `npm run build` (catches type/asset errors before push)
2. `git add -A && git commit -m "<msg>"`
3. `git push origin main`

After push, watch https://github.com/heartfeltfutures/liameissner.me/actions — the *Deploy to GitHub Pages* workflow should go green in 1–2 min.

If the build fails: don't push. Fix the error first, then re-run `./scripts/publish.sh`.

## Asking @claude from GitHub (no local setup required)

Anthropic's Claude GitHub App is installed on this repo (`.github/workflows/claude.yml` wires it up). To request a change from a phone, browser, or anywhere without opening a Claude Code session:

1. Open a new issue on `github.com/heartfeltfutures/liameissner.me/issues`
2. Describe the change in plain language (German or English): e.g., *"@claude please update the Aktuell section: the next FU Berlin module starts on 2026-09-15."*
3. Claude reads the repo, opens a PR with the proposed change.
4. Review the PR's diff and *Files changed*. If it looks right, **Merge** — the deploy workflow runs automatically on merge to `main`.

Setup notes (one-time, already done): the App is installed at https://github.com/apps/claude on this repo, and an `ANTHROPIC_API_KEY` secret is configured under Settings → Secrets and variables → Actions. If `@claude` ever stops responding, check that secret hasn't been deleted or rotated.

## Tech stack

- **Astro 6** — static site generator, zero-JS by default
- **Tailwind CSS 4** — via `@tailwindcss/vite`, design tokens in `src/styles/global.css` `@theme` block
- **Vanilla JS** — small inline scripts for the pillar accordion, chip-group radio, and mobile nav toggle (no framework runtime)
- **Google Fonts** — Instrument Serif (display) + Inter (sans), preconnected
- **GitHub Pages** — static hosting via Actions workflow on push to `main`
- **Custom domain** — `liameissner.me` (apex A → 185.199.108.153, AAAA → 2606:50c0:8000::153 at Strato; `www` CNAME → `heartfeltfutures.github.io`)
- **Contact form** — third-party endpoint (Web3Forms or Formspree); set in `src/components/Kontakt.astro`

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
  assets/                      # hero / portrait imagery (optimised by Astro <Image>)
  pages/index.astro            # composes the components
public/
  CNAME                        # custom domain (liameissner.me)
  robots.txt
.github/workflows/
  deploy.yml                   # Pages deploy on push to main
  claude.yml                   # @claude mentions → claude-code-action
scripts/
  setup.sh                     # first-time machine bootstrap
  publish.sh                   # build + commit + push
docs/
  TODO.md                      # 0-to-production checklist
  design/                      # LOCAL ONLY (gitignored) — wireframes / handoff
```

## Conventions

- All copy is German. Don't translate without asking.
- Design tokens (`--paper`, `--ink`, `--accent`, etc.) come from the wireframe — preserve them.
- Headlines use `Instrument Serif`; body uses `Inter`. Don't introduce new families.
- The accent blue `#1747ff` is load-bearing — used for hover states, links, accordion-open numerals, and form-submit hover.
- Mobile breakpoints: `880px` (layout), `760px` (nav), `700px` (form), `540px` (footer).
- Don't bump dependency major versions without being asked.
- Don't push without a successful local `npm run build`. (`./scripts/publish.sh` enforces this.)

## Possible future migration

The site may move from Astro → SvelteKit (`@sveltejs/adapter-static`). To keep that door open:
- Keep section components small and free of Astro-specific APIs where possible.
- Keep interactive logic in plain `.js` modules (not in Astro frontmatter).
- Keep all design tokens in CSS custom properties so they survive a framework swap.

## Not yet wired

- Contact form submission endpoint (Web3Forms / Formspree access key) — placeholder action set in `Kontakt.astro`.
- Final URLs for: FU Berlin Anmeldung, Podcast, Impressum, Datenschutz.
