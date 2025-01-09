import { Metadata } from "next"
import { TemplateEditor } from "@/components/email-templates/template-editor"

export const metadata: Metadata = {
  title: "New Email Template",
  description: "Create a new email template",
}

export default function NewTemplatePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Create New Template</h1>
        <p className="text-sm text-muted-foreground">
          Design your email template with our visual editor
        </p>
      </div>
      <TemplateEditor />
    </div>
  )
}
