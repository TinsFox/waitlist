import { Monitor, Tablet, Smartphone, Fullscreen } from "lucide-react"
import { Separator } from "./ui/separator"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"
import { Button } from "./ui/button"
import { Link } from "next-view-transitions"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getTemplateLink } from "@/lib/utils"

type ViewportSize = "desktop" | "tablet" | "mobile" | "fullscreen"

interface PreviewControlsProps {
  viewport: ViewportSize
  onViewportChange: (size: ViewportSize) => void
  template: {
    link: string
  }
}

export function PreviewControls({
  viewport,
  onViewportChange,
  template,
}: PreviewControlsProps) {
  const handleViewportChange = (value: string) => {
    onViewportChange(value as ViewportSize)
  }
  return (
    <div className="hidden h-7 items-center gap-1.5 rounded-md border p-[2px] shadow-none lg:flex">
      <ToggleGroup
        type="single"
        value={viewport}
        onValueChange={handleViewportChange}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <ToggleGroupItem
              value="desktop"
              className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
              title="Desktop"
            >
              <Monitor className="size-3.5" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>Desktop</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <ToggleGroupItem
              value="tablet"
              className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
              title="Tablet"
            >
              <Tablet className="size-3.5" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>Tablet</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <ToggleGroupItem
              value="mobile"
              className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
              title="Mobile"
            >
              <Smartphone className="size-3.5" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>Mobile</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" className="h-4 mx-1" />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="size-[22px] rounded-sm p-0"
              asChild
              title="Open in New Tab"
            >
              <Link href={getTemplateLink(template.link)} target="_blank">
                <span className="sr-only">Open in New Tab</span>
                <Fullscreen className="size-3.5" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Open in New Tab</TooltipContent>
        </Tooltip>
      </ToggleGroup>
    </div>
  )
}
