import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { emailTemplates } from "@/lib/db/schema"
import { z } from "zod"

const createTemplateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  category: z.enum(["onboarding", "marketing", "notification", "general"]),
  subject: z.string().min(1),
  content: z.string().min(1),
})

export async function GET() {
  try {
    const templates = await db.select().from(emailTemplates)
    return NextResponse.json({ templates })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch templates",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const body = createTemplateSchema.parse(json)

    const [template] = await db
      .insert(emailTemplates)
      .values({
        name: body.name,
        description: body.description,
        category: body.category,
        subject: body.subject,
        content: body.content,
      })
      .returning()

    return NextResponse.json({ template })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json(
      {
        error: "Failed to create template",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
