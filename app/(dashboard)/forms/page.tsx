import { Metadata } from "next"
import { FormList } from "@/components/forms/form-list"
import { FormHeader } from "@/components/forms/form-header"

export const metadata: Metadata = {
  title: "Form Builder",
  description: "Create and manage your waitlist registration forms",
}

export default function FormsPage() {
  return (
    <div className="flex flex-col gap-6">
      <FormHeader />
      <FormList />
    </div>
  )
}
