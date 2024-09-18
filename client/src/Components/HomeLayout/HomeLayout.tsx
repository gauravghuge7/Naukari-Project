// src/components/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import UserNavbar from '../../User/UserNavbar/UserNavbar';

const HomeLayout: React.FC = () => {
   return (
      <div >
         <header>
            {/* Add your header or navigation here */}
            <UserNavbar />
         </header>
         <main>
            <Outlet /> {/* This will render the nested routes */}
         </main>
         <footer className="mt-8 text-gray-500">
            &copy; {new Date().getFullYear()} Student Test Solver. All rights reserved.
         </footer>
      </div>
   );
};

export default HomeLayout;
