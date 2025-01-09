"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-background/80">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 space-y-6 text-center"
      >
        <div className="space-y-2">
          <h1 className="bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-4xl font-bold tracking-tighter text-transparent sm:text-5xl">
            404 - Page Not Found
          </h1>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm text-muted-foreground"
        >
          <p>
            Need help?{" "}
            <Link
              href="/support"
              className="text-primary/80 underline-offset-4 hover:text-primary hover:underline"
            >
              Contact support
            </Link>
          </p>
        </motion.div>
      </motion.div>

      {/* Background gradient effects */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute h-[600px] w-[600px] rotate-12 animate-pulse rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute h-[500px] w-[500px] -rotate-12 animate-pulse rounded-full bg-primary/3 blur-[120px]" />
      </div>
    </div>
  )
}
