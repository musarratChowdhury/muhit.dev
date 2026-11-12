/**
 * Shared knowledge about the site's images.
 *
 * The portrait can come from either of two places: the bundled file in
 * `public/images/`, or a URL the admin pasted in `/admin/site`. Keeping the
 * fallback path in one module means the seed, the hero and the editor cannot
 * disagree about it.
 */

/** The portrait shipped with the repository, used when no URL is configured. */
export const BUNDLED_PORTRAIT = "/images/portrait.jpg";

/**
 * True when the portrait lives on another origin.
 *
 * Remote images skip Next's image optimiser: they are rendered as-is, because
 * optimising them would need a `remotePatterns` rule that allows every host.
 */
export function isRemoteImage(src: string): boolean {
  return /^https?:\/\//i.test(src);
}
