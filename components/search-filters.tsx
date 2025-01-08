import { ClientSearchFilters } from "./client-search-filters"
import { env } from "@/env"

async function getCategories(): Promise<string[]> {
  const res = await fetch(
    `${env.NEXT_PUBLIC_URL}/api/waitlist-templates/categories`,
    {
      // Add cache configuration
      next: {
        revalidate: 3600 // Revalidate every hour
      }
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch categories')
  }

  return res.json()
}

export async function SearchFilters() {
  const categories = await getCategories()
  return <ClientSearchFilters categories={categories} />
}
