import { searchParamsCache } from "@/app/search-params";
import { TemplateList } from "@/components/template-list";
import type { WaitlistTemplate } from "@/app/data/waitlists";

import { db } from "@/lib/db";
import { waitlistTemplates } from "@/lib/db/schema";
import { eq, and, like, or } from "drizzle-orm";

export async function FilteredTemplates() {
  const { q, category } = searchParamsCache.all();
  const showMore = q !== "" && category !== "all";
  const waitlistTemplatesData = (await db
    .select()
    .from(waitlistTemplates)
    .where(
      and(
        category !== "all"
          ? eq(waitlistTemplates.category, category)
          : undefined,
        q
          ? or(
            like(waitlistTemplates.title, `%${q}%`),
            like(waitlistTemplates.description, `%${q}%`)
          )
          : undefined
      )
    )) as unknown as WaitlistTemplate[];

  if (waitlistTemplatesData.length === 0) {
    return <div>There are no waitlists available.</div>;
  }
  return <TemplateList templates={waitlistTemplatesData} showMore={showMore} />;
}
