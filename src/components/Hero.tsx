
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDownIcon } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-100 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-100 blur-3xl"></div>
      </div>
      
      <div className="container max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-secondary text-primary mb-4">
            TCMF Generator
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-serif"
        >
          Transform Transport scenarios
          <br /> 
          <span className="font-serif">
            into TCMF
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-sans"
        >
          Effortlessly convert your Excel spreadsheets to multiple formats with our intuitive, 
          powerful conversion tool. No complicated settings. No software to install.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button size="lg" className="hover-lift rounded-md px-8 h-12 bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="hover-lift rounded-md px-8 h-12 border-blue-600 text-blue-600 hover:bg-blue-50">
            Learn More
          </Button>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
      >
        <a href="#converter" className="flex flex-col items-center">
          <span className="text-sm text-muted-foreground mb-2 font-sans">Start Converting</span>
          <ArrowDownIcon className="h-6 w-6 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
