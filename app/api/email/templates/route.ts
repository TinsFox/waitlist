import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { emailTemplates } from "@/lib/db/schema"
import { desc } from "drizzle-orm"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, subject, content, description, category } = body

    const [newTemplate] = await db
      .insert(emailTemplates)
      .values({
        name,
        subject,
        content,
        description,
        category: category || "general",
      })
      .returning()

    return NextResponse.json({ success: true, template: newTemplate })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to save template",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // 从数据库获取所有模板，按创建时间降序排序
    const templates = await db
      .select()
      .from(emailTemplates)
      .orderBy(desc(emailTemplates.createdAt))

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
