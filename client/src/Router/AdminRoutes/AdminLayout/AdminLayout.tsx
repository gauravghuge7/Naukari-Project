import React, { lazy } from 'react'
import { Outlet } from 'react-router'
import Footer from '../../../Views/Footer/Footer'


const AdminNavbar = lazy(() => import("./../../../Admin/AdminNavbar/AdminNavbar"));


const AdminLayout: React.FC = () => {
   

   return (
      <div>
         
         <header>

            <AdminNavbar />

         </header>

         <main className='mt-20'>
            <Outlet />
         </main>

         <footer className='relative bottom-0 w-full  mt-[20rem]'>
               <Footer />
         </footer>
         
      </div>
   )
}


export default AdminLayout