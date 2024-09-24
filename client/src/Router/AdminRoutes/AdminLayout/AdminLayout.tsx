import React from 'react'
import { Outlet } from 'react-router'
import { AdminNavbar } from '../../../Admin/AdminNavbar/AdminNavbar'

const AdminLayout: React.FC = () => {
   

   return (
      <div>
         
         <header>

            <AdminNavbar />

         </header>

         <main>
            <Outlet />
         </main>
         
      </div>
   )
}


export default AdminLayout