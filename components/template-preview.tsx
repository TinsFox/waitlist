import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAtom } from "jotai"
import { previewAtom } from "@/lib/atoms"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PreviewControls } from "./preview-controls"
import { cn } from "@/lib/utils"

type ViewportSize = "desktop" | "tablet" | "mobile" | "fullscreen"

const viewportSizes = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
  fullscreen: "100%",
}

export function TemplatePreview() {
  const [preview, setPreview] = useAtom(previewAtom)
  const [viewport, setViewport] = useState<ViewportSize>("desktop")

  const { isOpen, templates, currentIndex } = preview
  const template = templates[currentIndex]

  const handlePrevious = () => {
    setPreview((prev) => ({
      ...prev,
      currentIndex:
        (prev.currentIndex - 1 + templates.length) % templates.length,
    }))
  }

  const handleNext = () => {
    setPreview((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % templates.length,
    }))
  }

  const handleClose = () => {
    setPreview((prev) => ({ ...prev, isOpen: false }))
  }

  if (!template) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl h-[90vh]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex-1 min-w-0">
            <DialogTitle className="text-xl">{template.title}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              {template.description}
            </DialogDescription>
          </div>

          <div className="flex items-center gap-4 ml-4">
            <PreviewControls
              viewport={viewport}
              onViewportChange={setViewport}
              template={template}
            />

            <div className="hidden h-7 items-center gap-1.5 rounded-md border p-[2px] shadow-none lg:flex">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrevious}
                    className="size-7 rounded-r-none"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous template</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Previous template</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNext}
                    className="size-7 rounded-l-none"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next template</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Next template</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </DialogHeader>

        <div className="relative h-full flex items-center justify-center bg-muted/50 rounded-lg mt-4">
          <div
            className={cn(
              "bg-background h-full transition-all duration-300",
              viewport !== "fullscreen" && "rounded-lg shadow-sm",
              viewport === "mobile" && "h-[667px]",
              viewport === "tablet" && "h-[1024px]"
            )}
            style={{
              width: viewportSizes[viewport],
              maxHeight: "calc(90vh - 120px)",
            }}
          >
            {template.link ? (
              <iframe
                src={template.link}
                className="w-full h-full rounded-lg"
                title="Template Preview"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">
                  No preview available for this template
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
