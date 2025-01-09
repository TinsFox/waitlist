"use client"

import { FormCard } from "./form-card"
import { useForms } from "@/hooks/use-forms"

export function FormList() {
  const { forms, isLoading } = useForms()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {forms?.map((form) => <FormCard key={form.id} form={form} />)}
    </div>
  )
}
