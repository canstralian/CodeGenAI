declare module 'prismjs' {
  const Prism: {
    highlightAll: () => void;
    highlight: (text: string, grammar: any, language: string) => string;
    languages: Record<string, any>;
  };
  export = Prism;
}

declare module 'prismjs/components/prism-python';
declare module 'prismjs/components/prism-java';
declare module 'prismjs/components/prism-cpp';
declare module 'prismjs/components/prism-javascript';
declare module 'prismjs/themes/prism-tomorrow.css';