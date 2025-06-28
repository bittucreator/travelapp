'use client';

import { useState } from 'react';

interface StyleQuestionProps {
  selected: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function StyleQuestion({ selected, onChange, onNext, onPrev }: StyleQuestionProps) {
  const [selectedStyle, setSelectedStyle] = useState<string>(selected);

  const travelStyles = [
    { 
      id: 'planner', 
      label: 'I love planning things in advance', 
      icon: '📋', 
      description: 'Detailed itineraries, booked activities, everything organized' 
    },
    { 
      id: 'flow', 
      label: 'I go with the flow', 
      icon: '🌊', 
      description: 'Spontaneous adventures, discover as I go, minimal planning' 
    },
    { 
      id: 'balanced', 
      label: 'Bit of both', 
      icon: '⚖️', 
      description: 'Some structure with room for spontaneity' 
    },
  ];

  const selectStyle = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  const handleNext = () => {
    if (selectedStyle) {
      onChange(selectedStyle);
      onNext(); // This will complete the onboarding
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-black">
          What's your travel style?
        </h1>
        <p className="text-lg text-gray-600">
          How do you prefer to approach travel?
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
          {travelStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => selectStyle(style.id)}
              className={`
                p-8 text-center border-2 rounded-xl transition-all duration-300 hover:scale-105
                ${selectedStyle === style.id
                  ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-lg'
                  : 'border-gray-300 hover:border-blue-300 hover:bg-blue-25'
                }
              `}
            >
              <div className="space-y-4">
                <div className="text-5xl">{style.icon}</div>
                <div className="font-semibold text-xl">{style.label}</div>
                <div className="text-sm text-gray-600 leading-relaxed">{style.description}</div>
              </div>
            </button>
          ))}
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
            disabled={!selectedStyle}
            className={`
              px-8 py-3 font-semibold text-lg rounded-xl transition-all duration-300
              ${selectedStyle 
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}            >
              Continue
            </button>
        </div>
      </div>
    </div>
  );
}
