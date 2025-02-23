import {
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
  integer,
  pgEnum,
  boolean,
  json,
  uuid,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

export const emailStatusEnum = pgEnum("email_status", [
  "pending",
  "sent",
  "failed",
  "opened",
  "clicked",
]);
export const templateEnum = pgEnum("template_type", [
  "welcome",
  "notification",
  "update",
]);
export const templateCategoryEnum = pgEnum("template_category", [
  "onboarding",
  "marketing",
  "notification",
  "general",
]);

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
});

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
});

export type Waitlist = typeof waitlists.$inferSelect;
export type NewWaitlist = typeof waitlists.$inferInsert;

export type Email = typeof emails.$inferSelect;
export type NewEmail = typeof emails.$inferInsert;

export const waitlistTemplates = pgTable("waitlist_templates", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).unique(),
  description: text("description"),
  link: varchar("link", { length: 255 }),
  category: varchar("category", { length: 100 }),
  status: varchar("status", { length: 100 }),
  joinedCount: varchar("joined_count", { length: 100 }),
});

export type WaitlistTemplate = typeof waitlistTemplates.$inferSelect;
export type NewWaitlistTemplate = typeof waitlistTemplates.$inferInsert;

export const waitlistTemplateSelectSchema =
  createSelectSchema(waitlistTemplates);

export const emailTemplates = pgTable("email_templates", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: templateCategoryEnum("category").default("general"),
  subject: varchar("subject", { length: 255 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type EmailTemplate = typeof emailTemplates.$inferSelect;
export type NewEmailTemplate = typeof emailTemplates.$inferInsert;

export const emailSendLogs = pgTable("email_send_logs", {
  id: serial("id").primaryKey(),
  templateId: integer("template_id").references(() => emailTemplates.id),
  userId: varchar("user_id", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  content: text("content").notNull(),
  status: emailStatusEnum("status").default("pending"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  sentAt: timestamp("sent_at"),
});

export type EmailSendLog = typeof emailSendLogs.$inferSelect;
export type NewEmailSendLog = typeof emailSendLogs.$inferInsert;

export const forms = pgTable("forms", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  published: boolean("published").default(false).notNull(),
  fields: json("fields").$type<Array<FormField>>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type FormField = {
  id: string;
  type: "text" | "email" | "number" | "textarea" | "select" | "checkbox";
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // 用于 select 类型的选项
  defaultValue?: string | number | boolean;
};

export type Form = typeof forms.$inferSelect;
export type NewForm = typeof forms.$inferInsert;

export const formsConfig = {
  id: forms.id,
  userId: forms.userId,
  name: forms.name,
  description: forms.description,
  published: forms.published,
  fields: forms.fields,
  createdAt: forms.createdAt,
  updatedAt: forms.updatedAt,
};
