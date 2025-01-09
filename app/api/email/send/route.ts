import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { emailSendLogs } from "@/lib/db/schema"
import { z } from "zod"

const sendEmailSchema = z.object({
  templateId: z.number().optional(),
  recipients: z.array(z.string()),
  subject: z.string(),
  content: z.string(),
})

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const body = sendEmailSchema.parse(json)

    // TODO: 实现实际的邮件发送逻辑
    // 这里可以集成 SendGrid, Amazon SES 等邮件服务

    // 记录发送日志
    const logs = await Promise.all(
      body.recipients.map((userId) =>
        db
          .insert(emailSendLogs)
          .values({
            templateId: body.templateId,
            userId,
            subject: body.subject,
            content: body.content,
            status: "sent",
            sentAt: new Date(),
          })
          .returning()
      )
    )

    return NextResponse.json({ success: true, logs })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
