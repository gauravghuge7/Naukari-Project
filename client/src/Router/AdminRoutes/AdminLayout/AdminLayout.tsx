import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../../../Views/Footer/Footer'
import AdminNavbar from '../../../Admin/AdminNavbar/AdminNavbar'




const AdminLayout: React.FC = () => {
   

   return (
      <div>
         
         <header>

            <AdminNavbar />

         </header>

         <main>
            <Outlet />
         </main>

         <footer className='bottom-0 w-full  mt-[22rem]'>
               <Footer />
         </footer>
         
      </div>
   )
}


export default AdminLayout