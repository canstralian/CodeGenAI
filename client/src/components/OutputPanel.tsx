import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Check, Lightbulb, Sparkles } from "lucide-react";
import { useCodeContext } from "@/contexts/CodeContext";

export default function OutputPanel() {
  const { toast } = useToast();
  const {
    generatedCode,
    language,
    setLanguage,
    isGenerating,
    error,
    model
  } = useCodeContext();
  
  const [codeLineCount, setCodeLineCount] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Calculate lines
    if (generatedCode) {
      const lines = generatedCode.split('\n').length;
      setCodeLineCount(lines);
    }
  }, [generatedCode]);

  const getFileExtension = () => {
    const extensions: Record<string, string> = {
      'python': 'py',
      'java': 'java',
      'cpp': 'cpp',
      'javascript': 'js'
    };
    return extensions[language] || 'txt';
  };

  const handleCopyCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setIsCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Code has been copied to your clipboard",
        variant: "default",
        duration: 2000,
      });
      
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const getDisplayLanguage = () => {
    const displayNames: Record<string, string> = {
      'python': 'Python',
      'java': 'Java',
      'cpp': 'C++',
      'javascript': 'JavaScript'
    };
    return displayNames[language] || language;
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-white">Generated Code</h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <label htmlFor="language-select" className="text-sm text-muted-foreground mr-2">Language:</label>
            <Select 
              value={language}
              onValueChange={(value: string) => setLanguage(value as any)}
            >
              <SelectTrigger className="text-sm bg-primary border border-gray-700 rounded h-8">
                <SelectValue placeholder="Python" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-sm bg-primary hover:bg-gray-700 rounded text-muted-foreground flex items-center"
            onClick={handleCopyCode}
            disabled={!generatedCode || isGenerating}
          >
            {isCopied ? <Check className="h-4 w-4 mr-1" /> : 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>}
            {isCopied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>
      
      <div className="bg-primary rounded-lg shadow-lg overflow-hidden flex-grow flex flex-col">
        <div className="px-4 py-3 bg-[#2D333B] border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            <span className="text-sm text-muted-foreground ml-2">{`output.${getFileExtension()}`}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              variant="secondary"
              className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-800 text-white rounded transition"
              disabled={!generatedCode || isGenerating}
            >
              <Lightbulb className="h-3 w-3 mr-1" />
              Explain
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-800 text-white rounded transition"
              disabled={!generatedCode || isGenerating}
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Improve
            </Button>
          </div>
        </div>
        
        <div className="w-full flex-grow bg-[#1E2228] overflow-auto p-4">
          {!generatedCode && !isGenerating && !error && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 text-sm mb-2">Enter a natural language prompt and click "Generate" to create code</p>
              <p className="text-gray-600 text-xs">The AI will process your description and generate corresponding code</p>
            </div>
          )}
          
          {isGenerating && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary mb-4"></div>
              <p className="text-foreground text-sm mb-2">
                Generating code
                <span className="inline-block animate-pulse">...</span>
              </p>
              <p className="text-gray-600 text-xs">Processing input through transformer model</p>
            </div>
          )}
          
          {error && !isGenerating && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-destructive mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-destructive text-sm mb-2">Error processing your request</p>
              <p className="text-gray-600 text-xs">Please try a different prompt or check your connection</p>
            </div>
          )}
          
          {generatedCode && !isGenerating && !error && (
            <pre className="text-foreground font-mono text-sm overflow-x-auto whitespace-pre p-2 rounded bg-[#22272E] border border-gray-700">
              {generatedCode}
            </pre>
          )}
        </div>
        
        <div className="px-4 py-3 bg-[#2D333B] border-t border-gray-700 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {generatedCode ? `${codeLineCount} lines | ${getDisplayLanguage()}` : '0 lines'}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            Generated by <span className="text-secondary font-medium ml-1">
              {model === 'gemini-2.0-pro' ? 'Gemini 2.0 Pro' : 
               model === 'transformer' ? 'Transformer' : 
               model === 'codebert' ? 'CodeBERT' : 'GPT-Mini'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
