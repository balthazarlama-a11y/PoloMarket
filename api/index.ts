import express from "express";
import session from "express-session";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

declare module "express-session" {
    interface SessionData {
        userId?: string;
    }
}

declare module "http" {
    interface IncomingMessage {
        rawBody: unknown;
    }
}

app.use(
    express.json({
        verify: (req, _res, buf) => {
            req.rawBody = buf;
        },
    }),
);

app.use(express.urlencoded({ extended: false }));

// Configure session for serverless
app.use(
    session({
        secret: process.env.SESSION_SECRET || "polomarket-secret-key-change-in-production",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            sameSite: "lax",
        },
    })
);

// Register all routes
let isRegistered = false;
async function ensureRoutes() {
    if (!isRegistered) {
        await registerRoutes(httpServer, app);
        isRegistered = true;
    }
}

// Vercel serverless handler
export default async function handler(req: any, res: any) {
    await ensureRoutes();
    return app(req, res);
}
