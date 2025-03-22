
import React, { useState, useEffect } from "react";
import { ArrowDownCircle } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContent = () => {
    const contentElement = document.getElementById("fraud-detection-form");
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/80 dark:from-blue-900/20 dark:to-black/50 z-0" />
      
      <div 
        className={`max-w-4xl mx-auto text-center z-10 transition-all duration-1000 ease-out transform 
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
      >
        <div className="appear-animate space-y-6">
          <div className="inline-block rounded-full bg-blue-100 dark:bg-blue-900/40 px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-200 mb-6">
            Advanced Technology
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="block">Intelligent Fraud Detection</span>
            <span className="block mt-2 text-gradient">Protecting Your Business</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
            Our cutting-edge fraud detection system uses advanced machine learning algorithms to identify and prevent fraudulent activities before they impact your business.
          </p>
          
          <div className="mt-10 flex justify-center">
            <button 
              onClick={scrollToContent}
              className="rounded-md bg-blue-600 px-8 py-3 text-white font-medium shadow-sm hover:bg-blue-500 
                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Try It Now
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={scrollToContent}
          className="text-blue-600 dark:text-blue-400 focus:outline-none"
          aria-label="Scroll down"
        >
          <ArrowDownCircle size={36} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
