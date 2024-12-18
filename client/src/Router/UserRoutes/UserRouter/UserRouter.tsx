import React from 'react';
import { Route, Routes } from 'react-router';
import UserLayout from '../UserLayout/UserLayout';
import UserProfile from '../../../User/UserProfile/UserProfile';
import UserDashboard from '../../../User/UserDashBoard/UserDashBoard';
import MyTests from '../../../User/Tests/MyTests/MyTests';
import GiveTest from '../../../User/Tests/GiveTest/GiveTest';
import AllTests from '../../../User/Tests/AllTests/AllTests';
import TestOverview from '../../../Admin/AdminTest/TestOverview/TestOverview';


// Lazy-loaded components
// const AllTests = React.lazy(() => import('../../../User/Tests/AllTests/AllTests'));
// const TestOverview = React.lazy(() => import('../../../User/Tests/TestOverview/TestOverView'));
// const UserLayout = React.lazy(() => import('../UserLayout/UserLayout'));
// const UserDashboard = React.lazy(() => import('../../../User/UserDashBoard/UserDashBoard'));
// const UserProfile = React.lazy(() => import('../../../User/UserProfile/UserProfile'));
// const MyTests = React.lazy(() => import('../../../User/Tests/MyTests/MyTests'));
// const GiveTest = React.lazy(() => import('../../../User/Tests/GiveTest/GiveTest'));


const UserRouter: React.FC = () => {
   return (
      <div>


            <Routes>
               <Route path='/' element={<UserLayout />} >
                  <Route path='/profile' element={<UserProfile />} /> 
                  <Route path='/dashboard' element={<UserDashboard />} /> 
                  <Route path='/myTest' element={<MyTests />} /> 
                  <Route path={`/giveTest/:_id`} element={<GiveTest />} /> 
                  <Route path='/Test' element={<AllTests />} /> 
                  <Route path='/test-overview/:testId' element={<TestOverview />} /> 
               </Route>
            </Routes>

      </div>
   );
};

export default UserRouter;
