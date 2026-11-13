import type { ComponentType, SVGProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Country flags for review cards.
 *
 * Emoji flags are not an option: Windows ships no flag glyphs, so `🇲🇰` renders
 * as the letters "MK" in Chrome. These are inlined Twemoji SVGs (CC-BY 4.0,
 * `jdecked/twemoji`) — a few hundred bytes each, no network request, and they
 * look the same on every platform.
 *
 * Add a country by exporting another component and mapping its English name
 * (lower-cased) in `FLAGS`. Unmapped countries simply render no flag.
 */

type FlagProps = SVGProps<SVGSVGElement>;

function Flag({ children, className, ...props }: FlagProps) {
  return (
    <svg
      viewBox="0 0 36 36"
      aria-hidden="true"
      focusable="false"
      className={cn("inline-block size-3.5 shrink-0 rounded-[2px]", className)}
      {...props}
    >
      {children}
    </svg>
  );
}

function NorthMacedoniaFlag(props: FlagProps) {
  return (
    <Flag {...props}>
      <path
        fill="#D20000"
        d="M34.618 5.998L32 6l-1.5-1H20l-2 1-2-1H5.5L4 6l-2.618-.002C.542 6.731 0 7.797 0 9v6.5L1 18l-1 2.5V27c0 1.203.542 2.269 1.382 3.002L4 30l1.5 1H16l2-1 2 1h10.5l1.5-1 2.618.002C35.458 29.269 36 28.203 36 27v-6.5L35 18l1-2.5V9c0-1.203-.542-2.269-1.382-3.002z"
      />
      <path
        fill="#FFE600"
        d="M36 20.5v-5l-13.681 1.9c-.101-.724-.369-1.391-.779-1.957l13.091-9.455C33.928 5.373 33.008 5 32 5h-1.5l-9.663 9.691c-.659-.566-1.482-.932-2.392-1.026L20 5h-4l1.555 8.665c-.911.094-1.733.46-2.392 1.026L5.5 5H4c-1.008 0-1.928.373-2.632.988l13.092 9.455c-.41.566-.678 1.233-.779 1.957L0 15.5v5l13.681-1.9c.101.724.369 1.391.779 1.957L1.368 30.012l.001.001C2.072 30.628 2.993 31 4 31h1.5l9.663-9.691c.659.566 1.482.932 2.392 1.026L16 31h4l-1.555-8.665c.911-.094 1.733-.46 2.392-1.026L30.5 31H32c1.008 0 1.929-.373 2.632-.988L21.54 20.557c.41-.566.678-1.233.779-1.957L36 20.5z"
      />
      <path
        fill="#D20000"
        d="M18 13.62c-2.415 0-4.38 1.965-4.38 4.38s1.965 4.38 4.38 4.38 4.38-1.965 4.38-4.38-1.965-4.38-4.38-4.38zm0 7.737c-1.851 0-3.357-1.506-3.357-3.357s1.506-3.357 3.357-3.357 3.357 1.506 3.357 3.357-1.506 3.357-3.357 3.357z"
      />
    </Flag>
  );
}

function UnitedStatesFlag(props: FlagProps) {
  return (
    <Flag {...props}>
      <path
        fill="#B22334"
        d="M35.445 7C34.752 5.809 33.477 5 32 5H18v2h17.445zM0 25h36v2H0zm18-8h18v2H18zm0-4h18v2H18zM0 21h36v2H0zm4 10h28c1.477 0 2.752-.809 3.445-2H.555c.693 1.191 1.968 2 3.445 2zM18 9h18v2H18z"
      />
      <path
        fill="#EEE"
        d="M.068 27.679c.017.093.036.186.059.277.026.101.058.198.092.296.089.259.197.509.333.743L.555 29h34.89l.002-.004c.135-.233.243-.483.332-.741.034-.099.067-.198.093-.301.023-.09.042-.182.059-.275.041-.22.069-.446.069-.679H0c0 .233.028.458.068.679zM0 23h36v2H0zm0-4v2h36v-2H18zm18-4h18v2H18zm0-4h18v2H18zM0 9c0-.233.03-.457.068-.679C.028 8.542 0 8.767 0 9zm.555-2l-.003.005L.555 7zM.128 8.044c.025-.102.06-.199.092-.297-.034.098-.066.196-.092.297zM18 9h18c0-.233-.028-.459-.069-.68-.017-.092-.035-.184-.059-.274-.027-.103-.059-.203-.094-.302-.089-.258-.197-.507-.332-.74.001-.001 0-.003-.001-.004H18v2z"
      />
      <path fill="#3C3B6E" d="M18 5H4C1.791 5 0 6.791 0 9v10h18V5z" />
      <path
        fill="#FFF"
        d="M2.001 7.726l.618.449-.236.725L3 8.452l.618.448-.236-.725L4 7.726h-.764L3 7l-.235.726zm2 2l.618.449-.236.725.617-.448.618.448-.236-.725L6 9.726h-.764L5 9l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L9 9l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L13 9l-.235.726zm-8 4l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L5 13l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L9 13l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L13 13l-.235.726zm-6-6l.618.449-.236.725L7 8.452l.618.448-.236-.725L8 7.726h-.764L7 7l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L11 7l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L15 7l-.235.726zm-12 4l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L3 11l-.235.726zM6.383 12.9L7 12.452l.618.448-.236-.725.618-.449h-.764L7 11l-.235.726h-.764l.618.449zm3.618-1.174l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L11 11l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L15 11l-.235.726zm-12 4l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L3 15l-.235.726zM6.383 16.9L7 16.452l.618.448-.236-.725.618-.449h-.764L7 15l-.235.726h-.764l.618.449zm3.618-1.174l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L11 15l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L15 15l-.235.726z"
      />
    </Flag>
  );
}

function FranceFlag(props: FlagProps) {
  return (
    <Flag {...props}>
      <path
        fill="#ED2939"
        d="M36 27c0 2.209-1.791 4-4 4h-8V5h8c2.209 0 4 1.791 4 4v18z"
      />
      <path
        fill="#002495"
        d="M4 5C1.791 5 0 6.791 0 9v18c0 2.209 1.791 4 4 4h8V5H4z"
      />
      <path fill="#EEE" d="M12 5h12v26H12z" />
    </Flag>
  );
}

function UnitedKingdomFlag(props: FlagProps) {
  return (
    <Flag {...props}>
      <path
        fill="#00247D"
        d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z"
      />
      <path
        fill="#CF1B2B"
        d="M25.14 23l9.712 6.801c.471-.479.808-1.082.99-1.749L28.627 23H25.14zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943V23zm10-10h2.141l9.711-6.8c-.521-.53-1.188-.909-1.937-1.085L23 12.057V13zm-12.141 0L1.148 6.2C.677 6.68.34 7.282.157 7.949L7.372 13h3.487z"
      />
      <path
        fill="#EEE"
        d="M36 21H21v10h2v-5.836L31.335 31H32c1.117 0 2.126-.461 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36v-2zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21H0zM36 9c0-1.091-.439-2.078-1.148-2.8L25.141 13H23v-.943l9.915-6.942C32.62 5.046 32.316 5 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059V9zM13 5v5.837L4.664 5H4c-1.118 0-2.126.461-2.852 1.2l9.711 6.8H7.372L.157 7.949C.065 8.286 0 8.634 0 9v.059L5.628 13H0v2h15V5h-2z"
      />
      <path fill="#CF1B2B" d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z" />
    </Flag>
  );
}

const FLAGS: Record<string, ComponentType<FlagProps>> = {
  "north macedonia": NorthMacedoniaFlag,
  "macedonia": NorthMacedoniaFlag,
  "united states": UnitedStatesFlag,
  "united states of america": UnitedStatesFlag,
  "usa": UnitedStatesFlag,
  "us": UnitedStatesFlag,
  "france": FranceFlag,
  "united kingdom": UnitedKingdomFlag,
  "great britain": UnitedKingdomFlag,
  "uk": UnitedKingdomFlag,
  "gb": UnitedKingdomFlag,
};

/** Renders the flag for an English country name, or nothing when unmapped. */
export function CountryFlag({
  country,
  className,
}: {
  country?: string;
  className?: string;
}) {
  if (!country) return null;

  const FlagComponent = FLAGS[country.trim().toLowerCase()];
  if (!FlagComponent) return null;

  return <FlagComponent className={className} />;
}
