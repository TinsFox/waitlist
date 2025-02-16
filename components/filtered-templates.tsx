import { searchParamsCache } from "@/app/search-params";
import { TemplateList } from "@/components/template-list";
import type { WaitlistTemplate } from "@/app/data/waitlists";
import type { SearchParams } from "nuqs/server";

import { db } from "@/lib/db";
import { waitlistTemplates } from "@/lib/db/schema";
import { eq, and, like, or } from "drizzle-orm";

export async function FilteredTemplates({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q: searchQuery, category: selectedCategory } =
    await searchParamsCache.parse(searchParams);

  const searchQueryLower = searchQuery.toLowerCase();


  const waitlistTemplatesData = (await db
    .select()
    .from(waitlistTemplates)
    .where(
      and(
        selectedCategory !== "all"
          ? eq(waitlistTemplates.category, selectedCategory)
          : undefined,
        searchQueryLower
          ? or(
            like(waitlistTemplates.title, `%${searchQueryLower}%`),
            like(waitlistTemplates.description, `%${searchQueryLower}%`)
          )
          : undefined
      )
    )) as unknown as WaitlistTemplate[];

  if (waitlistTemplatesData.length === 0) {
    return <div>There are no waitlists available.</div>;
  }
  return <TemplateList templates={waitlistTemplatesData} />;
}
