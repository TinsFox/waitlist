export interface EmailTemplate {
  id: string
  name: string
  description?: string
  category?: string
  subject: string
  content: string
  updatedAt?: string
  variables: Record<string, string>
}

export interface CreateEmailTemplateInput {
  name: string
  description?: string
  category?: string
  subject: string
  content: string
  variables: Record<string, string>
}
