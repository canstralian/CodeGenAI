import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCodeContext } from "@/contexts/CodeContext";

const EXAMPLE_PROMPTS = [
  "Create a function to calculate the Fibonacci sequence in Python",
  "Java class for a simple bank account with deposit and withdrawal methods",
  "C++ program to find the prime numbers in a given range"
];

export default function InputPanel() {
  const { prompt, setPrompt, model, setModel, generateCode, isGenerating } = useCodeContext();
  const [tokenCount, setTokenCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Simple approximation: words + special tokens
    const words = prompt.trim().split(/\s+/).filter(Boolean).length;
    setTokenCount(Math.round(words * 1.3));
  }, [prompt]);

  const handleClear = () => {
    setPrompt("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleExampleSelect = (example: string) => {
    setPrompt(example);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-white">Natural Language Prompt</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-sm bg-primary hover:bg-gray-700 rounded text-muted-foreground"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-sm bg-primary hover:bg-gray-700 rounded text-muted-foreground"
              >
                Examples
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
              <div className="p-2">
                <h3 className="text-sm font-medium text-white mb-2">Example Prompts</h3>
                <div className="space-y-2">
                  {EXAMPLE_PROMPTS.map((example, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="text-left w-full text-xs text-muted-foreground hover:bg-gray-700 p-2 rounded transition"
                      onClick={() => handleExampleSelect(example)}
                    >
                      {example}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="bg-primary rounded-lg shadow-lg overflow-hidden flex-grow flex flex-col">
        <div className="px-4 py-3 bg-[#2D333B] border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            <span className="text-sm text-muted-foreground ml-2">input.txt</span>
          </div>
        </div>
        
        <textarea 
          ref={textareaRef}
          className="w-full flex-grow bg-primary text-foreground p-4 outline-none resize-none font-mono"
          placeholder="Describe what you want to create...

Example: Write a function that takes a list of numbers and returns their sum and average."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={12}
        />
        
        <div className="px-4 py-3 bg-[#2D333B] border-t border-gray-700 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            <span>{tokenCount}</span> tokens
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <label htmlFor="model-select" className="text-xs text-muted-foreground mr-2">Model:</label>
              <Select 
                value={model} 
                onValueChange={(value: string) => setModel(value as any)}
              >
                <SelectTrigger className="text-xs bg-background border border-gray-700 rounded h-7 w-[160px]">
                  <SelectValue placeholder="Gemini 2.0 Pro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini-2.0-pro">Gemini 2.0 Pro</SelectItem>
                  <SelectItem value="transformer">Transformer</SelectItem>
                  <SelectItem value="codebert">CodeBERT</SelectItem>
                  <SelectItem value="gpt-mini">GPT-Mini</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              size="sm"
              className="bg-accent hover:bg-blue-700 text-white"
              onClick={generateCode}
              disabled={isGenerating || !prompt.trim()}
            >
              Generate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
