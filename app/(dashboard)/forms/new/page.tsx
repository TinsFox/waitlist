import { Metadata } from "next"
import { FormEditor } from "@/components/forms/form-editor"

export const metadata: Metadata = {
  title: "Create Form",
  description: "Create a new waitlist registration form",
}

export default function NewFormPage() {
  return (
    <div className="flex flex-col gap-6">
      <FormEditor />
    </div>
  )
}
