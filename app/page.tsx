import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { SearchFilters } from "@/components/search-filters"
import type { SearchParams } from "nuqs/server"
import { Suspense } from "react"
import { FilteredTemplates } from "@/components/filtered-templates"
import { Skeleton } from "@/components/ui/skeleton"

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function Home({ searchParams }: PageProps) {
  return (
    <main
      className="flex-1 container mx-auto px-4 py-16 mt-16 relative"
      role="main"
      aria-label="Template showcase page"
    >
      <HeroSection />

      <Suspense
        fallback={
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <Skeleton className="h-10 w-full max-w-md" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
        }
      >
        <SearchFilters />
      </Suspense>

      <Suspense
        fallback={
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-[300px]" />
            ))}
          </div>
        }
      >
        <FilteredTemplates searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
