'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NameQuestion from './components/NameQuestion';
import DestinationQuestion from './components/DestinationQuestion';
import DateQuestion from './components/DateQuestion';
import ReasonQuestion from './components/ReasonQuestion';
import VibeQuestion from './components/VibeQuestion';
import InterestQuestion from './components/InterestQuestion';
import CompanyQuestion from './components/CompanyQuestion';
import StyleQuestion from './components/StyleQuestion';
import SummaryScreen from './components/SummaryScreen';
import ProcessingStage from './components/ProcessingStage';

// Define types for form data
interface FormData {
  username: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelReasons: string[];
  vibes: string[];
  interests: string[];
  travelWith: string;
  travelStyle: string;
  recommendations?: any;
}

const TOTAL_STEPS = 10;

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    destination: '',
    startDate: '',
    endDate: '',
    travelReasons: [],
    vibes: [],
    interests: [],
    travelWith: '',
    travelStyle: '',
  });

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      // Onboarding complete - save data and redirect
      localStorage.setItem('travelPreferences', JSON.stringify(formData));
      router.push('/dashboard');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = (processedData: any) => {
    // Save processed data and redirect
    localStorage.setItem('travelPreferences', JSON.stringify(processedData));
    router.push('/dashboard');
  };

  const goToHome = () => {
    router.push('/');
  };

  const renderCurrentQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <NameQuestion
            value={formData.username}
            onChange={(value: string) => updateFormData('username', value)}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <DestinationQuestion
            value={formData.destination}
            onChange={(value: string) => updateFormData('destination', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <DateQuestion
            startDate={formData.startDate}
            endDate={formData.endDate}
            onStartDateChange={(value: string) => updateFormData('startDate', value)}
            onEndDateChange={(value: string) => updateFormData('endDate', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <ReasonQuestion
            selected={formData.travelReasons}
            onChange={(value: string[]) => updateFormData('travelReasons', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <VibeQuestion
            selected={formData.vibes}
            onChange={(value: string[]) => updateFormData('vibes', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 6:
        return (
          <InterestQuestion
            selected={formData.interests}
            onChange={(value: string[]) => updateFormData('interests', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 7:
        return (
          <CompanyQuestion
            selected={formData.travelWith}
            onChange={(value: string) => updateFormData('travelWith', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 8:
        return (
          <StyleQuestion
            selected={formData.travelStyle}
            onChange={(value: string) => updateFormData('travelStyle', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 9:
        return (
          <SummaryScreen
            formData={formData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 10:
        return (
          <ProcessingStage
            formData={formData}
            onComplete={completeOnboarding}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header with progress */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={goToHome}
              className="text-gray-600 hover:text-black transition-colors"
            >
              ← Back to Home
            </button>
            <div className="text-sm text-gray-600">
              {currentStep} of {TOTAL_STEPS}
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          {renderCurrentQuestion()}
        </div>
      </div>
    </div>
  );
}
