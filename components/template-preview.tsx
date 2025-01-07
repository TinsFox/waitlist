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
import Link from "next/link"

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
        <DialogHeader className="flex flex-row items-start justify-between">
          <div>
            <DialogTitle>{template.title}</DialogTitle>
            <DialogDescription>{template.description}</DialogDescription>
          </div>
          <Link
            href={template.link}
            target="_blank"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-4"
          >
            Live Preview
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
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
