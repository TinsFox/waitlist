import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { emailTemplates } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

const updateTemplateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  category: z
    .enum(["onboarding", "marketing", "notification", "general"])
    .optional(),
  subject: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
})

type Params = Promise<{ id: string }>
export async function GET(request: Request, { params }: { params: Params }) {
  const id = (await params).id
  try {
    const [template] = await db
      .select()
      .from(emailTemplates)
      .where(eq(emailTemplates.id, parseInt(id)))

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    return NextResponse.json({ template })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch template",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request, { params }: { params: Params }) {
  const id = (await params).id
  try {
    const json = await request.json()
    const body = updateTemplateSchema.parse(json)

    const [template] = await db
      .update(emailTemplates)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(emailTemplates.id, parseInt(id)))
      .returning()

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    return NextResponse.json({ template })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json(
      {
        error: "Failed to update template",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const id = (await params).id
    const [template] = await db
      .delete(emailTemplates)
      .where(eq(emailTemplates.id, parseInt(id)))
      .returning()

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    return NextResponse.json({ template })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to delete template",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
