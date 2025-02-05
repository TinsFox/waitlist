CREATE TYPE "public"."template_category" AS ENUM('onboarding', 'marketing', 'notification', 'general');--> statement-breakpoint
CREATE TABLE "email_send_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"template_id" integer,
	"user_id" varchar(255) NOT NULL,
	"subject" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"status" "email_status" DEFAULT 'pending',
	"error_message" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"sent_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "email_templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"category" "template_category" DEFAULT 'general',
	"subject" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "forms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"published" boolean DEFAULT false NOT NULL,
	"fields" json DEFAULT '[]'::json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "waitlist_templates" ADD COLUMN "slug" varchar(100);--> statement-breakpoint
ALTER TABLE "email_send_logs" ADD CONSTRAINT "email_send_logs_template_id_email_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."email_templates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "waitlist_templates" ADD CONSTRAINT "waitlist_templates_slug_unique" UNIQUE("slug");