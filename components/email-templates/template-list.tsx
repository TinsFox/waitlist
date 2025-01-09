"use client"

import { useState, useMemo } from "react"
import { TemplateCard } from "@/components/template-card"
import { TemplatesFilters } from "@/components/email-templates/templates-filters"

const DEMO_TEMPLATES = [
  {
    id: "1",
    name: "Welcome Email",
    description: "Send to new users when they sign up",
    category: "onboarding",
    updatedAt: "2024-01-15T10:30:00.000Z",
  },
  {
    id: "2",
    name: "Password Reset",
    description: "Password reset instructions",
    category: "transactional",
    updatedAt: "2024-01-14T15:45:00.000Z",
  },
  {
    id: "3",
    name: "Weekly Newsletter",
    description: "Weekly updates and news",
    category: "marketing",
    updatedAt: "2024-01-13T09:20:00.000Z",
  },
  {
    id: "4",
    name: "Order Confirmation",
    description: "Send after successful purchase",
    category: "transactional",
    updatedAt: "2024-01-12T16:15:00.000Z",
  },
  {
    id: "5",
    name: "Account Verification",
    description: "Email verification process",
    category: "onboarding",
    updatedAt: "2024-01-11T11:50:00.000Z",
  },
  {
    id: "6",
    name: "Promotional Campaign",
    description: "Special offers and promotions",
    category: "marketing",
    updatedAt: "2024-01-10T14:25:00.000Z",
  },
]

export function TemplateList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredTemplates = useMemo(() => {
    return DEMO_TEMPLATES.filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === "all" || template.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="space-y-6">
      <TemplatesFilters
        onSearch={setSearchQuery}
        onCategoryChange={setSelectedCategory}
      />

      {filteredTemplates.length === 0 ? (
        <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <h3 className="mt-4 text-lg font-semibold">No templates found</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              {searchQuery
                ? `No templates match "${searchQuery}"`
                : "No templates found in this category"}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template, index) => (
            <TemplateCard
              key={template.id}
              template={template}
              index={index}
              templates={filteredTemplates}
              href={`/email-templates/${template.id}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
