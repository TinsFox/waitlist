"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export function EmailTemplatesHeader() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Email Templates</h1>
        <p className="text-sm text-muted-foreground">
          Create and manage your email templates
        </p>
      </div>
      <Button onClick={() => router.push("/email-templates/new")}>
        <Plus className="mr-2 h-4 w-4" />
        New Template
      </Button>
    </div>
  )
}
