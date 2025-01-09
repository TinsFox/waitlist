"use client"

import { useEffect, useState } from "react"
import { notFound, useParams } from "next/navigation"
import { TemplateEditor } from "@/components/email-templates/template-editor"
import { emailService } from "@/lib/email-service"
import { EmailTemplate } from "@/types/email"

export default function EmailTemplatePage() {
  const params = useParams()
  const [template, setTemplate] = useState<EmailTemplate | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTemplate = async () => {
      const template = await emailService.getTemplate(params.id as string)
      if (!template) {
        notFound()
      }
      setTemplate(template)
      setLoading(false)
    }
    loadTemplate()
  }, [params.id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!template) {
    return null
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">{template.name}</h1>
      <div className="mt-6">
        <TemplateEditor
          initialTemplate={{
            name: template.name,
            category: template.category,
            subject: template.subject,
            content: template.content,
            variables: template.variables,
          }}
          mode="edit"
        />
      </div>
    </div>
  )
}
