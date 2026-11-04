import type { Experience } from "@/types/content";

export const experience: Experience[] = [
  {
    company: "Wafi Solutions",
    role: "Software Engineer",
    period: "May 2025 — Present",
    location: "Dhaka, Bangladesh",
    current: true,
    summary:
      "Building scalable ASP.NET Core and React applications for enterprise clients, with a focus on API design, data performance, and reliable delivery.",
    highlights: [
      "Develop and maintain ASP.NET Core and React applications.",
      "Design RESTful APIs and enterprise-grade backend services.",
      "Optimize SQL Server and PostgreSQL performance.",
      "Implement Docker-based deployments and CI/CD pipelines.",
      "Work in Agile teams and participate in code reviews.",
    ],
    tech: ["ASP.NET Core", "React", "SQL Server", "PostgreSQL", "Docker", "CI/CD"],
  },
  {
    company: "Onnorokom Software Ltd",
    role: "Assistant Software Engineer",
    period: "July 2023 — May 2025",
    location: "Dhaka, Bangladesh",
    summary:
      "Built EdTech products used at national scale — from secure APIs and relational data models to real-time communication and mobile features.",
    highlights: [
      "Developed ASP.NET Core Web APIs and MVC applications.",
      "Designed relational databases and optimized stored procedures.",
      "Implemented secure authentication and authorization.",
      "Built real-time features with SignalR and WebRTC.",
      "Contributed to mobile features in Kotlin and Swift.",
    ],
    tech: ["ASP.NET Core", "SignalR", "WebRTC", "SQL Server", "Kotlin", "Swift"],
  },
  {
    company: "Independent",
    role: "HTML5 Game & JavaScript Developer",
    period: "2020 — 2023",
    location: "Remote · Fiverr & Upwork",
    summary:
      "Started as a self-taught JavaScript developer building browser games for clients, then moved into multiplayer systems and full-stack product work.",
    highlights: [
      "Shipped canvas and Phaser.js games for freelance clients.",
      "Built multiplayer experiences with Socket.IO and Node.js.",
      "Learned backend fundamentals by wiring auth, APIs, and realtime state.",
    ],
    tech: ["JavaScript", "Phaser.js", "Socket.IO", "Node.js", "HTML5 Canvas"],
  },
];
