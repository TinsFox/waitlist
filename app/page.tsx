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
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.1] dark:opacity-[0.08]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_400px,hsl(var(--primary))_4%,transparent)] dark:bg-[radial-gradient(circle_800px_at_50%_400px,hsl(var(--primary))_12%,transparent)]" />
      </div>

      <SiteHeader />

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

      <SiteFooter />
    </div>
  )
}
