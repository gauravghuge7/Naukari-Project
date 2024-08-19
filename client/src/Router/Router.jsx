
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDashBoard from '../User/UserNavbar/UserDashBoard/UserDashBoard';
import UserNavbar from '../User/UserNavbar/UserNavbar';

const RouterApp = () => {
   return (
      
      <div>
         
         <Routes>
            <Route path="/" element={UserDashBoard} />
         </Routes>
      </div>
     
   )
}
export default RouterApp;