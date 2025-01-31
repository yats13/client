// components/ServicesSection.tsx
"use client";

import React, { useState } from 'react';
import SectionPageTitle from '@/app/components/section-page-title';
import EndSectionBlock from '@/app/components/sections/end-section-block';
import ServiceButton from '@/app/components/sections/services/service-button';
import ServiceContent from '@/app/components/sections/services/service-content';
import BackgroundImage from '@/app/components/background-image';
import { sectionsData } from '@/app/components/sections/services/sections-data';
import GroupButtons from '../../group-buttons';

const ServicesSection: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('individualConsultation');

  const toggleSection = (sectionId: string) => {
    if (activeSection !== sectionId) {
      setActiveSection(sectionId);
    }
  };

  return (
    <section id="services" className='relative min-h-screen w-full'>
      <div className="flex w-full justify-between items-center -mt-40">
        <EndSectionBlock />
        <SectionPageTitle text="Услуги" />
      </div>
      <BackgroundImage className="absolute -top-5 overflow-hidden left-0 transform scale-x-[-1]" imageUrl="/images/lavender.jpg" />

      <div className='bg-gray-400 bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-md'>
        <div className="flex container mx-auto pt-40 pb-10 justify-center items-center">
          <ServiceContent activeSection={activeSection} />
          <div className="relative block-right">
            {sectionsData.map((section) => (
              <ServiceButton
                key={section.id}
                section={section}
                isActive={activeSection === section.id}
                toggleSection={toggleSection}
              />
            ))}
          </div>
        </div>
        <div className='pb-40'>
          <GroupButtons />
        </div>
      </div>
      <BackgroundImage className="absolute right-0 bottom-0" imageUrl="/images/mint.jpg" size="w-1/3 h-1/3" />
    </section>
  );
};

export default ServicesSection;
