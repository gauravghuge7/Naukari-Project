import React, { useEffect, useState, Suspense, lazy } from 'react';

// Lazy load components
const LoginCards = lazy(() => import('../LoginCards/LoginCards'));
const PlansFeature = lazy(() => import('./PlansFeature'));
const TestPortalRedirect = lazy(() => import('../TestPortal/TestPortalRedirect'));
const Footer = lazy(() => import('../Footer/Footer'));

const Home: React.FC = () => {
  // State to trigger animations
  const [isVisible, setIsVisible] = useState(false);

  // Animations on load (using slide-in and fade-in effect)
  useEffect(() => {
    setIsVisible(true); // Trigger animation on mount
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <Suspense fallback={<div className="flex justify-center items-center h-32"><span className="text-gray-400">Loading...</span></div>}>
        <div
          className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-12 sm:space-y-16 transition-all duration-1000 ease-in-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <LoginCards />
          <PlansFeature />
          <br />
          <TestPortalRedirect />
          <br />
          <hr className="border-gray-700 w-full" />
          
        </div>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;