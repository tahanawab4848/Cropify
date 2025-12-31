import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";
import { insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // auth: login/logout/me
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    const { username, password, role } = req.body || {};
    try {
      // basic validation using shared schema shape (password/username)
      insertUserSchema.parse({ username, password });
    } catch (e: any) {
      return res.status(400).json({ message: e?.message || "Invalid credentials" });
    }

    // find or create user in memory
    let user = await storage.getUserByUsername(username);
    if (!user) {
      user = await storage.createUser({ username, password });
    }

    // store session user with role
    (req.session as any).user = { id: user.id, username: user.username, role: role === "admin" ? "admin" : "farmer" };
    return res.json({ id: user.id, username: user.username, role: (req.session as any).user.role });
  });

  app.post("/api/auth/logout", async (req: Request, res: Response) => {
    req.session.destroy(() => {
      res.json({ ok: true });
    });
  });

  app.get("/api/auth/me", async (req: Request, res: Response) => {
    const me = (req.session as any).user || null;
    res.json(me);
  });

  // ---- Market Items (admin) ----
  type MarketItem = { id: string; name: string; category: string; price: number; region: string; lastUpdated: string };
  const marketItems: MarketItem[] = [];

  app.get("/api/market/items", async (_req: Request, res: Response) => {
    res.json(marketItems);
  });

  app.post("/api/market/items", async (req: Request, res: Response) => {
    const user = (req.session as any).user;
    if (!user || user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    const { name, category, price, region } = req.body || {};
    if (!name || !category || typeof price !== "number" || !region) {
      return res.status(400).json({ message: "Missing or invalid fields" });
    }
    const item: MarketItem = { id: String(Date.now()), name, category, price, region, lastUpdated: "just now" };
    marketItems.unshift(item);
    res.status(201).json(item);
  });

  app.put("/api/market/items/:id", async (req: Request, res: Response) => {
    const user = (req.session as any).user;
    if (!user || user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    const { id } = req.params;
    const { name, category, price, region } = req.body || {};
    const idx = marketItems.findIndex((i) => i.id === id);
    if (idx === -1) return res.status(404).json({ message: "Not Found" });
    const updated: MarketItem = {
      ...marketItems[idx],
      name: name ?? marketItems[idx].name,
      category: category ?? marketItems[idx].category,
      price: typeof price === "number" ? price : marketItems[idx].price,
      region: region ?? marketItems[idx].region,
      lastUpdated: "just now",
    };
    marketItems[idx] = updated;
    res.json(updated);
  });

  app.delete("/api/market/items/:id", async (req: Request, res: Response) => {
    const user = (req.session as any).user;
    if (!user || user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    const { id } = req.params;
    const idx = marketItems.findIndex((i) => i.id === id);
    if (idx === -1) return res.status(404).json({ message: "Not Found" });
    marketItems.splice(idx, 1);
    res.json({ ok: true });
  });

  // bulk upload: accept array of items or CSV text
  app.post("/api/market/bulk", async (req: Request, res: Response) => {
    const user = (req.session as any).user;
    if (!user || user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    const { csv, items } = req.body || {};
    let added: number = 0;
    if (Array.isArray(items)) {
      for (const raw of items) {
        if (!raw) continue;
        const name = raw.name;
        const category = raw.category;
        const region = raw.region;
        const price = Number(raw.price);
        if (!name || !category || !region || Number.isNaN(price)) continue;
        marketItems.unshift({ id: String(Date.now() + Math.random()), name, category, price, region, lastUpdated: "just now" });
        added++;
      }
    } else if (typeof csv === "string") {
      const lines = csv.split(/\r?\n/).map((l: string) => l.trim()).filter(Boolean);
      // expecting header: Name,Category,Price,Region
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(",").map((p) => p.trim());
        if (parts.length < 4) continue;
        const [name, category, priceStr, region] = parts;
        const price = Number(priceStr);
        if (!name || !category || !region || Number.isNaN(price)) continue;
        marketItems.unshift({ id: String(Date.now() + i), name, category, price, region, lastUpdated: "just now" });
        added++;
      }
    }
    res.json({ added });
  });

  app.post("/api/ai/advice", async (req: Request, res: Response) => {
    try {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ message: "OPENAI_API_KEY not set on server" });
      }

      const { city, weatherSummary, marketSummary } = req.body || {};
      const client = new OpenAI({ apiKey });

      const system = [
        "You are an agronomy and market assistant for Pakistani farmers.",
        "Be concise (2-4 sentences).",
        "If given city/weather/market context, tailor the advice; otherwise give a general actionable tip.",
      ].join(" ");

      const user = [
        city ? `City: ${city}.` : "",
        weatherSummary ? `Weather: ${weatherSummary}.` : "",
        marketSummary ? `Market: ${marketSummary}.` : "",
        "Provide one actionable farming recommendation.",
      ].filter(Boolean).join(" ");

      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.7,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user || "Give one practical farming recommendation for current season in Pakistan." },
        ],
      });

      const advice = completion.choices?.[0]?.message?.content?.trim() || "Unable to generate advice right now.";
      return res.json({ advice });
    } catch (err: any) {
      return res.status(500).json({ message: err?.message || "Failed to generate advice" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
