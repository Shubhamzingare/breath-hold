import React from 'react';
// import logoImage from '../../assests/habuild_log_white.png';
// import logoImage2 from '../../assests/habuild-logo.jpeg';
import logoImage3 from '../../assests/habuildLogoLight.png';

export const HabuildLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-32 group">
        <div className="relative w-full h-1/2 rounded-full overflow-hidden transform group-hover:scale-105">
          <img 
            src={logoImage3} 
            alt="Habuild Logo" 
            className="w-full h-full object-contain" 
            sizes='24px'
          />
        </div>
      </div>

      <div className="text-base text-gray-500 flex flex-col gap-2 items-center">
        <div className="flex items-center gap-2 hover:text-gray-700 transition-colors duration-200">
          <span className="font-medium">1. Take a deep breath in & breathe out</span>
        </div>
        <div className="flex items-center gap-2 hover:text-gray-700 transition-colors duration-200">
          <span className="font-medium">2. Hold your breath & click start</span>
        </div>
        <div className="flex items-center gap-2 hover:text-gray-700 transition-colors duration-200">
          <span className="font-medium">3. Click stop when you lose breath</span>
          </div>
      </div>
    </div>
  );
};