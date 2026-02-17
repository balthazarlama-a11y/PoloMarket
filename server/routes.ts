import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertUserSchema, insertHorseSchema,
  insertTransportSchema, insertSupplySchema,
  insertStaffListingSchema, insertVetClinicSchema,
} from "@shared/schema";
import { validateRUT } from "@shared/utils";
import bcrypt from "bcryptjs";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // ========== Auth routes ==========
  app.post("/api/auth/register", async (req, res) => {
    try {
      const body = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(body.email);
      if (existingUser) {
        return res.status(400).json({ message: "El email ya está registrado" });
      }
      if (body.rut) {
        if (!validateRUT(body.rut)) {
          return res.status(400).json({ message: "RUT inválido" });
        }
        const existingRUT = await storage.getUserByRUT(body.rut);
        if (existingRUT) {
          return res.status(400).json({ message: "El RUT ya está registrado" });
        }
      }
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const user = await storage.createUser({
        email: body.email, password: hashedPassword,
        name: body.name, rut: body.rut, role: body.role,
      });
      req.session.userId = user.id;
      const { password, ...userWithoutPassword } = user;
      res.status(201).json({ user: userWithoutPassword });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Error al registrar usuario" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email y contraseña son requeridos" });
      }
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Email o contraseña incorrectos" });
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Email o contraseña incorrectos" });
      }
      req.session.userId = user.id;
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: "Error al iniciar sesión" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Sesión cerrada" });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "No autenticado" });
      }
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuario" });
    }
  });

  // ========== Auth middleware ==========
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "No autenticado" });
    }
    next();
  };

  // ========== Horse routes ==========
  app.get("/api/horses", async (req, res) => {
    try {
      const { userId, status, featured, limit, offset } = req.query;
      const horses = await storage.getHorses({
        userId: userId as string,
        status: status as string,
        featured: featured === "true" ? true : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      });
      res.json({ horses });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener caballos" });
    }
  });

  app.get("/api/horses/:id", async (req, res) => {
    try {
      const horse = await storage.getHorse(req.params.id);
      if (!horse) {
        return res.status(404).json({ message: "Caballo no encontrado" });
      }
      await storage.updateHorse(req.params.id, { views: (horse.views || 0) + 1 });
      const updated = await storage.getHorse(req.params.id);
      res.json({ horse: updated });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener caballo" });
    }
  });

  app.post("/api/horses", requireAuth, async (req, res) => {
    try {
      const body = insertHorseSchema.parse(req.body);
      const horse = await storage.createHorse({ ...body, userId: req.session.userId! });
      res.status(201).json({ horse });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Error al crear caballo" });
    }
  });

  app.put("/api/horses/:id", requireAuth, async (req, res) => {
    try {
      const horse = await storage.getHorse(req.params.id);
      if (!horse) return res.status(404).json({ message: "Caballo no encontrado" });
      if (horse.userId !== req.session.userId) return res.status(403).json({ message: "No tienes permiso para editar este caballo" });
      const body = insertHorseSchema.partial().parse(req.body);
      const updated = await storage.updateHorse(req.params.id, body as any);
      res.json({ horse: updated });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Error al actualizar caballo" });
    }
  });

  app.delete("/api/horses/:id", requireAuth, async (req, res) => {
    try {
      const horse = await storage.getHorse(req.params.id);
      if (!horse) return res.status(404).json({ message: "Caballo no encontrado" });
      if (horse.userId !== req.session.userId) return res.status(403).json({ message: "No tienes permiso para eliminar este caballo" });
      await storage.deleteHorse(req.params.id);
      res.json({ message: "Caballo eliminado" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar caballo" });
    }
  });

  // ========================================================
  // SERVICES — Logística e Insumos
  // ========================================================

  // ---------- Transports ----------
  app.get("/api/services/transports", async (req, res) => {
    try {
      const { userId, region, originRegion, destinationRegion, status, limit, offset } = req.query;
      const items = await storage.getTransports({
        userId: userId as string, region: region as string,
        originRegion: originRegion as string, destinationRegion: destinationRegion as string,
        status: (status as string) || "active",
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      });
      res.json({ transports: items });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener transportes" });
    }
  });

  app.get("/api/services/transports/:id", async (req, res) => {
    try {
      const item = await storage.getTransport(req.params.id);
      if (!item) return res.status(404).json({ message: "Transporte no encontrado" });
      res.json({ transport: item });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener transporte" });
    }
  });

  app.post("/api/services/transports", requireAuth, async (req, res) => {
    try {
      const body = insertTransportSchema.parse(req.body);
      const item = await storage.createTransport({ ...body, userId: req.session.userId! });
      res.status(201).json({ transport: item });
    } catch (error: any) {
      if (error.name === "ZodError") return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
      res.status(500).json({ message: "Error al crear transporte" });
    }
  });

  app.put("/api/services/transports/:id", requireAuth, async (req, res) => {
    try {
      const item = await storage.getTransport(req.params.id);
      if (!item) return res.status(404).json({ message: "Transporte no encontrado" });
      if (item.userId !== req.session.userId) return res.status(403).json({ message: "Sin permiso" });
      const body = insertTransportSchema.partial().parse(req.body);
      const updated = await storage.updateTransport(req.params.id, body as any);
      res.json({ transport: updated });
    } catch (error: any) {
      if (error.name === "ZodError") return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
      res.status(500).json({ message: "Error al actualizar transporte" });
    }
  });

  app.delete("/api/services/transports/:id", requireAuth, async (req, res) => {
    try {
      const item = await storage.getTransport(req.params.id);
      if (!item) return res.status(404).json({ message: "Transporte no encontrado" });
      if (item.userId !== req.session.userId) return res.status(403).json({ message: "Sin permiso" });
      await storage.deleteTransport(req.params.id);
      res.json({ message: "Transporte eliminado" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar transporte" });
    }
  });

  // ---------- Supplies ----------
  app.get("/api/services/supplies", async (req, res) => {
    try {
      const { userId, region, supplyType, status, limit, offset } = req.query;
      const items = await storage.getSupplies({
        userId: userId as string, region: region as string,
        supplyType: supplyType as string,
        status: (status as string) || "active",
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      });
      res.json({ supplies: items });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener insumos" });
    }
  });

  app.get("/api/services/supplies/:id", async (req, res) => {
    try {
      const item = await storage.getSupply(req.params.id);
      if (!item) return res.status(404).json({ message: "Insumo no encontrado" });
      res.json({ supply: item });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener insumo" });
    }
  });

  app.post("/api/services/supplies", requireAuth, async (req, res) => {
    try {
      const body = insertSupplySchema.parse(req.body);
      const item = await storage.createSupply({ ...body, userId: req.session.userId! });
      res.status(201).json({ supply: item });
    } catch (error: any) {
      if (error.name === "ZodError") return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
      res.status(500).json({ message: "Error al crear insumo" });
    }
  });

  app.put("/api/services/supplies/:id", requireAuth, async (req, res) => {
    try {
      const item = await storage.getSupply(req.params.id);
      if (!item) return res.status(404).json({ message: "Insumo no encontrado" });
      if (item.userId !== req.session.userId) return res.status(403).json({ message: "Sin permiso" });
      const body = insertSupplySchema.partial().parse(req.body);
      const updated = await storage.updateSupply(req.params.id, body as any);
      res.json({ supply: updated });
    } catch (error: any) {
      if (error.name === "ZodError") return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
      res.status(500).json({ message: "Error al actualizar insumo" });
    }
  });

  app.delete("/api/services/supplies/:id", requireAuth, async (req, res) => {
    try {
      const item = await storage.getSupply(req.params.id);
      if (!item) return res.status(404).json({ message: "Insumo no encontrado" });
      if (item.userId !== req.session.userId) return res.status(403).json({ message: "Sin permiso" });
      await storage.deleteSupply(req.params.id);
      res.json({ message: "Insumo eliminado" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar insumo" });
    }
  });

  // ---------- Staff Listings ----------
  app.get("/api/services/staff", async (req, res) => {
    try {
      const { userId, region, staffRole, status, limit, offset } = req.query;
      const items = await storage.getStaffListings({
        userId: userId as string, region: region as string,
        staffRole: staffRole as string,
        status: (status as string) || "active",
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      });
      res.json({ staffListings: items });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener listados de staff" });
    }
  });

  app.get("/api/services/staff/:id", async (req, res) => {
    try {
      const item = await storage.getStaffListing(req.params.id);
      if (!item) return res.status(404).json({ message: "Staff no encontrado" });
      res.json({ staffListing: item });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener staff" });
    }
  });

  app.post("/api/services/staff", requireAuth, async (req, res) => {
    try {
      const body = insertStaffListingSchema.parse(req.body);
      const item = await storage.createStaffListing({ ...body, userId: req.session.userId! });
      res.status(201).json({ staffListing: item });
    } catch (error: any) {
      if (error.name === "ZodError") return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
      res.status(500).json({ message: "Error al crear listado de staff" });
    }
  });

  app.put("/api/services/staff/:id", requireAuth, async (req, res) => {
    try {
      const item = await storage.getStaffListing(req.params.id);
      if (!item) return res.status(404).json({ message: "Staff no encontrado" });
      if (item.userId !== req.session.userId) return res.status(403).json({ message: "Sin permiso" });
      const body = insertStaffListingSchema.partial().parse(req.body);
      const updated = await storage.updateStaffListing(req.params.id, body);
      res.json({ staffListing: updated });
    } catch (error: any) {
      if (error.name === "ZodError") return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
      res.status(500).json({ message: "Error al actualizar staff" });
    }
  });

  app.delete("/api/services/staff/:id", requireAuth, async (req, res) => {
    try {
      const item = await storage.getStaffListing(req.params.id);
      if (!item) return res.status(404).json({ message: "Staff no encontrado" });
      if (item.userId !== req.session.userId) return res.status(403).json({ message: "Sin permiso" });
      await storage.deleteStaffListing(req.params.id);
      res.json({ message: "Staff eliminado" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar staff" });
    }
  });

  // ---------- Vet Clinics ----------
  app.get("/api/services/vets", async (req, res) => {
    try {
      const { userId, region, specialty, emergencyService, status, limit, offset } = req.query;
      const items = await storage.getVetClinics({
        userId: userId as string, region: region as string,
        specialty: specialty as string,
        emergencyService: emergencyService === "true" ? true : emergencyService === "false" ? false : undefined,
        status: (status as string) || "active",
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      });
      res.json({ vetClinics: items });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener veterinarias" });
    }
  });

  app.get("/api/services/vets/:id", async (req, res) => {
    try {
      const item = await storage.getVetClinic(req.params.id);
      if (!item) return res.status(404).json({ message: "Veterinaria no encontrada" });
      res.json({ vetClinic: item });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener veterinaria" });
    }
  });

  app.post("/api/services/vets", requireAuth, async (req, res) => {
    try {
      const body = insertVetClinicSchema.parse(req.body);
      const item = await storage.createVetClinic({ ...body, userId: req.session.userId! });
      res.status(201).json({ vetClinic: item });
    } catch (error: any) {
      if (error.name === "ZodError") return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
      res.status(500).json({ message: "Error al crear veterinaria" });
    }
  });

  app.put("/api/services/vets/:id", requireAuth, async (req, res) => {
    try {
      const item = await storage.getVetClinic(req.params.id);
      if (!item) return res.status(404).json({ message: "Veterinaria no encontrada" });
      if (item.userId !== req.session.userId) return res.status(403).json({ message: "Sin permiso" });
      const body = insertVetClinicSchema.partial().parse(req.body);
      const updated = await storage.updateVetClinic(req.params.id, body);
      res.json({ vetClinic: updated });
    } catch (error: any) {
      if (error.name === "ZodError") return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
      res.status(500).json({ message: "Error al actualizar veterinaria" });
    }
  });

  app.delete("/api/services/vets/:id", requireAuth, async (req, res) => {
    try {
      const item = await storage.getVetClinic(req.params.id);
      if (!item) return res.status(404).json({ message: "Veterinaria no encontrada" });
      if (item.userId !== req.session.userId) return res.status(403).json({ message: "Sin permiso" });
      await storage.deleteVetClinic(req.params.id);
      res.json({ message: "Veterinaria eliminada" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar veterinaria" });
    }
  });

  return httpServer;
}