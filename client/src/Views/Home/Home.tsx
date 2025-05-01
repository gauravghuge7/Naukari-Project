import React, { useEffect } from 'react';
import LoginCards from '../LoginCards/LoginCards';
import PlansFeature from './PlansFreature';
import Footer from '../Footer/Footer';

const Home: React.FC = () => {
  // Animations on load (using slide-in and fade-in effect)
  useEffect(() => {
    
  }, []);

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">

      <LoginCards />
      <PlansFeature />

      <Footer />  
    </div>
  );
};

export default Home;
