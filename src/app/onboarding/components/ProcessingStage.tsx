'use client';

import { useState, useEffect } from 'react';

interface ProcessingStageProps {
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
  onComplete: (processedData: any) => void;
}

interface ProcessedRecommendations {
  stayTypes: string[];
  dailyItineraries: string[];
  cafesCoworking: string[];
  events: string[];
  foodJoints: string[];
  photoLocations: string[];
}

export default function ProcessingStage({ formData, onComplete }: ProcessingStageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [processedData, setProcessedData] = useState<ProcessedRecommendations | null>(null);

  const processingSteps = [
    'Analyzing your travel preferences...',
    'Matching destination with your vibes...',
    'Finding perfect accommodations...',
    'Curating daily experiences...',
    'Discovering local cafés & coworking spaces...',
    'Checking events during your visit...',
    'Selecting amazing food spots...',
    'Identifying photo-worthy locations...',
    'Finalizing your personalized trip plan...'
  ];

  useEffect(() => {
    const processUserInputs = () => {
      // Dynamic ruleset processing
      const recommendations: ProcessedRecommendations = {
        stayTypes: [],
        dailyItineraries: [],
        cafesCoworking: [],
        events: [],
        foodJoints: [],
        photoLocations: []
      };

      // Process stay types based on vibes, travel company, and interests
      if (formData.vibes.includes('luxury')) {
        recommendations.stayTypes.push('Luxury Hotels', 'High-end Resorts');
      }
      if (formData.vibes.includes('raw') || formData.vibes.includes('creative')) {
        recommendations.stayTypes.push('Boutique Airbnb', 'Local Guesthouses');
      }
      if (formData.travelWith === 'friends' || formData.vibes.includes('energetic')) {
        recommendations.stayTypes.push('Social Hostels', 'Party Hotels');
      }
      if (formData.interests.includes('wellness') || formData.vibes.includes('calm')) {
        recommendations.stayTypes.push('Wellness Retreats', 'Spa Hotels');
      }

      // Process daily itineraries based on interests and travel style
      if (formData.interests.includes('nature')) {
        recommendations.dailyItineraries.push('Morning hikes & nature walks', 'Sunset viewpoint visits');
      }
      if (formData.interests.includes('museums')) {
        recommendations.dailyItineraries.push('Cultural museum tours', 'Art gallery explorations');
      }
      if (formData.interests.includes('cuisine')) {
        recommendations.dailyItineraries.push('Food market tours', 'Cooking class experiences');
      }
      if (formData.travelStyle === 'planner') {
        recommendations.dailyItineraries.push('Structured city tours', 'Pre-booked activities');
      } else if (formData.travelStyle === 'flow') {
        recommendations.dailyItineraries.push('Spontaneous neighborhood walks', 'Local discovery time');
      }

      // Process cafés & coworking based on interests
      if (formData.interests.includes('cafes')) {
        recommendations.cafesCoworking.push('Specialty coffee shops', 'Local roasteries', 'Digital nomad cafés');
      }
      if (formData.travelReasons.includes('remote')) {
        recommendations.cafesCoworking.push('Coworking spaces', 'WiFi-friendly cafés', 'Business centers');
      }
      if (formData.vibes.includes('creative')) {
        recommendations.cafesCoworking.push('Artist cafés', 'Creative coworking hubs');
      }

      // Process events based on vibes and travel dates
      if (formData.vibes.includes('energetic')) {
        recommendations.events.push('Live music venues', 'Festival events', 'Nightlife hotspots');
      }
      if (formData.interests.includes('startup')) {
        recommendations.events.push('Startup meetups', 'Tech conferences', 'Networking events');
      }
      if (formData.vibes.includes('creative')) {
        recommendations.events.push('Art exhibitions', 'Creative workshops', 'Design talks');
      }

      // Process food joints based on vibes and interests
      if (formData.interests.includes('cuisine')) {
        recommendations.foodJoints.push('Local street food', 'Traditional restaurants', 'Food markets');
      }
      if (formData.vibes.includes('luxury')) {
        recommendations.foodJoints.push('Fine dining restaurants', 'Michelin-starred venues');
      }
      if (formData.vibes.includes('raw')) {
        recommendations.foodJoints.push('Hidden local gems', 'Family-run eateries', 'Authentic hole-in-the-wall spots');
      }

      // Process photo locations based on interests and vibes
      if (formData.interests.includes('photography')) {
        recommendations.photoLocations.push('Scenic viewpoints', 'Architectural landmarks', 'Golden hour spots');
      }
      if (formData.vibes.includes('creative')) {
        recommendations.photoLocations.push('Street art walls', 'Creative districts', 'Design landmarks');
      }
      if (formData.interests.includes('nature')) {
        recommendations.photoLocations.push('Natural landscapes', 'Botanical gardens', 'Waterfront areas');
      }

      return recommendations;
    };

    const totalSteps = processingSteps.length;
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < totalSteps - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          const processed = processUserInputs();
          setProcessedData(processed);
          setTimeout(() => {
            onComplete({
              ...formData,
              recommendations: processed
            });
          }, 1500);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(timer);
  }, [formData, onComplete, processingSteps.length]);

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center space-y-8 px-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-black">
            Creating your perfect trip ✨
          </h1>
          <p className="text-lg text-gray-600">
            We're analyzing your preferences and matching them with the best {formData.destination} has to offer
          </p>
        </div>

        {/* Processing Animation */}
        <div className="space-y-6">
          {/* Progress Circle */}
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div 
              className="absolute inset-0 rounded-full border-4 border-blue-600 transition-all duration-800"
              style={{
                borderRightColor: 'transparent',
                borderTopColor: 'transparent',
                transform: `rotate(${(currentStep / processingSteps.length) * 360}deg)`
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">
                {Math.round((currentStep / processingSteps.length) * 100)}%
              </span>
            </div>
          </div>

          {/* Current Step */}
          <div className="space-y-4">
            <p className="text-xl font-medium text-gray-800">
              {processingSteps[currentStep]}
            </p>
            
            {/* Processing Details */}
            <div className="bg-blue-50 p-6 rounded-xl text-left space-y-3">
              <h3 className="font-semibold text-blue-800">What we're doing:</h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-blue-700">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                  <span>Stay recommendations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                  <span>Daily itineraries</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${currentStep >= 4 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                  <span>Cafés & coworking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${currentStep >= 5 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                  <span>Local events</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${currentStep >= 6 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                  <span>Food recommendations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${currentStep >= 7 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                  <span>Photo spots</span>
                </div>
              </div>
            </div>
          </div>

          {/* Final Message */}
          {processedData && (
            <div className="animate-fade-in">
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-center justify-center space-x-2 text-green-800">
                  <span className="text-2xl">🎉</span>
                  <span className="font-semibold text-lg">Your personalized trip plan is ready!</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-600 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-blue-800 rounded-full opacity-40 animate-pulse delay-2000"></div>
      </div>
    </div>
  );
}
