// src/components/Layout.tsx
import React, { lazy } from 'react';

import { Outlet } from 'react-router-dom';

const HomeNavbar = lazy(() => import("../HomeNavBar/HomeNavbar"));

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
         <footer className="mt-8 text-gray-500">
            &copy; {new Date().getFullYear()} Student Test Solver. All rights reserved.
         </footer>
      </div>
   );
};

export default HomeLayout;
