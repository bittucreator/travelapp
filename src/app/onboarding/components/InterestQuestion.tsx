'use client';

import { useState } from 'react';

interface InterestQuestionProps {
  selected: string[];
  onChange: (value: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function InterestQuestion({ selected, onChange, onNext, onPrev }: InterestQuestionProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(selected);

  const interests = [
    { id: 'cafes', label: 'Cafés & Co-working', icon: '☕' },
    { id: 'cuisine', label: 'Local Cuisine', icon: '🍜' },
    { id: 'nature', label: 'Nature Spots', icon: '🌲' },
    { id: 'startup', label: 'Startup Events', icon: '🚀' },
    { id: 'museums', label: 'Museums & Art', icon: '🏛️' },
    { id: 'photography', label: 'Photography', icon: '📷' },
    { id: 'nightlife', label: 'Nightlife', icon: '🌃' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'wellness', label: 'Fitness / Wellness', icon: '🧘' },
    { id: 'minimal', label: 'Minimal Planning', icon: '🎲', subtitle: '(let the app surprise me)' },
  ];

  const toggleInterest = (interestId: string) => {
    const newSelected = selectedInterests.includes(interestId)
      ? selectedInterests.filter(id => id !== interestId)
      : [...selectedInterests, interestId];
    
    setSelectedInterests(newSelected);
  };

  const handleNext = () => {
    onChange(selectedInterests);
    onNext();
  };

  return (
    <div className="max-w-5xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-black">
          What are you most interested in?
        </h1>
        <p className="text-lg text-gray-600">
          Select all the activities and experiences that excite you
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {interests.map((interest) => (
            <button
              key={interest.id}
              onClick={() => toggleInterest(interest.id)}
              className={`
                p-4 text-center border-2 rounded-xl transition-all duration-300 hover:scale-105
                ${selectedInterests.includes(interest.id)
                  ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-lg'
                  : 'border-gray-300 hover:border-blue-300 hover:bg-blue-25'
                }
              `}
            >
              <div className="space-y-2">
                <div className="text-3xl">{interest.icon}</div>
                <div className="font-medium text-sm">{interest.label}</div>
                {interest.subtitle && (
                  <div className="text-xs text-gray-500">{interest.subtitle}</div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Selected count */}
        {selectedInterests.length > 0 && (
          <p className="text-sm text-blue-600">
            {selectedInterests.length} interest{selectedInterests.length !== 1 ? 's' : ''} selected
          </p>
        )}
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={onPrev}
            className="px-6 py-3 font-semibold text-lg border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={selectedInterests.length === 0}
            className={`
              px-8 py-3 font-semibold text-lg rounded-xl transition-all duration-300
              ${selectedInterests.length > 0 
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
