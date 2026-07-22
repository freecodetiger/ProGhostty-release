import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Language = "en" | "zh";

const DOWNLOAD_URL = "/ProGhostty-0.4.4-arm64.dmg";
const REPOSITORY_URL = "https://github.com/freecodetiger/ProGhostty";
const DOCUMENTATION_URL = "https://deepwiki.com/freecodetiger/ProGhostty";

const copy = {
  en: {
    htmlLang: "en",
    title: "ProGhostty | Command the Night",
    description:
      "Download ProGhostty, a Ghostty-inspired macOS terminal for pixel-smooth scrolling, multi-split layouts, and persistent workspaces.",
    nav: {
      aria: "Primary navigation",
      home: "ProGhostty home",
      github: "Open ProGhostty on GitHub",
      deepwiki: "Open ProGhostty documentation on DeepWiki",
      languageLabel: "Switch site language",
      languageToggle: "中文"
    },
    hero: {
      kicker: "Night Parade of Terminals",
      line: "Command the Night.",
      text:
        "A Ghostty-inspired terminal for pixel-smooth scrolling, split formations, and persistent workspaces that remember where the work still lives.",
      download: "Download for macOS",
      github: "View on GitHub",
      emblem: "ProGhostty ghost terminal emblem",
      iconAlt: "ProGhostty app icon"
    },
    formation: {
      kicker: "Ghost Formation",
      title: "Three ways the night obeys.",
      body:
        "ProGhostty is built around uninterrupted flow: pixel-smooth motion, disciplined splits, and workspaces that keep their cwd and shape after you vanish.",
      features: [
        {
          title: "Pixel-Level Scrolling",
          command: "scroll like the web",
          body:
            "Move through terminal history with browser-smooth precision. No line-by-line rupture, no broken rhythm, only continuous command under your fingers."
        },
        {
          title: "Multi-Split Surface",
          command: "divide the night",
          body:
            "Editor, logs, builds, and agents stand in the same black field. Split the terminal into a formation that stays legible under pressure."
        },
        {
          title: "Persistent Workspaces",
          command: "return without loss",
          body:
            "Every workspace remembers its split tree and cwd. Leave the procession, return later, and the work is still breathing where you left it."
        }
      ]
    },
    workspace: {
      kicker: "Workspace Mockup",
      title: "One machine. Many ghosts.",
      body: "Each workspace keeps its split tree and cwd intact, even after you leave.",
      terminalLabel: "ProGhostty workspace terminal mockup",
      titlebarStatus: "workspace2 · ~",
      prompt: "user@MacBook-Air ~ %",
      panes: {
        primary: "pg workspace restore workspace2",
        top: "cwd persisted: ~",
        bottom: "split tree restored"
      }
    },
    parade: {
      kicker: "百鬼终行",
      title: "Not a terminal. A procession.",
      body: "Your sessions gather, persist, and obey."
    },
    foundation: {
      kicker: "Technical Foundation",
      title: "Ghostty speed. ProGhostty control.",
      body:
        "A native terminal experience built around correctness, workspace orchestration, and developer flow.",
      status: "online",
      capabilities: [
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
      ],
      diagnostic: `adapter: PTYTerminalEngine -> GhosttyVTBridge -> libghostty-vt
history: OSC 133 / OSC 7 side-channel index
state: local-first settings, workspaces, command blocks
surface: split tree + workspace-aware sessions`
    },
    download: {
      kicker: "Download",
      title: "Enter the procession.",
      body: "Download ProGhostty for macOS.",
      download: "Download",
      github: "GitHub",
      docs: "Documentation"
    }
  },
  zh: {
    htmlLang: "zh-CN",
    title: "ProGhostty | 驭夜而行",
    description:
      "下载 ProGhostty，一款 Ghostty-inspired macOS 终端，主打像素级丝滑滚动、多分屏布局和持久化工作区。",
    nav: {
      aria: "主导航",
      home: "ProGhostty 首页",
      github: "在 GitHub 打开 ProGhostty",
      deepwiki: "在 DeepWiki 打开 ProGhostty 文档",
      languageLabel: "切换网站语言",
      languageToggle: "EN"
    },
    hero: {
      kicker: "Night Parade of Terminals",
      line: "驭夜而行。",
      text:
        "一款 Ghostty-inspired 终端：像网页一样丝滑的像素级滚动，多分屏列阵，以及记住 cwd 与布局的持久化工作区。",
      download: "下载 macOS 版",
      github: "查看 GitHub",
      emblem: "ProGhostty 鬼形终端徽标",
      iconAlt: "ProGhostty 应用图标"
    },
    formation: {
      kicker: "Ghost Formation",
      title: "三道令，夜色俯首。",
      body:
        "ProGhostty 为不中断的工作流而生：像素级丝滑滚动，克制而清晰的多分屏，以及在你离开后仍记住 cwd 与布局的工作区。",
      features: [
        {
          title: "像素级滚动",
          command: "scroll like the web",
          body:
            "穿过终端历史时像浏览网页一样连续、顺滑、精准。不再按行断裂，不再打碎节奏，手指所到之处皆可控。"
        },
        {
          title: "多分屏工作面",
          command: "divide the night",
          body:
            "编辑器、日志、构建与 Agent 同处一片黑色场域。把终端切成阵列，压力之下依然清晰可读。"
        },
        {
          title: "持久化工作区",
          command: "return without loss",
          body:
            "每个 workspace 都记住自己的分屏树和 cwd。离开之后再回来，工作仍停在原处，像还在呼吸。"
        }
      ]
    },
    workspace: {
      kicker: "Workspace Mockup",
      title: "一机百鬼。",
      body: "每个 workspace 都保留自己的分屏树和 cwd，离开之后也不散场。",
      terminalLabel: "ProGhostty workspace 终端示意",
      titlebarStatus: "workspace2 · ~",
      prompt: "user@MacBook-Air ~ %",
      panes: {
        primary: "pg workspace restore workspace2",
        top: "cwd persisted: ~",
        bottom: "split tree restored"
      }
    },
    parade: {
      kicker: "百鬼终行",
      title: "不只是终端，是一场行列。",
      body: "会话聚拢，状态长存，然后服从。"
    },
    foundation: {
      kicker: "Technical Foundation",
      title: "Ghostty 之速，ProGhostty 之控。",
      body: "围绕正确性、workspace 编排和开发者心流打造的原生终端体验。",
      status: "online",
      capabilities: [
        "原生 macOS",
        "Ghostty-inspired",
        "libghostty-vt powered",
        "PTY-based",
        "OSC 133 aware",
        "Split tree layout",
        "Workspace persistent",
        "AI CLI ready",
        "Shell enhancement manager",
        "Local-first history"
      ],
      diagnostic: `adapter: PTYTerminalEngine -> GhosttyVTBridge -> libghostty-vt
history: OSC 133 / OSC 7 side-channel index
state: local-first settings, workspaces, command blocks
surface: split tree + workspace-aware sessions`
    },
    download: {
      kicker: "Download",
      title: "进入百鬼行列。",
      body: "下载 ProGhostty macOS 版。",
      download: "下载",
      github: "GitHub",
      docs: "文档"
    }
  }
} as const;

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "en";
  }

  return window.localStorage.getItem("proghostty-language") === "zh" ? "zh" : "en";
}

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

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      className="github-mark"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.15c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.42.36.78 1.07.78 2.16v3.13c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function DeepWikiIcon() {
  return (
    <svg
      aria-hidden="true"
      className="deepwiki-mark"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <path
        d="M5 5.5c0-1.1.9-2 2-2h10.5c.83 0 1.5.67 1.5 1.5v14.5c0 .55-.45 1-1 1H7a2 2 0 0 1-2-2v-13Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M8 7h7.5M8 10.25h8M8 13.5h5.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 17.5h11.25" stroke="currentColor" strokeWidth="1.6" />
    </svg>
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
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const text = copy[language];
  const nextLanguage: Language = language === "en" ? "zh" : "en";

  useSectionTimelines();

  useEffect(() => {
    document.documentElement.lang = text.htmlLang;
    document.title = text.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", text.description);
    window.localStorage.setItem("proghostty-language", language);
  }, [language, text.description, text.htmlLang, text.title]);

  return (
    <main>
      <section className="hero" id="top">
        <GhostFormation className="hero-procession" count={35} />
        <nav className="nav" aria-label={text.nav.aria}>
          <a className="brand" href="#top" aria-label={text.nav.home}>
            <img src="/assets/proghostty-logo.png" alt="" />
            <span>ProGhostty</span>
          </a>
          <div className="nav-actions">
            <a
              className="nav-icon-link"
              href={REPOSITORY_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={text.nav.github}
            >
              <GitHubIcon />
            </a>
            <a
              className="nav-icon-link"
              href={DOCUMENTATION_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={text.nav.deepwiki}
            >
              <DeepWikiIcon />
            </a>
            <button
              className="language-toggle"
              type="button"
              aria-label={text.nav.languageLabel}
              aria-pressed={language === "zh"}
              onClick={() => setLanguage(nextLanguage)}
            >
              {text.nav.languageToggle}
            </button>
          </div>
        </nav>

        <div className="hero-inner">
          <div className="hero-copy">
            <p className="kicker">{text.hero.kicker}</p>
            <h1>ProGhostty</h1>
            <p className="hero-line">{text.hero.line}</p>
            <p className="hero-text">{text.hero.text}</p>
            <div className="actions">
              <a className="button button-primary" href={DOWNLOAD_URL} download>
                {text.hero.download}
              </a>
              <a
                className="button button-secondary"
                href={REPOSITORY_URL}
                target="_blank"
                rel="noreferrer"
              >
                {text.hero.github}
              </a>
            </div>
          </div>

          <div className="totem-wrap" aria-label={text.hero.emblem}>
            <div className="totem-shadow" />
            <img className="totem" src="/assets/proghostty-logo.png" alt={text.hero.iconAlt} />
          </div>
        </div>
      </section>

      <section className="section formation-section" id="features">
        <div className="section-heading">
          <p className="kicker">{text.formation.kicker}</p>
          <h2>{text.formation.title}</h2>
          <p>{text.formation.body}</p>
        </div>
        <div className="feature-grid">
          {text.formation.features.map((feature, index) => (
            <article className={`feature-card feature-card-${index + 1}`} key={feature.title}>
              <GhostGlyph className="feature-ghost" />
              <p className="terminal-command">$ pg {feature.command}</p>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`section workspace-section language-${language}`}>
        <div className="workspace-copy">
          <p className="kicker">{text.workspace.kicker}</p>
          <h2>{text.workspace.title}</h2>
          <p>{text.workspace.body}</p>
        </div>
        <div className="terminal-window" aria-label={text.workspace.terminalLabel}>
          <div className="terminal-titlebar">
            <div className="window-controls" aria-hidden="true">
              <span className="control-close" />
              <span className="control-minimize" />
              <span className="control-zoom" />
            </div>
            <span className="workspace-title">{text.workspace.titlebarStatus}</span>
          </div>
          <div className="terminal-grid">
            <div className="pane pane-large">
              <p className="prompt-line">
                {text.workspace.prompt}
                <span className="terminal-cursor" aria-hidden="true" />
              </p>
              <pre>{text.workspace.panes.primary}</pre>
            </div>
            <div className="pane">
              <p className="prompt-line">{text.workspace.prompt}</p>
              <pre>{text.workspace.panes.top}</pre>
            </div>
            <div className="pane">
              <p className="prompt-line">{text.workspace.prompt}</p>
              <pre>{text.workspace.panes.bottom}</pre>
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
          <p className="kicker">{text.parade.kicker}</p>
          <h2 id="parade-title">{text.parade.title}</h2>
          <p>{text.parade.body}</p>
        </div>
      </section>

      <section className={`section foundation-section language-${language}`} id="foundation">
        <div className="foundation-copy">
          <p className="kicker">{text.foundation.kicker}</p>
          <h2>{text.foundation.title}</h2>
          <p>{text.foundation.body}</p>
        </div>
        <div className="diagnostic-panel">
          <div className="diagnostic-header">
            <span>proghostty.system.capabilities</span>
            <span>{text.foundation.status}</span>
          </div>
          <div className="capability-grid">
            {text.foundation.capabilities.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <pre>{text.foundation.diagnostic}</pre>
        </div>
      </section>

      <section className="download-section" id="download">
        <GhostFormation className="download-procession" count={21} />
        <img src="/assets/proghostty-logo.png" alt="" />
        <p className="kicker">{text.download.kicker}</p>
        <h2>{text.download.title}</h2>
        <p>{text.download.body}</p>
        <div className="actions">
          <a className="button button-primary" href={DOWNLOAD_URL} download>
            {text.download.download}
          </a>
          <a
            className="button button-secondary"
            href={REPOSITORY_URL}
            target="_blank"
            rel="noreferrer"
          >
            {text.download.github}
          </a>
          <a
            className="button button-secondary"
            href={DOCUMENTATION_URL}
            target="_blank"
            rel="noreferrer"
          >
            {text.download.docs}
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
