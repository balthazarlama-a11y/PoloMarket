import { type User, type InsertUser, type Horse, type InsertHorse } from "@shared/schema";
import { randomUUID } from "crypto";

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

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private horses: Map<string, Horse>;

  constructor() {
    this.users = new Map();
    this.horses = new Map();
  }

  // User methods
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
      ...insertUser, 
      id,
      email: insertUser.email.toLowerCase(),
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

  // Horse methods
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

    // Sort by featured first, then by createdAt desc
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
      ...horse,
      id,
      userId: horse.userId,
      status: "active",
      featured: false,
      views: 0,
      images: horse.images || [],
      pedigree: horse.pedigree || null,
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

export const storage = new MemStorage();