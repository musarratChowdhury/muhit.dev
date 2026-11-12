"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const inputClassName =
  "mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/70 transition-colors focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

export function ContactForm({ to }: { to: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Portfolio enquiry${name ? ` from ${name}` : ""}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Your name
          </span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ada Lovelace"
            className={inputClassName}
          />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Your email
          </span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="ada@example.com"
            className={inputClassName}
          />
        </label>
      </div>

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          What are you working on?
        </span>
        <textarea
          name="message"
          required
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="A role, a product, a gnarly backend problem — tell me a little about it."
          className={`${inputClassName} resize-y`}
        />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className={buttonVariants({ size: "lg" })}>
          <Mail className="size-4" strokeWidth={1.8} />
          Open email draft
          <ArrowUpRight className="size-4" strokeWidth={2} />
        </button>
        <p className="max-w-xs text-xs leading-relaxed text-muted">
          This opens your mail app with the message prefilled. Nothing is sent
          to a server.
        </p>
      </div>

      {sent ? (
        <p
          role="status"
          className="rounded-xl border border-accent/25 bg-accent-soft px-4 py-3 text-sm text-accent"
        >
          Your email draft should be open. If it isn&apos;t, write to{" "}
          <a href={`mailto:${to}`} className="underline underline-offset-2">
            {to}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
