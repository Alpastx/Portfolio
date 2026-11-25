# Graph Report - final-porto  (2026-11-25)

## Corpus Check
- 56 files · ~363,532 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .ttf 1, .css 1)

## Summary
- 320 nodes · 681 edges · 17 communities (14 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `de54dc47`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Reveal
- icons.tsx
- package.json
- site.ts
- collage.tsx
- Alpesh Bhagwatkar
- next
- compilerOptions
- layout.tsx
- record.tsx
- be-ui-expanable-action-bar.tsx
- htb-record.tsx
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
- `HomePage()` --calls--> `Collage()`  [EXTRACTED]
  app/page.tsx → components/collage.tsx
- `HomePage()` --calls--> `PageFrame()`  [EXTRACTED]
  app/page.tsx → components/page-frame.tsx

## Import Cycles
- None detected.

## Communities (17 total, 3 thin omitted)

### Community 0 - "Reveal"
Cohesion: 0.20
Nodes (23): HomePage(), About(), actionClass, Mark(), Segments(), Chip(), ChipRow(), ToolChip() (+15 more)

### Community 1 - "icons.tsx"
Cohesion: 0.16
Nodes (10): metadata, ResumePage(), GithubIcon(), HtbIcon(), IconProps, LinkedinIcon(), ResumeSheet(), SectionTitle() (+2 more)

### Community 2 - "package.json"
Cohesion: 0.05
Nodes (39): eslintConfig, dependencies, clsx, lenis, lucide-react, motion, next, react (+31 more)

### Community 3 - "site.ts"
Cohesion: 0.14
Nodes (12): Cover(), FieldCard(), Chip, Education, Experience, featuredField, featuredProjects, FieldItem (+4 more)

### Community 4 - "collage.tsx"
Cohesion: 0.15
Nodes (21): BoardItem(), Collage(), CollageEditor(), label(), Layout, Mode, Placement, toLayout() (+13 more)

### Community 5 - "Alpesh Bhagwatkar"
Cohesion: 0.09
Nodes (21): 1. He is COO of Cyber Unbound, 2. Vulnerability research (CVEs + GitHub advisories), 3. He is a regular OTC CatchUp contributor, Alpesh Bhagwatkar, Certifications, CTF record, Education and campus work, How to use this (+13 more)

### Community 6 - "next"
Cohesion: 0.17
Nodes (17): BlogPage(), metadata, generateMetadata(), NotePage(), Error(), NotFound(), metadata, ProjectsPage() (+9 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "layout.tsx"
Cohesion: 0.08
Nodes (22): Entry, fields, figtree, instrument, jetbrains, metadata, RootLayout(), viewport (+14 more)

### Community 9 - "record.tsx"
Cohesion: 0.19
Nodes (14): buildWeeks(), ContributionDay, contributionLabel(), ContributionsGraph(), dayFormat, monthLabels(), MONTHS, rangeFormat (+6 more)

### Community 10 - "be-ui-expanable-action-bar.tsx"
Cohesion: 0.11
Nodes (23): Dock(), ISLAND_EASE, NowPlaying(), SiteShell(), cn(), ExpandableActionBar(), ExpandableActionBarClassNames, ExpandableActionBarItem (+15 more)

### Community 11 - "htb-record.tsx"
Cohesion: 0.27
Nodes (10): buildWeeks(), countFormat, CredentialList(), HTB_FILLS, HtbCertCards(), HtbRecord(), MONTHS, utc() (+2 more)

### Community 12 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 17 - "research.tsx"
Cohesion: 0.23
Nodes (14): advisoryCount(), advisoryCounts, bySeverityThenStars(), formatStars(), isCve(), ItemTitle(), rankedItems(), ResearchList() (+6 more)

## Knowledge Gaps
- **7 isolated node(s):** `react-dom`, `@tailwindcss/postcss`, `@types/node`, `@types/react`, `@types/react-dom` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 141 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `Reveal`, `icons.tsx`, `package.json`, `site.ts`, `collage.tsx`, `layout.tsx`, `record.tsx`, `be-ui-expanable-action-bar.tsx`, `research.tsx`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **What connects `react-dom`, `@tailwindcss/postcss`, `@types/node` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Why does `react` connect `be-ui-expanable-action-bar.tsx` to `Reveal`, `icons.tsx`, `package.json`, `collage.tsx`, `next`, `layout.tsx`, `record.tsx`, `htb-record.tsx`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `site.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13970588235294118 - nodes in this community are weakly interconnected._
- **Why does `site` connect `Reveal` to `icons.tsx`, `site.ts`, `collage.tsx`, `next`, `layout.tsx`, `record.tsx`, `be-ui-expanable-action-bar.tsx`, `htb-record.tsx`, `research.tsx`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Should `Alpesh Bhagwatkar` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._