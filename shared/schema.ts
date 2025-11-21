import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Food categories
export const CATEGORIES = [
  "Produce",
  "Dairy",
  "Meat",
  "Pantry",
  "Frozen",
  "Other"
] as const;

export type Category = typeof CATEGORIES[number];

// Shelf life defaults in days for each category
export const SHELF_LIFE_DEFAULTS: Record<Category, number> = {
  "Produce": 7,
  "Dairy": 7,
  "Meat": 3,
  "Pantry": 365,
  "Frozen": 180,
  "Other": 14
};

// Food items table
export const items = pgTable("items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  purchaseDate: timestamp("purchase_date").notNull(),
  expirationDate: timestamp("expiration_date").notNull(),
  barcode: text("barcode"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertItemSchema = createInsertSchema(items).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(1, "Name is required"),
  category: z.enum(CATEGORIES),
  purchaseDate: z.coerce.date(),
  expirationDate: z.coerce.date(),
  barcode: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type InsertItem = z.infer<typeof insertItemSchema>;
export type Item = typeof items.$inferSelect;

// Helper function to calculate expiration status
export type ExpirationStatus = "fresh" | "soon" | "urgent" | "expired";

export function getExpirationStatus(expirationDate: Date | string): ExpirationStatus {
  const now = new Date();
  const expDate = typeof expirationDate === 'string' ? new Date(expirationDate) : expirationDate;
  const hoursRemaining = (expDate.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursRemaining < 0) return "expired";
  if (hoursRemaining < 24) return "urgent";
  if (hoursRemaining < 72) return "soon";
  return "fresh";
}

// Helper function to get days/hours remaining
export function getTimeRemaining(expirationDate: Date | string): string {
  const now = new Date();
  const expDate = typeof expirationDate === 'string' ? new Date(expirationDate) : expirationDate;
  const hoursRemaining = Math.floor((expDate.getTime() - now.getTime()) / (1000 * 60 * 60));

  if (hoursRemaining < 0) {
    const daysPast = Math.abs(Math.floor(hoursRemaining / 24));
    return daysPast === 0 ? "Expired today" : `Expired ${daysPast}d ago`;
  }
  
  if (hoursRemaining < 24) {
    return `${hoursRemaining}h remaining`;
  }
  
  const daysRemaining = Math.floor(hoursRemaining / 24);
  return `${daysRemaining}d remaining`;
}

// Users table (kept for future auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
