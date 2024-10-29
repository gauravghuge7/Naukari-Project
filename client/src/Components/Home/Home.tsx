import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  // Animations on load (using slide-in and fade-in effect)
  useEffect(() => {
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach((el: any, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        el.style.transition = `all 0.8s ease ${(index + 1) * 0.2}s`; // Delay each card animation slightly
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100);
    });
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">

      {/* Background Image */}
      <div 
        className="flex justify-center items-center" 
        style={{ backgroundImage: 'url("/images/background.jpg")' }}
      >
        <button></button>
      
        {/** View Project as Admin guest */}
        <Link
          to="/admin/dashboard"
          className="shadow-lg rounded-xl px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-xl hover:from-indigo-600 hover:to-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          View Project as Admin Guest
        </Link>

        <Link
          to="/user/dashboard"
          className="shadow-lg rounded-xl px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-xl hover:from-purple-600 hover:to-pink-600 mt-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          View Project as User Guest
        </Link>



      </div>


      {/* Hero Section */}
      <header className="text-center mb-12 fade-in transition duration-1000">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Welcome to Student Test Solver
        </h1>
        <p className="text-lg sm:text-xl font-light max-w-2xl mx-auto px-4 sm:px-0">
          A platform to solve tests efficiently, designed for both students and administrators.
        </p>
      </header>

      {/* Login Buttons Section */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8 fade-in transition duration-1000">
        <button
          className="w-64 py-3 px-6 bg-yellow-400 text-gray-900 font-semibold rounded-xl shadow-lg hover:bg-yellow-500 transform hover:scale-105 transition duration-300 ease-in-out"
          onClick={() => window.location.href = '/admin-login'}
        >
          Admin Login
        </button>
        <button
          className="w-64 py-3 px-6 bg-green-400 text-gray-900 font-semibold rounded-xl shadow-lg hover:bg-green-500 transform hover:scale-105 transition duration-300 ease-in-out"
          onClick={() => window.location.href = '/student-login'}
        >
          Student Login
        </button>
      </div>

      {/* Cards Section with Slide-in Animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 fade-in transition duration-1000">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 hover:bg-indigo-100 transition duration-500 ease-in-out fade-in">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Test Bank</h3>
          <p className="text-gray-600">
            Access a large variety of tests for different subjects and difficulty levels, curated for students and teachers.
          </p>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 hover:bg-purple-100 transition duration-500 ease-in-out fade-in">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Automatic Grading</h3>
          <p className="text-gray-600">
            Let the platform grade tests automatically with intelligent algorithms, saving time for both students and administrators.
          </p>
        </div>
        
        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 hover:bg-pink-100 transition duration-500 ease-in-out fade-in">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Analytics</h3>
          <p className="text-gray-600">
            Get insights on student performance, track progress, and identify areas for improvement with our in-depth analytics.
          </p>
        </div>
      </div>

      {/* Decorative Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-300 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-16 right-16 w-48 h-48 bg-pink-400 rounded-full opacity-50 blur-3xl"></div>
      </div>
    </div>
  );
};

export default Home;
