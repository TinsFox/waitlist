"use client"
import { MDXProvider } from "@mdx-js/react"
import { Button, ButtonProps } from "@react-email/components"

import { Badge, BadgeProps } from "@/components/ui/badge"

const components = {
  Button: (props: ButtonProps) => {
    return (
      <Button
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
        {...props}
      />
    )
  },
  Badge: (props: BadgeProps) => {
    return <Badge {...props} />
  },
}

export function MdxProvider({ children }: { children: React.ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
