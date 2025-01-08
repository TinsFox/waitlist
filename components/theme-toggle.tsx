"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { cn } from "@/lib/utils"

const ThemeToggle = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    if ("startViewTransition" in document) {
      ;(
        document as Document & {
          startViewTransition: (callback: () => void) => void
        }
      ).startViewTransition(() => {
        setTheme(newTheme)
      })
    } else {
      setTheme(newTheme)
    }
  }

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn("relative", className)}
      {...props}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
})

ThemeToggle.displayName = "ThemeToggle"

export { ThemeToggle }
