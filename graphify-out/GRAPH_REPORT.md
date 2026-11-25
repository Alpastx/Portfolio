# Graph Report - final-porto  (2026-11-25)

## Corpus Check
- 56 files · ~363,686 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .ttf 1, .css 1)

## Summary
- 322 nodes · 686 edges · 16 communities (13 shown, 3 thin omitted)
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
- collage.tsx
- Alpesh Bhagwatkar
- PageFrame
- compilerOptions
- next
- record.tsx
- be-ui-expanable-action-bar.tsx
- README.md
- AGENTS.md
- postcss.config.mjs
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
- `HomePage()` --calls--> `Contributions()`  [EXTRACTED]
  app/page.tsx → components/contributions.tsx
- `HomePage()` --calls--> `PageFrame()`  [EXTRACTED]
  app/page.tsx → components/page-frame.tsx

## Import Cycles
- None detected.

## Communities (16 total, 3 thin omitted)

### Community 0 - "Reveal"
Cohesion: 0.16
Nodes (28): HomePage(), metadata, ProjectsPage(), About(), actionClass, Mark(), Segments(), Chip() (+20 more)

### Community 1 - "dock.tsx"
Cohesion: 0.13
Nodes (15): metadata, ResumePage(), Dock(), ISLAND_EASE, NowPlaying(), GithubIcon(), HtbIcon(), IconProps (+7 more)

### Community 2 - "package.json"
Cohesion: 0.05
Nodes (37): eslintConfig, dependencies, clsx, lenis, lucide-react, motion, next, react (+29 more)

### Community 3 - "site.ts"
Cohesion: 0.15
Nodes (11): Cover(), FieldCard(), Education, Experience, featuredField, featuredProjects, FieldItem, Note (+3 more)

### Community 4 - "collage.tsx"
Cohesion: 0.13
Nodes (22): BoardItem(), CollageEditor(), label(), Layout, Mode, Placement, toLayout(), boardClass (+14 more)

### Community 5 - "Alpesh Bhagwatkar"
Cohesion: 0.09
Nodes (21): 1. He is COO of Cyber Unbound, 2. Vulnerability research (CVEs + GitHub advisories), 3. He is a regular OTC CatchUp contributor, Alpesh Bhagwatkar, Certifications, CTF record, Education and campus work, How to use this (+13 more)

### Community 6 - "PageFrame"
Cohesion: 0.24
Nodes (11): BlogPage(), metadata, generateMetadata(), NotePage(), Error(), NotFound(), metadata, ResearchPage() (+3 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "next"
Cohesion: 0.07
Nodes (25): Entry, fields, figtree, instrument, jetbrains, metadata, RootLayout(), viewport (+17 more)

### Community 9 - "record.tsx"
Cohesion: 0.11
Nodes (26): Contributions(), buildWeeks(), ContributionDay, contributionLabel(), ContributionsGraph(), dayFormat, monthLabels(), MONTHS (+18 more)

### Community 10 - "be-ui-expanable-action-bar.tsx"
Cohesion: 0.14
Nodes (16): cn(), ExpandableActionBar(), ExpandableActionBarClassNames, ExpandableActionBarItem, ExpandableActionBarProps, ExpandableActionBarSize, ICON_SIZE_CLASS, ITEM_SIZE_CLASS (+8 more)

### Community 12 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 17 - "research.tsx"
Cohesion: 0.21
Nodes (16): advisoryCount(), advisoryCounts, bySeverityThenStars(), cveCount(), formatStars(), isCve(), ItemTitle(), rankedItems() (+8 more)

## Knowledge Gaps
- **7 isolated node(s):** `react-dom`, `@tailwindcss/postcss`, `@types/node`, `@types/react`, `@types/react-dom` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 141 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `Reveal`, `dock.tsx`, `package.json`, `site.ts`, `collage.tsx`, `PageFrame`, `record.tsx`, `be-ui-expanable-action-bar.tsx`, `research.tsx`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **What connects `react-dom`, `@tailwindcss/postcss`, `@types/node` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dock.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12615384615384614 - nodes in this community are weakly interconnected._
- **Why does `react` connect `collage.tsx` to `Reveal`, `dock.tsx`, `package.json`, `PageFrame`, `next`, `record.tsx`, `be-ui-expanable-action-bar.tsx`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05263157894736842 - nodes in this community are weakly interconnected._
- **Why does `site` connect `Reveal` to `dock.tsx`, `site.ts`, `collage.tsx`, `PageFrame`, `next`, `record.tsx`, `research.tsx`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Should `collage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13105413105413105 - nodes in this community are weakly interconnected._