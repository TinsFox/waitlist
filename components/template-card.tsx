import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail } from "lucide-react"
import Link from "next/link"

interface Template {
  id: string
  name: string
  description: string
  category: string
  updatedAt: string
}

interface TemplateCardProps {
  template: Template
  href: string
  index: number
  templates: Template[]
}

const categoryColors: Record<string, string> = {
  onboarding: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  marketing:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  transactional:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  notification:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
}

export function TemplateCard({
  template,
  href,
  index,
  templates,
}: TemplateCardProps) {
  return (
    <Link href={href}>
      <Card className="hover:bg-muted/50 transition-colors h-[180px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 max-w-[70%]">
              <Mail className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <CardTitle className="text-base truncate">
                {template.name}
              </CardTitle>
            </div>
            <Badge
              variant="secondary"
              className={categoryColors[template.category]}
            >
              {template.category}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2">
            {template.description}
          </CardDescription>
          <CardDescription className="text-xs mt-auto">
            Last updated: {template.updatedAt}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
