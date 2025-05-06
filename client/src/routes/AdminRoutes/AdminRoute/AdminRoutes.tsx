import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../../../admin/AdminDashboard/AdminDashboard';
import AdminProfile from '../../../admin/AdminProfile/AdminProfile';
import AdminLayout from '../AdminLayout/AdminLayout';
import AdminProtection from './AdminProtection';


// // Lazy-loaded components for Admin
// const ViewTests = React.lazy(() => import('../../../Admin/AdminTest/ViewTests/ViewTests'));
// const AdminLayout = React.lazy(() => import('../AdminLayout/AdminLayout'));
// const AdminDashboard = React.lazy(() => import('../../../Admin/AdminDashboard/AdminDashboard'));
// const AdminProfile = React.lazy(() => import('../../../Admin/AdminProfile/AdminProfile'));
// const TestLayout = React.lazy(() => import('../../../Admin/AdminTest/TestLayout.tsx/TestLayout'));





const AdminRoutes: React.FC = () => {
  return (
    <div>


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

    </div>
  );
};

export default AdminRoutes;
