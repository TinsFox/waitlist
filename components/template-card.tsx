import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SquareArrowOutUpRight } from "lucide-react"
import Link from "next/link"
import { useSetAtom } from "jotai"
import { previewAtom } from "@/lib/atoms"
import { getTemplateLink } from "@/lib/utils"
import { WaitlistTemplate } from "@/app/data/waitlists"

interface TemplateCardProps {
  template: WaitlistTemplate
  index: number
  templates: WaitlistTemplate[]
  href?: string
}

export function TemplateCard({
  template,
  index,
  templates,
  href,
}: TemplateCardProps) {
  const setPreview = useSetAtom(previewAtom)

  const handleClick = () => {
    setPreview({
      isOpen: true,
      templates,
      currentIndex: index,
    })
  }

  return (
    <Card className="group border border-border/40 bg-background/60 dark:bg-card/80 backdrop-blur-xl transition-all duration-300 hover:border-border/60 hover:shadow-lg dark:hover:border-border/30 h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Badge
              variant="secondary"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {template.status}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-muted hover:bg-muted/90 text-muted-foreground"
            >
              {template.category}
            </Badge>
          </div>
          <Badge
            variant="outline"
            className="border-border/40 bg-background/60 text-muted-foreground group-hover:bg-background/80 group-hover:border-border/60 transition-colors"
          >
            {template.joinedCount}
          </Badge>
        </div>
        <CardTitle className="text-xl mt-4 text-foreground/90 group-hover:text-foreground transition-colors">
          {template.title}
        </CardTitle>
        <CardDescription className="min-h-[48px] text-muted-foreground">
          {template.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative group h-[200px]">
          {template.link && (
            <iframe
              src={`${getTemplateLink(template.link)}?iframe=true`}
              className="w-full h-full border-0 rounded-md "
              title="Template Preview"
              scrolling="no"
              frameBorder="0"
            />
          )}
          <button
            className="rounded-md absolute inset-0 flex items-center justify-center text-white cursor-pointer bg-black transition-all duration-300 ease-in-out bg-opacity-0 group-hover:bg-opacity-50"
            onClick={handleClick}
          >
            <span className="transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out">
              Click to view full preview
            </span>
          </button>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full relative overflow-hidden group/button bg-primary hover:bg-primary/90"
          size="lg"
          variant="default"
          asChild
        >
          <Link href={getTemplateLink(template.link)} target="_blank">
            <span className="relative z-10 flex items-center">
              Live Preview
              <SquareArrowOutUpRight className="w-4 h-4 ml-2" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground/20 opacity-0 group-hover/button:opacity-100 transition-opacity" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
