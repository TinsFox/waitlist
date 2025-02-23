import { FilteredMails } from "@/components/filtered-mails";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import type { PageProps } from "@/types/params";
import { SearchFilters } from "@/components/search-filters.client";
import { getAllMailCategories } from "@/lib/blocks";
import { searchParamsCache } from "@/app/search-params";

export default async function MailsPage({ searchParams }: PageProps) {
  await searchParamsCache.parse(searchParams);

  const categories = await getAllMailCategories();
  return (
    <div className="flex min-h-screen flex-col bg-background relative">
      <main className="flex-1 container mx-auto px-4 py-16 mt-16 relative">
        <h1 className="text-2xl font-bold">Mail Templates</h1>
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
          <FilteredMails />
        </Suspense>
      </main>
    </div>
  );
}
