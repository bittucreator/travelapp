'use client';

import { useState } from 'react';

interface DestinationQuestionProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function DestinationQuestion({ value, onChange, onNext, onPrev }: DestinationQuestionProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleNext = () => {
    if (inputValue.trim()) {
      onChange(inputValue.trim());
      onNext();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  // Popular destinations for quick selection
  const popularDestinations = [
    'Paris, France',
    'Tokyo, Japan',
    'New York, USA',
    'Bali, Indonesia',
    'London, UK',
    'Barcelona, Spain',
    'Dubai, UAE',
    'Thailand',
  ];

  const selectDestination = (destination: string) => {
    setInputValue(destination);
    onChange(destination);
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-black">
          Where are you going?
        </h1>
        <p className="text-lg text-gray-600">
          Tell us your destination
        </p>
      </div>

      <div className="space-y-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city or country"
          className="w-full px-6 py-4 text-xl text-center border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
          autoFocus
        />

        <div className="space-y-4">
          <p className="text-sm text-gray-500">Or choose from popular destinations:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {popularDestinations.map((destination) => (
              <button
                key={destination}
                onClick={() => selectDestination(destination)}
                className="px-4 py-3 text-sm border border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors"
              >
                {destination}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={onPrev}
            className="px-6 py-3 font-semibold text-lg border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!inputValue.trim()}
            className={`
              px-8 py-3 font-semibold text-lg rounded-xl transition-all duration-300
              ${inputValue.trim() 
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
