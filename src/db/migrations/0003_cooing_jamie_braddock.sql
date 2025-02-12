ALTER TABLE "custommers" RENAME TO "customers";--> statement-breakpoint
ALTER TABLE "customers" DROP CONSTRAINT "custommers_email_unique";--> statement-breakpoint
ALTER TABLE "customers" DROP CONSTRAINT "custommers_phone_unique";--> statement-breakpoint
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_customers_id_custommers_id_fk";
--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_customers_id_customers_id_fk" FOREIGN KEY ("customers_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_phone_unique" UNIQUE("phone");