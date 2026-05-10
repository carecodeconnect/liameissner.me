# 0 → Production checklist

Track of what's needed to ship `liameissner.me`.

## 1. Local scaffolding ✅
- [x] `git init` (main branch)
- [x] Astro 6 minimal scaffold
- [x] Tailwind 4 via `@tailwindcss/vite`
- [x] Local git identity → `carecodeconnect@pm.me`
- [x] `docs/design/` gitignored (wireframe local-only)

## 2. Translate wireframe → Astro components
- [ ] `BaseLayout.astro` (html, fonts, nav, footer slots)
- [ ] `Nav.astro` (sticky, mobile menu)
- [ ] `Hero.astro` (display headline, portrait)
- [ ] `Mission.astro` (#wofur)
- [ ] `Pillars.astro` (three-pillar accordion + content data)
- [ ] `About.astro` (#uber)
- [ ] `Aktuell.astro` (current teaching/podcast)
- [ ] `Kontakt.astro` (form + chip group + direct links)
- [ ] `Footer.astro`
- [ ] `scripts/site.js` (accordion, chip, mobile nav)
- [ ] `styles/global.css` with design tokens in `@theme`
- [ ] `pages/index.astro` composes the above

## 3. Local verification
- [ ] `npm run dev` — visual parity with wireframe
- [ ] `npm run build` succeeds with no warnings
- [ ] `npm run preview` — accordion, chips, mobile nav all work
- [ ] Lighthouse: Performance ≥ 95, Accessibility ≥ 95, Best Practices = 100, SEO ≥ 95
- [ ] Test on real iOS Safari + Android Chrome
- [ ] Reduced-motion users get no smooth scroll

## 4. Content polish
- [ ] Hero portrait (Lia im Mast) — replace placeholder
- [ ] About portrait (Studio) — replace placeholder
- [ ] Real ResearchGate URL
- [ ] Real FU Berlin Anmeldung URL
- [ ] Real Podcast URL
- [x] Real LinkedIn URL — `linkedin.com/in/liameissner` (Instagram + Substack dropped from launch)
- [ ] Confirm Kontakt email (`hallo@liameissner.de` vs `.me`)
- [ ] Impressum page
- [ ] Datenschutz / DSGVO page

## 5. Contact form wiring
- [ ] Choose endpoint: Web3Forms (free unlimited) or Formspree (free 50/mo)
- [ ] Replace `action="#"` with endpoint URL
- [ ] Add hidden `_redirect` (or equivalent) → `/danke.html`
- [ ] Create `src/pages/danke.astro` thank-you page
- [ ] Spam protection (honeypot field, optional captcha)
- [ ] Test end-to-end submission

## 5b. Email / Newsletter signup

**Decided 2026-05-10: dropped from the liameissner.me launch.** No newsletter signup on this site. The `Newsletter` link in the kontakt-direct strip and the `→ Newsletter abonnieren` CTA on the Heartfelt Futures Kollektiv card have been removed (the kollektiv card now CTAs `→ Mitmachen` pointing at the contact form).

If a newsletter is added later, the relevant background — Substack vs Buttondown vs shared listmonk, plus the cross-site sync architecture — was captured in this section's prior revision (see git log) and remains valid: the simplest re-entry is to subscribe to the listmonk instance that life-repair-kit is standing up (`life_repair_kit/docs/TODO.md` §12), since Lia is CEO of both brands and a single listmonk with multiple lists deduplicates subscribers across the two sites for free. Until then, this is closed.

## 6. SEO / OG
- [ ] `<title>` + `<meta description>` per page
- [ ] OG image (1200×630, paper background, serif name)
- [ ] `og:title`, `og:description`, `og:image`, `twitter:card` meta
- [ ] `public/robots.txt`
- [ ] `public/sitemap.xml` (or `@astrojs/sitemap` integration)
- [ ] `public/favicon.svg` + apple-touch-icon

## 7. GitHub setup
- [ ] Create `github.com/carecodeconnect/liameissner.me` (public)
- [ ] Push initial commit
- [ ] In repo settings → Pages → Source: GitHub Actions
- [ ] First workflow run green
- [ ] Verify site loads at `<owner>.github.io/liameissner.me/` (until DNS)

## 8. Custom domain
- [ ] At domain registrar, add records for `liameissner.me`:
  - `A` records for apex → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
  - `CNAME` for `www` → `<owner>.github.io`
- [ ] `public/CNAME` contains `liameissner.me`
- [ ] In Pages settings, set custom domain → `liameissner.me`
- [ ] Wait for DNS check ✓
- [ ] Enable "Enforce HTTPS"

## 9. Launch
- [ ] Verify https://liameissner.me loads
- [ ] Submit contact form (real submission test)
- [ ] Share with Lia for review

## 10. Later — repo transfer
- [ ] Create `github.com/heartfeltfutures` org (if not exists)
- [ ] Transfer repo from `carecodeconnect` → `heartfeltfutures`
- [ ] Update `<owner>` in CNAME and DNS records
- [ ] Update Actions deploy permissions

## 11. Possible future migration
- [ ] Evaluate SvelteKit (`@sveltejs/adapter-static`) once site stabilizes
- [ ] Decision criterion: are we adding enough interactivity to justify it?
