import { Metadata } from "next"
import { TemplateList } from "@/components/email-templates/template-list"
import { EmailTemplatesHeader } from "@/components/email-templates/templates-header"

export const metadata: Metadata = {
  title: "Email Templates",
  description: "Manage your email templates",
}

export default function EmailTemplatesPage() {
  return (
    <div className="flex flex-col gap-6">
      <EmailTemplatesHeader />
      <TemplateList />
    </div>
  )
}
