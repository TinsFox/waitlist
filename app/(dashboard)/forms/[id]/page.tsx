"use client"
import { FormEditor } from "@/components/forms/form-editor"
import { useParams } from "next/navigation"

export default function EditFormPage() {
  const params = useParams<{ id: string }>()

  return (
    <div className="flex flex-col gap-6">
      <FormEditor formId={params.id} />
    </div>
  )
}
