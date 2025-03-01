import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-primary text-foreground max-w-2xl w-full mx-4 overflow-hidden">
        <div className="flex items-center justify-between pb-2 mb-2">
          <DialogTitle className="text-lg font-medium text-white">About CodeGenie</DialogTitle>
          <button className="text-gray-500 hover:text-white transition" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <DialogDescription className="p-0 m-0">
          <p className="text-foreground mb-4">
            CodeGenie is an advanced AI-powered code generation tool designed to transform natural language descriptions into functional code.
          </p>
          <p className="text-foreground mb-4">
            Utilizing state-of-the-art transformer-based architecture, CodeGenie can understand your requirements and generate appropriate code snippets in multiple programming languages, including Python, Java, and C++.
          </p>
          <h4 className="text-white font-medium mt-6 mb-2">Technical Information</h4>
          <p className="text-foreground mb-4">
            CodeGenie is built on transformer models (BERT/RoBERTa) trained on extensive code repositories. It processes natural language input through WordPiece tokenization and employs a combination of masked language modeling and code generation techniques.
          </p>
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-500">
              CodeGenie is a demonstration project and should be used as a coding assistant, not a replacement for programming knowledge. Always review and test generated code before using in production environments.
            </p>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
