import { Code } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background py-6 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Code className="h-6 w-6 text-secondary mr-2" />
            <span className="text-muted-foreground text-sm">© 2023 CodeGenie. All rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-white transition text-sm">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-white transition text-sm">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-white transition text-sm">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
