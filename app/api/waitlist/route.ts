import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { waitlists } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, company, message } = body

    // 验证邮箱
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "请输入有效的邮箱地址" },
        { status: 400 }
      )
    }

    // 检查邮箱是否已存在
    const existing = await db
      .select()
      .from(waitlists)
      .where(eq(waitlists.email, email))
    if (existing.length > 0) {
      return NextResponse.json({ error: "该邮箱已经注册" }, { status: 400 })
    }

    // 插入数据
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
    return NextResponse.json({ error: "注册失败，请稍后重试" }, { status: 500 })
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
    return NextResponse.json({ error: "获取数据失败" }, { status: 500 })
  }
}
