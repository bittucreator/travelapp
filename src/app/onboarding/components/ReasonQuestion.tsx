'use client';

import { useState } from 'react';

interface ReasonQuestionProps {
  selected: string[];
  onChange: (value: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ReasonQuestion({ selected, onChange, onNext, onPrev }: ReasonQuestionProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>(selected);
  const [customReason, setCustomReason] = useState('');

  const reasons = [
    { id: 'relax', label: 'To relax and escape', icon: '🧘‍♀️' },
    { id: 'culture', label: 'To explore new cultures', icon: '🌍' },
    { id: 'network', label: 'To build connections / network', icon: '🤝' },
    { id: 'content', label: 'To create content', icon: '📸' },
    { id: 'remote', label: 'To work remotely', icon: '💻' },
    { id: 'rediscover', label: 'To rediscover myself', icon: '✨' },
  ];

  const toggleReason = (reasonId: string) => {
    const newSelected = selectedReasons.includes(reasonId)
      ? selectedReasons.filter(id => id !== reasonId)
      : [...selectedReasons, reasonId];
    
    setSelectedReasons(newSelected);
  };

  const addCustomReason = () => {
    if (customReason.trim() && !selectedReasons.includes(customReason.trim())) {
      const newSelected = [...selectedReasons, customReason.trim()];
      setSelectedReasons(newSelected);
      setCustomReason('');
    }
  };

  const handleNext = () => {
    onChange(selectedReasons);
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-black">
          Why are you traveling?
        </h1>
        <p className="text-lg text-gray-600">
          Select all that apply
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {reasons.map((reason) => (
            <button
              key={reason.id}
              onClick={() => toggleReason(reason.id)}
              className={`
                p-4 text-left border-2 rounded-xl transition-all duration-300
                ${selectedReasons.includes(reason.id)
                  ? 'border-blue-600 bg-blue-50 text-blue-800'
                  : 'border-gray-300 hover:border-blue-300 hover:bg-blue-25'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{reason.icon}</span>
                <span className="font-medium">{reason.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Custom reason input */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Or add your own reason:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Enter your reason"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
              onKeyPress={(e) => e.key === 'Enter' && addCustomReason()}
            />
            <button
              onClick={addCustomReason}
              disabled={!customReason.trim()}
              className={`
                px-6 py-3 font-medium rounded-xl transition-colors
                ${customReason.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Add
            </button>
          </div>
        </div>

        {/* Selected count */}
        {selectedReasons.length > 0 && (
          <p className="text-sm text-blue-600">
            {selectedReasons.length} reason{selectedReasons.length !== 1 ? 's' : ''} selected
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
            disabled={selectedReasons.length === 0}
            className={`
              px-8 py-3 font-semibold text-lg rounded-xl transition-all duration-300
              ${selectedReasons.length > 0 
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
