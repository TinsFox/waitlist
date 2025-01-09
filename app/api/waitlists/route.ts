import { db } from "@/lib/db"
import { waitlists } from "@/lib/db/schema"
import { desc, like, sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get("page") || "1")
  const perPage = parseInt(searchParams.get("per_page") || "10")
  const search = searchParams.get("search") || ""

  const offset = (page - 1) * perPage

  const query = search ? like(waitlists.email, `%${search}%`) : undefined

  const [items, total] = await Promise.all([
    db
      .select()
      .from(waitlists)
      .where(query)
      .orderBy(desc(waitlists.createdAt))
      .limit(perPage)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(waitlists)
      .where(query)
      .then((res) => Number(res[0].count)),
  ])

  return NextResponse.json({
    items,
    total,
  })
}
