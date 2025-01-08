import { NextResponse } from "next/server"
import { waitlistTemplates } from "@/lib/db/schema"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id
  const waitlist = await db
    .select()
    .from(waitlistTemplates)
    .where(eq(waitlistTemplates.id, Number(id)))

  if (!waitlist) {
    return NextResponse.json({ error: "Waitlist not found" }, { status: 404 })
  }

  return NextResponse.json(waitlist)
}
