// components/ServiceButton.tsx
import React from 'react';
import Status from '@/app/components/status';
import { Color } from '@/app/types/enums/Color';

interface ServiceButtonProps {
  section: { id: string; title: string };
  isActive: boolean;
  toggleSection: (sectionId: string) => void;
}

const ServiceButton: React.FC<ServiceButtonProps> = ({ section, isActive, toggleSection }) => (
  <div className='flex items-center py-3'>
    <Status color={isActive ? Color.Mint : Color.LightGrey} />
    <button
      onClick={() => toggleSection(section.id)}
      className={`block cursor-pointer hover:text-purple ${isActive ? 'text-purple' : 'text-lightPurple'} font-serif text-xl font-thin`}
    >
      {section.title}
    </button>
  </div>
);

export default ServiceButton;
