import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertHorseSchema } from "@shared/schema";
import { validateRUT } from "@shared/utils";
import bcrypt from "bcryptjs";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Auth routes
  // POST /api/auth/register
  app.post("/api/auth/register", async (req, res) => {
    try {
      const body = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(body.email);
      if (existingUser) {
        return res.status(400).json({ message: "El email ya está registrado" });
      }

      // Validate RUT if provided
      if (body.rut) {
        if (!validateRUT(body.rut)) {
          return res.status(400).json({ message: "RUT inválido" });
        }
        
        const existingRUT = await storage.getUserByRUT(body.rut);
        if (existingRUT) {
          return res.status(400).json({ message: "El RUT ya está registrado" });
        }
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(body.password, 10);

      // Create user
      const user = await storage.createUser({
        email: body.email,
        password: hashedPassword,
        name: body.name,
        rut: body.rut,
        role: body.role,
      });

      // Set session
      req.session.userId = user.id;

      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json({ user: userWithoutPassword });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Error al registrar usuario" });
    }
  });

  // POST /api/auth/login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email y contraseña son requeridos" });
      }

      // Find user
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Email o contraseña incorrectos" });
      }

      // Verify password
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Email o contraseña incorrectos" });
      }

      // Set session
      req.session.userId = user.id;

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: "Error al iniciar sesión" });
    }
  });

  // POST /api/auth/logout
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Sesión cerrada" });
    });
  });

  // GET /api/auth/me
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

  // Horse routes - require authentication
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "No autenticado" });
    }
    next();
  };

  // GET /api/horses - Get all horses with filters
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

  // GET /api/horses/:id - Get single horse
  app.get("/api/horses/:id", async (req, res) => {
    try {
      const horse = await storage.getHorse(req.params.id);
      if (!horse) {
        return res.status(404).json({ message: "Caballo no encontrado" });
      }
      // Increment views
      await storage.updateHorse(req.params.id, { views: (horse.views || 0) + 1 });
      const updated = await storage.getHorse(req.params.id);
      res.json({ horse: updated });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener caballo" });
    }
  });

  // POST /api/horses - Create horse (authenticated)
  app.post("/api/horses", requireAuth, async (req, res) => {
    try {
      const body = insertHorseSchema.parse(req.body);
      
      const horse = await storage.createHorse({
        ...body,
        userId: req.session.userId!,
      });

      res.status(201).json({ horse });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Error al crear caballo" });
    }
  });

  // PUT /api/horses/:id - Update horse (authenticated, own horses only)
  app.put("/api/horses/:id", requireAuth, async (req, res) => {
    try {
      const horse = await storage.getHorse(req.params.id);
      if (!horse) {
        return res.status(404).json({ message: "Caballo no encontrado" });
      }
      if (horse.userId !== req.session.userId) {
        return res.status(403).json({ message: "No tienes permiso para editar este caballo" });
      }

      const body = insertHorseSchema.partial().parse(req.body);
      const updated = await storage.updateHorse(req.params.id, body);

      res.json({ horse: updated });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Error al actualizar caballo" });
    }
  });

  // DELETE /api/horses/:id - Delete horse (authenticated, own horses only)
  app.delete("/api/horses/:id", requireAuth, async (req, res) => {
    try {
      const horse = await storage.getHorse(req.params.id);
      if (!horse) {
        return res.status(404).json({ message: "Caballo no encontrado" });
      }
      if (horse.userId !== req.session.userId) {
        return res.status(403).json({ message: "No tienes permiso para eliminar este caballo" });
      }

      await storage.deleteHorse(req.params.id);
      res.json({ message: "Caballo eliminado" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar caballo" });
    }
  });

  return httpServer;
}