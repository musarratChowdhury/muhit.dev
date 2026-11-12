import type { ThemeSettings } from "@/types/content";

const HEX_RE = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

/** Accepts `#abc`, `#aabbcc`, `abc`, `aabbcc`. Returns `#aabbcc` or null. */
export function normalizeHex(input: string): string | null {
  const value = input.trim();
  const candidate = value.startsWith("#") ? value : `#${value}`;
  if (!HEX_RE.test(candidate)) return null;

  const body = candidate.slice(1);
  if (body.length === 3) {
    return `#${body[0]}${body[0]}${body[1]}${body[1]}${body[2]}${body[2]}`.toLowerCase();
  }
  return candidate.toLowerCase();
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = normalizeHex(hex);
  if (!normalized) return null;
  return {
    r: parseInt(normalized.slice(1, 3), 16),
    g: parseInt(normalized.slice(3, 5), 16),
    b: parseInt(normalized.slice(5, 7), 16),
  };
}

/** `#00ff99` + 0.12 → `rgba(0, 255, 153, 0.12)`. Falls back to the input. */
export function withAlpha(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

/** Relative luminance, used to pick readable text on a coloured background. */
function luminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const channel = (value: number) => {
    const srgb = value / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
}

/** Dark ink for light accents, near-white ink for dark accents. */
export function readableOn(hex: string): string {
  return luminance(hex) > 0.45 ? "#04110b" : "#f8fafc";
}

/**
 * Turns the stored theme into the CSS custom properties `globals.css` expects.
 *
 * `--accent-soft` and `--accent-foreground` are derived from the accent, so the
 * admin only ever has to pick one colour. `--brand-accent` is emitted explicitly
 * (not as `var(--accent)`) because the admin shell deliberately redefines
 * `--accent` to a hover surface and still needs the real brand colour.
 */
export function themeToCssVars(theme: ThemeSettings): Record<string, string> {
  const accent = normalizeHex(theme.accent) ?? "#00ff99";

  // Every colour is re-validated here: the document may have been hand-edited
  // in the Firebase console, and this string ends up inside a <style> tag.
  const colour = (value: string, fallback: string) =>
    normalizeHex(value) ?? fallback;

  return {
    "--accent": accent,
    "--accent-soft": withAlpha(accent, 0.12),
    "--accent-foreground": readableOn(accent),
    "--brand-accent": accent,
    "--brand-accent-ink": readableOn(accent),
    "--background": colour(theme.background, "#0f0e1a"),
    "--surface": colour(theme.surface, "#141420"),
    "--surface-2": colour(theme.surface2, "#1a1a2a"),
    "--foreground": colour(theme.foreground, "#f3f3f7"),
    "--muted": colour(theme.muted, "#9a9aab"),
    "--muted-strong": colour(theme.mutedStrong, "#c7c7d4"),
  };
}

/** Renders the theme as a `:root { … }` rule for the document `<head>`. */
export function themeToCssText(theme: ThemeSettings): string {
  const declarations = Object.entries(themeToCssVars(theme))
    // Belt and braces: no value may break out of the declaration or the rule.
    .map(([property, value]) => `${property}:${value.replace(/[<>{};]/g, "")}`)
    .join(";");
  return `:root{${declarations}}`;
}
