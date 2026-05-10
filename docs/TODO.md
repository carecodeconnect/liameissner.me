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
- [ ] Real Newsletter URL
- [ ] Real LinkedIn / Instagram / Substack URLs
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

The wireframe has a `Newsletter` link in the kontakt-direct strip and `→ Newsletter abonnieren` under the Heartfelt Futures Kollektiv card. We need somewhere to send those signups.

**Options (no backend on a static GH Pages site):**

| Option | Free tier | Pros | Cons |
| --- | --- | --- | --- |
| **Substack** | unlimited | zero-build, link the existing Substack `…/subscribe` URL; matches editorial tone | Substack-branded; data lives on their platform |
| **Buttondown** | 100 subs | independent, clean writer-first UX, embeddable form action `https://buttondown.com/api/emails/embed-subscribe/<user>` | paid above 100; another service to admin |
| **Mailerlite / Kit (ConvertKit)** | 1k / 10k subs | embed form action URL; mature deliverability | heavier marketing aesthetic |
| **Beehiiv** | 2.5k subs | growth tooling, monetization later | overkill for a personal site |
| **Self-hosted listmonk** | unlimited (own infra) | data ownership, GDPR-friendly, multi-list, segmentation | needs a VM (already planned for life-repair-kit, see §5c) |

**Recommended phased approach:**
1. **Phase 0 (launch):** if Lia already has a Substack, just link to its `/subscribe` URL — zero engineering, ships with the rest of the site. If no Substack, swap to Buttondown embed (~15 LoC).
2. **Phase 1 (post-listmonk migration):** repoint the form to the shared listmonk instance — see §5c.

**Tasks:**
- [ ] Confirm with Lia: existing Substack? existing newsletter brand?
- [ ] Phase 0: replace `Newsletter` placeholder anchors in `Kontakt.astro` and the Speculative Design pillar with the chosen URL (or Buttondown form)
- [ ] Update Datenschutz page to mention the chosen newsletter provider's data flow
- [ ] Confirm consent UX matches DSGVO (double opt-in if Buttondown / explicit checkbox)

## 5c. Cross-site newsletter sync (liameissner.me ↔ life-repair-kit)

**Context:** `life_repair_kit/docs/TODO.md` §10 + §12 plans a self-hosted listmonk + n8n stack on a Scaleway VM (DEV1-S, fr-par), fronted by Caddy, with TEM as the SMTP relay. listmonk supports multiple subscriber lists in one instance. Lia is CEO of both projects → one listmonk, two lists, one source of truth for subscribers across both brands.

**Architecture (target):**
- Single listmonk instance, e.g. at `listmonk.liameissner.me` (or `listmonk.heartfeltfutures.com` once that domain exists). Brand-neutral subdomain is preferable to `listmonk.liferepairkit.com` because the instance now serves both projects.
- Lists inside listmonk: `Heartfelt Futures (liameissner.me)`, `Life Repair Kit (Resilience Radar)`, and any future Heartfelt Futures Kollektiv list.
- liameissner.me static frontend → `fetch('https://listmonk…/subscription/form', { method: 'POST', body: { email, list_uuids: ['…heartfelt-uuid…'] } })`. CORS allow-list includes `https://liameissner.me`.
- life-repair-kit Rust backend → keeps its current `/api/subscribe` flow, but writes to listmonk via the admin API instead of (or in parallel to) its own `email_subscribers` table. n8n handles fan-out and welcome emails.
- Sending: listmonk uses Scaleway TEM as SMTP relay (DKIM/SPF per sending domain → `liameissner.me` and `liferepairkit.com` need separate sender identities).
- A subscriber on both lists is automatically deduped by email — listmonk treats the email as the canonical subscriber and just attaches the list memberships.

**Open decisions (need to pick before listmonk is provisioned):**
- [ ] Hosting domain: `listmonk.liameissner.me` vs `listmonk.heartfeltfutures.com` vs keep at `listmonk.liferepairkit.com` (cross-references the open question in `life_repair_kit/docs/TODO.md` §12)
- [ ] Whether life-repair-kit's existing `email_subscribers` Postgres table is migrated into listmonk, kept in sync, or retired
- [ ] Where the TEM webhook lands once listmonk is in the loop (TEM → listmonk vs TEM → n8n vs current TEM → Rust)
- [ ] DSGVO consent text: per-list vs global — listmonk supports both
- [ ] DKIM/SPF DNS for `liameissner.me` (TEM sender authentication, similar to the records life-repair-kit set up for `liferepairkit.com`)

**Tasks (after life-repair-kit's listmonk lands):**
- [ ] Add a list in listmonk for Heartfelt Futures
- [ ] Add `liameissner.me` as a CORS-allowed origin
- [ ] Generate a public list UUID; embed in `Kontakt.astro` newsletter form
- [ ] Configure TEM sender identity for `@liameissner.me` (DKIM, SPF, return-path)
- [ ] Test end-to-end: signup → listmonk dedupe → TEM-delivered welcome email → unsubscribe link works
- [ ] Update Datenschutz page with the listmonk + TEM data flow

**Reference:** `~/projects/life_repair_kit/docs/TODO.md` items 10 + 12; `~/projects/life_repair_kit/CLAUDE.md` "Scaleway TEM" section.

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
