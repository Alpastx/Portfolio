# Graph Report - final-porto  (2026-11-24)

## Corpus Check
- 56 files · ~362,760 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .ttf 1, .css 1)

## Summary
- 317 nodes · 674 edges · 18 communities (15 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `de54dc47`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Reveal
- dock.tsx
- package.json
- site.ts
- collage-editor.tsx
- Alpesh Bhagwatkar
- next
- compilerOptions
- layout.tsx
- contributions-graph.tsx
- be-ui-expanable-action-bar.tsx
- opengraph-image.tsx
- README.md
- AGENTS.md
- postcss.config.mjs
- htb-record.tsx
- research.tsx

## God Nodes (most connected - your core abstractions)
1. `Reveal()` - 29 edges
2. `site` - 25 edges
3. `next` - 25 edges
4. `react` - 17 edges
5. `compilerOptions` - 16 edges
6. `PageFrame()` - 15 edges
7. `SectionHeader()` - 15 edges
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
- `HomePage()` --calls--> `PageFrame()`  [EXTRACTED]
  app/page.tsx → components/page-frame.tsx
- `HomePage()` --calls--> `ProjectCard()`  [EXTRACTED]
  app/page.tsx → components/project-card.tsx

## Import Cycles
- None detected.

## Communities (18 total, 3 thin omitted)

### Community 0 - "Reveal"
Cohesion: 0.16
Nodes (27): HomePage(), About(), BoardItem(), Collage(), lift, subscribeDesktop(), subscribePointer(), useDesktopBoard() (+19 more)

### Community 1 - "dock.tsx"
Cohesion: 0.12
Nodes (16): metadata, ResumePage(), Dock(), ISLAND_EASE, NowPlaying(), GithubIcon(), HtbIcon(), IconProps (+8 more)

### Community 2 - "package.json"
Cohesion: 0.05
Nodes (37): eslintConfig, dependencies, clsx, lenis, lucide-react, motion, next, react (+29 more)

### Community 3 - "site.ts"
Cohesion: 0.12
Nodes (22): actionClass, Mark(), Segments(), Chip(), ChipRow(), ToolChip(), toolIcon(), Cover() (+14 more)

### Community 4 - "collage-editor.tsx"
Cohesion: 0.20
Nodes (14): CollageEditor(), label(), Layout, Mode, Placement, toLayout(), boardClass, Card() (+6 more)

### Community 5 - "Alpesh Bhagwatkar"
Cohesion: 0.09
Nodes (21): 1. He is COO of Cyber Unbound, 2. Vulnerability research (CVEs + GitHub advisories), 3. He is a regular OTC CatchUp contributor, Alpesh Bhagwatkar, Certifications, CTF record, Education and campus work, How to use this (+13 more)

### Community 6 - "next"
Cohesion: 0.18
Nodes (16): BlogPage(), metadata, generateMetadata(), NotePage(), Error(), NotFound(), metadata, ProjectsPage() (+8 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "layout.tsx"
Cohesion: 0.12
Nodes (19): figtree, instrument, jetbrains, metadata, RootLayout(), viewport, robots(), sitemap() (+11 more)

### Community 9 - "contributions-graph.tsx"
Cohesion: 0.26
Nodes (11): buildWeeks(), ContributionDay, contributionLabel(), ContributionsGraph(), dayFormat, monthLabels(), MONTHS, rangeFormat (+3 more)

### Community 10 - "be-ui-expanable-action-bar.tsx"
Cohesion: 0.15
Nodes (15): cn(), ExpandableActionBar(), ExpandableActionBarClassNames, ExpandableActionBarProps, ExpandableActionBarSize, ICON_SIZE_CLASS, ITEM_SIZE_CLASS, ITEM_TRANSITION (+7 more)

### Community 11 - "opengraph-image.tsx"
Cohesion: 0.18
Nodes (5): Entry, fields, alt, contentType, size

### Community 12 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 16 - "htb-record.tsx"
Cohesion: 0.29
Nodes (9): buildWeeks(), countFormat, CredentialList(), HTB_FILLS, HtbRecord(), MONTHS, utc(), weekFormat (+1 more)

### Community 17 - "research.tsx"
Cohesion: 0.27
Nodes (11): byStarsThenSeverity(), formatStars(), ItemTitle(), rankedItems(), ResearchList(), ResearchRow(), RowMeta(), severityRank (+3 more)

## Knowledge Gaps
- **7 isolated node(s):** `react-dom`, `@tailwindcss/postcss`, `@types/node`, `@types/react`, `@types/react-dom` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 140 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `Reveal`, `dock.tsx`, `package.json`, `site.ts`, `collage-editor.tsx`, `layout.tsx`, `be-ui-expanable-action-bar.tsx`, `opengraph-image.tsx`, `research.tsx`?**
  _High betweenness centrality (0.168) - this node is a cross-community bridge._
- **What connects `react-dom`, `@tailwindcss/postcss`, `@types/node` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dock.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11965811965811966 - nodes in this community are weakly interconnected._
- **Why does `react` connect `layout.tsx` to `Reveal`, `dock.tsx`, `package.json`, `collage-editor.tsx`, `next`, `contributions-graph.tsx`, `be-ui-expanable-action-bar.tsx`, `htb-record.tsx`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05263157894736842 - nodes in this community are weakly interconnected._
- **Why does `site` connect `Reveal` to `dock.tsx`, `site.ts`, `next`, `layout.tsx`, `opengraph-image.tsx`, `htb-record.tsx`, `research.tsx`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Should `site.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11954022988505747 - nodes in this community are weakly interconnected._