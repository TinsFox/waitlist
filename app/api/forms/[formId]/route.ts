import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/db"
import { forms } from "@/lib/db/schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

type Params = Promise<{ formId: string }>

export async function GET(_req: Request, { params }: { params: Params }) {
  const formId = (await params).formId
  try {
    const form = await db.query.forms.findFirst({
      where: eq(forms.id, formId),
    })

    if (!form) {
      return new NextResponse("Form not found", { status: 404 })
    }

    return NextResponse.json(form)
  } catch (error) {
    console.error("[FORM_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Params }) {
  try {
    const formId = (await params).formId
    const body = await req.json()
    const formSchema = z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      published: z.boolean().optional(),
      fields: z.array(z.any()).optional(),
    })

    const validatedFields = formSchema.parse(body)

    const form = await db.query.forms.findFirst({
      where: eq(forms.id, formId),
    })

    if (!form) {
      return new NextResponse("Form not found", { status: 404 })
    }

    const updatedForm = await db
      .update(forms)
      .set({
        ...validatedFields,
        updatedAt: new Date(),
      })
      .where(eq(forms.id, formId))
      .returning()

    return NextResponse.json(updatedForm[0])
  } catch (error) {
    console.error("[FORM_PUT]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Params }) {
  try {
    const formId = (await params).formId
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    const userId = session?.user.id
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const form = await db.query.forms.findFirst({
      where: eq(forms.id, formId),
    })

    if (!form) {
      return new NextResponse("Form not found", { status: 404 })
    }

    if (form.userId !== userId) {
      return new NextResponse("Forbidden", { status: 403 })
    }

    await db.delete(forms).where(eq(forms.id, formId))

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[FORM_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
