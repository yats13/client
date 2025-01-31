import { useState } from 'react';

const LanguageSwitcher: React.FC = () => {
  const [langOpen, setLangOpen] = useState<boolean>(false);

  const toggleLang = () => {
    setLangOpen(!langOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleLang} className="md:flex items-center px-3 py-2 hover:text-gray-300 focus:outline-none">
        Language
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <ul className={`absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg ${langOpen ? '' : 'hidden'}`}>
        <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">English</a></li>
        <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Spanish</a></li>
        <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">French</a></li>
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
