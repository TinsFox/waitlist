import type { Metadata } from "next"
import { waitlistTemplates } from "@/lib/db/schema"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm"
import { Suspense } from "react"
import { getAllHomeBlocks } from "@/lib/blocks"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug

  const template = await db
    .select()
    .from(waitlistTemplates)
    .where(eq(waitlistTemplates.slug, slug))
    .limit(1)

  if (!template || template.length === 0) {
    return {
      title: "Template not found",
      description: "Template not found",
    }
  }

  return {
    title: template[0].title,
    description: template[0].description,
    // og
  }
}

export default async function TemplatePage({ params }: Props) {
  const slug = (await params).slug
  const templates = await getAllHomeBlocks()
  if (!templates) {
    return <div>Template not found</div>
  }
  const Component = templates[slug].component
  return (
    <div className="">
      <Suspense fallback={<Skeleton className="h-screen" />}>
        <Component />
      </Suspense>
    </div>
  )
}
