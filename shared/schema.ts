import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Table for storing user generated code snippets
export const codeSnippets = pgTable("code_snippets", {
  id: serial("id").primaryKey(),
  prompt: text("prompt").notNull(),
  code: text("code").notNull(),
  language: text("language").notNull(),
  model: text("model").notNull(),
  createdAt: integer("created_at").notNull()
});

// Table for storing model configurations
export const modelConfigs = pgTable("model_configs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  configuration: jsonb("configuration").notNull(),
  isActive: integer("is_active").notNull().default(1)
});

// Schema for inserting a code snippet
export const insertCodeSnippetSchema = createInsertSchema(codeSnippets).omit({
  id: true,
});

// Schema for inserting a model configuration
export const insertModelConfigSchema = createInsertSchema(modelConfigs).omit({
  id: true,
});

// Types
export type InsertCodeSnippet = z.infer<typeof insertCodeSnippetSchema>;
export type CodeSnippet = typeof codeSnippets.$inferSelect;

export type InsertModelConfig = z.infer<typeof insertModelConfigSchema>;
export type ModelConfig = typeof modelConfigs.$inferSelect;

// Schema for code generation requests
export const codeGenerationSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  language: z.enum(["python", "java", "cpp", "javascript"]),
  model: z.enum(["gemini-2.0-pro", "transformer", "codebert", "gpt-mini"]),
});

export type CodeGenerationRequest = z.infer<typeof codeGenerationSchema>;
