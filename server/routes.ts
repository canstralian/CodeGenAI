import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateCode } from "./transformers/modelService";
import { codeGenerationSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for code generation
  app.post("/api/generate", async (req, res) => {
    try {
      // Validate request body
      const validatedData = codeGenerationSchema.parse(req.body);
      
      // Generate code using the model service
      const result = await generateCode(
        validatedData.prompt,
        validatedData.language,
        validatedData.model
      );
      
      // Store the snippet in storage for future reference
      const timestamp = Math.floor(Date.now() / 1000);
      await storage.saveCodeSnippet({
        prompt: validatedData.prompt,
        code: result.code,
        language: validatedData.language,
        model: validatedData.model,
        createdAt: timestamp
      });
      
      // Return the generated code
      return res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Invalid request data",
          errors: error.errors
        });
      }
      
      console.error("Error generating code:", error);
      return res.status(500).json({
        message: "Failed to generate code",
        error: (error as Error).message
      });
    }
  });

  // Get available models configuration
  app.get("/api/models", async (req, res) => {
    try {
      const models = await storage.getModelConfigs();
      return res.json(models);
    } catch (error) {
      console.error("Error fetching models:", error);
      return res.status(500).json({
        message: "Failed to fetch models",
        error: (error as Error).message
      });
    }
  });

  // Get recent code snippets
  app.get("/api/snippets", async (req, res) => {
    try {
      const snippets = await storage.getRecentCodeSnippets();
      return res.json(snippets);
    } catch (error) {
      console.error("Error fetching snippets:", error);
      return res.status(500).json({
        message: "Failed to fetch snippets",
        error: (error as Error).message
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
