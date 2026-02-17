import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table with RUT and role
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  rut: text("rut").unique(), // RUT chileno
  role: text("role").default("Jugador"), // Jugador, Petisero, Criador
  verified: boolean("verified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  name: z.string().min(1, "El nombre es requerido").optional(),
  rut: z.string().optional(),
  role: z.enum(["Jugador", "Petisero", "Criador"]).optional(),
}).pick({
  email: true,
  password: true,
  name: true,
  rut: true,
  role: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Plans table
export const plans = pgTable("plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // "Básico", "Criador", "Destacado"
  type: text("type").notNull(), // "listing", "subscription", "featured"
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("USD"),
  duration: integer("duration"), // null for one-time, days for subscription
  features: jsonb("features"), // JSON array of features
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User subscriptions/active plans
export const userPlans = pgTable("user_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  planId: varchar("plan_id").notNull().references(() => plans.id),
  status: text("status").default("active"), // active, expired, cancelled
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Horses table with complete technical data
export const horses = pgTable("horses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("USD"),

  // Basic info
  age: integer("age").notNull(),
  height: text("height").notNull(), // in hands (e.g., "15.2")
  sex: text("sex").notNull(), // Yegua, Castrado, Padrillo
  type: text("type").notNull(), // Venta, Arriendo
  location: text("location").notNull(),

  // Technical details
  description: text("description"),
  pedigree: jsonb("pedigree"), // { padre: string, madre: string, abuelo?: string }
  aaccpRegistry: text("aaccp_registry"), // AACCP registration number
  poloLevel: text("polo_level"), // Principiante, Intermedio, Alto handicap

  // Multimedia
  images: jsonb("images"), // Array of image URLs
  videoUrl: text("video_url"), // YouTube/Vimeo link

  // Plan and status
  planId: varchar("plan_id").references(() => plans.id),
  status: text("status").default("active"), // active, sold, expired, pending_payment
  featured: boolean("featured").default(false),

  // Metadata
  views: integer("views").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertHorseSchema = createInsertSchema(horses, {
  name: z.string().min(1, "El nombre es requerido"),
  price: z.string().or(z.number()),
  age: z.number().int().min(0).max(30),
  height: z.string().min(1),
  sex: z.enum(["Yegua", "Castrado", "Padrillo"]),
  type: z.enum(["Venta", "Arriendo", "Compra"]),
  location: z.string().min(1),
  poloLevel: z.enum(["Principiante", "Intermedio", "Alto handicap"]).optional(),
  pedigree: z.object({
    padre: z.string().optional(),
    madre: z.string().optional(),
    abuelo: z.string().optional(),
  }).optional(),
  images: z.array(z.string()).optional(),
  videoUrl: z.string().url().optional().or(z.literal("")),
}).omit({
  id: true,
  userId: true,
  views: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertHorse = z.infer<typeof insertHorseSchema>;
export type Horse = typeof horses.$inferSelect;

// ==========================================
// SERVICIOS — Logística e Insumos
// ==========================================

// Transporte (Fletes)
export const transports = pgTable("transports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  originRegion: text("origin_region").notNull(),
  destinationRegion: text("destination_region").notNull(),
  truckCapacity: integer("truck_capacity"), // cantidad de caballos
  pricePerKm: decimal("price_per_km", { precision: 10, scale: 2 }),
  fixedPrice: decimal("fixed_price", { precision: 10, scale: 2 }),
  currency: text("currency").default("CLP"),
  availability: text("availability").default("Disponible"), // Disponible, Ocupado, Por consultar
  phone: text("phone"),
  description: text("description"),
  images: jsonb("images"), // Array of image URLs
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertTransportSchema = createInsertSchema(transports, {
  title: z.string().min(1, "El título es requerido"),
  originRegion: z.string().min(1, "La región de origen es requerida"),
  destinationRegion: z.string().min(1, "La región de destino es requerida"),
  truckCapacity: z.number().int().min(1).optional(),
  pricePerKm: z.string().or(z.number()).optional(),
  fixedPrice: z.string().or(z.number()).optional(),
  currency: z.enum(["CLP", "USD", "ARS"]).optional(),
  availability: z.enum(["Disponible", "Ocupado", "Por consultar"]).optional(),
  phone: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
}).omit({ id: true, userId: true, status: true, createdAt: true, updatedAt: true });

export type InsertTransport = z.infer<typeof insertTransportSchema>;
export type Transport = typeof transports.$inferSelect;

// Insumos (Fardos / Alimento)
export const supplies = pgTable("supplies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  supplyType: text("supply_type").notNull(), // Alfalfa, Avena, Pasto, Balanceado, Otro
  unitMeasure: text("unit_measure").notNull(), // Fardo, Kg, Tonelada, Bolsa
  pricePerUnit: decimal("price_per_unit", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("CLP"),
  minOrder: integer("min_order").default(1),
  region: text("region").notNull(),
  description: text("description"),
  images: jsonb("images"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSupplySchema = createInsertSchema(supplies, {
  title: z.string().min(1, "El título es requerido"),
  supplyType: z.enum(["Alfalfa", "Avena", "Pasto", "Balanceado", "Otro"]),
  unitMeasure: z.enum(["Fardo", "Kg", "Tonelada", "Bolsa"]),
  pricePerUnit: z.string().or(z.number()),
  currency: z.enum(["CLP", "USD", "ARS"]).optional(),
  minOrder: z.number().int().min(1).optional(),
  region: z.string().min(1, "La región es requerida"),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
}).omit({ id: true, userId: true, status: true, createdAt: true, updatedAt: true });

export type InsertSupply = z.infer<typeof insertSupplySchema>;
export type Supply = typeof supplies.$inferSelect;

// Staff (Bolsa de Trabajo)
export const staffListings = pgTable("staff_listings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  staffRole: text("staff_role").notNull(), // Petisero, Jugador, Manager, Otro
  experienceYears: integer("experience_years"),
  region: text("region").notNull(),
  availability: text("availability").default("Disponible"), // Disponible, No disponible, Por consultar
  salaryExpectation: text("salary_expectation"),
  description: text("description"),
  references: jsonb("references"), // Array of reference strings
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertStaffListingSchema = createInsertSchema(staffListings, {
  title: z.string().min(1, "El título es requerido"),
  staffRole: z.enum(["Petisero", "Jugador", "Manager", "Changuero", "Otro"]),
  experienceYears: z.number().int().min(0).optional(),
  region: z.string().min(1, "La región es requerida"),
  availability: z.enum(["Disponible", "No disponible", "Por consultar"]).optional(),
  salaryExpectation: z.string().optional(),
  description: z.string().optional(),
  references: z.array(z.string()).optional(),
}).omit({ id: true, userId: true, status: true, createdAt: true, updatedAt: true });

export type InsertStaffListing = z.infer<typeof insertStaffListingSchema>;
export type StaffListing = typeof staffListings.$inferSelect;

// Veterinarias (Directorio)
export const vetClinics = pgTable("vet_clinics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  clinicName: text("clinic_name").notNull(),
  specialty: text("specialty").notNull(), // Equina general, Traumatología, Reproducción, Odontología, Otro
  region: text("region").notNull(),
  address: text("address"),
  phone: text("phone"),
  email: text("email"),
  emergencyService: boolean("emergency_service").default(false),
  description: text("description"),
  images: jsonb("images"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertVetClinicSchema = createInsertSchema(vetClinics, {
  clinicName: z.string().min(1, "El nombre de la clínica es requerido"),
  specialty: z.enum(["Equina general", "Traumatología", "Reproducción", "Odontología", "Otro"]),
  region: z.string().min(1, "La región es requerida"),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  emergencyService: z.boolean().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
}).omit({ id: true, userId: true, status: true, createdAt: true, updatedAt: true });

export type InsertVetClinic = z.infer<typeof insertVetClinicSchema>;
export type VetClinic = typeof vetClinics.$inferSelect;

// ========== Accessories (Polo Gear) ==========
export const accessories = pgTable("accessories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  category: text("category").notNull(), // Monturas, Tacos, Botas, Cascos, Riendas, Protecciones, Otro
  condition: text("condition").notNull(), // Nuevo, Usado - Excelente, Usado - Bueno, Usado - Regular
  brand: text("brand"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("USD"),
  region: text("region").notNull(),
  description: text("description"),
  images: jsonb("images"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAccessorySchema = createInsertSchema(accessories, {
  title: z.string().min(1, "El título es requerido"),
  category: z.enum(["Monturas", "Tacos", "Botas", "Cascos", "Riendas", "Protecciones", "Otro"]),
  condition: z.enum(["Nuevo", "Usado - Excelente", "Usado - Bueno", "Usado - Regular"]),
  brand: z.string().optional(),
  price: z.string().or(z.number()),
  currency: z.enum(["USD", "CLP", "ARS"]).optional(),
  region: z.string().min(1, "La región es requerida"),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
}).omit({ id: true, userId: true, status: true, createdAt: true, updatedAt: true });

export type InsertAccessory = z.infer<typeof insertAccessorySchema>;
export type Accessory = typeof accessories.$inferSelect;
