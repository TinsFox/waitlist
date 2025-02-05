"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const { data: session, isPending } = authClient.useSession()

  return (
    <header className="sticky top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <span className="text-lg font-semibold">Waitlist</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/template"
              className="text-sm text-foreground/60 transition-colors hover:text-foreground"
            >
              Templates
            </Link>
            <Link
              href="/features"
              className="text-sm text-foreground/60 transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-foreground/60 transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="/changelog"
              className="text-sm text-foreground/60 transition-colors hover:text-foreground"
            >
              Changelog
            </Link>
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
  )
}
