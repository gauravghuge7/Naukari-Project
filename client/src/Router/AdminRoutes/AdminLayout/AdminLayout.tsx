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

         <main className='mt-20 ml-20'>
            <Outlet />
         </main>

         <footer className='bottom-0 w-full  mt-[22rem]'>
               <Footer />
         </footer>
         
      </div>
   )
}


export default AdminLayout