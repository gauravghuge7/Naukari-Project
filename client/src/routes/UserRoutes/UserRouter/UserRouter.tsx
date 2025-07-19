import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

// Layout and protection
const UserLayout = lazy(() => import('../UserLayout/UserLayout'));
const UserProtection = lazy(() => import('./UserProtection'));

// Auth & Entry
const StudentLogin = lazy(() => import('../../../user/UserLogin/StudentLogin'));
const StudentSignUp = lazy(() => import('../../../user/UserLogin/StudentSignUp'));
const AdminLogin = lazy(() => import('../../../admin/AdminLogin/AdminLogin'));
const AdminSignUp = lazy(() => import('../../../admin/AdminSignUp/AdminSignUp'));

// General Pages
const Home = lazy(() => import('../../../views/Home/Home'));
const About = lazy(() => import('../../../components/About/About'));
const NotFound = lazy(() => import('../../../components/NotFound/NotFound'));

// User Profile & Dashboard
const UserProfile = lazy(() => import('../../../user/UserProfile/UserProfile'));
const UserDashboard = lazy(() => import('../../../user/UserDashBoard/UserDashBoard'));
const TestPortalRedirect = lazy(() => import('../../../views/TestPortal/TestPortalRedirect'));

// Study Plan Features
const CreateStudyPlanView = lazy(() => import('../../../user/plans/createPlans/CreatePlanView'));
const AddTask = lazy(() => import('../../../user/plans/createPlans/AddTask'));
const MyPlans = lazy(() => import('../../../user/plans/planView/MyPlans'));
const MyCalendar = lazy(() => import('../../../user/plans/calendar/MyCalendar'));
const WeekViewSelector = lazy(() => import('../../../user/plans/weekly/WeekViewSelector'));
const CreateWeeklyPlan = lazy(() => import('../../../user/plans/weekly/CreateWeeklyPlan'));
const MonthlyPlanner = lazy(() => import('../../../user/plans/monthly/MonthlyPlanner'));
const FreestylePlanner = lazy(() => import('../../../user/plans/freeStyle/FreestylePlanner'));
const ViewPlansDetails = lazy(() => import('../../../user/plans/planView/ViewPlansDetails'));
const DailyView = lazy(() => import('../../../user/plans/dailyView/DailyView'));
const PlansFeature = lazy(() => import('../../../views/Home/PlansFeature'));
const ContactUs = lazy(() => import("../../../components/About/ContactUs"));

const UserRouter: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-register" element={<StudentSignUp />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignUp />} />

        {/* Layout with nested routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />

          
          <Route path="about" element={<About />} />
          <Route path="features" element={<PlansFeature />} />
          <Route path="contact" element={<ContactUs />} />

          <Route path="user/createStudyPlanView" element={<CreateStudyPlanView />} />

          {/* Protected routes */}
          <Route path="user" element={<UserProtection />}>
            <Route index element={<UserProfile />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="myCalendar" element={<MyCalendar />} />
            <Route path="myTest" element={<TestPortalRedirect />} />

            {/* Plans */}
            <Route path="createStudyPlan" element={<CreateStudyPlanView />} />
            <Route path="weekview" element={<WeekViewSelector />} />
            <Route path="createWeeklyPlan/:planId" element={<CreateWeeklyPlan />} />
            <Route path="monthly" element={<MonthlyPlanner />} />
            <Route path="monthlyPlan/:date" element={<CreateWeeklyPlan />} />
            <Route path="freestyle" element={<FreestylePlanner />} />
            <Route path="viewPlantasks/:planId" element={<ViewPlansDetails />} />
            <Route path="addTasks/:planId" element={<AddTask />} />
            <Route path="myPlans" element={<MyPlans />} />
            <Route path="dailyTarget/:date" element={<DailyView />} />
          </Route>

          {/* Catch-all not found route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default UserRouter;
