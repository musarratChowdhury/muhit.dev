import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "itaskmanager",
    title: "ITaskManager",
    subtitle: "A productivity platform for design teams",
    summary:
      "A React plugin, .NET MAUI desktop app, and ASP.NET Core API that automated task workflows for 20+ designers.",
    description: [
      "ITaskManager is a productivity platform built around the way design teams actually work. It combines a React plugin, a .NET MAUI desktop application, and an ASP.NET Core Web API into one workflow.",
      "The system automated task routing and status tracking for more than 20 designers. That removed a large amount of manual coordination and improved project delivery efficiency by roughly 20%.",
      "My work covered the API design, the data model, and the desktop client integration. The result is a tool that stays out of the way and lets the team focus on the work.",
    ],
    year: "2025",
    role: "Software Engineer",
    category: "Full-stack",
    featured: true,
    tech: ["ASP.NET Core", "React", "TypeScript", ".NET MAUI", "SQL Server", "REST API"],
    links: [],
    cover: "/projects/itaskmanager.svg",
    coverAlt: "ITaskManager project cover",
    accent: "#00ff99",
    metrics: [
      { value: "20+", label: "designers supported" },
      { value: "~20%", label: "faster delivery" },
    ],
    highlights: [
      "Designed the REST API and relational data model behind the workflow engine.",
      "Built the React plugin and connected it to the .NET MAUI desktop client.",
      "Automated task routing and status updates for a 20+ person design team.",
    ],
    note: "Enterprise project — source is private. Happy to walk through the architecture.",
  },
  {
    slug: "udvash-unmesh",
    title: "Udvash Unmesh",
    subtitle: "Offline learning at national scale",
    summary:
      "Encrypted offline video downloads with resumable transfers and secure playback, used daily by more than 1 million students.",
    description: [
      "Udvash Unmesh is an EdTech platform used across Bangladesh. I designed and implemented the encrypted offline video download system that lets students keep learning when the network does not cooperate.",
      "The feature supports resumable downloads, encrypted local storage, and secure playback. That combination matters on low-bandwidth connections and low-storage devices, where a failed download can mean a lost study session.",
      "It now runs daily for more than 1 million students — one of the highest-leverage pieces of software I have worked on.",
    ],
    year: "2024",
    role: "Software Engineer",
    category: "Mobile",
    featured: true,
    tech: ["Kotlin", "Swift", "ASP.NET Core", "AES encryption", "REST API"],
    links: [],
    cover: "/projects/udvash-unmesh.svg",
    coverAlt: "Udvash Unmesh project cover",
    accent: "#7dd3fc",
    metrics: [
      { value: "1M+", label: "daily students" },
      { value: "10 lakh+", label: "learners in Bangladesh" },
    ],
    highlights: [
      "Built encrypted offline video storage with resumable downloads.",
      "Implemented secure local playback across Android and iOS.",
      "Shipped a feature used daily by more than one million students.",
    ],
    note: "Production product — source is private. Case study available on request.",
  },
  {
    slug: "webrtc-video",
    title: "WebRTC Video Rooms",
    subtitle: "Zoom-style conferencing for teams",
    summary:
      "A real-time video conferencing app built with ASP.NET MVC, SignalR, and WebRTC.",
    description: [
      "A Zoom-style video conferencing solution built with ASP.NET MVC, SignalR, and WebRTC. The app handles room creation, peer signaling, and live audio/video streams in the browser.",
      "SignalR carries the signaling messages while WebRTC handles the media path directly between participants. That keeps latency low and avoids routing video through the application server.",
      "I worked across the MVC application, the signaling layer, and the browser-side media handling.",
    ],
    year: "2024",
    role: "Software Engineer",
    category: "Real-time",
    featured: true,
    tech: ["ASP.NET MVC", "SignalR", "WebRTC", "C#", "JavaScript"],
    links: [],
    cover: "/projects/webrtc-video.svg",
    coverAlt: "WebRTC Video Rooms project cover",
    accent: "#c4b5fd",
    metrics: [
      { value: "P2P", label: "media path" },
      { value: "Live", label: "signaling with SignalR" },
    ],
    highlights: [
      "Implemented room signaling with SignalR and WebRTC.",
      "Built browser-side media handling for live audio and video.",
      "Kept media peer-to-peer to reduce latency and server load.",
    ],
    note: "Internal project — demo available on request.",
  },
  {
    slug: "finance-manager",
    title: "FinanceManager",
    subtitle: "Personal finance, end to end",
    summary:
      "A full-stack expense tracker with an ASP.NET Core Web API, Angular 17 client, and MySQL.",
    description: [
      "FinanceManager is a personal project built to make day-to-day spending visible. The backend is an ASP.NET Core Web API; the client is Angular 17; the data lives in MySQL.",
      "I built it as an excuse to go deep on clean API design, authentication, and a frontend that stays pleasant as the feature set grows.",
      "It is still evolving — the next step is smarter categorization and monthly insight reports.",
    ],
    year: "2024",
    role: "Personal project",
    category: "Full-stack",
    featured: true,
    tech: ["ASP.NET Core", "Angular", "TypeScript", "MySQL", "REST API"],
    links: [
      {
        label: "Live app",
        href: "https://financemanager-angular17.vercel.app",
        type: "live",
      },
      {
        label: "API source",
        href: "https://github.com/musarratChowdhury/FinanceManagerApi",
        type: "github",
      },
    ],
    cover: "/projects/finance-manager.svg",
    coverAlt: "FinanceManager project cover",
    accent: "#fbbf24",
    metrics: [
      { value: "2", label: "deployable services" },
      { value: "Full", label: "CRUD + auth flow" },
    ],
    highlights: [
      "Designed the API and data model with ASP.NET Core and MySQL.",
      "Built the Angular 17 client with typed services and reactive forms.",
      "Deployed the client and API as separate services.",
    ],
  },
  {
    slug: "chess-coach",
    title: "Chess Coach",
    subtitle: "A chess trainer in one HTML file",
    summary:
      "Play a local engine, solve Lichess puzzles, and switch between three hand-drawn board themes.",
    description: [
      "Chess Coach is a single-page trainer: play against a small on-device engine, solve embedded or fresh Lichess puzzles, get hints, and switch the board between three furnished art themes.",
      "The entire app — markup, CSS, embedded puzzle data, and game logic — lives in one HTML file. Vite is used only as the dev server and bundler. There is no framework, no server code, and no database.",
      "It is a deliberate exercise in shipping something small, fast, and complete.",
    ],
    year: "2026",
    role: "Personal project",
    category: "Tools",
    featured: false,
    tech: ["TypeScript", "Vite", "chess.js", "Lichess API", "Canvas art"],
    links: [
      { label: "Play it", href: "https://chess-coach-mu.vercel.app", type: "live" },
      {
        label: "Source",
        href: "https://github.com/musarratChowdhury/chess-coach",
        type: "github",
      },
    ],
    cover: "/projects/chess-coach.svg",
    coverAlt: "Chess Coach project cover",
    accent: "#fda4af",
    metrics: [
      { value: "1", label: "HTML file" },
      { value: "3", label: "board themes" },
    ],
    highlights: [
      "Built an on-device engine and puzzle flow with vanilla TypeScript.",
      "Integrated the Lichess daily puzzle API with an offline fallback.",
      "Shipped three hand-drawn board themes with a single-file build.",
    ],
  },
  {
    slug: "rag-on-dotnet",
    title: "RAG on .NET",
    subtitle: "Retrieval-augmented answers with Semantic Kernel",
    summary:
      "Document ingestion, pgvector search, and OpenAI-powered Q&A in a clean .NET 9 API.",
    description: [
      "A text-only retrieval-augmented generation system built with .NET 9, Semantic Kernel, PostgreSQL, and pgvector.",
      "Documents are stored with generated embeddings. A question is embedded, matched against the vector store with cosine similarity, and the retrieved context is passed to an OpenAI model through Semantic Kernel.",
      "The API includes document management endpoints, a seed flow, and both simple and advanced question endpoints.",
    ],
    year: "2025",
    role: "Personal project",
    category: "AI",
    featured: false,
    tech: [".NET 9", "Semantic Kernel", "PostgreSQL", "pgvector", "OpenAI"],
    links: [
      {
        label: "Source",
        href: "https://github.com/musarratChowdhury/rag_on_dotnet",
        type: "github",
      },
    ],
    cover: "/projects/rag-on-dotnet.svg",
    coverAlt: "RAG on .NET project cover",
    accent: "#a78bfa",
    metrics: [
      { value: "RAG", label: "end to end" },
      { value: "pgvector", label: "similarity search" },
    ],
    highlights: [
      "Built document ingestion with automatic embedding generation.",
      "Implemented cosine-similarity retrieval in PostgreSQL with pgvector.",
      "Wired Semantic Kernel to OpenAI for grounded answers.",
    ],
  },
  {
    slug: "audio-denoiser",
    title: "Audio Denoiser",
    subtitle: "Speech enhancement as an API",
    summary:
      "A FastAPI + Demucs service that turns noisy audio into clean MP3s, deployed to Azure Container Apps.",
    description: [
      "An audio enhancement service: upload a noisy file, get a denoised MP3 back. The model is Facebook Research's Demucs waveform speech enhancement, wrapped in FastAPI.",
      "The service handles any input format through a static ffmpeg build, streams long clips with constant memory, and exposes health, enhance, and re-download endpoints.",
      "CI builds the image, pushes it to GHCR, and updates an Azure Container App — with a few hard-won deployment notes documented along the way.",
    ],
    year: "2026",
    role: "Personal project",
    category: "AI",
    featured: false,
    tech: ["Python", "FastAPI", "Demucs", "Docker", "Azure", "GitHub Actions"],
    links: [
      {
        label: "Source",
        href: "https://github.com/musarratChowdhury/audio_denoiser",
        type: "github",
      },
    ],
    cover: "/projects/audio-denoiser.svg",
    coverAlt: "Audio Denoiser project cover",
    accent: "#67e8f9",
    metrics: [
      { value: "Any", label: "input audio format" },
      { value: "Streaming", label: "constant-memory inference" },
    ],
    highlights: [
      "Wrapped Demucs in a FastAPI service with a clean upload/download flow.",
      "Added streaming inference for long clips and job TTL cleanup.",
      "Automated image builds and Azure Container Apps deployment.",
    ],
  },
  {
    slug: "handcricket",
    title: "HandCricket 2v2",
    subtitle: "Real-time multiplayer cricket",
    summary:
      "A 2v2 game with SignalR, AngularJS, and an AWS-hosted API and database.",
    description: [
      "A real-time 2v2 hand cricket game. I designed the whole architecture: a SignalR server for live match state and a separate API server to persist players and results in a cloud database.",
      "The frontend was built with AngularJS, and the infrastructure was deployed on AWS.",
      "It was one of my earliest end-to-end systems — and the project that made real-time architecture click for me.",
    ],
    year: "2023",
    role: "Personal project",
    category: "Games",
    featured: false,
    tech: ["ASP.NET", "SignalR", "AngularJS", "AWS", "SQL Server"],
    links: [],
    cover: "/projects/handcricket.svg",
    coverAlt: "HandCricket 2v2 project cover",
    accent: "#fca5a5",
    metrics: [
      { value: "2v2", label: "real-time matches" },
      { value: "AWS", label: "deployed infrastructure" },
    ],
    highlights: [
      "Designed the split SignalR + API architecture.",
      "Built live match state and player persistence.",
      "Deployed the full stack on AWS.",
    ],
  },
  {
    slug: "canvas-ninja",
    title: "Canvas Ninja",
    subtitle: "Browser drawing, made real-time",
    summary:
      "A Fabric.js drawing app; the next step is shared real-time canvases.",
    description: [
      "A browser-based drawing app built with JavaScript and Fabric.js. It started as a way to understand canvas objects, layers, and interaction design outside of a framework.",
      "The long-term plan is to make it real-time so multiple people can draw on the same canvas at once.",
    ],
    year: "2023",
    role: "Personal project",
    category: "Tools",
    featured: false,
    tech: ["JavaScript", "Fabric.js", "HTML5 Canvas"],
    links: [
      {
        label: "Try it",
        href: "https://musarratdrawingapp.netlify.app",
        type: "live",
      },
    ],
    cover: "/projects/canvas-ninja.svg",
    coverAlt: "Canvas Ninja project cover",
    accent: "#fdba74",
    metrics: [
      { value: "Canvas", label: "object model" },
      { value: "Soon", label: "shared drawing" },
    ],
    highlights: [
      "Built a drawing surface with object manipulation via Fabric.js.",
      "Focused on a small, dependency-light frontend.",
      "Planned the path to real-time collaborative drawing.",
    ],
  },
  {
    slug: "app-launcher",
    title: "App Launcher",
    subtitle: "A Spotlight-style launcher for Windows",
    summary:
      "A Wails + Go desktop utility with fuzzy search, a global hotkey, and a lightweight daemon.",
    description: [
      "A floating, frameless search bar for Windows: press Alt+Space from anywhere, type to fuzzy-search installed apps, hit Enter to launch, and press Esc to dismiss.",
      "The app uses a two-process design: a tiny always-on daemon owns the hotkey and spawns a short-lived WebView UI process. That keeps idle memory low while making the launcher feel instant.",
      "It is built with Wails v2, Go, and a vanilla HTML/CSS/JS frontend.",
    ],
    year: "2026",
    role: "Personal project",
    category: "Tools",
    featured: false,
    tech: ["Go", "Wails", "Windows", "JavaScript", "WebView2"],
    links: [
      {
        label: "Source",
        href: "https://github.com/musarratChowdhury/app-launcher",
        type: "github",
      },
    ],
    cover: "/projects/app-launcher.svg",
    coverAlt: "App Launcher project cover",
    accent: "#93c5fd",
    metrics: [
      { value: "~5 MB", label: "idle daemon" },
      { value: "Alt+Space", label: "global hotkey" },
    ],
    highlights: [
      "Designed a daemon + short-lived UI process architecture.",
      "Implemented fuzzy search over Start Menu and registry entries.",
      "Built a frameless, acrylic WebView UI with Wails.",
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const projectCategories = [
  "All",
  ...new Set(projects.map((project) => project.category)),
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
