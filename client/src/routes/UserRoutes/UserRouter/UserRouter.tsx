import React from 'react';
import { Route, Routes } from 'react-router';
import UserLayout from '../UserLayout/UserLayout';
import UserProfile from '../../../user/UserProfile/UserProfile';
import UserDashboard from '../../../user/UserDashBoard/UserDashBoard';
import MyTests from '../../../user/Tests/MyTests/MyTests';
import GiveTest from '../../../user/Tests/GiveTest/GiveTest';
import AllTests from '../../../user/Tests/AllTests/AllTests';
import TestOverview from '../../../admin/AdminTest/TestOverview/TestOverview';
import UserProtection from './UserProtection';
import Home from '../../../views/Home/Home';
import AdminLogin from '../../../admin/AdminLogin/AdminLogin';
import AdminSignUp from '../../../admin/AdminSignUp/AdminSignUp';
import StudentLogin from '../../../user/UserLogin/StudentLogin';
import StudentSignUp from '../../../user/UserLogin/StudentSignUp';
import About from '../../../components/About/About';
import NotFound from '../../../components/NotFound/NotFound';
import CreateStudyPlanView from '../../../User/plans/CreatePlanView';
import CreatePlan from './../../../User/plans/CreatePlan';
import AddTask from './../../../User/plans/AddTask';
import MyPlans from '../../../User/plans/MyPlans';
import ViewPlansDetails from '../../../User/plans/ViewPlansDetails';
import CreateTestOverview from '../../../Admin/AdminTest/CreateTestOverview/CreateTestOverview';
import WeekViewSelector from '../../../User/plans/weekly/WeekViewSelector';
import CreateWeeklyPlan from '../../../User/plans/CreateWeeklyPlan';
import MonthlyPlanner from '../../../User/plans/monthly/MonthlyPlanner';
import FreestylePlanner from '../../../User/plans/freeStyle/FreestylePlanner';
import DailyView from '../../../User/plans/dailyView/DailyView';



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
                     
                     
                     {/*  Here is Test Routes  */}
                     <Route path='create-test-overview/:id' element={<CreateTestOverview />} />
                     <Route path='myTest' element={<MyTests />} /> 
                     <Route path={`giveTest/:_id`} element={<GiveTest />} /> 
                     <Route path='Test' element={<AllTests />} /> 
                     <Route path='test-overview/:testId' element={<TestOverview />} /> 


                     {/*  Goal Plans Routes  */}
                     <Route path='createStudyPlan' element={<CreateStudyPlanView />} /> 


                     <Route path="weekview" element={<WeekViewSelector />} />
                     <Route path="createWeeklyPlan/:planId" element={<CreateWeeklyPlan />} />

                     <Route path="monthly" element={<MonthlyPlanner />} />
                     <Route path="monthlyPlan/:date" element={<CreateWeeklyPlan />} />

                     {/* Create A Free Plan */}
                     <Route path='createPlan' element={<CreatePlan />} /> 
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
