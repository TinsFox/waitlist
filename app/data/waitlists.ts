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
    status: "热门模板",
    joinedCount: "100+ 使用",
    title: "Tech Pulse",
    description: "适合 SaaS 产品和企业服务的专业等待列表页面",
    gradient: "from-[#3245ff]/20 to-[#bc52ee]/20",
    link: "/tech-pulse",
  },
  {
    id: "2",
    status: "新品",
    joinedCount: "50+ 使用",
    title: "Innovate",
    description: "为设计师和创意产品打造的独特视觉体验",
    gradient: "from-[#36BEFF]/20 to-[#3245FF]/20",
    link: "/innovate",
  },
  {
    id: "3",
    status: "新品",
    joinedCount: "100+ 使用",
    title: "Neon Next",
    description:
      "A waitlist template designed for modern developers and tech enthusiasts.",
    gradient: "from-[#36BEFF]/20 to-[#3245FF]/20",
    link: "/neon-next",
  },
]
