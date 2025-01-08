import { searchParamsCache } from "@/app/search-params"
import { TemplateList } from "@/components/template-list"
import type { WaitlistTemplate } from "@/app/data/waitlists"
import type { SearchParams } from "nuqs/server"
import { env } from "@/env"

async function getWaitlistTemplates(): Promise<WaitlistTemplate[]> {
  const res = await fetch(`${env.NEXT_PUBLIC_URL}/api/waitlist-templates`, {
    next: {
      revalidate: 3600, // 缓存1小时
    },
  })
  if (!res.ok) {
    throw new Error("Failed to fetch waitlist templates")
  }
  return res.json()
}

export async function FilteredTemplates({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const { q: searchQuery, category: selectedCategory } =
    await searchParamsCache.parse(searchParams)

  const waitlistTemplates = await getWaitlistTemplates()

  const searchQueryLower = searchQuery.toLowerCase()

  const filteredWaitlists = waitlistTemplates.filter((waitlist) => {
    if (selectedCategory !== "all" && waitlist.category !== selectedCategory) {
      return false
    }

    if (searchQuery === "") {
      return true
    }

    return (
      waitlist.title.toLowerCase().includes(searchQueryLower) ||
      waitlist.description.toLowerCase().includes(searchQueryLower)
    )
  })

  return <TemplateList templates={filteredWaitlists} />
}
