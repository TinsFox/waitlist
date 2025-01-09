import { Metadata } from "next"
import { FormEditor } from "@/components/forms/form-editor"

export const metadata: Metadata = {
  title: "Edit Form",
  description: "Edit your waitlist registration form",
}

export default function EditFormPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-6">
      <FormEditor formId={params.id} />
    </div>
  )
}
