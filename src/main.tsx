import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const features = [
  {
    title: "Workspace Orchestration",
    command: "summon workspaces",
    body: "Keep multiple development worlds alive without losing shell context."
  },
  {
    title: "Split-first Layouts",
    command: "split with intention",
    body: "Compose panes like a disciplined terminal formation, not a loose stack of windows."
  },
  {
    title: "Command History",
    command: "trace every invocation",
    body: "Index OSC-based command boundaries for search, recall, copy, and review."
  },
  {
    title: "Shell Enhancements",
    command: "enhance without losing control",
    body: "Scan, preview, install, back up, and roll back shell tooling with explicit plans."
  },
  {
    title: "AI CLI Companion",
    command: "speak with your agents",
    body: "Run Codex and Claude Code in terminal-native panes without surrendering the workflow."
  },
  {
    title: "Pixel-aware Scrolling",
    command: "move with precision",
    body: "A modern terminal surface that treats the cell grid as a first-class instrument."
  }
];

const capabilities = [
  "Native macOS",
  "Ghostty-inspired",
  "libghostty-vt powered",
  "PTY-based",
  "OSC 133 aware",
  "Split tree layout",
  "Workspace persistent",
  "AI CLI ready",
  "Shell enhancement manager",
  "Local-first history"
];

const sectionTimelines = [
  { selector: ".hero", property: "--hero-progress" },
  { selector: ".formation-section", property: "--formation-progress" },
  { selector: ".workspace-section", property: "--workspace-progress" },
  { selector: ".parade-section", property: "--parade-progress" },
  { selector: ".foundation-section", property: "--foundation-progress" },
  { selector: ".download-section", property: "--download-progress" }
] as const;

function useSectionTimelines() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const setMotionVar = (name: string, value: number) => {
      root.style.setProperty(name, value.toFixed(4));
    };
    const smoothStep = (value: number) => value * value * (3 - 2 * value);

    const readSectionProgress = (selector: string, inputOffset = 0, inputScale = 1) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) {
        return 0;
      }

      const rect = element.getBoundingClientRect();
      const viewport = Math.max(window.innerHeight, 1);
      const activeDistance = viewport + rect.height * 0.62;
      const raw = (viewport * 0.88 - rect.top) / activeDistance;
      return smoothStep(clamp((raw + inputOffset) * inputScale));
    };

    const render = () => {
      frame = 0;

      if (reduceMotion.matches) {
        sectionTimelines.forEach(({ property }) => {
          setMotionVar(property, 0);
        });
        return;
      }

      sectionTimelines.forEach((timeline) => {
        const { selector, property } = timeline;
        setMotionVar(property, readSectionProgress(selector));
      });
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(render);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reduceMotion.addEventListener("change", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reduceMotion.removeEventListener("change", requestUpdate);
    };
  }, []);
}

function GhostGlyph({ className = "" }: { className?: string }) {
  return (
    <span className={`ghost-glyph ${className}`} aria-hidden="true">
      <span className="ghost-eye ghost-eye-left" />
      <span className="ghost-eye ghost-eye-right" />
    </span>
  );
}

function GhostFormation({ count = 28, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`ghost-formation ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => {
        const row = Math.floor(index / 7);
        const col = index % 7;
        const stagger = (row % 2) * 7;
        const x = (col - 3) * 14 + stagger;
        const y = row * 15;
        const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
        const radius = 7.5 + (index % 3) * 2.1;
        const ringX = Math.cos(angle) * radius;
        const ringY = Math.sin(angle) * (radius * 0.74);
        const innerX = Math.cos(angle + 0.72) * (radius * 0.38);
        const innerY = Math.sin(angle + 0.72) * (radius * 0.26);
        const pullX = -x;
        const pullY = 47 - (12 + y);
        const side = index % 8;
        const verticalBand = -38 + ((index * 19) % 76);
        const horizontalBand = -34 + ((index * 23) % 68);
        const startX =
          side === 0 || side === 5
            ? -64
            : side === 1 || side === 4
              ? 64
              : -44 + ((index * 17) % 88);
        const startY =
          side === 2 || side === 7
            ? -58
            : side === 3 || side === 6
              ? 58
              : verticalBand;
        const midX = startX * 0.23 + Math.cos(angle) * 8;
        const midY = startY * 0.2 + Math.sin(angle) * 6;
        return (
          <span
            className="formation-unit"
            key={index}
            style={
              {
                "--x": `${x}%`,
                "--y": `${y}%`,
                "--pull-x": `${pullX}`,
                "--pull-y": `${pullY}`,
                "--ring-x": `${ringX}`,
                "--ring-y": `${ringY}`,
                "--inner-x": `${innerX}`,
                "--inner-y": `${innerY}`,
                "--start-x": `${startX}vw`,
                "--start-y": `${startY}vh`,
                "--mid-x": `${midX}vw`,
                "--mid-y": `${midY}vh`,
                "--scale": `${0.44 + row * 0.11}`,
                "--delay": `${index * 0.12}s`
              } as React.CSSProperties
            }
          >
            <GhostGlyph />
          </span>
        );
      })}
    </div>
  );
}

function App() {
  useSectionTimelines();

  return (
    <main>
      <section className="hero" id="top">
        <GhostFormation className="hero-procession" count={35} />
        <nav className="nav" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="ProGhostty home">
            <img src="/assets/proghostty-logo.png" alt="" />
            <span>ProGhostty</span>
          </a>
          <div className="nav-links">
            <a href="#features">Formation</a>
            <a href="#foundation">Foundation</a>
            <a href="#download">Download</a>
          </div>
        </nav>

        <div className="hero-inner">
          <div className="hero-copy">
            <p className="kicker">Night Parade of Terminals</p>
            <h1>ProGhostty</h1>
            <p className="hero-line">Command the Night.</p>
            <p className="hero-text">
              A Ghostty-inspired terminal for workspaces, splits, AI CLI flows, and serious
              command-line control.
            </p>
            <div className="actions">
              <a className="button button-primary" href="/ProGhostty-0.1.0-arm64.dmg" download>
                Download for macOS
              </a>
              <a
                className="button button-secondary"
                href="https://github.com/freecodetiger/ProGhostty"
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub
              </a>
            </div>
          </div>

          <div className="totem-wrap" aria-label="ProGhostty ghost terminal emblem">
            <div className="totem-shadow" />
            <img className="totem" src="/assets/proghostty-logo.png" alt="ProGhostty app icon" />
          </div>
        </div>
      </section>

      <section className="section formation-section" id="features">
        <div className="section-heading">
          <p className="kicker">Ghost Formation</p>
          <h2>Six panes of control.</h2>
          <p>Every feature is a ghost in formation: quiet alone, overwhelming in concert.</p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <GhostGlyph className="feature-ghost" />
              <p className="terminal-command">$ pg {feature.command}</p>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section workspace-section">
        <div className="workspace-copy">
          <p className="kicker">Workspace Mockup</p>
          <h2>One machine. Many ghosts.</h2>
          <p>Organize shells, logs, agents, and builds into persistent workspaces.</p>
        </div>
        <div className="terminal-window" aria-label="ProGhostty workspace terminal mockup">
          <div className="terminal-titlebar">
            <span>workspace://release-night</span>
            <span>4 panes alive</span>
          </div>
          <div className="terminal-grid">
            <div className="pane pane-large">
              <p className="pane-label">editor</p>
              <pre>{`> swift test --no-parallel
Test Suite 'ProGhosttyCoreTests' started
OscParserTests.commandBoundaries passed
WorkspaceStoreTests.persistence passed
CommandBlockIndexerTests.historyIndex passed

> pg workspace focus release-night`}</pre>
            </div>
            <div className="pane">
              <p className="pane-label">agent</p>
              <pre>{`> codex
watching app surface
ready for patch review
_`}</pre>
            </div>
            <div className="pane">
              <p className="pane-label">logs</p>
              <pre>{`[vt] bridge attached
[pty] shell inherited
[osc] cwd changed
[pane] resize 42x132`}</pre>
            </div>
            <div className="pane">
              <p className="pane-label">build</p>
              <pre>{`> swift build
Compile ProGhosttyCore
Link ProGhostty
Build complete`}</pre>
            </div>
          </div>
        </div>
      </section>

      <section className="parade-section" aria-labelledby="parade-title">
        <GhostFormation className="parade-procession" count={28} />
        <div className="parade-vortex" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="parade-guide" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="parade-copy">
          <p className="kicker">百鬼终行</p>
          <h2 id="parade-title">Not a terminal. A procession.</h2>
          <p>Your sessions gather, persist, and obey.</p>
        </div>
      </section>

      <section className="section foundation-section" id="foundation">
        <div className="foundation-copy">
          <p className="kicker">Technical Foundation</p>
          <h2>Ghostty speed. ProGhostty control.</h2>
          <p>
            A native terminal experience built around correctness, workspace orchestration, and
            developer flow.
          </p>
        </div>
        <div className="diagnostic-panel">
          <div className="diagnostic-header">
            <span>proghostty.system.capabilities</span>
            <span>online</span>
          </div>
          <div className="capability-grid">
            {capabilities.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <pre>{`adapter: PTYTerminalEngine -> GhosttyVTBridge -> libghostty-vt
history: OSC 133 / OSC 7 side-channel index
state: local-first settings, workspaces, command blocks
surface: split tree + workspace-aware sessions`}</pre>
        </div>
      </section>

      <section className="download-section" id="download">
        <GhostFormation className="download-procession" count={21} />
        <img src="/assets/proghostty-logo.png" alt="" />
        <p className="kicker">Download</p>
        <h2>Enter the procession.</h2>
        <p>Download ProGhostty for macOS.</p>
        <div className="actions">
          <a className="button button-primary" href="/ProGhostty-0.1.0-arm64.dmg" download>
            Download
          </a>
          <a
            className="button button-secondary"
            href="https://github.com/freecodetiger/ProGhostty"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a className="button button-secondary" href="#foundation">
            Documentation
          </a>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
