import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FormHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Form Builder</h1>
        <p className="text-muted-foreground">
          Create and manage your waitlist registration forms
        </p>
      </div>
      <Button asChild>
        <Link href="/forms/new">Create Form</Link>
      </Button>
    </div>
  )
}
