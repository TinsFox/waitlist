import { pgTable, serial, varchar, timestamp, text } from "drizzle-orm/pg-core"

export const waitlists = pgTable("waitlists", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 100 }),
  company: varchar("company", { length: 100 }),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export type Waitlist = typeof waitlists.$inferSelect
export type NewWaitlist = typeof waitlists.$inferInsert
