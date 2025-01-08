import { NextResponse } from "next/server"
import { waitlistTemplates } from "@/lib/db/schema"
import { db } from "@/lib/db"

export async function GET() {
  const waitlistTemplatesData = await db.select().from(waitlistTemplates)
  return NextResponse.json(waitlistTemplatesData)
}
