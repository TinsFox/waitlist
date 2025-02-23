import { FilteredTemplates } from "@/components/filtered-templates";
import type { PageProps } from "@/types/params";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchFilters } from "@/components/search-filters.client";
import { Suspense } from "react";
import { searchParamsCache } from "@/app/search-params";
import { db } from "@/lib/db";
import { waitlistTemplates } from "@/lib/db/schema";

export default async function TemplatePage({ searchParams }: PageProps) {
  await searchParamsCache.parse(searchParams);
  const categories = (
    await db
      .selectDistinct({ category: waitlistTemplates.category })
      .from(waitlistTemplates)
  )
    .map((row) => row.category)
    .filter((category): category is string => category !== null);

  return (
    <div className="flex min-h-screen flex-col bg-background relative">
      <main className="flex-1 container mx-auto px-4 py-16 mt-16 relative">
        <h1 className="text-2xl font-bold">Templates</h1>
        <Suspense
          fallback={
            <div className="mb-8 flex flex-col md:flex-row gap-4">
              <Skeleton className="h-10 w-full max-w-md" />
              <Skeleton className="h-10 w-[180px]" />
            </div>
          }
        >
          <SearchFilters categories={categories} />
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
          <FilteredTemplates />
        </Suspense>
      </main>
    </div>
  );
}
