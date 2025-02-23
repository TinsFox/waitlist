"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const headerLinks = [
  {
    label: "Templates",
    href: "/template",
  },
  {
    label: "Mails",
    href: "/mails",
  },
  {
    label: "Features",
    href: "/features",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Changelog",
    href: "/changelog",
  },
];

export function SiteHeader() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <span className="text-lg font-semibold">Waitlist</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {headerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors",
                  pathname === link.href
                    ? "text-foreground font-medium"
                    : "text-foreground/60 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="h-9 w-16 rounded bg-muted animate-pulse" />
            </div>
          ) : session ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-normal"
                asChild
              >
                <Link
                  href="/dashboard"
                  className={cn(
                    "text-sm font-normal",
                    session.user.role !== "admin" &&
                    "opacity-50 pointer-events-none"
                  )}
                >
                  Dashboard
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-normal"
                asChild
              >
                <Link href="/sign-in">Log in</Link>
              </Button>
              <Button
                size="sm"
                className="bg-foreground text-background hover:bg-foreground/90"
                asChild
              >
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
