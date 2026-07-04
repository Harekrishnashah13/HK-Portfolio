import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { db } from "./src/db/index.ts";
import { messages, users, analyticsEvents } from "./src/db/schema.ts";
import { requireAuth, AuthRequest } from "./src/middleware/auth.ts";
import { desc } from "drizzle-orm";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Analytics Routes
  app.post("/api/analytics", async (req, res) => {
    try {
      const { eventType, metadata } = req.body;
      if (!eventType) {
        return res.status(400).json({ error: "Missing eventType" });
      }

      const result = await db.insert(analyticsEvents)
        .values({
          eventType,
          metadata: metadata || ""
        })
        .returning();

      res.status(201).json(result[0]);
    } catch (error) {
      console.error("Failed to insert analytics event:", error);
      res.status(500).json({ error: "Analytics ingestion failed" });
    }
  });

  app.get("/api/analytics", async (req, res) => {
    try {
      const allEvents = await db.select().from(analyticsEvents).orderBy(desc(analyticsEvents.timestamp));
      
      // Calculate summary statistics
      const summary = {
        totalEvents: allEvents.length,
        resumeDownloads: allEvents.filter(e => e.eventType === 'resume_download_txt').length,
        resumePrints: allEvents.filter(e => e.eventType === 'resume_print').length,
        resumeCopies: allEvents.filter(e => e.eventType === 'resume_copy_text').length,
        resumeOpens: allEvents.filter(e => e.eventType === 'resume_modal_open').length,
        linkedinClicks: allEvents.filter(e => e.eventType === 'linkedin_click').length,
        emailClicks: allEvents.filter(e => e.eventType === 'email_click').length,
        contactSubmissions: allEvents.filter(e => e.eventType === 'contact_form_submit').length,
        recentEvents: allEvents,
      };

      res.json(summary);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
      res.status(500).json({ error: "Analytics query failed" });
    }
  });

  // API Routes
  app.post("/api/messages", async (req, res) => {
    try {
      const { name, email, company, topic, message, timestamp, status, isDemo } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const result = await db.insert(messages)
        .values({
          name,
          email,
          company: company || "N/A",
          topic: topic || "General Inquiry",
          message,
          timestamp,
          isDemo: isDemo || false,
          status: status || "Ingested locally"
        })
        .returning();

      res.status(201).json(result[0]);
    } catch (error) {
      console.error("Failed to insert message:", error);
      res.status(500).json({ error: "Database ingestion failed" });
    }
  });

  app.get("/api/messages", async (req, res) => {
    try {
      // Optional: Check auth token and register user if valid
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const { adminAuth } = await import('./src/lib/firebase-admin.ts');
        const token = authHeader.split('Bearer ')[1];
        try {
          const decodedToken = await adminAuth.verifyIdToken(token);
          // Upsert user
          await db.insert(users)
            .values({
              uid: decodedToken.uid,
              email: decodedToken.email || "unknown@gmail.com"
            })
            .onConflictDoUpdate({
              target: users.uid,
              set: {
                email: decodedToken.email || "unknown@gmail.com"
              }
            });
        } catch (err) {
          console.warn("Invalid token passed to GET /api/messages:", err);
        }
      }

      const results = await db.select().from(messages).orderBy(desc(messages.createdAt));
      res.json(results);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      res.status(500).json({ error: "Database query failed" });
    }
  });

  app.delete("/api/messages", requireAuth, async (req: AuthRequest, res) => {
    try {
      await db.delete(messages);
      res.json({ success: true, message: "Inbox cleared successfully" });
    } catch (error) {
      console.error("Failed to clear messages:", error);
      res.status(500).json({ error: "Database delete failed" });
    }
  });

  app.post("/api/messages/seed", async (req, res) => {
    try {
      const demos = [
        {
          name: 'Sarah Jenkins',
          email: 's.jenkins@databricks.com',
          company: 'Databricks',
          topic: 'Full-Time Hiring Pipeline',
          message: "Hi Harekrishna, I came across your Databricks Certification and portfolio. We're expanding our EMEA Enterprise Data Engineering team based in Dublin and would love to chat about your background with PySpark and Delta Lake. Do you have some time this week?",
          timestamp: new Date(Date.now() - 3600000 * 2).toLocaleString(),
          isDemo: true,
          status: 'Relayed to Email API'
        },
        {
          name: 'Liam O\'Connor',
          email: 'liam@stripe.com',
          company: 'Stripe',
          topic: 'Analytics Consulting',
          message: "Incredible portfolio! Your pipeline diagnostics automation project is exactly what we need for our transaction reconciliation reports. Let's connect on LinkedIn to discuss freelance or permanent openings.",
          timestamp: new Date(Date.now() - 3600000 * 5).toLocaleString(),
          isDemo: true,
          status: 'Ingested locally'
        }
      ];

      const inserted = [];
      for (const d of demos) {
        const res = await db.insert(messages).values(d).returning();
        inserted.push(res[0]);
      }
      res.json(inserted);
    } catch (error) {
      console.error("Failed to seed demos:", error);
      res.status(500).json({ error: "Database seeding failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
