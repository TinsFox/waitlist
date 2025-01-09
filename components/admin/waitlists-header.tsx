"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useQueryState } from "nuqs"

export function WaitlistsHeader() {
  const [search, setSearch] = useQueryState("search")

  const handleSearch = (term: string) => {
    setSearch(term || null)
  }

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold tracking-tight">Waitlist Management</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search waitlists..."
            className="pl-8"
            defaultValue={search || ""}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
