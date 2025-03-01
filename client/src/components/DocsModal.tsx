import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DocsModal({ isOpen, onClose }: DocsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-primary text-foreground max-w-4xl w-full mx-4 overflow-hidden max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between pb-2 mb-2 flex-shrink-0">
          <DialogTitle className="text-lg font-medium text-white">Documentation</DialogTitle>
          <button className="text-gray-500 hover:text-white transition" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-2">
          <h4 className="text-white font-medium text-lg mb-3">Natural Language-Guided Programming Agent</h4>
          
          <div className="mb-6">
            <h5 className="text-secondary font-medium mb-2">Overview</h5>
            <p className="text-foreground text-sm mb-3">
              This tool is designed to generate code snippets in various programming languages based on natural language input using a transformer-based architecture.
            </p>
          </div>
          
          <div className="mb-6">
            <h5 className="text-secondary font-medium mb-2">Components</h5>
            
            <div className="ml-4 mb-4">
              <h6 className="text-white text-sm font-medium mb-1">1. Data Preparation</h6>
              <ul className="list-disc list-inside text-foreground text-sm ml-2">
                <li>Uses a large dataset of natural language prompts and corresponding code snippets in various programming languages</li>
                <li>Tokenizes natural language prompts using WordPiece tokenizer</li>
                <li>Preprocesses code snippets (tokenization, comment removal, indentation normalization)</li>
              </ul>
            </div>
            
            <div className="ml-4 mb-4">
              <h6 className="text-white text-sm font-medium mb-1">2. Model Definition</h6>
              <ul className="list-disc list-inside text-foreground text-sm ml-2">
                <li>Implements a transformer-based architecture using Hugging Face's Transformers library</li>
                <li>Uses pre-trained language models (BERT, RoBERTa) as the encoder to process natural language input</li>
                <li>Implements a decoder that generates code snippets based on the encoder's output</li>
              </ul>
            </div>
            
            <div className="ml-4 mb-4">
              <h6 className="text-white text-sm font-medium mb-1">3. Training</h6>
              <ul className="list-disc list-inside text-foreground text-sm ml-2">
                <li>Uses a combination of masked language modeling and code generation losses</li>
                <li>Employs AdamW optimizer with appropriate hyperparameters</li>
                <li>Trains the model using prepared dataset and monitors performance on validation set</li>
              </ul>
            </div>
            
            <div className="ml-4">
              <h6 className="text-white text-sm font-medium mb-1">4. Inference</h6>
              <ul className="list-disc list-inside text-foreground text-sm ml-2">
                <li>Processes natural language input by tokenizing and encoding it</li>
                <li>Uses the decoder to generate code snippets based on the input encoding</li>
                <li>Post-processes the generated code by formatting and removing unnecessary tokens</li>
              </ul>
            </div>
          </div>
          
          <div className="mb-6">
            <h5 className="text-secondary font-medium mb-2">Example Code</h5>
            <pre className="bg-[#1E2228] text-foreground p-4 rounded-lg text-xs font-mono overflow-x-auto">
{`# Encoder (BERT-based)
import torch
from transformers import BertTokenizer, BertModel

tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
encoder = BertModel.from_pretrained('bert-base-uncased')

# Decoder (Simple sequence-to-sequence model)
class Decoder(torch.nn.Module):
    def __init__(self, vocab_size, hidden_size, num_layers):
        super(Decoder, self).__init__()
        self.embedding = torch.nn.Embedding(vocab_size, hidden_size)
        self.lstm = torch.nn.LSTM(hidden_size, hidden_size, num_layers, batch_first=True)
        self.fc = torch.nn.Linear(hidden_size, vocab_size)

decoder = Decoder(vocab_size=512, hidden_size=768, num_layers=2)`}
            </pre>
          </div>
          
          <div className="mb-6">
            <h5 className="text-secondary font-medium mb-2">Tips and Best Practices</h5>
            <ul className="list-disc list-inside text-foreground text-sm">
              <li className="mb-2">Experiment with different architectures such as DistilBERT or ALBERT</li>
              <li className="mb-2">Add additional losses, such as syntax-aware losses, to improve the generated code's quality</li>
              <li className="mb-2">Use libraries like CodeBERT or CodeSearchNet to leverage pre-trained code representations</li>
              <li className="mb-2">Ensure proper tokenization of both natural language input and code snippets</li>
              <li className="mb-2">Perform thorough hyperparameter tuning to optimize the model's performance</li>
              <li>Preprocess code snippets carefully to remove unnecessary tokens and maintain correct indentation</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
