# knowdexia marketing website

Separate, dependency-free static marketing site for https://knowdexia.com. The Knowdexia application is not modified or imported at build time.

## Run

Requires Node 22+. No dependency installation is needed.

```sh
npm run dev       # builds once, then serves http://localhost:4321
npm run build     # writes deployable files to dist/
npm run preview   # serves the existing build
npm test          # run after building: metadata, internal links/anchors/assets, config, sitemap
npm run lint      # JavaScript syntax checks (no external linter)
```

After source edits, rerun `npm run build` and refresh the browser. `PORT` changes the preview port. The preview server binds to loopback and returns the designed 404 with HTTP 404 for missing pages.

## Configuration and launch

Copy `.env.example` to `.env`, or supply environment variables when building.

- `APP_URL`: the real production application URL. It is not known from the application repository. When unset, every **Try Knowdexia** button leads to `/get-started`, which explains current local access; no hosted sign-up is implied. Configure this once to update all CTAs. Only HTTP(S) URLs are accepted.
- `SITE_URL`: defaults to `https://knowdexia.com`. Used for canonical URLs, social metadata, structured data, sitemap, and robots. Use a dedicated staging origin if needed.
- `LEGAL_APPROVED`: defaults to false. Privacy and terms are **drafts**, noindexed and excluded from the sitemap. Replace the drafts in `src/site.mjs` with approved content, including the actual operator identity, contact, hosting/logging practices, and applicable terms. Only then set true.

For a release build, use `RELEASE=true npm run build`. It requires an explicit application URL and `LEGAL_APPROVED=true`; the flag alone does not replace the legal draft text. The normal preview build allows unfinished configuration.

Deploy `dist/` to a static host. Configure the host to serve directory `index.html` files for clean routes and `404.html` with HTTP status 404 for missing routes. Do not use an SPA catch-all. Select one trailing-slash convention and redirect alternatives; the generated canonical URLs omit trailing slashes except the root. Connect the marketing domain separately from the application. Set HTML revalidation and appropriate caching/compression at the host. HTTPS, hosting, DNS, access logs, and actual policies are deployment responsibilities.

No deployment or production domain change was performed.

## Structure

- `src/site.mjs`: shared header/footer, homepage sections, interactive demo workspace shell, articles, supporting pages, metadata.
- `src/content.mjs`: eight distinct search-intent pages.
- `src/config.mjs`: centralized URL configuration and release validation.
- `public/style.css`: responsive layout, focus indicators, reduced motion support.
- `public/site.js`: mobile navigation.
- `public/demo-data.js`: illustrative collections, documents, questions, answers and source passages for the homepage demo. Edit this file to change the demo content.
- `public/demo-render.js`: pure render and matching functions, shared by the build (default state, so the demo works before JavaScript loads) and the browser.
- `public/demo.js`: client behavior for the demo (choose a collection, ask or pick a question, switch sources). No API calls or document upload.
- `public/favicon.svg`: blue K mark adapted from the application's existing favicon.
- `public/og.png`: committed 1200 × 630 social card; rebuilding the site does not need image tooling.
- `scripts/create-og.py`: optional Pillow helper for regenerating the social card; the font paths target macOS.
- `scripts/build.mjs`: static generation, robots, and sitemap.
- `scripts/serve.mjs`: local preview server.
- `tests/site.test.mjs`: generated content integrity tests.
- `docs/CAPABILITIES.md`: source evidence and positioning boundaries.

## Routes

`/`, `/semantic-search`, `/ai-knowledge-base`, `/document-search`, `/multi-document-search`, `/knowledge-management`, `/ai-second-brain`, `/rag-document-search`, `/search-across-documents`, `/about`, `/get-started`, `/privacy`, `/terms`, and `404.html`.

Pricing, documentation, and blog are visibly labeled planned in the footer, without dead links or empty SEO pages. Add real routes and footer anchors when substantive content is ready.

## Design and accuracy

The blue, ink, and K motif come from the application. The marketing layout, diagrams, and workspace example are new. Example documents and answers are explicitly illustrative; they are not screenshots of the app or real retrieved results. All illustrations are accessible HTML/CSS with no large image dependency on the homepage. Fonts are local system fonts. The site adds no database, auth, analytics, cookies, third-party font requests, or backend service.

Generated AI answers require a configured AI provider. Built-in cited extracts work without one. Source references help users verify claims; they do not prove correctness. Hosted accounts, shared team workspaces, connectors, OCR, and knowledge graphs are not advertised as available.

## Validation

Build, syntax checks, automated page/link/metadata/config tests, and HTTP checks of all generated routes and assets are part of the initial verification. Browser checks cover citation switching, mobile navigation, desktop/mobile layouts, CTA fallback, and representative article rendering. No production application endpoint has been verified, because it has not been supplied. A Lighthouse score has not been measured.
