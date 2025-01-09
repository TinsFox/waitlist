"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TemplatePreview } from "@/components/email-templates/template-preview"

interface TemplateEditorProps {
  initialTemplate?: {
    name: string
    subject: string
    category: string
    content: string
  }
  mode?: "create" | "edit"
}

export function TemplateEditor({
  initialTemplate,
  mode = "create",
}: TemplateEditorProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("edit")
  const [template, setTemplate] = useState({
    name: initialTemplate?.name || "",
    subject: initialTemplate?.subject || "",
    category: initialTemplate?.category || "",
    content: initialTemplate?.content || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement template saving logic
    console.log("Template data:", template)
    router.push("/email-templates")
  }

  const handlePreview = () => {
    setActiveTab("preview")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "edit" ? "Edit Template" : "Create Template"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                placeholder="e.g., Welcome Email"
                value={template.name}
                onChange={(e) =>
                  setTemplate({ ...template, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={template.category}
                onValueChange={(value) =>
                  setTemplate({ ...template, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="onboarding">Onboarding</SelectItem>
                  <SelectItem value="notification">Notification</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="transactional">Transactional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Email Subject</Label>
            <Input
              id="subject"
              placeholder="Enter email subject"
              value={template.subject}
              onChange={(e) =>
                setTemplate({ ...template, subject: e.target.value })
              }
              required
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="space-y-2">
              <Label htmlFor="content">Email Content</Label>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Use variables like {"{{"} user_name {"}},"} {"{{"}{" "}
                  company_name {"}}"}, etc.
                </div>
                <Textarea
                  id="content"
                  placeholder="Enter your email content here..."
                  className="min-h-[300px] font-mono"
                  value={template.content}
                  onChange={(e) =>
                    setTemplate({ ...template, content: e.target.value })
                  }
                  required
                />
              </div>
            </TabsContent>
            <TabsContent value="preview" className="min-h-[300px]">
              <TemplatePreview
                content={template.content}
                subject={template.subject}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/email-templates")}
          >
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={handlePreview}>
              Preview
            </Button>
            <Button type="submit">
              {mode === "edit" ? "Save Changes" : "Create Template"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}
