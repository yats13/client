// components/ContactSection.tsx
import React from 'react';
import EndSectionBlock from '../end-section-block';
import SectionPageTitle from '../../section-page-title';
import SocialMedia from '../../social-media';
const ContactSection: React.FC = () => {
  return (
    <section id="contacts" className="mb-20">
      <div className="flex w-full justify-between items-center">
        <SectionPageTitle text="Контакты" />
        <EndSectionBlock />
      </div>
      <div className="container mx-auto p-20 md:px-40 rounded-full border-b border-gray-300">
        <div className="flex flex-col md:flex-row items-center justify-around space-y-4 md:space-y-0">
            {/* Left Column: Contact Information */}
            <div className="text-gray-700 space-y-2">
              <p className="font-semibold text-purple">Телефон:</p>
              <p>+48 731483844</p>
              <p>+48 536066390</p>
            </div>
            <div className='hidden'>
              <p className="font-semibold text-purple">Адрес:</p>
              <p>Клёвый офис в Варшаве, 1</p>
              <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="text-gray-500 underline">посмотреть на Google Maps</a>
            </div>
          <div className="hidden md:block w-px bg-gray-300 h-24"></div>
          {/* Right Column: Email and Social Links */}
          <div className="text-gray-700 space-y-2">
              <p className="font-semibold text-purple">Email:</p>
              <p className='text-mint'>contact@mirados.co</p>
          </div>
        </div>
        <div className="my-5">
              <SocialMedia horizontal={true} />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
