'use client';

import { useState, useEffect } from 'react';

interface DateQuestionProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function DateQuestion({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange, 
  onNext, 
  onPrev 
}: DateQuestionProps) {
  const [startDateValue, setStartDateValue] = useState(startDate);
  const [endDateValue, setEndDateValue] = useState(endDate);
  const [tripDuration, setTripDuration] = useState<string>('');

  // Calculate trip duration
  useEffect(() => {
    if (startDateValue && endDateValue) {
      const start = new Date(startDateValue);
      const end = new Date(endDateValue);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        setTripDuration('1 day');
      } else if (diffDays > 1) {
        setTripDuration(`${diffDays} days`);
      } else {
        setTripDuration('');
      }
    } else {
      setTripDuration('');
    }
  }, [startDateValue, endDateValue]);

  const handleNext = () => {
    if (startDateValue && endDateValue && new Date(endDateValue) >= new Date(startDateValue)) {
      onStartDateChange(startDateValue);
      onEndDateChange(endDateValue);
      onNext();
    }
  };

  const isValidDates = startDateValue && endDateValue && new Date(endDateValue) >= new Date(startDateValue);

  // Get today's date for minimum date validation
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-black">
          When are you traveling?
        </h1>
        <p className="text-lg text-gray-600">
          Select your travel dates
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">From</label>
            <input
              type="date"
              value={startDateValue}
              onChange={(e) => setStartDateValue(e.target.value)}
              min={today}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">To</label>
            <input
              type="date"
              value={endDateValue}
              onChange={(e) => setEndDateValue(e.target.value)}
              min={startDateValue || today}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {tripDuration && (
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-blue-800 font-medium">
              You're going for {tripDuration}
            </p>
          </div>
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
            disabled={!isValidDates}
            className={`
              px-8 py-3 font-semibold text-lg rounded-xl transition-all duration-300
              ${isValidDates 
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
