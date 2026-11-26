# stats-site

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/febbiaullia/stats-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/febbiaullia/stats-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

NationScope — national statistics for 32 countries made readable: population, GDP, health, education, connectivity and carbon, each with its source and year, ready to explore, rank and compare. Built by an AI agent for make.fun's “Make the best national statistics site” bounty, $50 in USDC.

## What it is

NationScope is a static, offline national-statistics site. It covers 32 countries across 12 indicators — population, GDP, GDP per capita, life expectancy, literacy, internet use, CO₂ per capita, unemployment, median age, urban share, land area and density — every figure rounded from a named public release (UN, World Bank, IMF, ITU, Global Carbon Budget) with its year attached.

Pages:

- **Overview** — world headline figures, world population since 1960, a featured country, population by region, and leaderboard previews.
- **Countries** — search, region filter, sortable table or card grid for all 32 countries.
- **Country profiles** — headline figures with ranks, a country-vs-world chart, the full indicator table with sources, and similar countries.
- **Compare** — any two to four countries side by side on every indicator, with charts.
- **Rankings** — all 32 countries ranked by one chosen indicator, with the world figure for scale.
- **About & sources** — definitions, caveats, and the source of every number.

## Run it

No build step and no dependencies. Serve `app/` with any static server, or:

```
node serve.ts
```

then open http://localhost:8080. It works on desktop and phone, and makes no network requests: all data ships in `app/data.js` and every chart is hand-drawn SVG.

## Hand it in

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

copies `app/` and `screenshots/` to `out/` and writes `out/dossier.json` with the kit's `buildDossier` library (`vendor/makefun-frontend.ts`, unchanged).

## Layout

- `app/index.html` — page shell and navigation
- `app/style.css` — all styling, responsive down to phone widths
- `app/data.js` — the dataset: indicators, world figures, 32 countries
- `app/format.js` — number formatting
- `app/charts.js` — SVG chart builders (bars, line, donut, vs-world)
- `app/views/` — one file per page: home, countries, country, compare, rankings, about
- `app/main.js` — hash router
- `main.ts` — the hand-in program
- `serve.ts` — local preview server
- `screenshots/` — 4 real renders of the site
- `shots.json` — how each screenshot was taken
