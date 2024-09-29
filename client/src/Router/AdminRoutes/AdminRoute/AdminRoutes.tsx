import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy-loaded components for Admin
const AdminLayout = React.lazy(() => import('../AdminLayout/AdminLayout'));
const AdminDashboard = React.lazy(() => import('../../../Admin/AdminDashboard/AdminDashboard'));
const AdminProfile = React.lazy(() => import('../../../Admin/AdminProfile/AdminProfile'));
const TestLayout = React.lazy(() => import('../../../Admin/AdminTest/TestLayout.tsx/TestLayout'));

const AdminRoutes: React.FC = () => {
  return (
    <div>
      {/* Wrapping routes in Suspense for lazy loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Admin layout with nested routes */}
          <Route path='/' element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='/dashboard' element={<AdminDashboard />} />
            <Route path='/settings' element={<h1>Admin Settings</h1>} />
            <Route path='/profile' element={<AdminProfile />} />
            <Route path='/test' element={<TestLayout />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default AdminRoutes;
