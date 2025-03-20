
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilePreviewProps {
  fileName: string;
  url: string;
  format: string;
  isVisible: boolean;
  onDownload: () => void;
  onNewConversion: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({
  fileName,
  url,
  format,
  isVisible,
  onDownload,
  onNewConversion
}) => {
  return (
    <div 
      className={cn(
        "w-full max-w-md mx-auto transition-all duration-500 transform",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10 pointer-events-none absolute"
      )}
    >
      <div className="p-6 border rounded-lg bg-white shadow-sm">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="p-3 rounded-full bg-green-50 mb-4">
            <FileCheck className="h-6 w-6 text-green-500" />
          </div>
          
          <h3 className="text-lg font-medium mb-1">Conversion Complete!</h3>
          <p className="text-sm text-muted-foreground">
            Your file has been successfully converted to {format}
          </p>
        </div>
        
        <div className="bg-secondary/50 p-4 rounded-lg mb-6">
          <p className="font-medium text-sm truncate">{fileName}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={onDownload}
            className="flex-1 hover-lift"
          >
            <Download className="h-4 w-4 mr-2" />
            Download File
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onNewConversion}
            className="flex-1 hover-lift"
          >
            Convert Another File
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
