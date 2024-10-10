import React from 'react';
import { Link } from 'react-router-dom';

// Sample data for demonstration
const tests = [
  { _id: 1, title: 'JavaScript Basics', description: 'Test your knowledge of JavaScript fundamentals.' },
  
];

const MyTests = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">My Tests</h1>

      {/* Grid layout that is responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <div key={test._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{test.title}</h2>
            <p className="text-gray-600 mb-4">{test.description}</p>
            <div className="flex justify-between">
            
              <Link 
                to={`/user/giveTest/${test._id}`}   
                className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition-colors"
              >
                Start Test
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTests;
