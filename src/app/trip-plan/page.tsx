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

export default function TripPlanPage() {
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

  if (!preferences) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your personalized trip plan...</p>
        </div>
      </div>
    );
  }

  const generateDailyPlan = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const morningActivities = ['Sunrise hike', 'Local market visit', 'Museum tour', 'Coffee crawl', 'Beach walk'];
    const afternoonActivities = ['Coworking session', 'Art gallery visit', 'Local neighborhood exploration', 'Wellness activity', 'Food tour'];
    const eveningActivities = ['Rooftop dinner', 'Live music venue', 'Local meetup', 'Sunset photography', 'Night market'];
    
    return days.slice(0, Math.min(parseInt(tripDuration), 7)).map((day, index) => ({
      day,
      morning: morningActivities[index % morningActivities.length],
      afternoon: afternoonActivities[index % afternoonActivities.length],
      evening: eveningActivities[index % eveningActivities.length],
      tip: `Pro tip: Best time to visit local spots is around ${8 + index}AM when crowds are lighter.`
    }));
  };

  const handleDownloadPDF = () => {
    // Trigger browser print dialog which can save as PDF
    window.print();
  };

  const handleEmailPlan = () => {
    const subject = encodeURIComponent(`Your Trip Plan for ${preferences?.destination}`);
    const body = encodeURIComponent(`Here's your personalized trip plan for ${preferences?.destination}!\n\nView it here: ${window.location.href}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleSharePlan = () => {
    if (navigator.share) {
      navigator.share({
        title: `Trip Plan for ${preferences?.destination}`,
        text: `Check out my personalized trip plan for ${preferences?.destination}!`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard! Share it with your friends.');
      });
    }
  };

  const handleOpenInMaps = () => {
    if (preferences?.destination) {
      const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(preferences.destination)}`;
      window.open(mapsUrl, '_blank');
    }
  };

  const handleBookStay = () => {
    setShowEmailPopup(true);
  };

  const handleSaveToCalendar = () => {
    if (preferences?.startDate && preferences?.endDate) {
      const startDate = new Date(preferences.startDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const endDate = new Date(preferences.endDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const title = encodeURIComponent(`Trip to ${preferences.destination}`);
      const details = encodeURIComponent(`Your personalized trip to ${preferences.destination}`);
      
      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}`;
      window.open(calendarUrl, '_blank');
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail) {
      // Simulate email signup
      setEmailSubmitted(true);
      setTimeout(() => {
        setShowEmailPopup(false);
        setEmailSubmitted(false);
        setUserEmail('');
        alert('Thanks! You\'ll receive trip updates and exclusive travel tips. 📧✈️');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-gray-600 hover:text-black transition-colors"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-xl font-semibold">Your Trip Plan</h1>
            <button
              onClick={() => window.print()}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Print Plan
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-12">
        {/* Section 1: Welcome */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Hey {preferences.username}, here's a personalized experience for your trip to {preferences.destination}! 🎉
          </h1>
          <p className="text-xl opacity-90">
            Your {tripDuration} adventure awaits • Crafted just for you
          </p>
        </section>

        {/* Section 2: Stay Recommendations */}
        <section className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            🏨 Stay Recommendations
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {preferences.recommendations?.stayTypes.map((stay, index) => (
              <div key={index} className="border border-gray-200 p-6 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">{stay}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Perfect for {preferences.vibes[0]} vibes and {preferences.travelWith} travel
                </p>
                <div className="text-blue-600 font-medium">From $89/night</div>
              </div>
            )) || (
              <div className="col-span-3 text-center text-gray-500">
                Generating stay recommendations based on your preferences...
              </div>
            )}
          </div>
        </section>

        {/* Section 3: Work & Chill Spots */}
        <section className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            ☕ Work & Chill Spots
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-yellow-600">Morning Coffee (8AM-11AM)</h3>
              <ul className="space-y-3">
                {preferences.recommendations?.cafesCoworking.slice(0, 2).map((cafe, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-yellow-500">☕</span>
                    <div>
                      <div className="font-medium">{cafe}</div>
                      <div className="text-sm text-gray-600">Perfect for {preferences.travelStyle === 'planner' ? 'structured work' : 'casual browsing'}</div>
                    </div>
                  </li>
                )) || []}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-blue-600">Afternoon Work (1PM-5PM)</h3>
              <ul className="space-y-3">
                {preferences.recommendations?.cafesCoworking.slice(2, 4).map((cafe, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-blue-500">💻</span>
                    <div>
                      <div className="font-medium">{cafe}</div>
                      <div className="text-sm text-gray-600">Great WiFi & {preferences.vibes.includes('calm') ? 'quiet atmosphere' : 'energetic vibe'}</div>
                    </div>
                  </li>
                )) || []}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Daily Flow */}
        <section className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            📅 Suggested Daily Flow
          </h2>
          <div className="space-y-6">
            {generateDailyPlan().map((day, index) => (
              <div key={index} className="border border-gray-200 p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-4 text-blue-600">Day {index + 1} - {day.day}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-orange-600 mb-2">🌅 Morning</h4>
                    <p className="text-gray-700">{day.morning}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-600 mb-2">☀️ Afternoon</h4>
                    <p className="text-gray-700">{day.afternoon}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-600 mb-2">🌆 Evening</h4>
                    <p className="text-gray-700">{day.evening}</p>
                  </div>
                </div>
                <div className="mt-4 bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-yellow-800">💡 {day.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Food Spots */}
        <section className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            🍜 Food Spots
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {preferences.recommendations?.foodJoints.map((food, index) => (
              <div key={index} className="border border-gray-200 p-6 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">{food}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {preferences.vibes.slice(0, 2).map((vibe, vIndex) => (
                    <span key={vIndex} className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                      {vibe}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">
                  {preferences.travelWith === 'solo' ? 'Solo-friendly' : 'Group-friendly'} • 
                  {preferences.vibes.includes('luxury') ? ' Upscale' : ' Casual'} dining
                </p>
              </div>
            )) || (
              <div className="col-span-3 text-center text-gray-500">
                Curating food recommendations based on your taste...
              </div>
            )}
          </div>
        </section>

        {/* Section 6: Events/Meetups */}
        <section className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            🎟️ Events & Meetups
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {preferences.recommendations?.events.map((event, index) => (
              <div key={index} className="border border-gray-200 p-6 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">{event}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <span>📅 During your stay</span>
                  <span>🎯 {preferences.interests[0] || 'General'}</span>
                </div>
                <p className="text-gray-700 text-sm">
                  Perfect for {preferences.vibes.join(' & ')} vibes
                </p>
              </div>
            )) || (
              <div className="col-span-2 text-center text-gray-500">
                Searching for events during your travel dates...
              </div>
            )}
          </div>
        </section>

        {/* Section 7: Hidden Gems */}
        <section className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            🔍 Hidden Gems & Local Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-green-600">📸 Photo-Worthy Spots</h3>
              <ul className="space-y-3">
                {preferences.recommendations?.photoLocations.map((location, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-green-500">📍</span>
                    <div>
                      <div className="font-medium">{location}</div>
                      <div className="text-sm text-gray-600">Best time: Golden hour</div>
                    </div>
                  </li>
                )) || []}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-purple-600">💎 Local Secrets</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-purple-500">🗝️</span>
                  <div>
                    <div className="font-medium">Local's favorite brunch spot</div>
                    <div className="text-sm text-gray-600">Ask for the "off-menu" special</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-purple-500">🌙</span>
                  <div>
                    <div className="font-medium">Night market insider tip</div>
                    <div className="text-sm text-gray-600">Visit after 9PM for best local vibes</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-purple-500">🎨</span>
                  <div>
                    <div className="font-medium">Underground art scene</div>
                    <div className="text-sm text-gray-600">Follow @local_art_scene for events</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 8: Pre-Travel Checklist */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            🎒 Pre-Travel Checklist
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-blue-300">Essential Items</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span>Power bank & charging cables</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span>{preferences.vibes.includes('creative') ? 'Notebook & sketching supplies' : 'Travel journal'}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span>Comfortable walking shoes</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span>{preferences.interests.includes('photography') ? 'Camera gear & extra storage' : 'Phone camera accessories'}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-yellow-300">Local Tips for {preferences.destination}</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-3">
                  <span className="text-yellow-400">💳</span>
                  <span>Download local payment apps</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-yellow-400">🚗</span>
                  <span>Get ride-sharing apps for the area</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-yellow-400">☁️</span>
                  <span>Check weather & pack accordingly</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-yellow-400">📱</span>
                  <span>Save offline maps & key addresses</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">📱 Take Action on Your Plan</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-red-700 transition-colors"
            >
              <span>📄</span>
              <span>Download as PDF</span>
            </button>
            
            <button
              onClick={handleEmailPlan}
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              <span>📧</span>
              <span>Email Me This Plan</span>
            </button>
            
            <button
              onClick={handleSharePlan}
              className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              <span>🔗</span>
              <span>Share with Friend</span>
            </button>
            
            <button
              onClick={handleOpenInMaps}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              <span>🗺️</span>
              <span>Open in Google Maps</span>
            </button>
            
            <button
              onClick={handleBookStay}
              className="flex items-center justify-center space-x-2 bg-orange-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-orange-700 transition-colors"
            >
              <span>🏨</span>
              <span>Book Stay</span>
            </button>
            
            <button
              onClick={handleSaveToCalendar}
              className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              <span>📅</span>
              <span>Save to Calendar</span>
            </button>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-600 text-white p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Ready for your adventure? 🚀</h2>
          <p className="text-xl opacity-90 mb-6">
            Your personalized {tripDuration} trip to {preferences.destination} is all planned out!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
              onClick={() => setShowEmailPopup(true)}
            >
              Get Trip Updates 📧
            </button>
            <button 
              className="border border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              onClick={() => router.push('/dashboard')}
            >
              Back to Dashboard
            </button>
          </div>
        </section>
      </main>

      {/* Email Popup Modal */}
      {showEmailPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">🎉 Want trip updates?</h3>
              <p className="text-gray-600">
                Get exclusive travel tips, last-minute deals, and daily notifications during your trip!
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
                  ✨ Get daily trip reminders<br/>
                  🏨 Exclusive booking deals<br/>
                  📍 Local insider tips
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Yes, Keep Me Updated!
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmailPopup(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-lg font-semibold text-green-600">
                  ✅ Success! Setting up your trip updates...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
