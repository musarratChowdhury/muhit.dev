import type { NavItem, SocialLink, Stat } from "@/types/content";
import { BUNDLED_PORTRAIT } from "@/lib/site-assets";

export const site = {
  name: "Md. Musarrat Hossain Chowdhury",
  shortName: "Musarrat Chowdhury",
  firstName: "Musarrat",
  lastName: "Chowdhury",
  portrait: BUNDLED_PORTRAIT,
  initials: "MC",
  domain: "muhit.dev",
  role: "Software Engineer (.NET)",
  roleLong: "Full-stack software engineer",
  tagline:
    "I turn complex requirements into reliable software — from enterprise APIs and data layers to apps used by a million students.",
  summary:
    "I'm a software engineer with 3.5 years of experience designing scalable web, desktop, and mobile applications. I work mostly with C#, ASP.NET Core, React, SQL Server, and PostgreSQL, and I care about clean architecture, reliable APIs, and shipping things that hold up in production. AI-assisted development is part of my workflow — I use agentic tools to move faster, then review and validate every line before it ships.",
  location: "Dhaka, Bangladesh",
  timezone: "GMT+6",
  email: "musarratc30@gmail.com",
  availability: "Open to software engineering conversations",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhit.dev",
  description:
    "Software engineer in Dhaka building scalable web, desktop, and mobile products with .NET, React, and the cloud.",
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Experience", href: "/#experience" },
    { label: "Reviews", href: "/#reviews" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/musarratChowdhury",
      icon: "github",
      handle: "@musarratChowdhury",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/musarrat-chowdhury/",
      icon: "linkedin",
      handle: "in/musarrat-chowdhury",
    },
    {
      label: "Email",
      href: "mailto:musarratc30@gmail.com",
      icon: "mail",
      handle: "musarratc30@gmail.com",
    },
    {
      label: "YouTube",
      href: "https://youtube.com/channel/UCVjQmbN8hINpEb_kylWh2sg",
      icon: "youtube",
      handle: "Game dev experiments",
    },
  ] satisfies SocialLink[],
  stats: [
    { value: "3.5+", label: "Years building software" },
    { value: "1M+", label: "Students reached" },
    { value: "20+", label: "Designers supported" },
    { value: "10+", label: "Projects shipped" },
  ] satisfies Stat[],
  principles: [
    {
      title: "Clarity over cleverness",
      description:
        "Clean architecture, SOLID boundaries, and code that the next engineer can read without a meeting.",
    },
    {
      title: "Ship, measure, improve",
      description:
        "Production-minded from day one: CI/CD, observability, and performance work where it actually matters.",
    },
    {
      title: "AI-assisted, human-reviewed",
      description:
        "Agentic tools speed up the work. Every generated line still gets read, tested, and owned.",
    },
    {
      title: "Full-stack, end to end",
      description:
        "APIs, data models, interfaces, and deployment — I like owning the whole path to the user.",
    },
  ],
  currently: [
    "Building .NET and React products at Wafi Solutions",
    "Pursuing an M.Sc. in CSE at United International University",
    "Exploring RAG, Semantic Kernel, and MCP tooling",
  ],
  languages: ["English — IELTS 7.0", "Bangla — Native"],
} as const;
