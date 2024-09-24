import React from 'react'
import { Outlet } from 'react-router'
import UserNavbar from '../../../User/UserNavbar/UserNavbar'

const UserLayout: React.FC = () => {
   return (
      <div> 
         
         {/**   this header is fixed at the top of the page */}
         <header>

            <UserNavbar />

         </header>
         
         {/**   this is changeble content with dynamic routing */}
         <main>
            <Outlet />
         </main>

         
      </div>
   )
}

export default UserLayout