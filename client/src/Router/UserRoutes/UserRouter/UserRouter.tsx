import React from 'react';
import { Route, Routes } from 'react-router';
import UserLayout from '../UserLayout/UserLayout';
import UserProfile from '../../../User/UserProfile/UserProfile';
import UserDashboard from '../../../User/UserDashBoard/UserDashBoard';
import MyTests from '../../../User/Tests/MyTests/MyTests';
import GiveTest from '../../../User/Tests/GiveTest/GiveTest';
import AllTests from '../../../User/Tests/AllTests/AllTests';
import TestOverview from '../../../Admin/AdminTest/TestOverview/TestOverview';
import UserProtection from './UserProtection';
import Home from '../../../Views/Home/Home';
import AdminLogin from '../../../Admin/AdminLogin/AdminLogin';
import AdminSignUp from '../../../Admin/AdminSignUp/AdminSignUp';
import StudentLogin from '../../../User/UserLogin/StudentLogin';
import StudentSignUp from '../../../User/UserLogin/StudentSignUp';
import About from '../../../components/About/About';
import NotFound from '../../../components/NotFound/NotFound';
import CreateStudyPlanView from '../../../User/plans/CreatePlanView';
import CreatePlan from './../../../User/plans/CreatePlan';
import AddTask from './../../../User/plans/AddTask';
import MyPlans from '../../../User/plans/MyPlans';
import ViewPlansDetails from '../../../User/plans/ViewPlansDetails';



const UserRouter: React.FC = () => {
   return (
            <Routes>


               <Route path='/student-login' element={<StudentLogin />} />
               <Route path='/student-register' element={<StudentSignUp />} />

               
               <Route path='/admin-login' element={<AdminLogin />} />
               <Route path='/admin-signup' element={<AdminSignUp />} />

               {/* Main layout route with nested child routes */}
               <Route path='/' element={<UserLayout />}>

               
                  <Route path='/' element={<Home />} />
                  
                  
                  <Route path='/about' element={<About />} />
                  <Route path='/user/createStudyPlanView' element={<CreateStudyPlanView />} />




                  {/* Add the user Protected Routes here  */}

                  <Route path='/user' element={<UserProtection />} >

                     <Route path='profile' element={<UserProfile />} /> 
                     <Route path='dashboard' element={<UserDashboard />} /> 
                     <Route path='myTest' element={<MyTests />} /> 
                     <Route path={`giveTest/:_id`} element={<GiveTest />} /> 
                     <Route path='Test' element={<AllTests />} /> 
                     <Route path='test-overview/:testId' element={<TestOverview />} /> 



                     <Route path='createStudyPlan' element={<CreateStudyPlanView />} /> 
                     <Route path='createPlan' element={<CreatePlan />} /> 
                     <Route path='myPlans' element={<MyPlans />} /> 
                     <Route path='viewPlantasks/:planId' element={<ViewPlansDetails />} /> 
                     <Route path='addTasks/:planId' element={<AddTask />} /> 

                     {/* Socket connections  */}

                  </Route>



                  <Route path='*' element={<NotFound />} />

               </Route>
            </Routes>
   );
};

export default UserRouter;
