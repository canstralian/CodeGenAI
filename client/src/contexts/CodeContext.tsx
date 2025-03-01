import React, { createContext, useContext, useState, ReactNode } from 'react';
import { generateCode, CodeGenerationRequest, CodeGenerationResponse, ProgrammingLanguage, ModelType, exampleCodeTemplates } from '@/lib/codeGeneration';
import { useToast } from '@/hooks/use-toast';

interface CodeContextType {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  language: ProgrammingLanguage;
  setLanguage: React.Dispatch<React.SetStateAction<ProgrammingLanguage>>;
  model: ModelType;
  setModel: React.Dispatch<React.SetStateAction<ModelType>>;
  generatedCode: string;
  setGeneratedCode: React.Dispatch<React.SetStateAction<string>>;
  isGenerating: boolean;
  error: string | null;
  generateCode: () => Promise<void>;
}

const CodeContext = createContext<CodeContextType | undefined>(undefined);

export const useCodeContext = () => {
  const context = useContext(CodeContext);
  if (!context) {
    throw new Error('useCodeContext must be used within a CodeProvider');
  }
  return context;
};

interface CodeProviderProps {
  children: ReactNode;
}

export const CodeProvider = ({ children }: CodeProviderProps) => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState<ProgrammingLanguage>('python');
  const [model, setModel] = useState<ModelType>('gemini-pro');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCode = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a description of the code you want to generate.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const request: CodeGenerationRequest = {
        prompt: prompt.trim(),
        language,
        model
      };

      // Try to generate code from the backend API
      try {
        const response = await generateCode(request);
        setGeneratedCode(response.code);
      } catch (apiError) {
        console.error('API error, falling back to examples:', apiError);
        
        // If backend fails, use example templates as fallback
        const templateFn = exampleCodeTemplates[language];
        if (templateFn) {
          setGeneratedCode(templateFn(prompt));
        } else {
          throw new Error('No example template available for this language');
        }
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError((err as Error).message || 'An error occurred during code generation');
      toast({
        title: "Generation failed",
        description: (err as Error).message || 'Failed to generate code. Please try again.',
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const value: CodeContextType = {
    prompt,
    setPrompt,
    language,
    setLanguage,
    model,
    setModel,
    generatedCode,
    setGeneratedCode,
    isGenerating,
    error,
    generateCode: handleGenerateCode
  };

  return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
};
