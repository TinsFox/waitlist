"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg"
  text?: string
}

export function Loading({
  size = "default",
  text,
  className,
  ...props
}: LoadingProps) {
  const sizeClasses = {
    sm: "size-4 border-2",
    default: "size-8 border-3",
    lg: "size-12 border-4",
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className
      )}
      {...props}
    >
      <motion.div
        className={cn("rounded-full border-primary/20", sizeClasses[size])}
        style={{ borderTopColor: "hsl(var(--primary))" }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-muted-foreground"
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}
