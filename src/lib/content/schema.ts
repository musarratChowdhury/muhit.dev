import type {
  Certification,
  Education,
  Experience,
  NavItem,
  Principle,
  Project,
  ProjectCategory,
  ProjectLink,
  Recommendation,
  Review,
  ReviewSource,
  ReviewSummary,
  SiteContent,
  SkillGroup,
  SocialIcon,
  SocialLink,
  Stat,
  ThemeSettings,
} from "@/types/content";
import { normalizeHex } from "@/lib/theme";

/**
 * Server-side validation for everything the admin writes.
 *
 * The admin is a single trusted user, but the payload still arrives over HTTP:
 * a stale tab, a typo'd field name, or a hand-rolled request must never be able
 * to store a shape the public site cannot render. Each parser rebuilds the
 * value from known fields only, so unknown keys are dropped and wrong types
 * fall back to a sane default.
 */

export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

const fail = (error: string): ParseResult<never> => ({ ok: false, error });

const MAX_TEXT = 20_000;
const MAX_ITEMS = 200;

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function text(value: unknown, max = 2_000): string {
  if (typeof value !== "string") return "";
  return value.slice(0, max).trim();
}

function longText(value: unknown): string {
  return text(value, MAX_TEXT);
}

function optionalText(value: unknown, max = 2_000): string | undefined {
  const value2 = text(value, max);
  return value2 ? value2 : undefined;
}

function bool(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function list(value: unknown): unknown[] {
  return Array.isArray(value) ? value.slice(0, MAX_ITEMS) : [];
}

function stringList(value: unknown): string[] {
  return list(value)
    .map((item) => text(item, 500))
    .filter(Boolean);
}

function oneOf<T extends string>(
  value: unknown,
  allowed: readonly T[],
  fallback: T,
): T {
  const candidate = text(value, 100);
  return (allowed as readonly string[]).includes(candidate)
    ? (candidate as T)
    : fallback;
}

/** An absolute http(s) URL — the only kind of link the public site renders. */
function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** A root-relative path (`/images/me.jpg`) or an absolute http(s) URL. */
function isImageSource(value: string): boolean {
  return (value.startsWith("/") && !value.startsWith("//")) || isHttpUrl(value);
}

const SOCIAL_ICONS = [
  "github",
  "linkedin",
  "mail",
  "youtube",
  "facebook",
  "instagram",
  "globe",
] as const satisfies readonly SocialIcon[];

const REVIEW_SOURCES = [
  "Fiverr",
  "Upwork",
  "LinkedIn",
  "Email",
  "Direct",
] as const satisfies readonly ReviewSource[];

const PROJECT_CATEGORIES = [
  "Full-stack",
  "Mobile",
  "Real-time",
  "AI",
  "Games",
  "Tools",
] as const satisfies readonly ProjectCategory[];

const PROJECT_LINK_TYPES = ["live", "github", "case-study"] as const;

function parseNav(value: unknown): NavItem[] {
  return list(value)
    .map((item) => {
      const row = record(item);
      const label = text(row.label, 60);
      const href = text(row.href, 500);
      return label && href ? { label, href } : null;
    })
    .filter((item): item is NavItem => item !== null);
}

function parseSocials(value: unknown): SocialLink[] {
  return list(value)
    .map((item) => {
      const row = record(item);
      const label = text(row.label, 60);
      const href = text(row.href, 500);
      if (!label || !href) return null;
      const social: SocialLink = {
        label,
        href,
        icon: oneOf(row.icon, SOCIAL_ICONS, "globe"),
      };
      const handle = optionalText(row.handle, 120);
      if (handle) social.handle = handle;
      return social;
    })
    .filter((item): item is SocialLink => item !== null);
}

function parseStats(value: unknown): Stat[] {
  return list(value)
    .map((item) => {
      const row = record(item);
      const statValue = text(row.value, 40);
      const label = text(row.label, 120);
      return statValue && label ? { value: statValue, label } : null;
    })
    .filter((item): item is Stat => item !== null);
}

function parsePrinciples(value: unknown): Principle[] {
  return list(value)
    .map((item) => {
      const row = record(item);
      const title = text(row.title, 120);
      const description = longText(row.description);
      return title && description ? { title, description } : null;
    })
    .filter((item): item is Principle => item !== null);
}

/**
 * The hero portrait: either a path inside `public/` or an absolute http(s) URL.
 *
 * An empty value means "use the bundled portrait". Anything else is rejected
 * rather than stored — a `javascript:` URL, a protocol-relative `//host/x.jpg`,
 * or a relative path without a leading slash would either be unsafe or resolve
 * against the wrong origin.
 */
function parsePortrait(value: unknown): ParseResult<string> {
  const raw = text(value, 500);
  if (!raw) return { ok: true, value: "" };
  if (isImageSource(raw)) return { ok: true, value: raw };

  return fail("`portrait` must be an https:// URL or a path starting with /.");
}

export function parseMain(
  input: unknown,
): ParseResult<{ site: SiteContent["site"]; theme: ThemeSettings }> {
  const root = record(input);
  const site = record(root.site);
  const theme = record(root.theme);

  const required: [string, unknown][] = [
    ["name", site.name],
    ["shortName", site.shortName],
    ["role", site.role],
    ["email", site.email],
  ];

  for (const [field, value] of required) {
    if (!text(value)) return fail(`\`${field}\` cannot be empty.`);
  }

  const email = text(site.email, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail("`email` must be a valid email address.");
  }

  const url = text(site.url, 500);
  try {
    new URL(url);
  } catch {
    return fail("`url` must be an absolute URL, e.g. https://muhit.dev.");
  }

  const accent = normalizeHex(text(theme.accent, 20) || "#00ff99");
  if (!accent) return fail("`theme.accent` must be a hex colour like #00ff99.");

  const portrait = parsePortrait(site.portrait);
  if (!portrait.ok) return portrait;

  const colours: [keyof ThemeSettings, string, string][] = [
    ["background", text(theme.background, 20), "#0f0e1a"],
    ["surface", text(theme.surface, 20), "#141420"],
    ["surface2", text(theme.surface2, 20), "#1a1a2a"],
    ["foreground", text(theme.foreground, 20), "#f3f3f7"],
    ["muted", text(theme.muted, 20), "#9a9aab"],
    ["mutedStrong", text(theme.mutedStrong, 20), "#c7c7d4"],
  ];

  const parsedTheme: ThemeSettings = { accent } as ThemeSettings;
  for (const [key, value, fallback] of colours) {
    const normalized = normalizeHex(value) ?? fallback;
    parsedTheme[key] = normalized;
  }

  return {
    ok: true,
    value: {
      site: {
        name: text(site.name, 120),
        shortName: text(site.shortName, 60),
        firstName: text(site.firstName, 60),
        lastName: text(site.lastName, 60),
        portrait: portrait.value,
        initials: text(site.initials, 8),
        domain: text(site.domain, 120),
        role: text(site.role, 120),
        roleLong: text(site.roleLong, 160),
        tagline: longText(site.tagline),
        summary: longText(site.summary),
        location: text(site.location, 120),
        timezone: text(site.timezone, 40),
        email,
        availability: text(site.availability, 160),
        url,
        description: longText(site.description),
        nav: parseNav(site.nav),
        socials: parseSocials(site.socials),
        stats: parseStats(site.stats),
        principles: parsePrinciples(site.principles),
        currently: stringList(site.currently),
        languages: stringList(site.languages),
      },
      theme: parsedTheme,
    },
  };
}

export function parseExperience(input: unknown): ParseResult<Experience[]> {
  const items = list(input)
    .map((item) => {
      const row = record(item);
      const company = text(row.company, 120);
      const role = text(row.role, 160);
      if (!company || !role) return null;
      const experience: Experience = {
        company,
        role,
        period: text(row.period, 80),
        location: text(row.location, 120),
        summary: longText(row.summary),
        highlights: stringList(row.highlights),
        tech: stringList(row.tech),
      };
      if (bool(row.current)) experience.current = true;
      return experience;
    })
    .filter((item): item is Experience => item !== null);

  return { ok: true, value: items };
}

export function parseReviews(
  input: unknown,
): ParseResult<{ reviews: Review[]; summary: ReviewSummary }> {
  const root = record(input);
  const summaryRow = record(root.summary);

  const reviews = list(root.reviews)
    .map((item) => {
      const row = record(item);
      const quote = longText(row.quote);
      const name = text(row.name, 120);
      if (!quote || !name) return null;

      const review: Review = {
        quote,
        name,
        role: text(row.role, 160),
      };

      const country = optionalText(row.country, 80);
      if (country) review.country = country;
      const projectType = optionalText(row.projectType, 120);
      if (projectType) review.projectType = projectType;

      const rating = Number(row.rating);
      if (Number.isFinite(rating) && rating >= 1 && rating <= 5) {
        review.rating = Math.round(rating);
      }

      if (row.source !== undefined && row.source !== "") {
        review.source = oneOf(row.source, REVIEW_SOURCES, "Direct");
      }
      const sourceUrl = optionalText(row.sourceUrl, 500);
      if (sourceUrl) review.sourceUrl = sourceUrl;
      if (bool(row.featured)) review.featured = true;

      return review;
    })
    .filter((item): item is Review => item !== null);

  const criteria = list(summaryRow.criteria)
    .map((item) => {
      const row = record(item);
      const label = text(row.label, 80);
      if (!label) return null;
      const score = Number(row.score);
      return {
        label,
        score: Number.isFinite(score) ? Math.min(Math.max(score, 0), 5) : 5,
      };
    })
    .filter((item): item is { label: string; score: number } => item !== null);

  const score = Number(summaryRow.score);
  const summary: ReviewSummary = {
    score: Number.isFinite(score) ? Math.min(Math.max(score, 0), 5) : 5,
    platform: oneOf(summaryRow.platform, REVIEW_SOURCES, "Fiverr"),
    criteria,
  };
  const summaryUrl = optionalText(summaryRow.url, 500);
  if (summaryUrl) summary.url = summaryUrl;

  return { ok: true, value: { reviews, summary } };
}

export function parseEducation(
  input: unknown,
): ParseResult<{ education: Education[]; certifications: Certification[] }> {
  const root = record(input);

  const education = list(root.education)
    .map((item) => {
      const row = record(item);
      const degree = text(row.degree, 200);
      const school = text(row.school, 200);
      if (!degree || !school) return null;
      const entry: Education = {
        degree,
        school,
        period: text(row.period, 80),
        detail: longText(row.detail),
      };
      const status = optionalText(row.status, 80);
      if (status) entry.status = status;
      return entry;
    })
    .filter((item): item is Education => item !== null);

  const certifications = list(root.certifications)
    .map((item) => {
      const row = record(item);
      const name = text(row.name, 200);
      if (!name) return null;
      return {
        name,
        issuer: text(row.issuer, 200),
        year: text(row.year, 20),
      };
    })
    .filter((item): item is Certification => item !== null);

  return { ok: true, value: { education, certifications } };
}

export function parseSkills(
  input: unknown,
): ParseResult<{ groups: SkillGroup[]; marquee: string[] }> {
  const root = record(input);

  const groups = list(root.groups)
    .map((item) => {
      const row = record(item);
      const title = text(row.title, 120);
      if (!title) return null;
      return { title, items: stringList(row.items) };
    })
    .filter((item): item is SkillGroup => item !== null);

  return { ok: true, value: { groups, marquee: stringList(root.marquee) } };
}

function parseProjectLinks(value: unknown): ProjectLink[] {
  return list(value)
    .map((item) => {
      const row = record(item);
      const label = text(row.label, 80);
      const href = text(row.href, 500);
      if (!label || !href) return null;
      return {
        label,
        href,
        type: oneOf(row.type, PROJECT_LINK_TYPES, "live"),
      };
    })
    .filter((item): item is ProjectLink => item !== null);
}

export function parseProjects(input: unknown): ParseResult<Project[]> {
  const rows = list(input);
  const seen = new Set<string>();
  const projects: Project[] = [];

  for (const item of rows) {
    const row = record(item);
    const slug = text(row.slug, 120)
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const title = text(row.title, 200);

    if (!slug) return fail("Every project needs a slug (letters, numbers, dashes).");
    if (!title) return fail(`Project \`${slug}\` needs a title.`);
    if (seen.has(slug)) return fail(`Duplicate project slug: \`${slug}\`.`);
    seen.add(slug);

    const metrics = list(row.metrics)
      .map((metric) => {
        const metricRow = record(metric);
        const label = text(metricRow.label, 120);
        const value = text(metricRow.value, 60);
        return label && value ? { value, label } : null;
      })
      .filter((metric): metric is { value: string; label: string } => metric !== null);

    projects.push({
      slug,
      title,
      subtitle: text(row.subtitle, 240),
      summary: longText(row.summary),
      description: stringList(row.description),
      year: text(row.year, 20),
      role: text(row.role, 160),
      category: oneOf(row.category, PROJECT_CATEGORIES, "Full-stack"),
      featured: bool(row.featured),
      tech: stringList(row.tech),
      links: parseProjectLinks(row.links),
      cover: text(row.cover, 500),
      coverAlt: text(row.coverAlt, 300),
      accent: normalizeHex(text(row.accent, 20)) ?? "#00ff99",
      metrics,
      highlights: stringList(row.highlights),
      note: optionalText(row.note, 2_000),
    });
  }

  return { ok: true, value: projects };
}

export function parseRecommendations(
  input: unknown,
): ParseResult<Recommendation[]> {
  const items = list(input)
    .map((item) => {
      const row = record(item);
      const name = text(row.name, 120);
      const quote = longText(row.quote);
      if (!name || !quote) return null;

      const recommendation: Recommendation = {
        name,
        title: text(row.title, 160),
        quote,
      };

      const company = optionalText(row.company, 160);
      if (company) recommendation.company = company;
      const relationship = optionalText(row.relationship, 160);
      if (relationship) recommendation.relationship = relationship;
      const date = optionalText(row.date, 60);
      if (date) recommendation.date = date;

      // The extras are dropped instead of failing the save: a broken avatar
      // link should never cost the admin the paragraph they just wrote.
      const avatar = optionalText(row.avatar, 500);
      if (avatar && isImageSource(avatar)) recommendation.avatar = avatar;

      const profileUrl = optionalText(row.profileUrl, 500);
      if (profileUrl && isHttpUrl(profileUrl)) {
        recommendation.profileUrl = profileUrl;
      }

      return recommendation;
    })
    .filter((item): item is Recommendation => item !== null);

  return { ok: true, value: items };
}
