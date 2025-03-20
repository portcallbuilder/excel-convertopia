
import React from 'react';
import { toast } from 'sonner';

export interface ConversionResult {
  success: boolean;
  data?: {
    url: string;
    fileName: string;
  };
  error?: string;
}

// Define a type for the format object
export interface FormatInfo {
  id: string;
  name: string;
  extension: string;
  icon: string; // Using string for icon
  description: string;
}

// Supported conversion formats
export const supportedFormats: FormatInfo[] = [
  {
    id: 'markdown',
    name: 'Markdown',
    extension: '.md',
    icon: 'MD',
    description: 'Lightweight markup language for creating formatted text'
  },
  {
    id: 'json',
    name: 'JSON',
    extension: '.json',
    icon: 'JSON',
    description: 'JavaScript Object Notation, for API integration'
  },
  {
    id: 'pdf',
    name: 'PDF',
    extension: '.pdf',
    icon: 'PDF',
    description: 'Portable Document Format, maintains formatting & layout'
  }
];

// API endpoint for file conversion
const API_ENDPOINT = 'https://your-api-endpoint.com/convert';

// Function to connect to your existing API for file conversion
export const convertExcelFile = async (
  file: File,
  format: string,
  onProgress: (progress: number) => void
): Promise<ConversionResult> => {
  // Validate input
  if (!file) {
    return { success: false, error: 'No file provided' };
  }
  
  if (!format) {
    return { success: false, error: 'No format selected' };
  }
  
  // Initialize progress
  onProgress(10);
  
  try {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format);
    
    // Use XMLHttpRequest for progress tracking
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      // Track upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 50);
          onProgress(10 + percentComplete); // Start from 10%, go up to 60%
        }
      };
      
      // Handle response
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          onProgress(80); // Processing on server
          
          try {
            const response = JSON.parse(xhr.responseText);
            
            // Simulate processing time on server
            setTimeout(() => {
              onProgress(100);
              
              const targetFormat = supportedFormats.find(f => f.id === format);
              if (!targetFormat) {
                reject({ success: false, error: 'Invalid format selected' });
                return;
              }
              
              const originalFileName = file.name.replace(/\.[^/.]+$/, "");
              const newFileName = `${originalFileName}${targetFormat.extension}`;
              
              resolve({
                success: true,
                data: {
                  url: response.fileUrl || response.downloadUrl || response.url,
                  fileName: response.fileName || newFileName
                }
              });
            }, 1000);
          } catch (error) {
            onProgress(100);
            reject({ success: false, error: 'Failed to parse server response' });
          }
        } else {
          onProgress(100);
          reject({ 
            success: false, 
            error: `Server returned error: ${xhr.status} ${xhr.statusText}` 
          });
        }
      };
      
      // Handle network errors
      xhr.onerror = () => {
        onProgress(100);
        reject({ success: false, error: 'Network error occurred' });
      };
      
      // Open and send the request
      xhr.open('POST', API_ENDPOINT, true);
      xhr.send(formData);
    });
  } catch (error) {
    console.error('Conversion error:', error);
    return {
      success: false,
      error: 'An error occurred during file conversion'
    };
  }
};

// Mock download function - in a real app, this would download the converted file
export const downloadConvertedFile = (url: string, fileName: string): void => {
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  // In a real app, you might want to clean up the URL if it's a blob URL
  setTimeout(() => URL.revokeObjectURL(url), 100);
  
  toast.success('File downloaded successfully!');
};
