import React, { lazy } from 'react'
import { Route, Routes } from 'react-router';
import AdminLayout from '../AdminLayout/AdminLayout';



{/* Lazy Imports for application optimization */}
// const AdminLayout  = lazy(() => import('../AdminLayout/AdminLayout'));
const CreateTest  = lazy(() => import('../../../Admin/CreateTest/CreateTest'));




const AdminRoutes: React.FC = () => {
   return (
      <div>

         <Routes>

            <Route path='/' element={<AdminLayout />} >

               <Route path='/profile' element={<h1>Admin Profile</h1>} />
               <Route path='/dashboard' element={<h1>Admin Dashboard</h1>} />
               <Route path='/settings' element={<h1>Admin Setting</h1>} />
               <Route path='/profile' element={<h1>Admin Profile</h1>} />
               <Route path='/createTest' element={<CreateTest />} />

            </Route>

         </Routes>



         
      </div>
   )
}


export default AdminRoutes;