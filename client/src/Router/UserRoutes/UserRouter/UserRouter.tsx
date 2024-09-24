import React from 'react'
import { Route, Routes } from 'react-router'
import UserLayout from '../UserLayout/UserLayout'

const UserRouter: React.FC = () => {
   return (
      <div>

         <Routes>
            <Route path='/' element={<UserLayout />} >
               <Route path='/profile' element={<h1>User  sfgsdfgProfile</h1>} /> 
            </Route>
         </Routes>
      </div>
   )
}


export default UserRouter;