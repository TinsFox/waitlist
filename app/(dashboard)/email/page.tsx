"use client"

import { useState, useEffect } from "react"
import { useUsers } from "@/hooks/use-users"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { emailFormSchema, type EmailFormValues } from "@/lib/validations/email"
import { emailService } from "@/lib/email-service"
import { EmailTemplate } from "@/types/email"

export default function EmailPage() {
  const [isSending, setIsSending] = useState(false)
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false)
  const [newTemplateName, setNewTemplateName] = useState("")
  const [templates, setTemplates] = useState<EmailTemplate[]>([])

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      subject: "",
      content: "",
      recipients: [],
      templateId: "",
      variables: {},
    },
  })

  const { data: usersData, isLoading } = useUsers({
    page: 1,
    sortBy: "createdAt",
    sortDirection: "desc",
  })

  useEffect(() => {
    const loadTemplates = async () => {
      const templates = await emailService.getTemplates()
      setTemplates(templates)
    }
    loadTemplates()
  }, [])

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      form.setValue("subject", template.subject)
      form.setValue("content", template.content)
      form.setValue("templateId", templateId)
    }
  }

  const handleSaveTemplate = async () => {
    if (!newTemplateName) {
      toast.error("Please enter a template name")
      return
    }

    try {
      const newTemplate = await emailService.createTemplate({
        name: newTemplateName,
        subject: form.getValues("subject"),
        content: form.getValues("content"),
        variables: form.getValues("variables"),
      })

      setTemplates((prev) => [...prev, newTemplate])
      toast.success("Template saved successfully")
      setIsTemplateDialogOpen(false)
      setNewTemplateName("")
    } catch (error) {
      toast.error("Failed to save template", {
        description: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  const onSubmit = async (values: EmailFormValues) => {
    if (values.recipients.length === 0) {
      toast.error("Please select at least one recipient")
      return
    }

    setIsSending(true)
    try {
      await emailService.sendEmail({
        subject: values.subject,
        content: values.content,
        recipients: values.recipients,
      })

      toast.success("Emails sent successfully")
      form.reset()
    } catch (error) {
      toast.error("Failed to send emails", {
        description: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsSending(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Send Email to Users</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="templateId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value}
                      onValueChange={handleTemplateSelect}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">
                          <span>No template</span>
                        </SelectItem>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            <span>{template.name}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Dialog
              open={isTemplateDialogOpen}
              onOpenChange={setIsTemplateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save as Template
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save as Template</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Template Name
                    </label>
                    <Input
                      value={newTemplateName}
                      onChange={(e) => setNewTemplateName(e.target.value)}
                      placeholder="Enter template name"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleSaveTemplate}
                    className="w-full"
                  >
                    Save Template
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email subject" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter email content"
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipients"
            render={() => (
              <FormItem>
                <FormLabel>Select Recipients</FormLabel>
                <div className="border rounded-lg p-4 max-h-60 overflow-y-auto space-y-2">
                  {usersData?.map((user) => (
                    <div key={user.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={user.id}
                        checked={form.watch("recipients").includes(user.id)}
                        onCheckedChange={(checked) => {
                          const recipients = form.getValues("recipients")
                          if (checked) {
                            form.setValue("recipients", [
                              ...recipients,
                              user.id,
                            ])
                          } else {
                            form.setValue(
                              "recipients",
                              recipients.filter((id) => id !== user.id)
                            )
                          }
                        }}
                      />
                      <label htmlFor={user.id} className="text-sm">
                        {user.email}
                      </label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSending} className="w-full">
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Email"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
