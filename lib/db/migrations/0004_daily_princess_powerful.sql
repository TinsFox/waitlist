CREATE TABLE "waitlist_templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100),
	"description" text,
	"link" varchar(255),
	"category" varchar(100),
	"status" varchar(100),
	"joined_count" varchar(100)
);
