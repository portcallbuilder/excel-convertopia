
import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Upload, XCircle, FileSpreadsheet } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  acceptedFormats?: string[];
  maxSizeMB?: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  acceptedFormats = ['.xlsx', '.xls'],
  maxSizeMB = 10
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);
  
  const validateFile = useCallback((file: File): boolean => {
    // Check file size
    if (file.size > maxSizeBytes) {
      toast.error(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return false;
    }
    
    // Check file type
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (!acceptedFormats.includes(fileExtension)) {
      toast.error(`Invalid file type. Please upload ${acceptedFormats.join(', ')} files only.`);
      return false;
    }
    
    return true;
  }, [acceptedFormats, maxSizeBytes, maxSizeMB]);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
        toast.success(`File "${file.name}" selected successfully!`);
      }
    }
  }, [onFileSelect, validateFile]);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
        toast.success(`File "${file.name}" selected successfully!`);
      }
    }
  }, [onFileSelect, validateFile]);
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const clearSelection = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const formatFileSize = (sizeInBytes: number): string => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} bytes`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(1)} KB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      {!selectedFile ? (
        <div
          className={cn(
            "file-drop-area h-60 flex flex-col items-center justify-center p-6 text-center",
            dragActive ? "is-active" : ""
          )}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mb-4 p-3 rounded-full bg-secondary">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          
          <p className="text-lg font-medium mb-2">Drag and drop your Excel file here</p>
          <p className="text-sm text-muted-foreground mb-4">
            or select a file from your computer
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleChange}
            accept={acceptedFormats.join(',')}
          />
          
          <Button 
            onClick={handleButtonClick}
            variant="outline"
            className="hover-lift"
          >
            Browse Files
          </Button>
          
          <p className="text-xs text-muted-foreground mt-4">
            Supported formats: {acceptedFormats.join(', ')} • Max size: {maxSizeMB}MB
          </p>
        </div>
      ) : (
        <div className="p-6 border rounded-lg bg-secondary/50 animate-scale-in">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg mr-3">
                <FileSpreadsheet className="h-6 w-6 text-primary" />
              </div>
              <div className="overflow-hidden">
                <p className="font-medium text-sm truncate max-w-[200px]">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSelection}
              className="text-muted-foreground hover:text-destructive"
            >
              <XCircle className="h-5 w-5" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
          
          <div className="h-1 w-full bg-primary/20 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-full rounded-full animate-pulse-soft"></div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Ready for conversion
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
