'use client';

import { useState } from 'react';

interface VibeQuestionProps {
  selected: string[];
  onChange: (value: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function VibeQuestion({ selected, onChange, onNext, onPrev }: VibeQuestionProps) {
  const [selectedVibes, setSelectedVibes] = useState<string[]>(selected);

  const vibes = [
    { id: 'calm', label: 'Calm & peaceful', icon: '🕯️', description: 'Quiet spaces, meditation, rest' },
    { id: 'energetic', label: 'Energetic & social', icon: '🎉', description: 'Meeting people, events, activities' },
    { id: 'luxury', label: 'Luxury & comfort', icon: '✨', description: 'High-end experiences, comfort' },
    { id: 'raw', label: 'Raw & local', icon: '🏞️', description: 'Authentic, off-the-beaten-path' },
    { id: 'creative', label: 'Creative & inspiring', icon: '🎨', description: 'Art, design, inspiration' },
  ];

  const toggleVibe = (vibeId: string) => {
    const newSelected = selectedVibes.includes(vibeId)
      ? selectedVibes.filter(id => id !== vibeId)
      : [...selectedVibes, vibeId];
    
    setSelectedVibes(newSelected);
  };

  const handleNext = () => {
    onChange(selectedVibes);
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-black">
          What kind of vibe are you in?
        </h1>
        <p className="text-lg text-gray-600">
          Select one or multiple vibes that match your mood
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vibes.map((vibe) => (
            <button
              key={vibe.id}
              onClick={() => toggleVibe(vibe.id)}
              className={`
                p-6 text-center border-2 rounded-xl transition-all duration-300 hover:scale-105
                ${selectedVibes.includes(vibe.id)
                  ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-lg'
                  : 'border-gray-300 hover:border-blue-300 hover:bg-blue-25'
                }
              `}
            >
              <div className="space-y-3">
                <div className="text-4xl">{vibe.icon}</div>
                <div className="font-semibold text-lg">{vibe.label}</div>
                <div className="text-sm text-gray-600">{vibe.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected count */}
        {selectedVibes.length > 0 && (
          <p className="text-sm text-blue-600">
            {selectedVibes.length} vibe{selectedVibes.length !== 1 ? 's' : ''} selected
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
            disabled={selectedVibes.length === 0}
            className={`
              px-8 py-3 font-semibold text-lg rounded-xl transition-all duration-300
              ${selectedVibes.length > 0 
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
