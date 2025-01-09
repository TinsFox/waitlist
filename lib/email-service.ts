interface SendEmailParams {
  subject: string
  content: string
  recipients: string[]
}

export const emailService = {
  sendEmail: async ({ subject, content, recipients }: SendEmailParams) => {
    // TODO: 实现实际的邮件发送逻辑
    // 这里可以调用你的后端 API 或邮件服务提供商的 API
    const response = await fetch("/api/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        content,
        recipients,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send email")
    }

    return response.json()
  },
}
