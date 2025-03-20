
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-8 w-auto" }) => {
  return (
    <img 
      src="/your-logo.png" 
      alt="TCMF Generator Logo" 
      className={className} 
    />
  );
};

export default Logo;
