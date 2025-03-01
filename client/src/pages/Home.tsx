import { useState } from "react";
import Header from "@/components/Header";
import InputPanel from "@/components/InputPanel";
import OutputPanel from "@/components/OutputPanel";
import FeatureCard from "@/components/FeatureCard";
import AboutModal from "@/components/AboutModal";
import DocsModal from "@/components/DocsModal";
import Footer from "@/components/Footer";
import { Lightbulb, Zap, Database } from "lucide-react";

export default function Home() {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onOpenDocs={() => setIsDocsModalOpen(true)}
      />
      
      <main className="flex-grow container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        <InputPanel />
        <OutputPanel />
      </main>
      
      <section className="bg-primary py-8 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Multiple Languages"
              description="Generate code in Python, Java, C++, and more from a single natural language description."
              icon={<Lightbulb className="h-6 w-6 text-secondary" />}
            />
            <FeatureCard 
              title="Powered by Transformers"
              description="Utilizes advanced transformer architecture (BERT/RoBERTa) for intelligent code generation."
              icon={<Zap className="h-6 w-6 text-secondary" />}
            />
            <FeatureCard 
              title="Trained on Quality Data"
              description="Model trained on diverse, high-quality code examples to ensure accurate and efficient output."
              icon={<Database className="h-6 w-6 text-secondary" />}
            />
          </div>
        </div>
      </section>
      
      <Footer />
      
      <AboutModal 
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
      
      <DocsModal 
        isOpen={isDocsModalOpen}
        onClose={() => setIsDocsModalOpen(false)}
      />
    </div>
  );
}
