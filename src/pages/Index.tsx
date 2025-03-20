
import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, ArrowDown, FileCheck, CheckCircle } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import FileUploader from '@/components/FileUploader';
import FormatSelector, { Format } from '@/components/FormatSelector';
import ConversionButton from '@/components/ConversionButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import FilePreview from '@/components/FilePreview';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { 
  convertExcelFile, 
  supportedFormats,
  downloadConvertedFile
} from '@/services/conversionService';
import { toast } from 'sonner';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<Format | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [conversionStatus, setConversionStatus] = useState('Preparing file...');
  const [convertedFile, setConvertedFile] = useState<{url: string, fileName: string} | null>(null);
  
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setConvertedFile(null);
  };
  
  const handleFormatSelect = (format: Format) => {
    setSelectedFormat(format);
  };
  
  const handleConvert = async () => {
    if (!selectedFile || !selectedFormat) {
      toast.error('Please select a file and output format');
      return;
    }
    
    setIsConverting(true);
    setConversionProgress(0);
    setConversionStatus('Starting conversion...');
    
    try {
      const result = await convertExcelFile(
        selectedFile,
        selectedFormat.id,
        (progress) => {
          setConversionProgress(progress);
          
          // Update status based on progress
          if (progress < 30) {
            setConversionStatus('Analyzing file contents...');
          } else if (progress < 60) {
            setConversionStatus('Converting data...');
          } else if (progress < 90) {
            setConversionStatus('Formatting output...');
          } else {
            setConversionStatus('Finalizing conversion...');
          }
        }
      );
      
      if (result.success && result.data) {
        setConvertedFile(result.data);
        toast.success('File converted successfully!');
      } else {
        toast.error(result.error || 'Conversion failed');
      }
    } catch (error) {
      console.error('Conversion error:', error);
      toast.error('An error occurred during conversion');
    } finally {
      setIsConverting(false);
    }
  };
  
  const handleDownload = () => {
    if (convertedFile) {
      downloadConvertedFile(convertedFile.url, convertedFile.fileName);
    }
  };
  
  const handleNewConversion = () => {
    setSelectedFile(null);
    setSelectedFormat(null);
    setConvertedFile(null);
    setConversionProgress(0);
  };
  
  const getStatusText = () => {
    if (!selectedFile) return 'Select an Excel file to convert';
    if (!selectedFormat) return 'Select output format';
    return 'Ready to convert';
  };
  
  // Features section data
  const features = [
    {
      icon: <FileSpreadsheet className="h-10 w-10 text-primary" />,
      title: "Seamless Conversion",
      description: "Convert Excel files to multiple formats with just a few clicks. No complicated settings required."
    },
    {
      icon: <ArrowDown className="h-10 w-10 text-primary" />,
      title: "Fast Downloads",
      description: "Get your converted files instantly. No waiting, no refreshing, just immediate results."
    },
    {
      icon: <FileCheck className="h-10 w-10 text-primary" />,
      title: "High Fidelity",
      description: "Our conversion engine maintains the integrity of your data, ensuring accurate results every time."
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: "Multiple Formats",
      description: "Convert to CSV, PDF, JSON, XML, HTML, and more formats with consistent quality."
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <Hero />
      
      <section id="converter" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Convert Your Excel Files Now
            </motion.h2>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Select your file, choose an output format, and convert with one click
            </motion.p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm border rounded-xl p-8 shadow-sm mb-12">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="lg:w-1/2">
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Upload Excel File</h3>
                  <FileUploader onFileSelect={handleFileSelect} />
                </div>
                
                {selectedFile && (
                  <div className="animate-fade-in">
                    <FormatSelector 
                      formats={supportedFormats}
                      onSelect={handleFormatSelect}
                      selectedFormat={selectedFormat}
                    />
                  </div>
                )}
              </div>
              
              <div className="lg:w-1/2 flex flex-col">
                {!convertedFile ? (
                  <>
                    <div className="flex-1 flex flex-col justify-center items-center text-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                        <FileSpreadsheet className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">Excel File Converter</h3>
                      <p className="text-muted-foreground mb-6 max-w-xs">
                        {getStatusText()}
                      </p>
                      
                      <ProgressIndicator 
                        progress={conversionProgress}
                        status={conversionStatus}
                        isVisible={isConverting}
                      />
                    </div>
                    
                    <ConversionButton 
                      onClick={handleConvert}
                      disabled={!selectedFile || !selectedFormat}
                      isConverting={isConverting}
                      className="w-full"
                    />
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <FilePreview 
                      fileName={convertedFile.fileName}
                      url={convertedFile.url}
                      format={selectedFormat?.name || ''}
                      isVisible={!!convertedFile}
                      onDownload={handleDownload}
                      onNewConversion={handleNewConversion}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="features" className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-secondary text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Features
            </motion.span>
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Everything You Need
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our Excel conversion tool is designed to be simple, powerful, and reliable
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/50 backdrop-blur-sm border rounded-lg p-6 hover-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="mb-4 p-3 rounded-lg inline-block bg-secondary/50">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="formats" className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-secondary text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Output Formats
            </motion.span>
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Supported Formats
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Convert your Excel files to any of these formats with perfect fidelity
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportedFormats.map((format, index) => (
              <motion.div
                key={format.id}
                className="bg-white/50 backdrop-blur-sm border rounded-lg p-6 hover-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-secondary/50 mr-3">
                    {format.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{format.name}</h3>
                    <p className="text-sm text-muted-foreground">{format.extension}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">{format.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="how-it-works" className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-secondary text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Process
            </motion.span>
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              How It Works
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Converting your Excel files is a simple three-step process
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Upload Your File",
                description: "Drag and drop your Excel file or select it from your computer"
              },
              {
                number: "02",
                title: "Choose Format",
                description: "Select the output format you need from our supported options"
              },
              {
                number: "03",
                title: "Download Result",
                description: "Click convert and download your newly formatted file"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <span className="text-5xl font-bold text-primary/10 absolute -top-6 -left-4">
                  {step.number}
                </span>
                <div className="bg-white/50 backdrop-blur-sm border rounded-lg p-6 hover-lift relative z-10">
                  <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
