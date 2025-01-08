import { NextResponse } from "next/server"
import { waitlistTemplates } from "../route"

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const waitlist = waitlistTemplates.find((w) => w.id === params.id)

  if (!waitlist) {
    return NextResponse.json({ error: "Waitlist not found" }, { status: 404 })
  }

  return NextResponse.json(waitlist)
}
