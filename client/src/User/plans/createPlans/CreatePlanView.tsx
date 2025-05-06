import React from 'react';
import { Link } from 'react-router-dom';

const studyPlans = [
  {
    duration: '1 Week',
    description: 'Quick and focused study plan',
    details: 'Ideal for last-minute revisions or short-term goals. Covers key topics with daily targets.',
    effort: 'High Intensity',
    path: '/user/weekview',
  },
  {
    duration: '1 Month',
    description: 'Comprehensive monthly plan',
    details: 'Covers multiple subjects with weekly milestones. Includes breaks and assessments.',
    effort: 'Moderate Intensity',
    path: '/user/monthly',
  },
  {
    duration: 'Freestyle',
    description: 'Fully custom range planning',
    details: 'Pick any start and end date. Customize each day with your own structure and tasks.',
    effort: 'Flexible Intensity',
    path: '/user/freestyle',
  },
];

const dailyTasks = [
  {
    title: 'Daily Focus',
    description: 'Start your day productively',
    details: '30-60 minutes of focused work on priority tasks',
    intensity: 'Light',
    path: '/user/freestyle',
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
          Design Your Work Journey
        </h1>

        {/* Daily Tasks Section */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-16 mb-8 text-center tracking-tight">
          Create Daily Tasks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {dailyTasks.map((task, index) => (
            <Link
              key={index}
              to={task.path}
              className="group bg-gray-900 border border-gray-800 rounded-xl shadow-xl p-6 text-white transform transition-all duration-300 hover:scale-105 hover:bg-gray-850 hover:border-purple-500"
            >
              <h3 className="text-2xl font-bold mb-3 text-purple-400 group-hover:text-purple-300 transition duration-300">
                {task.title}
              </h3>
              <p className="text-gray-200 text-md font-medium mb-2">{task.description}</p>
              <p className="text-gray-300 text-sm mb-3">{task.details}</p>
              <div className="flex items-center text-gray-400 text-sm mb-3">
                <svg
                  className="w-5 h-5 mr-2 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Intensity: <span className="ml-1 text-gray-200">{task.intensity}</span>
              </div>
              <div className="flex justify-end">
                <button className="py-1.5 px-4 bg-purple-500 text-white rounded-lg font-semibold shadow-md group-hover:bg-purple-600 group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                  Create Task
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Study Plans Section */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 text-center tracking-tight">
          Choose Your Planning Type
        </h2>
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
