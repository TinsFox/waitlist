"use client"

import { notFound, useParams } from "next/navigation"
import { TemplateEditor } from "@/components/email-templates/template-editor"

const DEMO_TEMPLATES = [
  {
    id: "1",
    name: "Welcome Email",
    description: "Send to new users when they sign up",
    category: "onboarding",
    subject: "Welcome to Our Platform!",
    content:
      "Hi {{ user_name }},\n\nWelcome to {{ company_name }}! We're excited to have you on board.",
    updatedAt: new Date().toISOString(),
  },
]

export default function EmailTemplatePage() {
  const params = useParams()
  const template = DEMO_TEMPLATES.find((t) => t.id === params.id)

  if (!template) {
    notFound()
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
          }}
          mode="edit"
        />
      </div>
    </div>
  )
}
