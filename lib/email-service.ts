import { EmailTemplate, CreateEmailTemplateInput } from "@/types/email"

export const emailService = {
  getTemplates: async (): Promise<EmailTemplate[]> => {
    const res = await fetch("/api/email-templates")
    const data = await res.json()
    return data.templates
  },

  getTemplate: async (id: string): Promise<EmailTemplate | undefined> => {
    const res = await fetch(`/api/email-templates/${id}`)
    if (!res.ok) return undefined
    const data = await res.json()
    return data.template
  },

  createTemplate: async (
    template: CreateEmailTemplateInput
  ): Promise<EmailTemplate> => {
    const res = await fetch("/api/email-templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(template),
    })
    const data = await res.json()
    return data.template
  },

  updateTemplate: async (
    id: string,
    template: Partial<CreateEmailTemplateInput>
  ): Promise<EmailTemplate> => {
    const res = await fetch(`/api/email-templates/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(template),
    })
    const data = await res.json()
    return data.template
  },

  deleteTemplate: async (id: string): Promise<EmailTemplate> => {
    const res = await fetch(`/api/email-templates/${id}`, {
      method: "DELETE",
    })
    const data = await res.json()
    return data.template
  },

  sendEmail: async (params: {
    templateId?: number
    subject: string
    content: string
    recipients: string[]
  }) => {
    const res = await fetch("/api/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
    return res.json()
  },
}
