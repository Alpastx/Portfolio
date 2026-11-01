# Graph Report - final-porto  (2026-10-11)

## Corpus Check
- 54 files · ~87,217 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .ttf 1, .css 1)

## Summary
- 300 nodes · 630 edges · 17 communities (14 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `efb8f0ed`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Reveal
- site
- package.json
- site.ts
- collage.tsx
- Alpesh Bhagwatkar
- PageFrame
- compilerOptions
- next
- contributions-graph.tsx
- be-ui-expanable-action-bar.tsx
- opengraph-image.tsx
- README.md
- AGENTS.md
- postcss.config.mjs
- research.tsx

## God Nodes (most connected - your core abstractions)
1. `Reveal()` - 29 edges
2. `next` - 25 edges
3. `site` - 24 edges
4. `compilerOptions` - 16 edges
5. `PageFrame()` - 15 edges
6. `SectionHeader()` - 15 edges
7. `react` - 15 edges
8. `Alpesh Bhagwatkar` - 15 edges
9. `HomePage()` - 12 edges
10. `PageTitle()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `NotePage()` --calls--> `Reveal()`  [EXTRACTED]
  app/blog/[slug]/page.tsx → components/reveal.tsx
- `BlogPage()` --calls--> `Reveal()`  [EXTRACTED]
  app/blog/page.tsx → components/reveal.tsx
- `RootLayout()` --calls--> `SiteShell()`  [EXTRACTED]
  app/layout.tsx → components/site-shell.tsx
- `HomePage()` --calls--> `Collage()`  [EXTRACTED]
  app/page.tsx → components/collage.tsx
- `HomePage()` --calls--> `Contributions()`  [EXTRACTED]
  app/page.tsx → components/contributions.tsx

## Import Cycles
- None detected.

## Communities (17 total, 3 thin omitted)

### Community 0 - "Reveal"
Cohesion: 0.19
Nodes (23): HomePage(), metadata, ProjectsPage(), About(), actionClass, Segments(), Chip(), ChipRow() (+15 more)

### Community 1 - "site"
Cohesion: 0.13
Nodes (15): metadata, ResumePage(), Dock(), ISLAND_EASE, NowPlaying(), GithubIcon(), IconProps, LinkedinIcon() (+7 more)

### Community 2 - "package.json"
Cohesion: 0.05
Nodes (37): eslintConfig, dependencies, clsx, lenis, lucide-react, motion, next, react (+29 more)

### Community 3 - "site.ts"
Cohesion: 0.14
Nodes (12): Cover(), FieldCard(), Chip, Education, Experience, featuredField, featuredProjects, FieldItem (+4 more)

### Community 4 - "collage.tsx"
Cohesion: 0.15
Nodes (21): BoardItem(), Collage(), CollageEditor(), label(), Layout, Mode, Placement, toLayout() (+13 more)

### Community 5 - "Alpesh Bhagwatkar"
Cohesion: 0.09
Nodes (21): 1. He is COO of Cyber Unbound, 2. Vulnerability research (CVEs + GitHub advisories), 3. He is a regular OTC CatchUp contributor, Alpesh Bhagwatkar, Certifications, CTF record, Education and campus work, How to use this (+13 more)

### Community 6 - "PageFrame"
Cohesion: 0.28
Nodes (9): BlogPage(), metadata, generateMetadata(), NotePage(), Error(), NotFound(), PageFrame(), PageTitle() (+1 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "next"
Cohesion: 0.10
Nodes (22): figtree, instrument, jetbrains, metadata, RootLayout(), viewport, robots(), sitemap() (+14 more)

### Community 9 - "contributions-graph.tsx"
Cohesion: 0.23
Nodes (13): Contributions(), buildWeeks(), ContributionDay, contributionLabel(), ContributionsGraph(), dayFormat, FILLS, monthLabels() (+5 more)

### Community 10 - "be-ui-expanable-action-bar.tsx"
Cohesion: 0.14
Nodes (16): cn(), ExpandableActionBar(), ExpandableActionBarClassNames, ExpandableActionBarItem, ExpandableActionBarProps, ExpandableActionBarSize, ICON_SIZE_CLASS, ITEM_SIZE_CLASS (+8 more)

### Community 11 - "opengraph-image.tsx"
Cohesion: 0.18
Nodes (5): Entry, fields, alt, contentType, size

### Community 12 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 16 - "research.tsx"
Cohesion: 0.20
Nodes (14): metadata, ResearchPage(), Mark(), byStarsThenSeverity(), formatStars(), ItemTitle(), rankedItems(), ResearchList() (+6 more)

## Knowledge Gaps
- **7 isolated node(s):** `react-dom`, `@tailwindcss/postcss`, `@types/node`, `@types/react`, `@types/react-dom` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 135 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `Reveal`, `site`, `package.json`, `site.ts`, `collage.tsx`, `PageFrame`, `be-ui-expanable-action-bar.tsx`, `opengraph-image.tsx`, `research.tsx`?**
  _High betweenness centrality (0.187) - this node is a cross-community bridge._
- **What connects `react-dom`, `@tailwindcss/postcss`, `@types/node` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `site` be split into smaller, more focused modules?**
  _Cohesion score 0.13230769230769232 - nodes in this community are weakly interconnected._
- **Why does `react` connect `next` to `Reveal`, `site`, `package.json`, `collage.tsx`, `PageFrame`, `contributions-graph.tsx`, `be-ui-expanable-action-bar.tsx`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05263157894736842 - nodes in this community are weakly interconnected._
- **Why does `site` connect `site` to `Reveal`, `site.ts`, `collage.tsx`, `PageFrame`, `next`, `contributions-graph.tsx`, `opengraph-image.tsx`, `research.tsx`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Should `site.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13970588235294118 - nodes in this community are weakly interconnected._