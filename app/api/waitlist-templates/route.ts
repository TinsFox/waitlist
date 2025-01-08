import { NextResponse } from "next/server"
import { WaitlistTemplate } from "@/app/data/waitlists"

export const waitlistTemplates: WaitlistTemplate[] = [
  {
    id: "tech-pulse",
    title: "Tech Pulse",
    status: "Popular Template",
    joinedCount: "Coming Soon",
    description:
      "Professional waitlist page for SaaS products and enterprise services",
    link: "/tech-pulse",
    category: "Technology",
  },
  {
    id: "innovate",
    title: "Innovate",
    status: "New",
    joinedCount: "Coming Soon",
    description:
      "Unique visual experience designed for designers and creative products",
    link: "/innovate",
    category: "Design",
  },
  {
    id: "neon-next",
    title: "Neon Next",
    status: "New",
    joinedCount: "Coming Soon",
    description:
      "A waitlist template designed for modern developers and tech enthusiasts.",
    link: "/neon-next",
    category: "Technology",
  },
]

export async function GET() {
  return NextResponse.json(waitlistTemplates)
}
