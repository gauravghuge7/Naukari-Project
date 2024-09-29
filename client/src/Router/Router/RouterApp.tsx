import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy-loaded components
const AdminLogin = React.lazy(() => import('../../Admin/AdminLogin/AdminLogin.tsx'));
const AdminSignUp = React.lazy(() => import('../../Admin/AdminSignUp/AdminSignUp.tsx'));
const Home = React.lazy(() => import('../../Components/Home/Home.tsx'));
const HomeLayout = React.lazy(() => import('../../Components/HomeLayout/HomeLayout.tsx'));
const StudentLogin = React.lazy(() => import('../../User/UserLogin/StudentLogin.tsx'));
const StudentSignUp = React.lazy(() => import('../../User/UserLogin/StudentSignUp.tsx'));

const RouterApp = () => {
  return (
    <div>
      {/* Wrapping lazy-loaded routes in Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Main layout route with nested child routes */}
          <Route path='/' element={<HomeLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/admin-signup' element={<AdminSignUp />} />
            <Route path='/student-login' element={<StudentLogin />} />
            <Route path='/student-register' element={<StudentSignUp />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default RouterApp;
