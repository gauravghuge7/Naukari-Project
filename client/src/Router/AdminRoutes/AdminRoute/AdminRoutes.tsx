import React from 'react'
import { Route, Routes } from 'react-router';
import AdminLayout from '../AdminLayout/AdminLayout';


const AdminRoutes: React.FC = () => {
   return (
      <div>

         <Routes>

            <Route path='/' element={<AdminLayout />} >

               <Route path='/profile' element={<h1>Admin Profile</h1>} />

            </Route>

         </Routes>



         
      </div>
   )
}


export default AdminRoutes;