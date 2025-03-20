
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-8 w-auto" }) => {
  return (
    <a href="https://www.ri.se" target="_blank" rel="noopener noreferrer">
      <img 
        src="/your-logo.png" 
        alt="TCMF Generator Logo" 
        className={className} 
      />
    </a>
  );
};

export default Logo;
