import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Waitlist } from "@/app/data/waitlists"
import Image from "next/image"
import { useState } from "react"

export function TemplatePreview({ template }: { template: Waitlist }) {
  const [imageError, setImageError] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative group h-[200px]">
          {!imageError ? (
            <Image
              src={`/templates/${template.id}.jpg`}
              alt={template.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <iframe
              src={template.link}
              className="w-full h-full border-0"
              title="Template Preview"
            />
          )}
          <button className="absolute inset-0 flex items-center justify-center text-white cursor-pointer bg-black transition-all duration-300 ease-in-out bg-opacity-0 group-hover:bg-opacity-50">
            <span className="transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out">
              Click to view full preview
            </span>
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Template Preview</DialogTitle>
          <DialogDescription>
            Preview the template before you join the waitlist
          </DialogDescription>
        </DialogHeader>
        {template.link ? (
          <iframe
            src={template.link}
            className="w-full h-full border-0"
            title="Template Preview"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">
              No preview available for this template
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
