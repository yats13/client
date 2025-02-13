'use client';

import { motion } from "framer-motion"

import React from 'react';

interface AnimatedTextProps {
  text: string;
  block?: string;
  className?: string;
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, block = 'span', className = '', delay = 0 }) => {
  const Component = (motion as any)[block];
  return (
    <Component
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      className={className}
    >
      {text}
    </Component>
  );
};

export default AnimatedText; 