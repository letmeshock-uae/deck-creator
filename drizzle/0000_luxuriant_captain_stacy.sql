CREATE TABLE "settings" (
	"id" text PRIMARY KEY NOT NULL,
	"logo_url" text,
	"admin_password_hash" text,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "slides" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content_markdown" text NOT NULL,
	"background_image_url" text,
	"background_color" text,
	"order_index" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
