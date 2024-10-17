import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../../../Views/Footer/Footer'
const UserNavbar = React.lazy(() => import('../../../User/UserNavbar/UserNavbar'))

const UserLayout: React.FC = () => {
   return (
      <div> 
         
         {/**   this header is fixed at the top of the page */}
         <header>

            <UserNavbar />

         </header>
         
         {/**   this is changeble content with dynamic routing */}
         <main className='mt-20 ml-4'>
            <Outlet />
         </main>

         <footer>
            <Footer />  
         </footer>

         
      </div>
   )
}

export default UserLayout