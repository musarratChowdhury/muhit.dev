"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SocialLinks } from "@/components/ui/social-links";
import { CopyEmail } from "@/components/ui/copy-email";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(href: string) {
    if (href.includes("#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 print:hidden",
          scrolled
            ? "border-b border-border bg-background/75 py-2.5 backdrop-blur-xl"
            : "border-b border-transparent py-4",
        )}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative flex size-9 items-center justify-center rounded-lg border border-accent/30 bg-accent-soft font-mono text-[11px] font-bold tracking-tight text-accent transition-all duration-200 group-hover:bg-accent group-hover:text-accent-foreground">
              {site.initials}
            </span>
            <span className="font-mono text-sm tracking-tight text-foreground">
              muhit<span className="text-accent">.dev</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm text-muted-strong transition-colors hover:bg-white/[0.03] hover:text-foreground",
                  isActive(item.href) && "bg-white/[0.04] text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className={buttonVariants({ size: "sm", className: "hidden sm:inline-flex" })}
            >
              Let&apos;s talk
              <ArrowUpRight className="size-4" strokeWidth={2} />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-white/[0.02] text-foreground transition-colors hover:border-accent/40 hover:text-accent lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-border bg-surface p-6 pt-24"
            >
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {site.nav.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between border-b border-border py-4 text-2xl font-medium tracking-tight transition-colors hover:text-accent"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-muted">
                      0{index + 1}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="mt-8 flex flex-col gap-4">
                <a
                  href={`mailto:${site.email}`}
                  className="font-mono text-sm text-muted-strong transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
                <SocialLinks links={site.socials} size="sm" />
              </div>

              <div className="mt-auto flex flex-col gap-4 border-t border-border pt-6">
                <CopyEmail className="w-fit" />
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {site.location} · {site.timezone}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
