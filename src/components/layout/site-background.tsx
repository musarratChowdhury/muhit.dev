export function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background print:hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-70 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_30%,transparent_100%)]" />
      <div className="absolute -top-48 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 animate-glow rounded-full bg-accent/[0.07] blur-[130px]" />
      <div className="absolute -right-56 top-[38%] h-[32rem] w-[32rem] rounded-full bg-indigo-500/[0.06] blur-[130px]" />
      <div className="absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-accent/[0.035] blur-[110px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,var(--background)_88%)]" />
    </div>
  );
}
