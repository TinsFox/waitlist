import { waitlistTemplates } from "../route"
import { NextResponse } from "next/server"

export async function GET() {
  const categories = Array.from(
    new Set(waitlistTemplates.map((w) => w.category))
  )
  return NextResponse.json(categories)
}
