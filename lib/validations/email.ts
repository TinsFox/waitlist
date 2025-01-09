import * as z from "zod"

export const emailFormSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  content: z.string().min(1, "Content is required"),
  recipients: z.array(z.string()).min(1, "At least one recipient is required"),
  templateId: z.string().optional(),
  variables: z.record(z.string(), z.string()),
})

export type EmailFormValues = z.infer<typeof emailFormSchema>
