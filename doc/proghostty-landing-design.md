# ProGhostty Release Landing Design

## Goal

Create a concept release page for ProGhostty, a modern macOS terminal built around real PTY sessions, libghostty-vt interpretation, persistent workspaces, split panes, command history, shell enhancement management, and AI CLI companion workflows.

The page must make download intent clear while feeling less like a generic SaaS page and more like a black terminal altar where ghost workspaces gather in formation.

## Core Concept

**Night Parade of Terminals / 百鬼终行**

- The main ProGhostty icon represents the active workspace.
- Repeated ghost silhouettes represent background workspaces, panes, sessions, and command flows.
- Terminal mockups represent the real product surface: shell, agent, logs, and build panes.
- The mood is black, modern, controlled, quiet, and oppressive.

## Visual System

The site uses a strict black, white, and gray palette:

- Deep backgrounds: `#050505`, `#0A0A0B`, `#111114`
- Foreground: `#F5F5F7`, `#F1F1F3`, `#A1A1AA`
- Borders: subtle white at 8-18% opacity
- Accent: cold white-blue only for cursor and selected technical states

No colorful cyberpunk gradients, red horror cues, cute ghost illustration, or large saturated accents are used.

Typography uses native Apple UI fonts for product copy and SF Mono-compatible stacks for terminal text, capability tags, and command fragments. Headings are short and hard: "Command the Night", "One machine. Many ghosts", "Not a terminal. A procession."

## Page Structure

1. **Hero**
   - Full-height black first viewport.
   - Primary ProGhostty icon rendered as the central totem.
   - CSS ghost procession behind it using simplified icon-derived silhouettes.
   - Primary CTA downloads `ProGhostty-0.1.0-arm64.dmg`.
   - Secondary CTA links to `https://github.com/freecodetiger/ProGhostty`.

2. **Ghost Formation**
   - Six feature panels in a dense formation grid.
   - Features: Workspace Orchestration, Split-first Layouts, Command History, Shell Enhancements, AI CLI Companion, Pixel-aware Scrolling.
   - Hover states only increase border strength, background lift, and ghost opacity.

3. **Workspace Mockup**
   - Large black terminal window with four panes: editor/test, AI agent, logs, and build.
   - Mockup uses only monochrome terminal text, no syntax colors.
   - Demonstrates persistent workspaces and split-first product shape.

4. **Night Parade**
   - Emotional brand section with a dense ghost formation approaching the viewer.
   - Minimal copy: "Not a terminal. A procession."

5. **Technical Foundation**
   - Diagnostic panel listing real project capabilities from the source repository.
   - Shows adapter chain: `PTYTerminalEngine -> GhosttyVTBridge -> libghostty-vt`.
   - Highlights OSC 133 / OSC 7 side-channel history indexing and local-first state.

6. **Download**
   - Clean conversion ending.
   - Repeats the icon and download/GitHub/documentation actions.

## Implementation

The project is a Vite + React + TypeScript single-page app in `ProGhostty-release`.

Assets:

- `public/assets/proghostty-logo.png` copied from the ProGhostty source repository.
- `public/assets/night-parade-reference.png` preserved as a concept reference asset.
- `public/ProGhostty-0.1.0-arm64.dmg` copied from the source app's `dist` folder for the download CTA.

CSS is centralized in `src/styles.css` with design tokens, ghost glyph construction, terminal mockup layout, restrained animations, reduced-motion handling, and responsive rules.

## Motion

Motion is intentionally restrained:

- Main icon slow float.
- Background ghost procession drifts by only a few pixels.
- Scroll-driven depth writes `--hero-depth`, `--parade-progress`, and `--possession-progress` to CSS.
- The Night Parade screen advances from distant formation to foreground possession ghosts pressing in from the edges.
- The Download screen gets a restrained possession glow and forward motion as the CTA enters view.
- Terminal cursor blinks in cold white.
- Hover states are short and subtle.
- `prefers-reduced-motion` disables practical motion.

## Responsive Behavior

- Desktop: cinematic hero, 3-column feature grid, large terminal mockup.
- Tablet: single-column hero stack, 2-column feature grid.
- Mobile: reduced ghost density, single-column features, stacked terminal panes, full-width CTAs.

## Acceptance Criteria

- Strong black and white visual system.
- ProGhostty icon is the main visual artifact.
- Ghost identity is visible but not cute or cartoonish.
- Download CTA is obvious and functional.
- Page feels like a modern macOS developer tool.
- Technical credibility is visible through real project capabilities.
- Responsive layouts avoid overlap and preserve readable text.
- Implementation stays lightweight, with no heavy animation dependency.
