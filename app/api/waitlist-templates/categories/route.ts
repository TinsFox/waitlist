import { waitlistTemplates } from "@/lib/db/schema"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  const categories = await db
    .selectDistinct({ category: waitlistTemplates.category })
    .from(waitlistTemplates)
  return NextResponse.json(categories)
}
