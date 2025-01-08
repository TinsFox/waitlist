import { ClientSearchFilters } from "./client-search-filters"
import { db } from "@/lib/db"
import { waitlistTemplates } from "@/lib/db/schema"

export async function SearchFilters() {
  const categories = await db
    .selectDistinct({ category: waitlistTemplates.category })
    .from(waitlistTemplates)
    .then((categories) =>
      categories.map((c) => c.category).filter((c): c is string => c !== null)
    )

  return <ClientSearchFilters categories={categories} />
}
