"use server"

import { db } from "@/lib/db"
import { waitlists } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import type { NewWaitlist } from "@/lib/db/schema"

export async function createWaitlistEntry(data: NewWaitlist) {
  try {
    const existing = await db
      .select()
      .from(waitlists)
      .where(eq(waitlists.email, data.email))

    if (existing.length > 0) {
      return {
        error: "Email already registered",
      }
    }

    const result = await db.insert(waitlists).values(data).returning()
    return { data: result[0] }
  } catch (error) {
    console.error("Failed to create waitlist entry:", error)
    return {
      error: "Registration failed, please try again later",
    }
  }
}

export async function getWaitlistEntries() {
  try {
    const entries = await db
      .select()
      .from(waitlists)
      .orderBy(waitlists.createdAt)
    return { data: entries }
  } catch (error) {
    console.error("Failed to fetch waitlist entries:", error)
    return {
      error: "Failed to fetch waitlist entries",
    }
  }
}
