import { type User, type UpsertUser, type Item, type InsertItem, users, items } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  getItemsByUserId(userId: string): Promise<Item[]>;
  getItem(id: string, userId: string): Promise<Item | undefined>;
  createItem(item: InsertItem, userId: string): Promise<Item>;
  updateItem(id: string, userId: string, item: Partial<InsertItem>): Promise<Item | undefined>;
  deleteItem(id: string, userId: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getItemsByUserId(userId: string): Promise<Item[]> {
    return await db.select().from(items).where(eq(items.userId, userId));
  }

  async getItem(id: string, userId: string): Promise<Item | undefined> {
    const [item] = await db
      .select()
      .from(items)
      .where(and(eq(items.id, id), eq(items.userId, userId)));
    return item || undefined;
  }

  async createItem(insertItem: InsertItem, userId: string): Promise<Item> {
    const [item] = await db
      .insert(items)
      .values({
        ...insertItem,
        userId,
      })
      .returning();
    return item;
  }

  async updateItem(id: string, userId: string, updateData: Partial<InsertItem>): Promise<Item | undefined> {
    const [item] = await db
      .update(items)
      .set(updateData)
      .where(and(eq(items.id, id), eq(items.userId, userId)))
      .returning();
    return item || undefined;
  }

  async deleteItem(id: string, userId: string): Promise<boolean> {
    const result = await db
      .delete(items)
      .where(and(eq(items.id, id), eq(items.userId, userId)))
      .returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
