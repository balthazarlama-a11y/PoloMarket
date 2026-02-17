import express from "express";
import cookieParser from "cookie-parser";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

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
app.use(cookieParser());

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
