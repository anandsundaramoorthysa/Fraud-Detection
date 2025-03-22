
import React from "react";
import Hero from "@/components/Hero";
import FraudDetectionForm from "@/components/FraudDetectionForm";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <AnimatedBackground />
      
      <main>
        <Hero />
        <FraudDetectionForm />
      </main>

      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xl font-semibold">Online Fraud Finder</span>
          </div>
          <p className="text-gray-400">
            Advanced fraud detection and prevention for modern businesses.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            © 2025 Online Fraud Finder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
