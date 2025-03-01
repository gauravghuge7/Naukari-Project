import React from 'react';
import { Link } from 'react-router-dom';

const studyPlans = [
  {
    duration: '1 Week',
    description: 'Quick and focused study plan',
    details: 'Ideal for last-minute revisions or short-term goals. Covers key topics with daily targets.',
    effort: 'High Intensity',
    path: '/create-study-plan',
  },
  {
    duration: '2 Weeks',
    description: 'Short-term intensive learning',
    details: 'Perfect for cramming or mastering a single subject. Includes practice tests and reviews.',
    effort: 'High Intensity',
    path: '/create-study-plan',
  },
  {
    duration: '3 Weeks',
    description: 'Balanced short-term preparation',
    details: 'A structured approach with moderate pacing. Great for exam prep or skill-building.',
    effort: 'Moderate Intensity',
    path: '/create-study-plan',
  },
  {
    duration: '1 Month',
    description: 'Comprehensive monthly plan',
    details: 'Covers multiple subjects with weekly milestones. Includes breaks and assessments.',
    effort: 'Moderate Intensity',
    path: '/create-study-plan',
  },
  {
    duration: '2 Months',
    description: 'In-depth study coverage',
    details: 'Deep dive into complex topics. Features detailed schedules and progress tracking.',
    effort: 'Moderate Intensity',
    path: '/create-study-plan',
  },
  {
    duration: '3 Months',
    description: 'Long-term structured learning',
    details: 'Builds strong foundations with consistent study habits. Ideal for semester planning.',
    effort: 'Steady Pace',
    path: '/create-study-plan',
  },
  {
    duration: '4 Months',
    description: 'Extended preparation plan',
    details: 'Thorough preparation for major exams or certifications. Includes revision cycles.',
    effort: 'Steady Pace',
    path: '/create-study-plan',
  },
  {
    duration: '6 Months',
    description: 'Complete mastery roadmap',
    details: 'Mastery-focused with extensive coverage. Perfect for long-term goals or career prep.',
    effort: 'Steady Pace',
    path: '/create-study-plan',
  },
];

const CreateStudyPlanView: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-600 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-12 text-center tracking-tight">
          Design Your Study Journey
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {studyPlans.map((plan, index) => (
            <Link
              key={index}
              to={plan.path}
              className="group bg-gray-900 border border-gray-800 rounded-xl shadow-xl p-8 text-white transform transition-all duration-300 hover:scale-105 hover:bg-gray-850 hover:border-indigo-500"
            >
              <h2 className="text-3xl font-bold mb-4 text-indigo-400 group-hover:text-indigo-300 transition duration-300">
                {plan.duration}
              </h2>
              <p className="text-gray-200 text-lg font-medium mb-3">{plan.description}</p>
              <p className="text-gray-300 text-sm mb-4">{plan.details}</p>
              <div className="flex items-center text-gray-400 text-sm mb-4">
                <svg
                  className="w-5 h-5 mr-2 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Effort: <span className="ml-1 text-gray-200">{plan.effort}</span>
              </div>
              <div className="flex justify-end">
                <button className="py-2 px-6 bg-green-500 text-black rounded-lg font-semibold shadow-md group-hover:bg-green-600 group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                  Start Now
                </button>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition duration-300 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateStudyPlanView;