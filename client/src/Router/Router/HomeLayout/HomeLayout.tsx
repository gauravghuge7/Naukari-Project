// src/components/Layout.tsx
import React, { lazy } from 'react';

import { Outlet } from 'react-router-dom';
import HomeNavbar from '../../../Components/HomeNavBar/HomeNavbar';
import Footer from '../../../Views/Footer/Footer';



// const Footer = lazy(() => import("./../../../Views/Footer/Footer"));
// const HomeNavbar = lazy(() => import("./../../../Components/HomeNavBar/HomeNavbar"));


const HomeLayout: React.FC = () => {
   return (
      <div >
         <header>
            {/* Add your header or navigation here */}
            <HomeNavbar />
         </header>
         <main className='mt-20'>
            <Outlet /> {/* This will render the nested routes */}
         </main>
         <footer className="">
            <Footer />
         </footer>
      </div>
   );
};

export default HomeLayout;
