import React from 'react'
import { Outlet } from 'react-router'

//  lazy loading 
const AdminNavbar = React.lazy(() => import('../../../admin/AdminNavbar/AdminNavbar'))
const Footer = React.lazy(() => import('../../../views/Footer/Footer'))




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