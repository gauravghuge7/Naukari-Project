import React from 'react';
import { Route, Routes } from 'react-router';
import UserLayout from '../UserLayout/UserLayout';
import UserProfile from '../../../user/UserProfile/UserProfile';
import UserDashboard from '../../../user/UserDashBoard/UserDashBoard';
import UserProtection from './UserProtection';
import Home from '../../../views/Home/Home';
import AdminLogin from '../../../admin/AdminLogin/AdminLogin';
import AdminSignUp from '../../../admin/AdminSignUp/AdminSignUp';
import StudentLogin from '../../../user/UserLogin/StudentLogin';
import StudentSignUp from '../../../user/UserLogin/StudentSignUp';
import About from '../../../components/About/About';
import NotFound from '../../../components/NotFound/NotFound';
import CreateStudyPlanView from '../../../user/plans/createPlans/CreatePlanView';
import AddTask from '../../../user/plans/createPlans/AddTask';
import MyPlans from '../../../user/plans/planView/MyPlans';
import MyCalendar from '../../../user/plans/MyCalendar';
import WeekViewSelector from '../../../user/plans/weekly/WeekViewSelector';
import CreateWeeklyPlan from './../../../user/plans/weekly/CreateWeeklyPlan';
import MonthlyPlanner from './../../../user/plans/monthly/MonthlyPlanner';
import FreestylePlanner from '../../../user/plans/freeStyle/FreestylePlanner';
import ViewPlansDetails from '../../../user/plans/planView/ViewPlansDetails';
import DailyView from '../../../user/plans/dailyView/DailyView';
import TestPortalRedirect from '../../../views/TestPortal/TestPortalRedirect';



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

                     {/* Profile anbd Overall Dashboard  */}
                     <Route path='profile' element={<UserProfile />} /> 
                     <Route path='dashboard' element={<UserDashboard />} /> 
                     <Route path='myCalendar' element={<MyCalendar />} /> 
                     <Route path='myTest' element={<TestPortalRedirect />} /> 
                     


                     {/*  Goal Plans Routes  */}
                     <Route path='createStudyPlan' element={<CreateStudyPlanView />} /> 


                     <Route path="weekview" element={<WeekViewSelector />} />
                     <Route path="createWeeklyPlan/:planId" element={<CreateWeeklyPlan />} />

                     <Route path="monthly" element={<MonthlyPlanner />} />
                     <Route path="monthlyPlan/:date" element={<CreateWeeklyPlan />} />

                     {/* Create A Free Plan */}
                     <Route path='freestyle' element={<FreestylePlanner />} /> 
                     <Route path='viewPlantasks/:planId' element={<ViewPlansDetails />} /> 
                     <Route path='addTasks/:planId' element={<AddTask />} /> 


                     <Route path='myPlans' element={<MyPlans />} /> 
                     <Route path='dailyTarget/:date' element={<DailyView />} /> 
                     {/* Socket connections  */}

                  </Route>



                  <Route path='*' element={<NotFound />} />

               </Route>
            </Routes>
   );
};

export default UserRouter;
