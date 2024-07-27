declare module '*.node' {
    const content: any;
    export default content;
  }

  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    }
  }