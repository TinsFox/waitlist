"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TemplatesFiltersProps {
  onSearch: (value: string) => void
  onCategoryChange: (value: string) => void
}

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "onboarding", label: "Onboarding" },
  { value: "notification", label: "Notification" },
  { value: "marketing", label: "Marketing" },
  { value: "transactional", label: "Transactional" },
]

export function TemplatesFilters({
  onSearch,
  onCategoryChange,
}: TemplatesFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          className="pl-8"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Select onValueChange={onCategoryChange} defaultValue="all">
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {CATEGORIES.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
