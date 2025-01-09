export interface FormField {
  id: string
  type: "text" | "email" | "number" | "select" | "textarea" | "checkbox"
  label: string
  placeholder?: string
  required: boolean
  options?: string[] // 用于 select 类型
}

export interface Form {
  id: string
  name: string
  description: string
  fields: FormField[]
  submissions: number
  createdAt: string
  updatedAt: string
}
