// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Base path: while served from a project-page URL
// (https://carecodeconnect.github.io/liameissner.me/) we need /liameissner.me
// as the base so /_astro/... assets resolve. CI sets SITE_BASE; local dev
// defaults to '/'. When DNS is wired up and the site moves to the apex
// liameissner.me domain, drop the SITE_BASE env var from the workflow.
const base = process.env.SITE_BASE ?? '/';

export default defineConfig({
  site: 'https://liameissner.me',
  base,
  vite: {
    plugins: [tailwindcss()],
  },
});