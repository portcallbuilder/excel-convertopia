
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConversionButtonProps {
  onClick: () => void;
  disabled: boolean;
  isConverting: boolean;
  className?: string;
}

const ConversionButton: React.FC<ConversionButtonProps> = ({
  onClick,
  disabled,
  isConverting,
  className
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isConverting}
      className={cn("hover-lift transition-all duration-300", className)}
      size="lg"
    >
      {isConverting ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Converting...
        </>
      ) : (
        <>
          Convert File
          <ArrowRight className="h-4 w-4 ml-2" />
        </>
      )}
    </Button>
  );
};

export default ConversionButton;
