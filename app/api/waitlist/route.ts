import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { waitlists } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

const schema = z.object({
  email: z.string().email("please enter a valid email address"),
  name: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, company, message } = body

    try {
      schema.parse(body)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: error.errors[0].message },
          { status: 400 }
        )
      }
    }
    const existing = await db
      .select()
      .from(waitlists)
      .where(eq(waitlists.email, email))
    if (existing.length > 0) {
      return NextResponse.json(
        { error: "the email has been registered" },
        { status: 400 }
      )
    }

    const result = await db
      .insert(waitlists)
      .values({
        email,
        name,
        company,
        message,
      })
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Waitlist registration error:", error)
    return NextResponse.json(
      { error: "registration failed, please try again later" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const result = await db
      .select()
      .from(waitlists)
      .orderBy(waitlists.createdAt)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Fetching waitlist error:", error)
    return NextResponse.json({ error: "fetching data failed" }, { status: 500 })
  }
}
