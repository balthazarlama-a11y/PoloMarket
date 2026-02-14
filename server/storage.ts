import { type User, type InsertUser, type Horse, type InsertHorse, users, horses } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByRUT(rut: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;

  // Horses
  getHorse(id: string): Promise<Horse | undefined>;
  getHorses(filters?: { userId?: string; status?: string; featured?: boolean; limit?: number; offset?: number }): Promise<Horse[]>;
  createHorse(horse: InsertHorse & { userId: string }): Promise<Horse>;
  updateHorse(id: string, updates: Partial<Horse>): Promise<Horse>;
  deleteHorse(id: string): Promise<void>;
}

// ===== DATABASE STORAGE (PostgreSQL via Drizzle) =====
export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    if (!db) throw new Error("Database not connected");
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0] || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    if (!db) throw new Error("Database not connected");
    const result = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1);
    return result[0] || undefined;
  }

  async getUserByRUT(rut: string): Promise<User | undefined> {
    if (!db) throw new Error("Database not connected");
    if (!rut) return undefined;
    const cleanRut = rut.replace(/\./g, "").replace(/-/g, "").toLowerCase();
    // Search all users and filter by cleaned RUT
    const allUsers = await db.select().from(users);
    return allUsers.find(
      (user) => user.rut && user.rut.replace(/\./g, "").replace(/-/g, "").toLowerCase() === cleanRut
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) throw new Error("Database not connected");
    const id = randomUUID();
    const result = await db.insert(users).values({
      id,
      email: insertUser.email.toLowerCase(),
      password: insertUser.password,
      name: insertUser.name || null,
      rut: insertUser.rut || null,
      role: insertUser.role || "Jugador",
      verified: false,
    }).returning();
    return result[0];
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    if (!db) throw new Error("Database not connected");
    const { id: _id, ...updateData } = updates;
    const result = await db.update(users).set(updateData).where(eq(users.id, id)).returning();
    if (!result[0]) throw new Error("User not found");
    return result[0];
  }

  async getHorse(id: string): Promise<Horse | undefined> {
    if (!db) throw new Error("Database not connected");
    const result = await db.select().from(horses).where(eq(horses.id, id)).limit(1);
    return result[0] || undefined;
  }

  async getHorses(filters: { userId?: string; status?: string; featured?: boolean; limit?: number; offset?: number } = {}): Promise<Horse[]> {
    if (!db) throw new Error("Database not connected");

    const conditions = [];
    if (filters.userId) conditions.push(eq(horses.userId, filters.userId));
    if (filters.status) conditions.push(eq(horses.status, filters.status));
    if (filters.featured !== undefined) conditions.push(eq(horses.featured, filters.featured));

    let query = db.select().from(horses);

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    query = query.orderBy(desc(horses.featured), desc(horses.createdAt)) as any;

    if (filters.limit) {
      query = query.limit(filters.limit) as any;
    }
    if (filters.offset) {
      query = query.offset(filters.offset) as any;
    }

    return await query;
  }

  async createHorse(horse: InsertHorse & { userId: string }): Promise<Horse> {
    if (!db) throw new Error("Database not connected");
    const id = randomUUID();
    const result = await db.insert(horses).values({
      ...horse,
      id,
      price: String(horse.price),
      userId: horse.userId,
      status: "active",
      featured: false,
      views: 0,
      images: horse.images || [],
      pedigree: horse.pedigree || null,
    }).returning();
    return result[0];
  }

  async updateHorse(id: string, updates: Partial<Horse>): Promise<Horse> {
    if (!db) throw new Error("Database not connected");
    const { id: _id, ...updateData } = updates;
    const result = await db.update(horses).set({ ...updateData, updatedAt: new Date() }).where(eq(horses.id, id)).returning();
    if (!result[0]) throw new Error("Horse not found");
    return result[0];
  }

  async deleteHorse(id: string): Promise<void> {
    if (!db) throw new Error("Database not connected");
    await db.delete(horses).where(eq(horses.id, id));
  }
}

// ===== IN-MEMORY STORAGE (fallback for local dev without DB) =====
export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private horses: Map<string, Horse>;

  constructor() {
    this.users = new Map();
    this.horses = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  }

  async getUserByRUT(rut: string): Promise<User | undefined> {
    if (!rut) return undefined;
    return Array.from(this.users.values()).find(
      (user) => user.rut && user.rut.replace(/\./g, "").replace(/-/g, "").toLowerCase() === rut.replace(/\./g, "").replace(/-/g, "").toLowerCase(),
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      id,
      email: insertUser.email.toLowerCase(),
      password: insertUser.password,
      name: insertUser.name || null,
      rut: insertUser.rut || null,
      role: insertUser.role || "Jugador",
      verified: false,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    const updated = { ...user, ...updates, id };
    this.users.set(id, updated);
    return updated;
  }

  async getHorse(id: string): Promise<Horse | undefined> {
    return this.horses.get(id);
  }

  async getHorses(filters: { userId?: string; status?: string; featured?: boolean; limit?: number; offset?: number } = {}): Promise<Horse[]> {
    let horsesArray = Array.from(this.horses.values());

    if (filters.userId) {
      horsesArray = horsesArray.filter(h => h.userId === filters.userId);
    }

    if (filters.status) {
      horsesArray = horsesArray.filter(h => h.status === filters.status);
    }

    if (filters.featured !== undefined) {
      horsesArray = horsesArray.filter(h => h.featured === filters.featured);
    }

    horsesArray.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const offset = filters.offset || 0;
    const limit = filters.limit || horsesArray.length;

    return horsesArray.slice(offset, offset + limit);
  }

  async createHorse(horse: InsertHorse & { userId: string }): Promise<Horse> {
    const id = randomUUID();
    const newHorse: Horse = {
      id,
      name: horse.name,
      type: horse.type,
      price: String(horse.price),
      currency: horse.currency || "USD",
      age: horse.age,
      height: horse.height,
      sex: horse.sex,
      location: horse.location,
      description: horse.description || null,
      pedigree: horse.pedigree || null,
      aaccpRegistry: horse.aaccpRegistry || null,
      poloLevel: horse.poloLevel || null,
      images: horse.images || [],
      videoUrl: horse.videoUrl || null,
      planId: horse.planId || null,
      userId: horse.userId,
      status: "active",
      featured: false,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.horses.set(id, newHorse);
    return newHorse;
  }

  async updateHorse(id: string, updates: Partial<Horse>): Promise<Horse> {
    const horse = this.horses.get(id);
    if (!horse) throw new Error("Horse not found");
    const updated = { ...horse, ...updates, id, updatedAt: new Date() };
    this.horses.set(id, updated);
    return updated;
  }

  async deleteHorse(id: string): Promise<void> {
    this.horses.delete(id);
  }
}

// Use DatabaseStorage if DATABASE_URL is available, otherwise fallback to MemStorage
export const storage: IStorage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();