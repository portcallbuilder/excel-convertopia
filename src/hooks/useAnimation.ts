
import { useState, useEffect } from 'react';

interface AnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
  onComplete?: () => void;
}

export const useAnimation = (
  initialState: boolean = false,
  options: AnimationOptions = {}
) => {
  const [isActive, setIsActive] = useState(initialState);
  const [isVisible, setIsVisible] = useState(initialState);
  
  const { 
    duration = 300, 
    delay = 0, 
    easing = 'ease-out',
    onComplete 
  } = options;
  
  // For CSS transitions
  const transition = `${duration}ms ${delay}ms ${easing}`;
  
  useEffect(() => {
    let entryTimer: number;
    let exitTimer: number;
    
    if (isActive) {
      setIsVisible(true);
    } else {
      exitTimer = window.setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, duration + delay);
    }
    
    return () => {
      clearTimeout(entryTimer);
      clearTimeout(exitTimer);
    };
  }, [isActive, duration, delay, onComplete]);
  
  return {
    isActive,
    isVisible,
    setActive: setIsActive,
    transition,
    style: {
      transition,
      opacity: isActive ? 1 : 0,
    },
  };
};

export default useAnimation;
