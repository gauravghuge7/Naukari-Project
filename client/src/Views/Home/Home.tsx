import React, { useEffect } from 'react';
import LoginCards from '../LoginCards/LoginCards';

const Home: React.FC = () => {
  // Animations on load (using slide-in and fade-in effect)
  useEffect(() => {
    
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">

      <LoginCards />

    </div>
  );
};

export default Home;
