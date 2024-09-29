import React from 'react';

const Home: React.FC = () => {
   return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
         <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
               Welcome to Student Test Solver
            </h1>
            <p className="text-lg text-gray-600">
               A platform to solve tests efficiently, designed for students and administrators.
            </p>
         </header>

         <div className="space-y-4">
            <button
               className="w-64 py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
               onClick={() => window.location.href = '/admin-login'}
            >
               Admin Login
            </button>
            <button
               className="w-64 py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
               onClick={() => window.location.href = '/student-login'}
            >
               Student Login
            </button>
         </div>

         
      </div>
   );
}


export default Home;