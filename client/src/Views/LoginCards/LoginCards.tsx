import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginCards = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      {/* Decorative Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-600 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-16 right-16 w-48 h-48 bg-purple-600 rounded-full opacity-30 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white text-center mb-12 fade-in transition duration-1000">
          Welcome to Your Study Hub
        </h1>

        

        {/* Cards Section with Slide-in Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 fade-in transition duration-1000">
          {/* Card 1 */}
          <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-800 hover:bg-gray-800 hover:border-indigo-500 transform hover:scale-105 transition duration-500 ease-in-out">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Test Bank
            </h3>
            <p className="text-gray-300">
              Explore a vast collection of tests across subjects, tailored for students and educators alike.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-800 hover:bg-gray-800 hover:border-purple-500 transform hover:scale-105 transition duration-500 ease-in-out">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Automatic Grading
            </h3>
            <p className="text-gray-300">
              Save time with smart grading algorithms that deliver fast, accurate results for all tests.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-800 hover:bg-gray-800 hover:border-pink-500 transform hover:scale-105 transition duration-500 ease-in-out">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Detailed Analytics
            </h3>
            <p className="text-gray-300">
              Dive into performance insights and track progress with comprehensive, easy-to-read analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCards;