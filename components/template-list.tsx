"use client"
import * as motion from "motion/react-client"
import { TemplateCard } from "./template-card"
import { ComingSoonCard } from "./coming-soon-card"
import { WaitlistTemplate } from "@/app/data/waitlists"
import { TemplatePreview } from "./template-preview"

interface TemplateListProps {
  templates: WaitlistTemplate[]
  showMore?: boolean
}

export function TemplateList({ templates, showMore = true }: TemplateListProps) {

  return (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
      >
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            role="listitem"
            aria-label={`${template.title} template`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <TemplateCard
              template={template}
              index={index}
              templates={templates}
            />
          </motion.div>
        ))}
        {showMore && (
          <motion.div
            role="listitem"
            aria-label={"Coming soon template"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: templates.length * 0.1 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <ComingSoonCard />
          </motion.div>
        )}
      </div>

      {templates.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No templates found matching your criteria.
          </p>
        </div>
      )}
      <TemplatePreview />
    </>
  )
}
