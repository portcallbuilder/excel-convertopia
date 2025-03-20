
import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10",
        scrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="#features" className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">Features</a>
          <a href="#formats" className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">Formats</a>
          <a href="#how-it-works" className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">How It Works</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hover-lift">Sign In</Button>
          <Button size="sm" className="hover-lift">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
