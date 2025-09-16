ALTER TABLE "drivers" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "requests_status" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "requests" ALTER COLUMN "applicant" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "requests" ALTER COLUMN "destination" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "model" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "plate" SET DATA TYPE text;