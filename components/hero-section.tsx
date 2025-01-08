"use client"
import { Badge } from "@/components/ui/badge"
import { WaitlistForm } from "@/components/waitlist-form"
import * as motion from "motion/react-client"

export function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16 space-y-4"
    >
      <div className="inline-block">
        <Badge className="mb-4" variant="secondary">
          ✨ Waitlist Templates
        </Badge>
      </div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
        Professional Product Waitlist Templates
      </h1>
      <p className="text-base md:text-lg max-w-2xl mx-auto text-muted-foreground">
        Carefully designed waitlist templates to help you quickly build
        professional product reservation pages and improve conversion rates
      </p>

      <div className="mt-8">
        <WaitlistForm />
      </div>
    </motion.div>
  )
}
