// components/BackgroundImage.tsx
import React from 'react';

interface BackgroundImageProps {
  imageUrl: string;
  className?: string;
  size?: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ imageUrl, className = '', size = 'w-1/3 h-full' }) => (
  <div className={`${className} ${size} bg-cover opacity-10`} style={{ backgroundImage: `url(${imageUrl})` }}></div>
);

export default BackgroundImage;
