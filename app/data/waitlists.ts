export type WaitlistItem = {
  id: string
  status: string
  joinedCount: string
  title: string
  description: string
  gradient: string
  link: string
}

export const waitlists: WaitlistItem[] = [
  {
    id: "1",
    status: "Popular Template",
    joinedCount: "100+ Uses",
    title: "Tech Pulse",
    description:
      "Professional waitlist page for SaaS products and enterprise services",
    gradient: "from-[#3245ff]/20 to-[#bc52ee]/20",
    link: "/tech-pulse",
  },
  {
    id: "2",
    status: "New",
    joinedCount: "50+ Uses",
    title: "Innovate",
    description:
      "Unique visual experience designed for designers and creative products",
    gradient: "from-[#36BEFF]/20 to-[#3245FF]/20",
    link: "/innovate",
  },
  {
    id: "3",
    status: "New",
    joinedCount: "100+ Uses",
    title: "Neon Next",
    description:
      "A waitlist template designed for modern developers and tech enthusiasts.",
    gradient: "from-[#36BEFF]/20 to-[#3245FF]/20",
    link: "/neon-next",
  },
]
