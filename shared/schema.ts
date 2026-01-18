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
  type: z.enum(["Venta", "Arriendo"]),
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
