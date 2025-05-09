import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy load components
const AdminDashboard = lazy(() => import('../../../admin/AdminDashboard/AdminDashboard'));
const AdminProfile = lazy(() => import('../../../admin/AdminProfile/AdminProfile'));
const AdminLayout = lazy(() => import('../AdminLayout/AdminLayout'));
const AdminProtection = lazy(() => import('./AdminProtection'));

const AdminRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Protected Routes for Admin */}
        <Route path='/' element={<AdminProtection />}>
          {/* Admin layout with nested routes */}
          <Route path='/' element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='/dashboard' element={<AdminDashboard />} />
            <Route path='/settings' element={<h1>Admin Settings</h1>} />
            <Route path='/profile' element={<AdminProfile />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
