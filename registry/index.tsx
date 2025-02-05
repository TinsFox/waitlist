import * as React from "react"

export const Index: Record<string, any> = {
  innovate: {
    name: "innovate",
    title: "Innovate",
    slug: "innovate",
    description: "The future of software development is here",
    component: React.lazy(() => import("./template/innovate")),
  },
  "tech-pulse": {
    name: "tech-pulse",
    title: "Tech Pulse",
    slug: "tech-pulse",
    description: "The future of software development is here",
    component: React.lazy(() => import("./template/tech-pulse")),
  },
  "neon-next": {
    name: "neon-next",
    title: "Neon Next",
    slug: "neon-next",
    description: "The future of software development is here",
    component: React.lazy(() => import("./template/neon-next")),
  },
}
