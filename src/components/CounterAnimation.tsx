
import React, { useState, useEffect, useRef } from 'react';

interface CounterAnimationProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const CounterAnimation = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = ''
}: CounterAnimationProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          animateCounter();
        }
      },
      { threshold: 0.1 }
    );
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end]);
  
  const animateCounter = () => {
    const startTime = Date.now();
    const startValue = 0;
    
    const updateCounter = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      
      if (elapsedTime < duration) {
        const progress = elapsedTime / duration;
        // Use easeOutQuad for smoother animation
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentCount = Math.floor(startValue + easeProgress * (end - startValue));
        setCount(currentCount);
        requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(updateCounter);
  };
  
  return (
    <div ref={counterRef} className={`count-animation ${className}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
};

export default CounterAnimation;
