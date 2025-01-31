// components/ServiceContent.tsx
import React from 'react';
import { sectionsData } from './sections-data';

interface ServiceContentProps {
  activeSection: string;
}

const ServiceContent: React.FC<ServiceContentProps> = ({ activeSection }) => {
  const activeData = sectionsData.find((section) => section.id === activeSection);

  return (
    <div className="relative flex-1 block-left">
      <div className={`transition-all duration-500 ease-out transform ${activeData ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container pr-5 text-wrap">
          <h3 className='text-purple text-2xl font-serif'>{activeData?.title}</h3>
          {activeData?.content}
        </div>
      </div>
    </div>
  );
};

export default ServiceContent;
