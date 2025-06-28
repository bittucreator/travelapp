'use client';

import { useState } from 'react';

interface CompanyQuestionProps {
  selected: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function CompanyQuestion({ selected, onChange, onNext, onPrev }: CompanyQuestionProps) {
  const [selectedCompany, setSelectedCompany] = useState<string>(selected);

  const travelCompanies = [
    { id: 'solo', label: 'Solo', icon: '🧑‍💼', description: 'Just me, exploring at my own pace' },
    { id: 'partner', label: 'Partner', icon: '👫', description: 'With my significant other' },
    { id: 'friends', label: 'Friends', icon: '👥', description: 'With my friend group' },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', description: 'Family vacation or trip' },
    { id: 'business', label: 'Team/Business Group', icon: '💼', description: 'Work colleagues or business travel' },
  ];

  const selectCompany = (companyId: string) => {
    setSelectedCompany(companyId);
  };

  const handleNext = () => {
    if (selectedCompany) {
      onChange(selectedCompany);
      onNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-black">
          Who are you traveling with?
        </h1>
        <p className="text-lg text-gray-600">
          This helps us tailor recommendations for your group
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {travelCompanies.map((company) => (
            <button
              key={company.id}
              onClick={() => selectCompany(company.id)}
              className={`
                p-6 text-center border-2 rounded-xl transition-all duration-300 hover:scale-105
                ${selectedCompany === company.id
                  ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-lg'
                  : 'border-gray-300 hover:border-blue-300 hover:bg-blue-25'
                }
              `}
            >
              <div className="space-y-3">
                <div className="text-4xl">{company.icon}</div>
                <div className="font-semibold text-lg">{company.label}</div>
                <div className="text-sm text-gray-600">{company.description}</div>
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
            disabled={!selectedCompany}
            className={`
              px-8 py-3 font-semibold text-lg rounded-xl transition-all duration-300
              ${selectedCompany 
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
