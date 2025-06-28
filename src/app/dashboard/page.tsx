'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface TravelPreferences {
  username: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelReasons: string[];
  vibes: string[];
  interests: string[];
  travelWith: string;
  travelStyle: string;
  recommendations?: {
    stayTypes: string[];
    dailyItineraries: string[];
    cafesCoworking: string[];
    events: string[];
    foodJoints: string[];
    photoLocations: string[];
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [preferences, setPreferences] = useState<TravelPreferences | null>(null);
  const [tripDuration, setTripDuration] = useState<string>('');
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem('travelPreferences');
    if (savedPreferences) {
      const prefs = JSON.parse(savedPreferences);
      setPreferences(prefs);
      
      // Calculate trip duration
      if (prefs.startDate && prefs.endDate) {
        const start = new Date(prefs.startDate);
        const end = new Date(prefs.endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setTripDuration(diffDays === 1 ? '1 day' : `${diffDays} days`);
      }
    } else {
      // Redirect to onboarding if no preferences found
      router.push('/onboarding');
    }
  }, [router]);

  const restartOnboarding = () => {
    localStorage.removeItem('travelPreferences');
    router.push('/onboarding');
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail) {
      setEmailSubmitted(true);
      setTimeout(() => {
        setShowEmailPopup(false);
        setEmailSubmitted(false);
        setUserEmail('');
        alert('Thanks! You\'ll receive trip updates and exclusive travel tips. 📧✈️');
      }, 2000);
    }
  };

  if (!preferences) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your travel preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Travel Dashboard</h1>
            <button
              onClick={restartOnboarding}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Edit Preferences
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            🎉 Your trip plan is ready, {preferences.username}!
          </h2>
          <p className="text-lg text-gray-600">
            Based on your preferences, here's your personalized travel experience for {preferences.destination}
          </p>
        </div>

        {/* Trip Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="font-semibold text-blue-800 mb-2">Destination</h3>
            <p className="text-2xl font-bold text-blue-900">{preferences.destination}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="font-semibold text-blue-800 mb-2">Duration</h3>
            <p className="text-2xl font-bold text-blue-900">{tripDuration}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="font-semibold text-blue-800 mb-2">Travel Style</h3>
            <p className="text-lg font-medium text-blue-900">
              {preferences.travelStyle === 'planner' && 'Planned Adventure'}
              {preferences.travelStyle === 'flow' && 'Go with the Flow'}
              {preferences.travelStyle === 'balanced' && 'Balanced Approach'}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 mb-8">
          <h3 className="text-xl font-bold mb-4 text-center">⚡ Quick Actions</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => router.push('/trip-plan')}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              <span>📋</span>
              <span>View Full Plan</span>
            </button>
            
            <button
              onClick={() => setShowEmailPopup(true)}
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              <span>📧</span>
              <span>Get Updates</span>
            </button>
            
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `My Trip to ${preferences.destination}`,
                    text: `Check out my personalized trip plan!`,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              <span>🔗</span>
              <span>Share Plan</span>
            </button>
            
            <button
              onClick={() => {
                const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(preferences.destination)}`;
                window.open(mapsUrl, '_blank');
              }}
              className="flex items-center justify-center space-x-2 bg-orange-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors"
            >
              <span>🗺️</span>
              <span>Open Maps</span>
            </button>
          </div>
        </div>

        {/* Preferences Summary */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Travel Reasons */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Why You're Traveling</h3>
            <div className="space-y-2">
              {preferences.travelReasons.map((reason, index) => (
                <span key={index} className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  {reason}
                </span>
              ))}
            </div>
          </div>

          {/* Vibes */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Your Vibe</h3>
            <div className="space-y-2">
              {preferences.vibes.map((vibe, index) => (
                <span key={index} className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  {vibe}
                </span>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Your Interests</h3>
            <div className="space-y-2">
              {preferences.interests.map((interest, index) => (
                <span key={index} className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Travel Company */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Travel Company</h3>
            <p className="text-lg capitalize">{preferences.travelWith.replace('_', ' ')}</p>
          </div>
        </div>

        {/* AI-Generated Recommendations */}
        {preferences.recommendations && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">🤖 AI-Curated Recommendations</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Stay Types */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-3 text-blue-800">🏨 Accommodation</h3>
                <ul className="space-y-2">
                  {preferences.recommendations.stayTypes.map((stay, index) => (
                    <li key={index} className="text-blue-700 text-sm">• {stay}</li>
                  ))}
                </ul>
              </div>

              {/* Daily Itineraries */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-3 text-green-800">📅 Daily Activities</h3>
                <ul className="space-y-2">
                  {preferences.recommendations.dailyItineraries.map((activity, index) => (
                    <li key={index} className="text-green-700 text-sm">• {activity}</li>
                  ))}
                </ul>
              </div>

              {/* Cafés & Coworking */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-3 text-yellow-800">☕ Work & Coffee</h3>
                <ul className="space-y-2">
                  {preferences.recommendations.cafesCoworking.map((cafe, index) => (
                    <li key={index} className="text-yellow-700 text-sm">• {cafe}</li>
                  ))}
                </ul>
              </div>

              {/* Events */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-3 text-purple-800">🎭 Events & Experiences</h3>
                <ul className="space-y-2">
                  {preferences.recommendations.events.map((event, index) => (
                    <li key={index} className="text-purple-700 text-sm">• {event}</li>
                  ))}
                </ul>
              </div>

              {/* Food Joints */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-3 text-red-800">🍜 Food & Dining</h3>
                <ul className="space-y-2">
                  {preferences.recommendations.foodJoints.map((food, index) => (
                    <li key={index} className="text-red-700 text-sm">• {food}</li>
                  ))}
                </ul>
              </div>

              {/* Photo Locations */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-3 text-indigo-800">📸 Photo Spots</h3>
                <ul className="space-y-2">
                  {preferences.recommendations.photoLocations.map((location, index) => (
                    <li key={index} className="text-indigo-700 text-sm">• {location}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200">
            <h3 className="text-2xl font-bold mb-4">🎯 Your Personalized Trip Plan is Ready!</h3>
            <p className="text-gray-600 mb-6">
              Based on your {tripDuration} trip to {preferences.destination}, we've curated the perfect mix of {' '}
              {preferences.vibes.join(', ')} experiences tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
                onClick={() => router.push('/trip-plan')}
              >
                View Detailed Trip Plan
              </button>
              <button 
                className="border border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors"
                onClick={() => alert('Booking integration coming soon! ✈️')}
              >
                Start Booking
              </button>
            </div>
          </div>
        </div>

        {/* Email Popup Modal */}
        {showEmailPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">🎉 Stay in the loop!</h3>
                <p className="text-gray-600">
                  Get exclusive travel tips, deals, and trip updates delivered to your inbox!
                </p>
              </div>
              
              {!emailSubmitted ? (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    ✨ Personalized travel recommendations<br/>
                    💰 Exclusive deals and discounts<br/>
                    📅 Trip countdown reminders
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Yes, Sign Me Up!
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEmailPopup(false)}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Not Now
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-lg font-semibold text-green-600">
                    ✅ Success! You're all set for updates!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
