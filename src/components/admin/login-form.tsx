"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Loader2, LogIn } from "lucide-react";
import { getClientAuth, isClientFirebaseConfigured } from "@/lib/firebase/client";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";

/** Maps Firebase's terse error codes onto something a human can act on. */
function messageFor(code: string): string {
  switch (code) {
    case "auth/invalid-email":
      return "That email address doesn't look right.";
    case "auth/missing-password":
      return "Enter your password.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Wrong email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a minute and try again.";
    case "auth/network-request-failed":
      return "Can't reach Firebase. Check your connection.";
    case "auth/unauthorized-domain":
      return "This domain isn't authorised in Firebase Auth yet.";
    default:
      return "Sign-in failed. Try again.";
  }
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const configured = isClientFirebaseConfigured();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      const credential = await signInWithEmailAndPassword(
        getClientAuth(),
        email.trim(),
        password,
      );

      const idToken = await credential.user.getIdToken();

      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        // The Firebase session is useless without the cookie — drop it.
        await signOut(getClientAuth()).catch(() => {});
        setError(body?.error ?? "That account isn't allowed in.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch (caught) {
      const code =
        caught && typeof caught === "object" && "code" in caught
          ? String((caught as { code: unknown }).code)
          : "";
      setError(messageFor(code));
    } finally {
      setPending(false);
    }
  }

  if (!configured) {
    return (
      <p className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground">
        Admin sign-in isn&apos;t configured on this deployment yet. The{" "}
        <code className="font-mono text-xs">NEXT_PUBLIC_FIREBASE_*</code>{" "}
        environment variables are missing.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="admin-email">Email</Label>
        <Input
          id="admin-email"
          type="email"
          autoComplete="username"
          autoFocus
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="admin-password">Password</Label>
        <Input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
        />
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-foreground"
        >
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full gap-2">
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <LogIn className="size-4" />
        )}
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
