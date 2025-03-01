import { codeSnippets, modelConfigs, type InsertCodeSnippet, type CodeSnippet, type ModelConfig } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  saveCodeSnippet(snippet: InsertCodeSnippet): Promise<CodeSnippet>;
  getCodeSnippet(id: number): Promise<CodeSnippet | undefined>;
  getRecentCodeSnippets(limit?: number): Promise<CodeSnippet[]>;
  getModelConfigs(): Promise<ModelConfig[]>;
  getModelConfig(id: number): Promise<ModelConfig | undefined>;
  getModelConfigByName(name: string): Promise<ModelConfig | undefined>;
}

export class MemStorage implements IStorage {
  private codeSnippetsData: Map<number, CodeSnippet>;
  private modelConfigsData: Map<number, ModelConfig>;
  private codeSnippetId: number;
  private modelConfigId: number;

  constructor() {
    this.codeSnippetsData = new Map();
    this.modelConfigsData = new Map();
    this.codeSnippetId = 1;
    this.modelConfigId = 1;
    
    // Initialize with default model configurations
    this.seedModelConfigs();
  }

  private seedModelConfigs() {
    const defaultConfigs = [
      {
        name: 'gemini-pro',
        description: 'Google\'s Gemini Pro model for advanced code generation',
        configuration: { 
          model_type: 'gemini',
          version: 'pro',
          api_provider: 'google'
        },
        isActive: 1
      },
      {
        name: 'transformer',
        description: 'Default transformer model for code generation',
        configuration: { 
          model_type: 'transformer',
          hidden_size: 768,
          num_attention_heads: 12
        },
        isActive: 1
      },
      {
        name: 'codebert',
        description: 'CodeBERT model specialized for code generation',
        configuration: { 
          model_type: 'codebert',
          hidden_size: 768,
          num_attention_heads: 12
        },
        isActive: 1
      },
      {
        name: 'gpt-mini',
        description: 'Smaller GPT-based model for code generation',
        configuration: { 
          model_type: 'gpt',
          hidden_size: 512,
          num_attention_heads: 8
        },
        isActive: 1
      }
    ];
    
    for (const config of defaultConfigs) {
      this.modelConfigsData.set(this.modelConfigId, {
        ...config,
        id: this.modelConfigId++
      });
    }
  }

  async saveCodeSnippet(snippet: InsertCodeSnippet): Promise<CodeSnippet> {
    const id = this.codeSnippetId++;
    const codeSnippet: CodeSnippet = { ...snippet, id };
    this.codeSnippetsData.set(id, codeSnippet);
    return codeSnippet;
  }

  async getCodeSnippet(id: number): Promise<CodeSnippet | undefined> {
    return this.codeSnippetsData.get(id);
  }

  async getRecentCodeSnippets(limit: number = 10): Promise<CodeSnippet[]> {
    // Convert Map to array and sort by creation time (descending)
    const snippets = Array.from(this.codeSnippetsData.values())
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);
      
    return snippets;
  }

  async getModelConfigs(): Promise<ModelConfig[]> {
    return Array.from(this.modelConfigsData.values())
      .filter(config => config.isActive === 1);
  }

  async getModelConfig(id: number): Promise<ModelConfig | undefined> {
    return this.modelConfigsData.get(id);
  }

  async getModelConfigByName(name: string): Promise<ModelConfig | undefined> {
    return Array.from(this.modelConfigsData.values())
      .find(config => config.name === name);
  }
}

export const storage = new MemStorage();
