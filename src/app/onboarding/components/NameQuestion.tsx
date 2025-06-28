'use client';

import { useState } from 'react';

interface NameQuestionProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

export default function NameQuestion({ value, onChange, onNext }: NameQuestionProps) {
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

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-black">
          What's your name?
        </h1>
        <p className="text-lg text-gray-600">
          Let's make this personal
        </p>
      </div>

      <div className="space-y-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your name"
          className="w-full px-6 py-4 text-xl text-center border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
          autoFocus
        />
        
        <button
          onClick={handleNext}
          disabled={!inputValue.trim()}
          className={`
            w-full sm:w-auto px-8 py-4 font-semibold text-lg rounded-xl transition-all duration-300
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
  );
}
