# SEO|GEO ARENA

AI-native marketing intelligence platform — MVP prototype.

Combines classical SEO analytics with GEO (Generative Engine Optimization), AI-citation tracking and LinkedIn Ads auditing in a single workspace. Bilingual interface (UA / EN).

## Modules

Organized by data source:

**Google Search Console**
- SEO audit
- Keyword monitoring
- Landing page analysis
- CTR optimization
- Search intent mapping
- Content gap detection

**Bing Webmaster**
- GEO optimization
- AI citation tracking
- LLM visibility audit

**LinkedIn Ads**
- LinkedIn campaign audit
- B2B audience analysis
- Lead gen optimization

**All channels**
- Competitor intel
- Content generation
- Structured data audit
- Local SEO

## Run locally (zero-config)

Just open `index.html` in any modern browser. It loads React, Recharts, Lucide and Tailwind from CDN and transpiles JSX in the browser via Babel Standalone. Internet connection required.

```bash
# macOS
open index.html

# Linux
xdg-open index.html
```

## Use as a real React project

The source component lives in `src/App.jsx` and uses standard npm imports (`react`, `recharts`, `lucide-react`). Drop it into any Vite / Next.js / CRA project:

```bash
npm create vite@latest seo-geo-arena -- --template react
cd seo-geo-arena
npm i recharts lucide-react
# copy src/App.jsx over the default App.jsx
npm run dev
```

Add Tailwind CSS via the official guide: https://tailwindcss.com/docs/guides/vite

## Stack

- React 18
- Recharts 2.12 (charts)
- Lucide (icons)
- Tailwind CSS 3 (styling)

## Status

Prototype / MVP. All data is mocked. Next step: wire real connectors to Search Console, Bing Webmaster and LinkedIn Ads APIs.
