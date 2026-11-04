import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = join(process.cwd(), "public", "projects");

const projects = [
  {
    slug: "itaskmanager",
    title: "ITaskManager",
    subtitle: "Workflow platform for design teams",
    category: "Full-stack",
    year: "2025",
    accent: "#00ff99",
    variant: "dashboard",
    index: "01",
  },
  {
    slug: "udvash-unmesh",
    title: "Udvash Unmesh",
    subtitle: "Offline video for 1M+ students",
    category: "Mobile",
    year: "2024",
    accent: "#7dd3fc",
    variant: "phone",
    index: "02",
  },
  {
    slug: "webrtc-video",
    title: "WebRTC Video Rooms",
    subtitle: "Real-time conferencing",
    category: "Real-time",
    year: "2024",
    accent: "#c4b5fd",
    variant: "video",
    index: "03",
  },
  {
    slug: "finance-manager",
    title: "FinanceManager",
    subtitle: "Expense tracking, end to end",
    category: "Full-stack",
    year: "2024",
    accent: "#fbbf24",
    variant: "dashboard",
    index: "04",
  },
  {
    slug: "chess-coach",
    title: "Chess Coach",
    subtitle: "Trainer in a single HTML file",
    category: "Tools",
    year: "2026",
    accent: "#fda4af",
    variant: "chess",
    index: "05",
  },
  {
    slug: "rag-on-dotnet",
    title: "RAG on .NET",
    subtitle: "Semantic Kernel + pgvector",
    category: "AI",
    year: "2025",
    accent: "#a78bfa",
    variant: "chat",
    index: "06",
  },
  {
    slug: "audio-denoiser",
    title: "Audio Denoiser",
    subtitle: "Speech enhancement API",
    category: "AI",
    year: "2026",
    accent: "#67e8f9",
    variant: "waveform",
    index: "07",
  },
  {
    slug: "handcricket",
    title: "HandCricket 2v2",
    subtitle: "Real-time multiplayer cricket",
    category: "Games",
    year: "2023",
    accent: "#fca5a5",
    variant: "game",
    index: "08",
  },
  {
    slug: "canvas-ninja",
    title: "Canvas Ninja",
    subtitle: "Browser drawing with Fabric.js",
    category: "Tools",
    year: "2023",
    accent: "#fdba74",
    variant: "canvas",
    index: "09",
  },
  {
    slug: "app-launcher",
    title: "App Launcher",
    subtitle: "Spotlight-style launcher for Windows",
    category: "Tools",
    year: "2026",
    accent: "#93c5fd",
    variant: "launcher",
    index: "10",
  },
];

function chrome(accent) {
  return `
    <rect width="1080" height="420" rx="18" fill="#0b0a13" stroke="white" stroke-opacity="0.09"/>
    <rect width="1080" height="46" rx="18" fill="white" fill-opacity="0.035"/>
    <circle cx="28" cy="23" r="5" fill="${accent}" fill-opacity="0.9"/>
    <circle cx="48" cy="23" r="5" fill="white" fill-opacity="0.16"/>
    <circle cx="68" cy="23" r="5" fill="white" fill-opacity="0.16"/>
    <rect x="100" y="15" width="240" height="16" rx="8" fill="white" fill-opacity="0.06"/>
    <rect x="896" y="15" width="160" height="16" rx="8" fill="white" fill-opacity="0.04"/>
  `;
}

function dashboard(accent) {
  const bars = [86, 128, 64, 152, 104, 176, 120, 196, 144];
  return `
    ${chrome(accent)}
    <rect x="0" y="46" width="190" height="374" fill="white" fill-opacity="0.018"/>
    ${[0, 1, 2, 3, 4]
      .map(
        (i) => `
      <rect x="26" y="${84 + i * 38}" width="${i === 0 ? 104 : 86}" height="12" rx="6" fill="${i === 0 ? accent : "white"}" fill-opacity="${i === 0 ? "0.55" : "0.09"}"/>
    `,
      )
      .join("")}
    <rect x="220" y="76" width="220" height="96" rx="12" fill="white" fill-opacity="0.035" stroke="white" stroke-opacity="0.06"/>
    <rect x="248" y="102" width="66" height="10" rx="5" fill="white" fill-opacity="0.16"/>
    <text x="248" y="146" font-family="monospace" font-size="28" fill="${accent}">$12.4k</text>
    <rect x="464" y="76" width="220" height="96" rx="12" fill="white" fill-opacity="0.035" stroke="white" stroke-opacity="0.06"/>
    <rect x="492" y="102" width="82" height="10" rx="5" fill="white" fill-opacity="0.16"/>
    <text x="492" y="146" font-family="monospace" font-size="28" fill="#f3f3f7">84%</text>
    <rect x="708" y="76" width="348" height="96" rx="12" fill="${accent}" fill-opacity="0.08" stroke="${accent}" stroke-opacity="0.16"/>
    <rect x="736" y="102" width="90" height="10" rx="5" fill="${accent}" fill-opacity="0.5"/>
    <text x="736" y="146" font-family="monospace" font-size="28" fill="${accent}">+20%</text>
    <rect x="220" y="196" width="512" height="198" rx="12" fill="white" fill-opacity="0.025" stroke="white" stroke-opacity="0.06"/>
    ${bars
      .map(
        (height, i) => `
      <rect x="${248 + i * 52}" y="${368 - height}" width="24" height="${height}" rx="6" fill="${i === 7 ? accent : "white"}" fill-opacity="${i === 7 ? "0.8" : "0.1"}"/>
    `,
      )
      .join("")}
    <path d="M248 330 C 320 300, 360 340, 430 280 S 560 260, 610 230 S 680 250, 704 214" stroke="${accent}" stroke-width="2.5" stroke-opacity="0.65" fill="none"/>
    <rect x="756" y="196" width="300" height="198" rx="12" fill="white" fill-opacity="0.025" stroke="white" stroke-opacity="0.06"/>
    ${[0, 1, 2, 3, 4]
      .map(
        (i) => `
      <rect x="780" y="${224 + i * 30}" width="${i % 2 ? 96 : 140}" height="10" rx="5" fill="white" fill-opacity="0.1"/>
      <circle cx="1026" cy="${229 + i * 30}" r="5" fill="${i === 0 ? accent : "white"}" fill-opacity="${i === 0 ? "0.8" : "0.15"}"/>
    `,
      )
      .join("")}
  `;
}

function phone(accent) {
  return `
    ${chrome(accent)}
    <rect x="0" y="46" width="1080" height="374" fill="white" fill-opacity="0.012"/>
    <g transform="translate(392 78)">
      <rect width="296" height="300" rx="30" fill="#0f0e1a" stroke="${accent}" stroke-opacity="0.35" stroke-width="2"/>
      <rect x="12" y="12" width="272" height="276" rx="22" fill="white" fill-opacity="0.025"/>
      <rect x="118" y="22" width="60" height="6" rx="3" fill="white" fill-opacity="0.2"/>
      <rect x="28" y="46" width="120" height="12" rx="6" fill="white" fill-opacity="0.18"/>
      <rect x="28" y="72" width="160" height="8" rx="4" fill="white" fill-opacity="0.08"/>
      ${[0, 1, 2]
        .map(
          (i) => `
        <rect x="28" y="${100 + i * 58}" width="240" height="46" rx="10" fill="white" fill-opacity="0.04" stroke="white" stroke-opacity="0.05"/>
        <rect x="38" y="${110 + i * 58}" width="54" height="26" rx="5" fill="${accent}" fill-opacity="${0.24 - i * 0.05}"/>
        <rect x="104" y="${114 + i * 58}" width="92" height="8" rx="4" fill="white" fill-opacity="0.16"/>
        <rect x="104" y="${128 + i * 58}" width="60" height="6" rx="3" fill="white" fill-opacity="0.07"/>
        <circle cx="250" cy="${123 + i * 58}" r="7" fill="${accent}" fill-opacity="${0.8 - i * 0.2}"/>
      `,
        )
        .join("")}
      <rect x="28" y="274" width="240" height="4" rx="2" fill="white" fill-opacity="0.08"/>
      <rect x="28" y="274" width="164" height="4" rx="2" fill="${accent}" fill-opacity="0.7"/>
    </g>
    <rect x="746" y="120" width="250" height="60" rx="12" fill="${accent}" fill-opacity="0.07" stroke="${accent}" stroke-opacity="0.16"/>
    <text x="770" y="158" font-family="monospace" font-size="22" fill="${accent}">1M+ daily</text>
    <rect x="746" y="202" width="250" height="60" rx="12" fill="white" fill-opacity="0.03" stroke="white" stroke-opacity="0.06"/>
    <text x="770" y="240" font-family="monospace" font-size="22" fill="#f3f3f7">Offline</text>
    <rect x="746" y="284" width="250" height="60" rx="12" fill="white" fill-opacity="0.03" stroke="white" stroke-opacity="0.06"/>
    <text x="770" y="322" font-family="monospace" font-size="22" fill="#f3f3f7">Encrypted</text>
  `;
}

function video(accent) {
  return `
    ${chrome(accent)}
    <rect x="0" y="46" width="1080" height="374" fill="white" fill-opacity="0.012"/>
    ${[0, 1, 2, 3]
      .map(
        (i) => `
      <rect x="${40 + (i % 2) * 512}" y="${78 + Math.floor(i / 2) * 158}" width="488" height="138" rx="14" fill="white" fill-opacity="0.04" stroke="${i === 0 ? accent : "white"}" stroke-opacity="${i === 0 ? "0.3" : "0.06"}"/>
      <circle cx="${284 + (i % 2) * 512}" cy="${147 + Math.floor(i / 2) * 158}" r="26" fill="${accent}" fill-opacity="${0.22 - i * 0.04}"/>
      <circle cx="${284 + (i % 2) * 512}" cy="${137 + Math.floor(i / 2) * 158}" r="9" fill="${accent}" fill-opacity="0.45"/>
      <path d="M${268 + (i % 2) * 512} ${170 + Math.floor(i / 2) * 158} q16 18 32 0" stroke="${accent}" stroke-opacity="0.35" stroke-width="2" fill="none"/>
      <rect x="${56 + (i % 2) * 512}" y="${190 + Math.floor(i / 2) * 158}" width="84" height="10" rx="5" fill="white" fill-opacity="0.12"/>
      <circle cx="${470 + (i % 2) * 512}" cy="${190 + Math.floor(i / 2) * 158}" r="5" fill="${accent}" fill-opacity="0.7"/>
    `,
      )
      .join("")}
    <rect x="40" y="396" width="1000" height="2" fill="white" fill-opacity="0.04"/>
  `;
}

function chat(accent) {
  return `
    ${chrome(accent)}
    <rect x="0" y="46" width="1080" height="374" fill="white" fill-opacity="0.012"/>
    <g transform="translate(40 80)">
      <rect width="560" height="296" rx="14" fill="white" fill-opacity="0.025" stroke="white" stroke-opacity="0.06"/>
      <rect x="24" y="24" width="150" height="34" rx="12" fill="white" fill-opacity="0.07"/>
      <rect x="36" y="37" width="104" height="8" rx="4" fill="white" fill-opacity="0.14"/>
      <rect x="240" y="76" width="296" height="52" rx="12" fill="${accent}" fill-opacity="0.12" stroke="${accent}" stroke-opacity="0.18"/>
      <rect x="260" y="92" width="210" height="8" rx="4" fill="${accent}" fill-opacity="0.45"/>
      <rect x="260" y="108" width="150" height="6" rx="3" fill="${accent}" fill-opacity="0.22"/>
      <rect x="24" y="148" width="360" height="62" rx="12" fill="white" fill-opacity="0.05"/>
      <rect x="40" y="166" width="260" height="8" rx="4" fill="white" fill-opacity="0.16"/>
      <rect x="40" y="184" width="200" height="6" rx="3" fill="white" fill-opacity="0.08"/>
      <rect x="240" y="228" width="296" height="44" rx="12" fill="${accent}" fill-opacity="0.08" stroke="${accent}" stroke-opacity="0.14"/>
      <rect x="260" y="244" width="180" height="8" rx="4" fill="${accent}" fill-opacity="0.35"/>
    </g>
    <g transform="translate(650 90)">
      <circle cx="90" cy="70" r="24" fill="${accent}" fill-opacity="0.2" stroke="${accent}" stroke-opacity="0.4"/>
      <circle cx="220" cy="44" r="16" fill="white" fill-opacity="0.06"/>
      <circle cx="300" cy="110" r="20" fill="${accent}" fill-opacity="0.14"/>
      <circle cx="170" cy="160" r="14" fill="white" fill-opacity="0.08"/>
      <circle cx="70" cy="210" r="18" fill="${accent}" fill-opacity="0.12"/>
      <circle cx="250" cy="230" r="24" fill="white" fill-opacity="0.05"/>
      <circle cx="340" cy="260" r="12" fill="${accent}" fill-opacity="0.2"/>
      ${[
        [90, 70, 220, 44],
        [90, 70, 300, 110],
        [220, 44, 170, 160],
        [300, 110, 250, 230],
        [170, 160, 70, 210],
        [170, 160, 250, 230],
        [70, 210, 250, 230],
        [250, 230, 340, 260],
      ]
        .map(
          ([x1, y1, x2, y2]) =>
            `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${accent}" stroke-opacity="0.14"/>`,
        )
        .join("")}
      <text x="90" y="300" font-family="monospace" font-size="18" fill="${accent}" fill-opacity="0.7">vector search</text>
    </g>
  `;
}

function waveform(accent) {
  const heights = [24, 48, 72, 36, 96, 130, 84, 148, 112, 66, 140, 92, 54, 118, 78, 44, 96, 62, 30, 70, 42, 22];
  return `
    ${chrome(accent)}
    <rect x="0" y="46" width="1080" height="374" fill="white" fill-opacity="0.012"/>
    <rect x="40" y="78" width="1000" height="250" rx="14" fill="white" fill-opacity="0.025" stroke="white" stroke-opacity="0.06"/>
    ${heights
      .map(
        (height, i) => `
      <rect x="${64 + i * 44}" y="${300 - height}" width="18" height="${height}" rx="9" fill="${i % 4 === 0 ? accent : "white"}" fill-opacity="${i % 4 === 0 ? "0.65" : "0.12"}"/>
    `,
      )
      .join("")}
    <line x1="64" y1="300" x2="1016" y2="300" stroke="white" stroke-opacity="0.1"/>
    <text x="64" y="352" font-family="monospace" font-size="18" fill="${accent}" fill-opacity="0.7">noisy input → clean output</text>
    <rect x="760" y="340" width="256" height="44" rx="10" fill="${accent}" fill-opacity="0.1" stroke="${accent}" stroke-opacity="0.2"/>
    <text x="780" y="368" font-family="monospace" font-size="16" fill="${accent}">Demucs · FastAPI</text>
  `;
}

function chess(accent) {
  let board = "";
  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      board += `<rect x="${col * 34}" y="${row * 34}" width="34" height="34" fill="${(row + col) % 2 === 0 ? "#1a1a2a" : "#0f0e1a"}" stroke="white" stroke-opacity="0.04"/>`;
    }
  }
  return `
    ${chrome(accent)}
    <rect x="0" y="46" width="1080" height="374" fill="white" fill-opacity="0.012"/>
    <g transform="translate(70 82)">
      <rect width="272" height="272" rx="8" fill="#0f0e1a" stroke="${accent}" stroke-opacity="0.25"/>
      ${board}
      <text x="17" y="30" font-size="22" fill="#f3f3f7" fill-opacity="0.75">♜</text>
      <text x="119" y="30" font-size="22" fill="#f3f3f7" fill-opacity="0.75">♞</text>
      <text x="221" y="30" font-size="22" fill="#f3f3f7" fill-opacity="0.75">♝</text>
      <text x="17" y="268" font-size="22" fill="#f3f3f7" fill-opacity="0.75">♖</text>
      <text x="119" y="268" font-size="22" fill="#f3f3f7" fill-opacity="0.75">♘</text>
      <text x="221" y="268" font-size="22" fill="#f3f3f7" fill-opacity="0.75">♗</text>
      <text x="153" y="166" font-size="30" fill="${accent}" fill-opacity="0.85">♛</text>
    </g>
    <g transform="translate(400 92)">
      <rect width="610" height="80" rx="14" fill="white" fill-opacity="0.03" stroke="white" stroke-opacity="0.06"/>
      <text x="24" y="34" font-family="monospace" font-size="14" fill="${accent}" fill-opacity="0.7">PUZZLE</text>
      <rect x="24" y="48" width="260" height="10" rx="5" fill="white" fill-opacity="0.14"/>
      <rect x="420" y="24" width="160" height="32" rx="8" fill="${accent}" fill-opacity="0.12"/>
      <text x="442" y="46" font-family="monospace" font-size="14" fill="${accent}">Hint</text>
    </g>
    <g transform="translate(400 192)">
      <rect width="290" height="120" rx="14" fill="white" fill-opacity="0.03" stroke="white" stroke-opacity="0.06"/>
      <text x="24" y="32" font-family="monospace" font-size="14" fill="white" fill-opacity="0.4">ENGINE</text>
      <rect x="24" y="48" width="150" height="10" rx="5" fill="${accent}" fill-opacity="0.4"/>
      <rect x="24" y="68" width="200" height="8" rx="4" fill="white" fill-opacity="0.08"/>
      <rect x="24" y="86" width="120" height="8" rx="4" fill="white" fill-opacity="0.08"/>
    </g>
    <g transform="translate(710 192)">
      <rect width="300" height="120" rx="14" fill="white" fill-opacity="0.03" stroke="white" stroke-opacity="0.06"/>
      <text x="24" y="32" font-family="monospace" font-size="14" fill="white" fill-opacity="0.4">THEMES</text>
      ${[0, 1, 2]
        .map(
          (i) => `<rect x="${24 + i * 88}" y="52" width="64" height="44" rx="8" fill="${accent}" fill-opacity="${0.24 - i * 0.06}" stroke="${accent}" stroke-opacity="0.2"/>`,
        )
        .join("")}
    </g>
  `;
}

function game(accent) {
  return `
    ${chrome(accent)}
    <rect x="0" y="46" width="1080" height="374" fill="#0a0912"/>
    <rect x="40" y="78" width="1000" height="296" rx="12" fill="#12111d" stroke="white" stroke-opacity="0.06"/>
    ${[0, 1, 2, 3, 4, 5]
      .map(
        (i) => `<rect x="${80 + i * 140}" y="${300 - (i % 3) * 36}" width="90" height="16" rx="8" fill="${accent}" fill-opacity="0.18"/>`,
      )
      .join("")}
    <rect x="120" y="214" width="42" height="42" rx="10" fill="${accent}" fill-opacity="0.6"/>
    <circle cx="141" cy="235" r="5" fill="#0f0e1a"/>
    <rect x="620" y="132" width="52" height="52" rx="12" fill="${accent}" fill-opacity="0.3"/>
    <rect x="760" y="196" width="52" height="52" rx="12" fill="${accent}" fill-opacity="0.2"/>
    <rect x="880" y="108" width="70" height="70" rx="14" fill="${accent}" fill-opacity="0.12"/>
    <path d="M80 338 C 240 260, 360 340, 520 250 S 760 230, 980 160" stroke="${accent}" stroke-opacity="0.22" stroke-width="2" stroke-dasharray="6 8" fill="none"/>
    <text x="80" y="110" font-family="monospace" font-size="16" fill="${accent}" fill-opacity="0.7">LIVE MATCH · 2v2</text>
    <rect x="880" y="82" width="120" height="36" rx="8" fill="${accent}" fill-opacity="0.12"/>
    <text x="902" y="106" font-family="monospace" font-size="16" fill="${accent}">142/3</text>
  `;
}

function canvas(accent) {
  return `
    ${chrome(accent)}
    <rect x="0" y="46" width="1080" height="374" fill="white" fill-opacity="0.012"/>
    <rect x="40" y="78" width="1000" height="296" rx="12" fill="white" fill-opacity="0.025" stroke="white" stroke-opacity="0.06"/>
    <path d="M120 280 C 220 140, 300 320, 420 190 S 620 120, 760 240 S 900 200, 980 150" stroke="${accent}" stroke-width="10" stroke-linecap="round" fill="none" stroke-opacity="0.5"/>
    <path d="M140 320 C 260 240, 340 340, 480 260 S 700 210, 900 300" stroke="white" stroke-width="3" stroke-linecap="round" fill="none" stroke-opacity="0.18"/>
    <circle cx="420" cy="190" r="14" fill="${accent}" fill-opacity="0.8"/>
    <circle cx="760" cy="240" r="10" fill="white" fill-opacity="0.5"/>
    <rect x="760" y="320" width="240" height="34" rx="8" fill="white" fill-opacity="0.04" stroke="white" stroke-opacity="0.08"/>
    <text x="780" y="342" font-family="monospace" font-size="14" fill="${accent}" fill-opacity="0.7">Fabric.js · Canvas</text>
  `;
}

function launcher(accent) {
  return `
    ${chrome(accent)}
    <rect x="0" y="46" width="1080" height="374" fill="white" fill-opacity="0.012"/>
    <g transform="translate(170 96)">
      <rect width="740" height="70" rx="18" fill="#0b0a13" stroke="${accent}" stroke-opacity="0.3" stroke-width="2"/>
      <circle cx="34" cy="35" r="9" fill="none" stroke="${accent}" stroke-opacity="0.7" stroke-width="2"/>
      <line x1="41" y1="42" x2="49" y2="50" stroke="${accent}" stroke-opacity="0.7" stroke-width="2"/>
      <text x="66" y="42" font-family="monospace" font-size="20" fill="white" fill-opacity="0.35">Search apps…</text>
      <rect x="640" y="20" width="76" height="30" rx="7" fill="white" fill-opacity="0.05"/>
      <text x="654" y="40" font-family="monospace" font-size="13" fill="white" fill-opacity="0.4">Alt+Space</text>
    </g>
    ${[0, 1, 2, 3]
      .map(
        (i) => `
      <g transform="translate(170 ${190 + i * 46})">
        <rect width="740" height="38" rx="10" fill="${i === 0 ? accent : "white"}" fill-opacity="${i === 0 ? "0.1" : "0.03"}"/>
        <rect x="14" y="11" width="16" height="16" rx="4" fill="${accent}" fill-opacity="${0.5 - i * 0.1}"/>
        <rect x="44" y="15" width="${180 + i * 30}" height="8" rx="4" fill="white" fill-opacity="${i === 0 ? "0.3" : "0.1"}"/>
        <text x="700" y="24" font-family="monospace" font-size="12" fill="${i === 0 ? accent : "white"}" fill-opacity="${i === 0 ? "0.7" : "0.2"}">${i === 0 ? "Enter" : ""}</text>
      </g>
    `,
      )
      .join("")}
  `;
}

const variants = {
  dashboard,
  phone,
  video,
  chat,
  waveform,
  chess,
  game,
  canvas,
  launcher,
};

mkdirSync(OUT_DIR, { recursive: true });

for (const project of projects) {
  const render = variants[project.variant];
  if (!render) throw new Error(`Unknown variant: ${project.variant}`);

  const svg = `<svg width="1200" height="800" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="800" gradientUnits="userSpaceOnUse">
      <stop stop-color="#161524"/>
      <stop offset="1" stop-color="#0d0c16"/>
    </linearGradient>
    <radialGradient id="glow" cx="0" cy="0" r="1" gradientTransform="translate(980 120) rotate(135) scale(560 460)" gradientUnits="userSpaceOnUse">
      <stop stop-color="${project.accent}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${project.accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" stroke="white" stroke-opacity="0.035"/>
    </pattern>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <rect width="1200" height="800" fill="url(#glow)"/>
  <rect width="1200" height="800" fill="url(#grid)"/>
  <text x="1140" y="768" text-anchor="end" font-family="ui-monospace, monospace" font-size="230" font-weight="700" fill="white" fill-opacity="0.028">${project.index}</text>
  <g transform="translate(60 190)">
    ${render(project.accent)}
  </g>
</svg>
`;

  writeFileSync(join(OUT_DIR, `${project.slug}.svg`), svg, "utf8");
  console.log(`generated ${project.slug}.svg`);
}
