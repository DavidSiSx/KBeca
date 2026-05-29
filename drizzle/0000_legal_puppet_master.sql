CREATE TABLE "scholarships" (
	"id" serial PRIMARY KEY NOT NULL,
	"hash_id" varchar(256) NOT NULL,
	"title" text NOT NULL,
	"institution_name" text NOT NULL,
	"description" text,
	"target_states" text[],
	"academic_levels" text[] NOT NULL,
	"status" varchar(50) DEFAULT 'active' NOT NULL,
	"deadline" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "scholarships_hash_id_unique" UNIQUE("hash_id")
);
--> statement-breakpoint
CREATE INDEX "idx_scholarships_states" ON "scholarships" USING gin ("target_states");--> statement-breakpoint
CREATE INDEX "idx_scholarships_levels" ON "scholarships" USING gin ("academic_levels");