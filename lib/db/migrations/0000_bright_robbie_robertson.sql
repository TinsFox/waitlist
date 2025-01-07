CREATE TABLE "waitlists" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(100),
	"company" varchar(100),
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "waitlists_email_unique" UNIQUE("email")
);
