import {
  type User, type InsertUser, type Horse, type InsertHorse,
  type Transport, type InsertTransport,
  type Supply, type InsertSupply,
  type StaffListing, type InsertStaffListing,
  type VetClinic, type InsertVetClinic,
  type Accessory, type InsertAccessory,
  users, horses, transports, supplies, staffListings, vetClinics, accessories,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";

// Common filter types for services
export interface ServiceFilters {
  userId?: string;
  region?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

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

  // Transports
  getTransport(id: string): Promise<Transport | undefined>;
  getTransports(filters?: ServiceFilters & { originRegion?: string; destinationRegion?: string }): Promise<Transport[]>;
  createTransport(transport: InsertTransport & { userId: string }): Promise<Transport>;
  updateTransport(id: string, updates: Partial<Transport>): Promise<Transport>;
  deleteTransport(id: string): Promise<void>;

  // Supplies
  getSupply(id: string): Promise<Supply | undefined>;
  getSupplies(filters?: ServiceFilters & { supplyType?: string }): Promise<Supply[]>;
  createSupply(supply: InsertSupply & { userId: string }): Promise<Supply>;
  updateSupply(id: string, updates: Partial<Supply>): Promise<Supply>;
  deleteSupply(id: string): Promise<void>;

  // Staff Listings
  getStaffListing(id: string): Promise<StaffListing | undefined>;
  getStaffListings(filters?: ServiceFilters & { staffRole?: string }): Promise<StaffListing[]>;
  createStaffListing(listing: InsertStaffListing & { userId: string }): Promise<StaffListing>;
  updateStaffListing(id: string, updates: Partial<StaffListing>): Promise<StaffListing>;
  deleteStaffListing(id: string): Promise<void>;

  // Vet Clinics
  getVetClinic(id: string): Promise<VetClinic | undefined>;
  getVetClinics(filters?: ServiceFilters & { specialty?: string; emergencyService?: boolean }): Promise<VetClinic[]>;
  createVetClinic(clinic: InsertVetClinic & { userId: string }): Promise<VetClinic>;
  updateVetClinic(id: string, updates: Partial<VetClinic>): Promise<VetClinic>;
  deleteVetClinic(id: string): Promise<void>;

  // Accessories
  getAccessory(id: string): Promise<Accessory | undefined>;
  getAccessories(filters?: ServiceFilters & { category?: string; condition?: string }): Promise<Accessory[]>;
  createAccessory(accessory: InsertAccessory & { userId: string }): Promise<Accessory>;
  updateAccessory(id: string, updates: Partial<Accessory>): Promise<Accessory>;
  deleteAccessory(id: string): Promise<void>;
}

// ===== DATABASE STORAGE (PostgreSQL via Drizzle) =====
export class DatabaseStorage implements IStorage {
  // --- Users ---
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

  // --- Horses ---
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
    if (conditions.length > 0) query = query.where(and(...conditions)) as any;
    query = query.orderBy(desc(horses.featured), desc(horses.createdAt)) as any;
    if (filters.limit) query = query.limit(filters.limit) as any;
    if (filters.offset) query = query.offset(filters.offset) as any;
    return await query;
  }

  async createHorse(horse: InsertHorse & { userId: string }): Promise<Horse> {
    if (!db) throw new Error("Database not connected");
    const id = randomUUID();
    const result = await db.insert(horses).values({
      ...horse, id,
      price: String(horse.price),
      userId: horse.userId,
      status: "active", featured: false, views: 0,
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

  // --- Transports ---
  async getTransport(id: string): Promise<Transport | undefined> {
    if (!db) throw new Error("Database not connected");
    const result = await db.select().from(transports).where(eq(transports.id, id)).limit(1);
    return result[0] || undefined;
  }

  async getTransports(filters: ServiceFilters & { originRegion?: string; destinationRegion?: string } = {}): Promise<Transport[]> {
    if (!db) throw new Error("Database not connected");
    const conditions = [];
    if (filters.userId) conditions.push(eq(transports.userId, filters.userId));
    if (filters.status) conditions.push(eq(transports.status, filters.status));
    if (filters.region) conditions.push(eq(transports.originRegion, filters.region));
    if (filters.originRegion) conditions.push(eq(transports.originRegion, filters.originRegion));
    if (filters.destinationRegion) conditions.push(eq(transports.destinationRegion, filters.destinationRegion));
    let query = db.select().from(transports);
    if (conditions.length > 0) query = query.where(and(...conditions)) as any;
    query = query.orderBy(desc(transports.createdAt)) as any;
    if (filters.limit) query = query.limit(filters.limit) as any;
    if (filters.offset) query = query.offset(filters.offset) as any;
    return await query;
  }

  async createTransport(transport: InsertTransport & { userId: string }): Promise<Transport> {
    if (!db) throw new Error("Database not connected");
    const id = randomUUID();
    const result = await db.insert(transports).values({
      ...transport, id, status: "active",
      pricePerKm: transport.pricePerKm ? String(transport.pricePerKm) : null,
      fixedPrice: transport.fixedPrice ? String(transport.fixedPrice) : null,
      images: transport.images || [],
    }).returning();
    return result[0];
  }

  async updateTransport(id: string, updates: Partial<Transport>): Promise<Transport> {
    if (!db) throw new Error("Database not connected");
    const { id: _id, ...updateData } = updates;
    const result = await db.update(transports).set({ ...updateData, updatedAt: new Date() }).where(eq(transports.id, id)).returning();
    if (!result[0]) throw new Error("Transport not found");
    return result[0];
  }

  async deleteTransport(id: string): Promise<void> {
    if (!db) throw new Error("Database not connected");
    await db.delete(transports).where(eq(transports.id, id));
  }

  // --- Supplies ---
  async getSupply(id: string): Promise<Supply | undefined> {
    if (!db) throw new Error("Database not connected");
    const result = await db.select().from(supplies).where(eq(supplies.id, id)).limit(1);
    return result[0] || undefined;
  }

  async getSupplies(filters: ServiceFilters & { supplyType?: string } = {}): Promise<Supply[]> {
    if (!db) throw new Error("Database not connected");
    const conditions = [];
    if (filters.userId) conditions.push(eq(supplies.userId, filters.userId));
    if (filters.status) conditions.push(eq(supplies.status, filters.status));
    if (filters.region) conditions.push(eq(supplies.region, filters.region));
    if (filters.supplyType) conditions.push(eq(supplies.supplyType, filters.supplyType));
    let query = db.select().from(supplies);
    if (conditions.length > 0) query = query.where(and(...conditions)) as any;
    query = query.orderBy(desc(supplies.createdAt)) as any;
    if (filters.limit) query = query.limit(filters.limit) as any;
    if (filters.offset) query = query.offset(filters.offset) as any;
    return await query;
  }

  async createSupply(supply: InsertSupply & { userId: string }): Promise<Supply> {
    if (!db) throw new Error("Database not connected");
    const id = randomUUID();
    const result = await db.insert(supplies).values({
      ...supply, id, status: "active",
      pricePerUnit: String(supply.pricePerUnit),
      images: supply.images || [],
    }).returning();
    return result[0];
  }

  async updateSupply(id: string, updates: Partial<Supply>): Promise<Supply> {
    if (!db) throw new Error("Database not connected");
    const { id: _id, ...updateData } = updates;
    const result = await db.update(supplies).set({ ...updateData, updatedAt: new Date() }).where(eq(supplies.id, id)).returning();
    if (!result[0]) throw new Error("Supply not found");
    return result[0];
  }

  async deleteSupply(id: string): Promise<void> {
    if (!db) throw new Error("Database not connected");
    await db.delete(supplies).where(eq(supplies.id, id));
  }

  // --- Staff Listings ---
  async getStaffListing(id: string): Promise<StaffListing | undefined> {
    if (!db) throw new Error("Database not connected");
    const result = await db.select().from(staffListings).where(eq(staffListings.id, id)).limit(1);
    return result[0] || undefined;
  }

  async getStaffListings(filters: ServiceFilters & { staffRole?: string } = {}): Promise<StaffListing[]> {
    if (!db) throw new Error("Database not connected");
    const conditions = [];
    if (filters.userId) conditions.push(eq(staffListings.userId, filters.userId));
    if (filters.status) conditions.push(eq(staffListings.status, filters.status));
    if (filters.region) conditions.push(eq(staffListings.region, filters.region));
    if (filters.staffRole) conditions.push(eq(staffListings.staffRole, filters.staffRole));
    let query = db.select().from(staffListings);
    if (conditions.length > 0) query = query.where(and(...conditions)) as any;
    query = query.orderBy(desc(staffListings.createdAt)) as any;
    if (filters.limit) query = query.limit(filters.limit) as any;
    if (filters.offset) query = query.offset(filters.offset) as any;
    return await query;
  }

  async createStaffListing(listing: InsertStaffListing & { userId: string }): Promise<StaffListing> {
    if (!db) throw new Error("Database not connected");
    const id = randomUUID();
    const result = await db.insert(staffListings).values({
      ...listing, id, status: "active",
      references: listing.references || [],
    }).returning();
    return result[0];
  }

  async updateStaffListing(id: string, updates: Partial<StaffListing>): Promise<StaffListing> {
    if (!db) throw new Error("Database not connected");
    const { id: _id, ...updateData } = updates;
    const result = await db.update(staffListings).set({ ...updateData, updatedAt: new Date() }).where(eq(staffListings.id, id)).returning();
    if (!result[0]) throw new Error("Staff listing not found");
    return result[0];
  }

  async deleteStaffListing(id: string): Promise<void> {
    if (!db) throw new Error("Database not connected");
    await db.delete(staffListings).where(eq(staffListings.id, id));
  }

  // --- Vet Clinics ---
  async getVetClinic(id: string): Promise<VetClinic | undefined> {
    if (!db) throw new Error("Database not connected");
    const result = await db.select().from(vetClinics).where(eq(vetClinics.id, id)).limit(1);
    return result[0] || undefined;
  }

  async getVetClinics(filters: ServiceFilters & { specialty?: string; emergencyService?: boolean } = {}): Promise<VetClinic[]> {
    if (!db) throw new Error("Database not connected");
    const conditions = [];
    if (filters.userId) conditions.push(eq(vetClinics.userId, filters.userId));
    if (filters.status) conditions.push(eq(vetClinics.status, filters.status));
    if (filters.region) conditions.push(eq(vetClinics.region, filters.region));
    if (filters.specialty) conditions.push(eq(vetClinics.specialty, filters.specialty));
    if (filters.emergencyService !== undefined) conditions.push(eq(vetClinics.emergencyService, filters.emergencyService));
    let query = db.select().from(vetClinics);
    if (conditions.length > 0) query = query.where(and(...conditions)) as any;
    query = query.orderBy(desc(vetClinics.createdAt)) as any;
    if (filters.limit) query = query.limit(filters.limit) as any;
    if (filters.offset) query = query.offset(filters.offset) as any;
    return await query;
  }

  async createVetClinic(clinic: InsertVetClinic & { userId: string }): Promise<VetClinic> {
    if (!db) throw new Error("Database not connected");
    const id = randomUUID();
    const result = await db.insert(vetClinics).values({
      ...clinic, id, status: "active",
      images: clinic.images || [],
    }).returning();
    return result[0];
  }

  async updateVetClinic(id: string, updates: Partial<VetClinic>): Promise<VetClinic> {
    if (!db) throw new Error("Database not connected");
    const { id: _id, ...updateData } = updates;
    const result = await db.update(vetClinics).set({ ...updateData, updatedAt: new Date() }).where(eq(vetClinics.id, id)).returning();
    if (!result[0]) throw new Error("Vet clinic not found");
    return result[0];
  }

  async deleteVetClinic(id: string): Promise<void> {
    if (!db) throw new Error("Database not connected");
    await db.delete(vetClinics).where(eq(vetClinics.id, id));
  }

  // --- Accessories ---
  async getAccessory(id: string): Promise<Accessory | undefined> {
    if (!db) throw new Error("Database not connected");
    const result = await db.select().from(accessories).where(eq(accessories.id, id)).limit(1);
    return result[0] || undefined;
  }

  async getAccessories(filters: ServiceFilters & { category?: string; condition?: string } = {}): Promise<Accessory[]> {
    if (!db) throw new Error("Database not connected");
    const conditions = [];
    if (filters.userId) conditions.push(eq(accessories.userId, filters.userId));
    if (filters.status) conditions.push(eq(accessories.status, filters.status));
    if (filters.region) conditions.push(eq(accessories.region, filters.region));
    if (filters.category) conditions.push(eq(accessories.category, filters.category));
    if (filters.condition) conditions.push(eq(accessories.condition, filters.condition));
    let query = db.select().from(accessories);
    if (conditions.length > 0) query = query.where(and(...conditions)) as any;
    query = query.orderBy(desc(accessories.createdAt)) as any;
    if (filters.limit) query = query.limit(filters.limit) as any;
    if (filters.offset) query = query.offset(filters.offset) as any;
    return await query;
  }

  async createAccessory(accessory: InsertAccessory & { userId: string }): Promise<Accessory> {
    if (!db) throw new Error("Database not connected");
    const id = randomUUID();
    const result = await db.insert(accessories).values({
      ...accessory, id, status: "active",
      price: String(accessory.price),
      images: accessory.images || [],
    }).returning();
    return result[0];
  }

  async updateAccessory(id: string, updates: Partial<Accessory>): Promise<Accessory> {
    if (!db) throw new Error("Database not connected");
    const { id: _id, ...updateData } = updates;
    const result = await db.update(accessories).set({ ...updateData, updatedAt: new Date() }).where(eq(accessories.id, id)).returning();
    if (!result[0]) throw new Error("Accessory not found");
    return result[0];
  }

  async deleteAccessory(id: string): Promise<void> {
    if (!db) throw new Error("Database not connected");
    await db.delete(accessories).where(eq(accessories.id, id));
  }
}

// ===== IN-MEMORY STORAGE (fallback for local dev without DB) =====
export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private horses: Map<string, Horse>;
  private transportsMap: Map<string, Transport>;
  private suppliesMap: Map<string, Supply>;
  private staffListingsMap: Map<string, StaffListing>;
  private vetClinicsMap: Map<string, VetClinic>;
  private accessoriesMap: Map<string, Accessory>;

  constructor() {
    this.users = new Map();
    this.horses = new Map();
    this.transportsMap = new Map();
    this.suppliesMap = new Map();
    this.staffListingsMap = new Map();
    this.vetClinicsMap = new Map();
    this.accessoriesMap = new Map();
  }

  // --- Users ---
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

  // --- Horses ---
  async getHorse(id: string): Promise<Horse | undefined> {
    return this.horses.get(id);
  }

  async getHorses(filters: { userId?: string; status?: string; featured?: boolean; limit?: number; offset?: number } = {}): Promise<Horse[]> {
    let horsesArray = Array.from(this.horses.values());
    if (filters.userId) horsesArray = horsesArray.filter(h => h.userId === filters.userId);
    if (filters.status) horsesArray = horsesArray.filter(h => h.status === filters.status);
    if (filters.featured !== undefined) horsesArray = horsesArray.filter(h => h.featured === filters.featured);
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
      id, name: horse.name, type: horse.type,
      price: String(horse.price), currency: horse.currency || "USD",
      age: horse.age, height: horse.height, sex: horse.sex,
      location: horse.location, description: horse.description || null,
      pedigree: horse.pedigree || null, aaccpRegistry: horse.aaccpRegistry || null,
      poloLevel: horse.poloLevel || null, images: horse.images || [],
      videoUrl: horse.videoUrl || null, planId: horse.planId || null,
      userId: horse.userId, status: "active", featured: false, views: 0,
      createdAt: new Date(), updatedAt: new Date(),
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

  // --- Transports ---
  async getTransport(id: string): Promise<Transport | undefined> {
    return this.transportsMap.get(id);
  }

  async getTransports(filters: ServiceFilters & { originRegion?: string; destinationRegion?: string } = {}): Promise<Transport[]> {
    let arr = Array.from(this.transportsMap.values());
    if (filters.userId) arr = arr.filter(t => t.userId === filters.userId);
    if (filters.status) arr = arr.filter(t => t.status === filters.status);
    if (filters.region || filters.originRegion) arr = arr.filter(t => t.originRegion === (filters.originRegion || filters.region));
    if (filters.destinationRegion) arr = arr.filter(t => t.destinationRegion === filters.destinationRegion);
    arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const offset = filters.offset || 0;
    const limit = filters.limit || arr.length;
    return arr.slice(offset, offset + limit);
  }

  async createTransport(transport: InsertTransport & { userId: string }): Promise<Transport> {
    const id = randomUUID();
    const item: Transport = {
      id, ...transport, status: "active",
      pricePerKm: transport.pricePerKm ? String(transport.pricePerKm) : null,
      fixedPrice: transport.fixedPrice ? String(transport.fixedPrice) : null,
      currency: transport.currency || "CLP",
      availability: transport.availability || "Disponible",
      truckCapacity: transport.truckCapacity || null,
      phone: transport.phone || null,
      description: transport.description || null,
      images: transport.images || [],
      createdAt: new Date(), updatedAt: new Date(),
    };
    this.transportsMap.set(id, item);
    return item;
  }

  async updateTransport(id: string, updates: Partial<Transport>): Promise<Transport> {
    const item = this.transportsMap.get(id);
    if (!item) throw new Error("Transport not found");
    const updated = { ...item, ...updates, id, updatedAt: new Date() };
    this.transportsMap.set(id, updated);
    return updated;
  }

  async deleteTransport(id: string): Promise<void> {
    this.transportsMap.delete(id);
  }

  // --- Supplies ---
  async getSupply(id: string): Promise<Supply | undefined> {
    return this.suppliesMap.get(id);
  }

  async getSupplies(filters: ServiceFilters & { supplyType?: string } = {}): Promise<Supply[]> {
    let arr = Array.from(this.suppliesMap.values());
    if (filters.userId) arr = arr.filter(s => s.userId === filters.userId);
    if (filters.status) arr = arr.filter(s => s.status === filters.status);
    if (filters.region) arr = arr.filter(s => s.region === filters.region);
    if (filters.supplyType) arr = arr.filter(s => s.supplyType === filters.supplyType);
    arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const offset = filters.offset || 0;
    const limit = filters.limit || arr.length;
    return arr.slice(offset, offset + limit);
  }

  async createSupply(supply: InsertSupply & { userId: string }): Promise<Supply> {
    const id = randomUUID();
    const item: Supply = {
      id, ...supply, status: "active",
      pricePerUnit: String(supply.pricePerUnit),
      currency: supply.currency || "CLP",
      minOrder: supply.minOrder || 1,
      description: supply.description || null,
      images: supply.images || [],
      createdAt: new Date(), updatedAt: new Date(),
    };
    this.suppliesMap.set(id, item);
    return item;
  }

  async updateSupply(id: string, updates: Partial<Supply>): Promise<Supply> {
    const item = this.suppliesMap.get(id);
    if (!item) throw new Error("Supply not found");
    const updated = { ...item, ...updates, id, updatedAt: new Date() };
    this.suppliesMap.set(id, updated);
    return updated;
  }

  async deleteSupply(id: string): Promise<void> {
    this.suppliesMap.delete(id);
  }

  // --- Staff Listings ---
  async getStaffListing(id: string): Promise<StaffListing | undefined> {
    return this.staffListingsMap.get(id);
  }

  async getStaffListings(filters: ServiceFilters & { staffRole?: string } = {}): Promise<StaffListing[]> {
    let arr = Array.from(this.staffListingsMap.values());
    if (filters.userId) arr = arr.filter(s => s.userId === filters.userId);
    if (filters.status) arr = arr.filter(s => s.status === filters.status);
    if (filters.region) arr = arr.filter(s => s.region === filters.region);
    if (filters.staffRole) arr = arr.filter(s => s.staffRole === filters.staffRole);
    arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const offset = filters.offset || 0;
    const limit = filters.limit || arr.length;
    return arr.slice(offset, offset + limit);
  }

  async createStaffListing(listing: InsertStaffListing & { userId: string }): Promise<StaffListing> {
    const id = randomUUID();
    const item: StaffListing = {
      id, ...listing, status: "active",
      experienceYears: listing.experienceYears || null,
      availability: listing.availability || "Disponible",
      salaryExpectation: listing.salaryExpectation || null,
      description: listing.description || null,
      references: listing.references || [],
      createdAt: new Date(), updatedAt: new Date(),
    };
    this.staffListingsMap.set(id, item);
    return item;
  }

  async updateStaffListing(id: string, updates: Partial<StaffListing>): Promise<StaffListing> {
    const item = this.staffListingsMap.get(id);
    if (!item) throw new Error("Staff listing not found");
    const updated = { ...item, ...updates, id, updatedAt: new Date() };
    this.staffListingsMap.set(id, updated);
    return updated;
  }

  async deleteStaffListing(id: string): Promise<void> {
    this.staffListingsMap.delete(id);
  }

  // --- Vet Clinics ---
  async getVetClinic(id: string): Promise<VetClinic | undefined> {
    return this.vetClinicsMap.get(id);
  }

  async getVetClinics(filters: ServiceFilters & { specialty?: string; emergencyService?: boolean } = {}): Promise<VetClinic[]> {
    let arr = Array.from(this.vetClinicsMap.values());
    if (filters.userId) arr = arr.filter(v => v.userId === filters.userId);
    if (filters.status) arr = arr.filter(v => v.status === filters.status);
    if (filters.region) arr = arr.filter(v => v.region === filters.region);
    if (filters.specialty) arr = arr.filter(v => v.specialty === filters.specialty);
    if (filters.emergencyService !== undefined) arr = arr.filter(v => v.emergencyService === filters.emergencyService);
    arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const offset = filters.offset || 0;
    const limit = filters.limit || arr.length;
    return arr.slice(offset, offset + limit);
  }

  async createVetClinic(clinic: InsertVetClinic & { userId: string }): Promise<VetClinic> {
    const id = randomUUID();
    const item: VetClinic = {
      id, ...clinic, status: "active",
      address: clinic.address || null,
      phone: clinic.phone || null,
      email: clinic.email || null,
      emergencyService: clinic.emergencyService || false,
      description: clinic.description || null,
      images: clinic.images || [],
      createdAt: new Date(), updatedAt: new Date(),
    };
    this.vetClinicsMap.set(id, item);
    return item;
  }

  async updateVetClinic(id: string, updates: Partial<VetClinic>): Promise<VetClinic> {
    const item = this.vetClinicsMap.get(id);
    if (!item) throw new Error("Vet clinic not found");
    const updated = { ...item, ...updates, id, updatedAt: new Date() };
    this.vetClinicsMap.set(id, updated);
    return updated;
  }

  async deleteVetClinic(id: string): Promise<void> {
    this.vetClinicsMap.delete(id);
  }

  // --- Accessories ---
  async getAccessory(id: string): Promise<Accessory | undefined> {
    return this.accessoriesMap.get(id);
  }

  async getAccessories(filters: ServiceFilters & { category?: string; condition?: string } = {}): Promise<Accessory[]> {
    let arr = Array.from(this.accessoriesMap.values());
    if (filters.userId) arr = arr.filter(a => a.userId === filters.userId);
    if (filters.status) arr = arr.filter(a => a.status === filters.status);
    if (filters.region) arr = arr.filter(a => a.region === filters.region);
    if (filters.category) arr = arr.filter(a => a.category === filters.category);
    if (filters.condition) arr = arr.filter(a => a.condition === filters.condition);
    arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const offset = filters.offset || 0;
    const limit = filters.limit || arr.length;
    return arr.slice(offset, offset + limit);
  }

  async createAccessory(accessory: InsertAccessory & { userId: string }): Promise<Accessory> {
    const id = randomUUID();
    const item: Accessory = {
      id, ...accessory, status: "active",
      price: String(accessory.price),
      currency: accessory.currency || "USD",
      brand: accessory.brand || null,
      description: accessory.description || null,
      images: accessory.images || [],
      createdAt: new Date(), updatedAt: new Date(),
    };
    this.accessoriesMap.set(id, item);
    return item;
  }

  async updateAccessory(id: string, updates: Partial<Accessory>): Promise<Accessory> {
    const item = this.accessoriesMap.get(id);
    if (!item) throw new Error("Accessory not found");
    const updated = { ...item, ...updates, id, updatedAt: new Date() };
    this.accessoriesMap.set(id, updated);
    return updated;
  }

  async deleteAccessory(id: string): Promise<void> {
    this.accessoriesMap.delete(id);
  }
}

// Use DatabaseStorage if DATABASE_URL is available, otherwise fallback to MemStorage
export const storage: IStorage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();