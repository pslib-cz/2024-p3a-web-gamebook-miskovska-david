declare module 'react-typewriter' {
    import * as React from 'react';
  
    interface TypewriterProps {
      typing?: number;
      maxDelay?: number;
      onTypingEnd?: () => void;
      className?: string;
      children?: React.ReactNode;
    }
  
    const Typewriter: React.FC<TypewriterProps>;
    export { Typewriter };
  }
   