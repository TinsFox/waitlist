import { NewWaitlistTemplate } from "./schema"
import { env } from "@/env"

function getTemplateUrl(templateUrl: string) {
  return env.NEXT_PUBLIC_PROD_URL + templateUrl
}

export const waitlistTemplatesData: NewWaitlistTemplate[] = [
  {
    id: 1,
    title: "Tech Pulse",
    status: "Popular Template",
    joinedCount: "Coming Soon",
    description:
      "Professional waitlist page for SaaS products and enterprise services",
    link: getTemplateUrl("/tech-pulse"),
    category: "Technology",
  },
  {
    id: 2,
    title: "Innovate",
    status: "New",
    joinedCount: "Coming Soon",
    description:
      "Unique visual experience designed for designers and creative products",
    link: getTemplateUrl("/innovate"),
    category: "Design",
  },
  {
    id: 3,
    title: "Neon Next",
    status: "New",
    joinedCount: "Coming Soon",
    description:
      "A waitlist template designed for modern developers and tech enthusiasts.",
    link: getTemplateUrl("/neon-next"),
    category: "Technology",
  },
]
