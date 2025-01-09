"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { RefreshCw, Variable } from "lucide-react"

interface TemplatePreviewProps {
  content: string
  subject: string
  variables: Record<string, string>
}

const DEFAULT_VARIABLES = {
  user_name: "John Doe",
  company_name: "Acme Inc",
  activation_link: "https://example.com/activate",
  current_date: new Date().toLocaleDateString(),
}

export function TemplatePreview({ content, subject }: TemplatePreviewProps) {
  const [variables, setVariables] = useState(DEFAULT_VARIABLES)
  const [showVariables, setShowVariables] = useState(false)

  const replaceVariables = (text: string) => {
    return text.replace(/\{\{(.*?)\}\}/g, (match, variable) => {
      const key = variable.trim()
      return variables[key as keyof typeof variables] || match
    })
  }

  const processedContent = replaceVariables(content)
  const processedSubject = replaceVariables(subject)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Preview</h3>
          <p className="text-sm text-muted-foreground">
            Preview how your email will look
          </p>
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowVariables(!showVariables)}
                >
                  <Variable className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle Variables Panel</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setVariables(DEFAULT_VARIABLES)}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset Variables</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {showVariables && (
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Template Variables</CardTitle>
              <CardDescription>Customize preview variables</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(variables).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="text-sm font-medium">
                    {key.replace(/_/g, " ")}
                  </label>
                  <Input
                    value={value}
                    onChange={(e) =>
                      setVariables({ ...variables, [key]: e.target.value })
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card className={showVariables ? "lg:col-span-2" : "lg:col-span-3"}>
          <CardHeader>
            <CardTitle className="text-base">Email Preview</CardTitle>
            <CardDescription>Subject: {processedSubject}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div
                dangerouslySetInnerHTML={{ __html: processedContent }}
                className="preview-content"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
