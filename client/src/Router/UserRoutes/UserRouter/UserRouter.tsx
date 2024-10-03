import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';

// Lazy-loaded components
const UserLayout = React.lazy(() => import('../UserLayout/UserLayout'));
const UserDashboard = React.lazy(() => import('../../../User/UserDashBoard/UserDashBoard'));
const UserProfile = React.lazy(() => import('../../../User/UserProfile/UserProfile'));
const MyTests = React.lazy(() => import('../../../User/Tests/MyTests/MyTests'));
const GiveTest = React.lazy(() => import('../../../User/Tests/GiveTest/GiveTest'));

const UserRouter: React.FC = () => {
   return (
      <div>
         {/* Suspense to handle lazy loading */}
         <Suspense fallback={<div>Loading...</div>}>
            <Routes>
               <Route path='/' element={<UserLayout />} >
                  <Route path='/profile' element={<UserProfile />} /> 
                  <Route path='/dashboard' element={<UserDashboard />} /> 
                  <Route path='/test' element={<MyTests />} /> 
                  <Route path='/giveTest' element={<GiveTest />} /> 
               </Route>
            </Routes>
         </Suspense>
      </div>
   );
};

export default UserRouter;
