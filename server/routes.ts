import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertItemSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { setupAuth, isAuthenticated } from "./googleAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const user = req.user;
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get("/api/items", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const items = await storage.getItemsByUserId(userId);
      res.json(items);
    } catch (error) {
      console.error("Error fetching items:", error);
      res.status(500).json({ error: "Failed to fetch items" });
    }
  });

  app.get("/api/items/:id", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const item = await storage.getItem(id, userId);
      
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      
      res.json(item);
    } catch (error) {
      console.error("Error fetching item:", error);
      res.status(500).json({ error: "Failed to fetch item" });
    }
  });

  app.post("/api/items", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const validationResult = insertItemSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const errorMessage = fromZodError(validationResult.error).message;
        return res.status(400).json({ error: errorMessage });
      }

      const item = await storage.createItem(validationResult.data, userId);
      res.status(201).json(item);
    } catch (error) {
      console.error("Error creating item:", error);
      res.status(500).json({ error: "Failed to create item" });
    }
  });

  app.patch("/api/items/:id", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      const partialSchema = insertItemSchema.partial();
      const validationResult = partialSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const errorMessage = fromZodError(validationResult.error).message;
        return res.status(400).json({ error: errorMessage });
      }

      const updatedItem = await storage.updateItem(id, userId, validationResult.data);
      
      if (!updatedItem) {
        return res.status(404).json({ error: "Item not found" });
      }
      
      res.json(updatedItem);
    } catch (error) {
      console.error("Error updating item:", error);
      res.status(500).json({ error: "Failed to update item" });
    }
  });

  app.delete("/api/items/:id", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const deleted = await storage.deleteItem(id, userId);
      
      if (!deleted) {
        return res.status(404).json({ error: "Item not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).json({ error: "Failed to delete item" });
    }
  });

  app.get("/api/barcode/:barcode", isAuthenticated, async (req, res) => {
    try {
      const { barcode } = req.params;
      const apiKey = process.env.BARCODE_LOOKUP_API_KEY;
      
      if (!apiKey) {
        return res.json({ 
          success: false,
          message: "Barcode lookup API key not configured. Add BARCODE_LOOKUP_API_KEY to your environment variables."
        });
      }

      const response = await fetch(
        `https://api.barcodelookup.com/v3/products?barcode=${barcode}&key=${apiKey}`
      );
      
      if (!response.ok) {
        return res.json({ 
          success: false,
          message: "Failed to fetch product information"
        });
      }

      const data = await response.json();
      
      if (data.products && data.products.length > 0) {
        const product = data.products[0];
        res.json({
          success: true,
          product: {
            name: product.title || product.product_name,
            imageUrl: product.images?.[0] || null,
            barcode: barcode,
          }
        });
      } else {
        res.json({ 
          success: false,
          message: "No product found for this barcode"
        });
      }
    } catch (error) {
      console.error("Error looking up barcode:", error);
      res.json({ 
        success: false,
        message: "Error looking up barcode"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
