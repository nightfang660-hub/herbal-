import React from 'react';

export function AuthLeftPanel() {
  return (
    <div className="w-full h-[35vh] lg:h-auto lg:w-[45%] relative bg-[#FAF8F2] overflow-hidden lg:rounded-r-[36px] rounded-b-[36px] lg:rounded-b-none z-0">
      {/* Background Image - Only the image, no overlays */}
      <img 
        src="/assets/logo-sing.png" 
        alt="Herbal Tea Lifestyle" 
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
}
