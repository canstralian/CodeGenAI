import { useState } from "react";
import { Link } from "wouter";
import { Code } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onOpenAbout: () => void;
  onOpenDocs: () => void;
}

export default function Header({ onOpenAbout, onOpenDocs }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary border-b border-gray-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code className="h-8 w-8 text-secondary" />
          <h1 className="text-xl font-bold font-mono text-white">CodeGenie</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-white transition"
            onClick={onOpenAbout}
          >
            About
          </Button>
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-white transition"
            onClick={onOpenDocs}
          >
            Docs
          </Button>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-white transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </div>
        
        <Button 
          variant="ghost" 
          className="md:hidden text-muted-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary border-t border-gray-700 py-2">
          <div className="container mx-auto px-4 py-1 flex flex-col space-y-2">
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-white transition py-1 justify-start"
              onClick={() => {
                onOpenAbout();
                setIsMobileMenuOpen(false);
              }}
            >
              About
            </Button>
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-white transition py-1 justify-start"
              onClick={() => {
                onOpenDocs();
                setIsMobileMenuOpen(false);
              }}
            >
              Docs
            </Button>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition py-1 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
