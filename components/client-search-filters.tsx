"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useQueryStates } from "nuqs"
import { searchParamsParsers } from "@/app/search-params"
import { useTransition } from "react"
import { useDebouncedCallback } from "use-debounce"

interface ClientSearchFiltersProps {
  categories: string[]
}

export function ClientSearchFilters({ categories }: ClientSearchFiltersProps) {
  const [isPending, startTransition] = useTransition()

  const [searchParams, setSearchParams] = useQueryStates(searchParamsParsers, {
    shallow: false,
    startTransition,
    history: "push",
  })

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearchParams({ q: value })
  }, 300)

  return (
    <div
      className="mb-8 flex flex-col md:flex-row gap-4"
      role="search"
      aria-label="Template filters"
    >
      <div className="flex-1">
        <Input
          placeholder="Search templates..."
          defaultValue={searchParams.q}
          onChange={(e) => debouncedSetSearch(e.target.value)}
          className="max-w-md"
          aria-label="Search templates"
        />
      </div>

      {isPending && (
        <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
      )}
      <Select
        value={searchParams.category}
        onValueChange={(value) => setSearchParams({ category: value })}
        aria-label="Filter by category"
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
