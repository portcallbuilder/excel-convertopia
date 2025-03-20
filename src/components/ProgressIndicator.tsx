
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  progress: number;
  status: string;
  isVisible: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  status,
  isVisible
}) => {
  return (
    <div 
      className={cn(
        "w-full max-w-md mx-auto transition-all duration-300",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none h-0"
      )}
    >
      <div className="p-6 border rounded-lg bg-secondary/50">
        <div className="mb-2 flex justify-between items-center">
          <h4 className="text-sm font-medium">Converting File</h4>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">{status}</p>
      </div>
    </div>
  );
};

export default ProgressIndicator;
