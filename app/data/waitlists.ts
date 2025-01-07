export interface Waitlist {
  id: string
  title: string
  description: string
  status: string
  joinedCount: string
  link: string
  category: string
}

export const waitlists: Waitlist[] = [
  {
    id: "tech-pulse",
    title: "Tech Pulse",
    status: "Popular Template",
    joinedCount: "100+ Uses",
    description:
      "Professional waitlist page for SaaS products and enterprise services",
    link: "/tech-pulse",
    category: "Technology",
  },
  {
    id: "innovate",
    title: "Innovate",
    status: "New",
    joinedCount: "50+ Uses",
    description:
      "Unique visual experience designed for designers and creative products",
    link: "/innovate",
    category: "Design",
  },
  {
    id: "neon-next",
    title: "Neon Next",
    status: "New",
    joinedCount: "100+ Uses",
    description:
      "A waitlist template designed for modern developers and tech enthusiasts.",
    link: "/neon-next",
    category: "Technology",
  },
]

export const categories = Array.from(new Set(waitlists.map((w) => w.category)))
