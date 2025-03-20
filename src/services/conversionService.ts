
import { toast } from 'sonner';

export interface ConversionResult {
  success: boolean;
  data?: {
    url: string;
    fileName: string;
  };
  error?: string;
}

// Supported conversion formats
export const supportedFormats = [
  {
    id: 'csv',
    name: 'CSV',
    extension: '.csv',
    icon: <span className="text-xs font-bold">CSV</span>,
    description: 'Comma-Separated Values, ideal for data interchange'
  },
  {
    id: 'pdf',
    name: 'PDF',
    extension: '.pdf',
    icon: <span className="text-xs font-bold">PDF</span>,
    description: 'Portable Document Format, maintains formatting & layout'
  },
  {
    id: 'json',
    name: 'JSON',
    extension: '.json',
    icon: <span className="text-xs font-bold">JSON</span>,
    description: 'JavaScript Object Notation, for API integration'
  },
  {
    id: 'xml',
    name: 'XML',
    extension: '.xml',
    icon: <span className="text-xs font-bold">XML</span>,
    description: 'Extensible Markup Language, structured data format'
  },
  {
    id: 'html',
    name: 'HTML',
    extension: '.html',
    icon: <span className="text-xs font-bold">HTML</span>,
    description: 'Web page format, viewable in any browser'
  },
  {
    id: 'txt',
    name: 'Text',
    extension: '.txt',
    icon: <span className="text-xs font-bold">TXT</span>,
    description: 'Plain text format, universally compatible'
  }
];

// This is a mock service that simulates an API call for converting Excel files
export const convertExcelFile = async (
  file: File,
  format: string,
  onProgress: (progress: number) => void
): Promise<ConversionResult> => {
  return new Promise((resolve, reject) => {
    // Validate input
    if (!file) {
      reject({ success: false, error: 'No file provided' });
      return;
    }
    
    if (!format) {
      reject({ success: false, error: 'No format selected' });
      return;
    }
    
    // In a real implementation, we would upload the file to a server and call a conversion API
    // For now, we'll simulate the process with a delay
    
    // Simulate initial upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 95) {
        progress = 95; // Hold at 95% until "server" is done
        clearInterval(interval);
      }
      onProgress(Math.min(Math.round(progress), 95));
    }, 300);
    
    // Simulate API call delay
    setTimeout(() => {
      clearInterval(interval);
      onProgress(100);
      
      // In a real app, we'd get back the URL to the converted file
      // Here we just create a fake URL
      const targetFormat = supportedFormats.find(f => f.id === format);
      if (!targetFormat) {
        reject({ 
          success: false, 
          error: 'Invalid format selected' 
        });
        return;
      }
      
      const originalFileName = file.name.replace(/\.[^/.]+$/, "");
      const newFileName = `${originalFileName}${targetFormat.extension}`;
      
      // Normally this would be a URL to a converted file on the server
      // For demo purposes, we'll just create a blob URL from the original file
      // In a real app, this would be replaced with the actual converted file
      const fakeURL = URL.createObjectURL(file);
      
      resolve({
        success: true,
        data: {
          url: fakeURL,
          fileName: newFileName
        }
      });
    }, 3000); // 3 second delay for "conversion"
  });
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
