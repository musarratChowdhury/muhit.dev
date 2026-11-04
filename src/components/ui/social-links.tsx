import { Globe, Mail } from "lucide-react";
import type { SocialIcon, SocialLink } from "@/types/content";
import { cn, isExternalHref } from "@/lib/utils";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/icons/brand-icons";

function SocialIconGlyph({
  icon,
  className,
}: {
  icon: SocialIcon;
  className?: string;
}) {
  switch (icon) {
    case "github":
      return <GithubIcon className={className} />;
    case "linkedin":
      return <LinkedinIcon className={className} />;
    case "youtube":
      return <YoutubeIcon className={className} />;
    case "facebook":
      return <FacebookIcon className={className} />;
    case "instagram":
      return <InstagramIcon className={className} />;
    case "mail":
      return <Mail className={className} strokeWidth={1.8} />;
    case "globe":
      return <Globe className={className} strokeWidth={1.8} />;
  }
}

type SocialLinksProps = {
  links: readonly SocialLink[];
  className?: string;
  size?: "sm" | "md";
};

export function SocialLinks({ links, className, size = "md" }: SocialLinksProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {links.map((link) => {
        const external = isExternalHref(link.href) && !link.href.startsWith("mailto:");

        return (
          <a
            key={link.label}
            href={link.href}
            aria-label={link.label}
            title={link.label}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer noopener" : undefined}
            className={cn(
              "group inline-flex items-center justify-center rounded-full border border-border bg-white/[0.02] text-muted-strong transition-all duration-200",
              "hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-soft hover:text-accent",
              size === "sm" ? "size-9" : "size-10",
            )}
          >
            <SocialIconGlyph
              icon={link.icon}
              className={size === "sm" ? "size-4" : "size-[18px]"}
            />
          </a>
        );
      })}
    </div>
  );
}
