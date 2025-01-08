import {
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core"

export const emailStatusEnum = pgEnum("email_status", [
  "pending",
  "sent",
  "failed",
  "opened",
  "clicked",
])
export const templateEnum = pgEnum("template_type", [
  "welcome",
  "notification",
  "update",
])

export const waitlists = pgTable("waitlists", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 100 }),
  company: varchar("company", { length: 100 }),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  notifiedAt: timestamp("notified_at"),
  emailId: integer("email_id").references(() => emails.id),
  emailTemplate: varchar("email_template", { length: 100 }),
  emailStatus: emailStatusEnum("email_status").default("pending"),
})

export const emails = pgTable("emails", {
  id: serial("id").primaryKey(),
  subject: varchar("subject", { length: 255 }).notNull(),
  content: text("content").notNull(),
  template: templateEnum("template"),
  status: emailStatusEnum("status").default("pending"),
  externalId: varchar("external_id", { length: 255 }),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  sentAt: timestamp("sent_at"),
  openedAt: timestamp("opened_at"),
  clickedAt: timestamp("clicked_at"),
})

export type Waitlist = typeof waitlists.$inferSelect
export type NewWaitlist = typeof waitlists.$inferInsert

export type Email = typeof emails.$inferSelect
export type NewEmail = typeof emails.$inferInsert

export const waitlistTemplates = pgTable("waitlist_templates", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }),
  description: text("description"),
  link: varchar("link", { length: 255 }),
  category: varchar("category", { length: 100 }),
  status: varchar("status", { length: 100 }),
  joinedCount: varchar("joined_count", { length: 100 }),
})

export type WaitlistTemplate = typeof waitlistTemplates.$inferSelect
export type NewWaitlistTemplate = typeof waitlistTemplates.$inferInsert
