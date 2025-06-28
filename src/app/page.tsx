'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const startPlanning = () => {
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-8 lg:px-12">
        {/* Main Content Container */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
            Plan your trip the way you{' '}
            <span className="text-blue-600">actually want</span>{' '}
            to travel.
          </h1>
          
          {/* Subtext */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            We don't just ask where you're going — we ask{' '}
            <span className="font-semibold text-black">why</span> you're going.
          </p>
          
          {/* CTA Button */}
          <div className="pt-8">
            <button
              onClick={startPlanning}
              className={`
                relative px-8 sm:px-12 py-4 sm:py-5 
                bg-blue-600 text-white font-semibold text-lg sm:text-xl
                rounded-full transition-all duration-300 ease-in-out
                transform hover:scale-105 hover:bg-blue-700
                shadow-lg hover:shadow-xl
                ${isHovered ? 'shadow-blue-500/25' : ''}
              `}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Start Planning
              <div className={`
                absolute inset-0 rounded-full bg-blue-500 opacity-0 
                transition-opacity duration-300
                ${isHovered ? 'opacity-20' : ''}
              `} />
            </button>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-600 rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400 rounded-full opacity-30 animate-pulse delay-1000" />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-800 rounded-full opacity-40 animate-pulse delay-2000" />
      </main>
    </div>
  );
}
