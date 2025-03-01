import { GoogleGenerativeAI } from "@google/generative-ai";

// Interface for code generation results
export interface CodeGenerationResult {
  code: string;
  language: string;
  model: string;
  executionTime: number;
}

// Initialize Gemini API with environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Get the gemini-2.0-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

/**
 * Generates a prompt customized for code generation based on language
 * 
 * @param prompt User's natural language prompt
 * @param language Target programming language
 * @returns Formatted prompt for the model
 */
function createPromptForLanguage(prompt: string, language: string): string {
  return `
You are an expert code generation assistant.
Your task is to generate clean, well-commented, and efficient ${language} code based on the following prompt.
Follow best practices for ${language} and include appropriate error handling.
Return ONLY code with comments, no explanation text before or after the code.

${prompt}
`;
}

/**
 * Generate code based on natural language prompt using Gemini 2.0 Pro
 * 
 * @param prompt Natural language description of the code to generate
 * @param language Target programming language
 * @param modelType Model identifier (used for tracking)
 * @returns Generated code and metadata
 */
export async function generateCodeWithGemini(
  prompt: string,
  language: string,
  modelType: string
): Promise<CodeGenerationResult> {
  // Record start time for execution time calculation
  const startTime = Date.now();

  try {
    // Create a language-specific prompt
    const formattedPrompt = createPromptForLanguage(prompt, language);

    // Generate content with Gemini
    const result = await model.generateContent(formattedPrompt);
    const response = await result.response;
    const text = response.text();

    // Calculate execution time
    const executionTime = Date.now() - startTime;

    // Extract code from the response
    const code = cleanupGeneratedCode(text);

    return {
      code,
      language,
      model: "gemini-pro",
      executionTime
    };
  } catch (error) {
    console.error("Error generating code with Gemini:", error);

    // Return a fallback response
    return {
      code: `// Error generating code: ${(error as Error).message}\n// Please try again with a different prompt`,
      language,
      model: "gemini-pro",
      executionTime: Date.now() - startTime
    };
  }
}

/**
 * Clean up the generated code by removing any markdown formatting or extra text
 * 
 * @param text Raw text from model response
 * @returns Cleaned up code
 */
function cleanupGeneratedCode(text: string): string {
  // Remove markdown code blocks if present
  let code = text.replace(/```[\w]*\n/g, "").replace(/```$/g, "");

  // Trim whitespace
  code = code.trim();

  return code;
}