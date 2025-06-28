'use client';

import { useState, useEffect } from 'react';

interface SummaryScreenProps {
  formData: {
    username: string;
    destination: string;
    startDate: string;
    endDate: string;
    travelReasons: string[];
    vibes: string[];
    interests: string[];
    travelWith: string;
    travelStyle: string;
  };
  onNext: () => void;
  onPrev: () => void;
}

export default function SummaryScreen({ formData, onNext, onPrev }: SummaryScreenProps) {
  const [tripDuration, setTripDuration] = useState<string>('');
  const [primaryVibe, setPrimaryVibe] = useState<string>('');
  const [travelCompany, setTravelCompany] = useState<string>('');

  useEffect(() => {
    // Calculate trip duration
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTripDuration(diffDays === 1 ? '1 day' : `${diffDays} days`);
    }

    // Get primary vibe (first selected)
    if (formData.vibes.length > 0) {
      setPrimaryVibe(formData.vibes[0]);
    }

    // Format travel company
    const companyMap: { [key: string]: string } = {
      'solo': 'solo',
      'partner': 'with your partner',
      'friends': 'with friends',
      'family': 'with family',
      'business': 'with colleagues'
    };
    setTravelCompany(companyMap[formData.travelWith] || 'with companions');
  }, [formData]);

  const getVibeDisplayName = (vibe: string) => {
    const vibeMap: { [key: string]: string } = {
      'calm': 'calm & peaceful',
      'energetic': 'energetic & social',
      'luxury': 'luxury & comfort',
      'raw': 'raw & local',
      'creative': 'creative & inspiring'
    };
    return vibeMap[vibe] || vibe;
  };

  return (
    <div className="max-w-3xl mx-auto text-center space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-black">
          Almost there, {formData.username}! 🎉
        </h1>
        <p className="text-lg text-gray-600">
          Let's review your perfect trip before we create your plan
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl text-left space-y-6">
        {/* Main Summary */}
        <div className="text-center">
          <p className="text-xl sm:text-2xl text-gray-800 leading-relaxed">
            You're heading to{' '}
            <span className="font-bold text-blue-600">{formData.destination}</span>{' '}
            for{' '}
            <span className="font-bold text-blue-600">{tripDuration}</span>, 
            looking to explore{' '}
            <span className="font-bold text-blue-600">{getVibeDisplayName(primaryVibe)}</span>{' '}
            vibes while traveling{' '}
            <span className="font-bold text-blue-600">{travelCompany}</span>.
          </p>
          <p className="text-xl sm:text-2xl text-gray-800 mt-4 font-semibold">
            Let's build your trip! ✈️
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          {/* Travel Reasons */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Why you're going</h3>
            <div className="flex flex-wrap gap-2">
              {formData.travelReasons.slice(0, 3).map((reason, index) => (
                <span key={index} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {reason}
                </span>
              ))}
              {formData.travelReasons.length > 3 && (
                <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">
                  +{formData.travelReasons.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Your interests</h3>
            <div className="flex flex-wrap gap-2">
              {formData.interests.slice(0, 4).map((interest, index) => (
                <span key={index} className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                  {interest}
                </span>
              ))}
              {formData.interests.length > 4 && (
                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                  +{formData.interests.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* All Vibes */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Your vibes</h3>
            <div className="flex flex-wrap gap-2">
              {formData.vibes.map((vibe, index) => (
                <span key={index} className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {getVibeDisplayName(vibe)}
                </span>
              ))}
            </div>
          </div>

          {/* Travel Style */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Travel style</h3>
            <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm">
              {formData.travelStyle === 'planner' && 'Detailed Planning'}
              {formData.travelStyle === 'flow' && 'Go with the Flow'}
              {formData.travelStyle === 'balanced' && 'Balanced Approach'}
            </span>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="space-y-4">
        <p className="text-gray-600">
          Ready to create your personalized travel experience?
        </p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={onPrev}
            className="px-6 py-3 font-semibold text-lg border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Make Changes
          </button>
          <button
            onClick={onNext}
            className="px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-xl hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Generate My Trip Plan 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
