import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../../../Views/Footer/Footer'
const UserNavbar = React.lazy(() => import('../../../User/layout/UserNavbar'))

const UserLayout: React.FC = () => {
   return (
      <div> 
         
         {/**   this header is fixed at the top of the page */}
         <header>

            <UserNavbar />

         </header>
         
         {/**   this is changeable content with dynamic routing */}
         <main className=''>
            <Outlet />
         </main>

         <footer>
            <Footer />  
         </footer>

         
      </div>
   )
}

export default UserLayout