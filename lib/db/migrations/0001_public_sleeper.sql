CREATE TYPE "public"."email_status" AS ENUM('pending', 'sent', 'failed', 'opened', 'clicked');--> statement-breakpoint
CREATE TYPE "public"."template_type" AS ENUM('welcome', 'notification', 'update');--> statement-breakpoint
CREATE TABLE "emails" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"template" "template_type",
	"status" "email_status" DEFAULT 'pending',
	"external_id" varchar(255),
	"error_message" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"sent_at" timestamp,
	"opened_at" timestamp,
	"clicked_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "waitlists" ADD COLUMN "notified_at" timestamp;--> statement-breakpoint
ALTER TABLE "waitlists" ADD COLUMN "email_id" integer;--> statement-breakpoint
ALTER TABLE "waitlists" ADD COLUMN "email_template" varchar(100);--> statement-breakpoint
ALTER TABLE "waitlists" ADD COLUMN "email_status" "email_status" DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "waitlists" ADD CONSTRAINT "waitlists_email_id_emails_id_fk" FOREIGN KEY ("email_id") REFERENCES "public"."emails"("id") ON DELETE no action ON UPDATE no action;