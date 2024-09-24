import React from 'react'
import { Route, Routes } from 'react-router';
import AdminLayout from '../AdminLayout/AdminLayout';


const AdminRoutes: React.FC = () => {
   return (
      <div>

         <Routes>

            <Route path='/' element={<AdminLayout />} >

               <Route path='/profile' element={<h1>Admin Profile</h1>} />
               <Route path='/dashboard' element={<h1>Admin Dashboard</h1>} />
               <Route path='/settings' element={<h1>Admin Setting</h1>} />
               <Route path='/profile' element={<h1>Admin Profile</h1>} />

            </Route>

         </Routes>



         
      </div>
   )
}


export default AdminRoutes;