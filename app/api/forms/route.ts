import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { z } from "zod"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { db } from "@/lib/db"
import { forms } from "@/lib/db/schema"

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    const userId = session?.user.id
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const formList = await db.query.forms.findMany({
      where: eq(forms.userId, userId),
      orderBy: (forms, { desc }) => [desc(forms.createdAt)],
    })

    return NextResponse.json(formList)
  } catch (error) {
    console.error("[FORMS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const userId = session?.user.id
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    const userId = session?.user.id
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const body = await req.json()
    const formSchema = z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      fields: z.array(z.any()).optional(),
    })

    const validatedFields = formSchema.parse(body)

    const form = await db
      .insert(forms)
      .values({
        ...validatedFields,
        userId,
        published: false,
      })
      .returning()

    return NextResponse.json(form[0])
  } catch (error) {
    console.error("[FORMS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
