import React, { useState } from 'react'
import AdminSidebar from '../AdminSidebar/AdminSidebar'

const AdminNavbar: React.FC<JSX.IntrinsicElements['div']> = () => {


   const [isOpen, setIsOpen] = useState(false);
   


   return (
      <div>

         <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />



         {/** Admin Navbar  */}
         <nav className='flex justify-around items-center absolute top-0 left-0 w-full h-20 bg-gray-100 shadow-xl z-50'>
            <section>
               <button 
                  className='text-blue-700 text-3xl rotate-90'
                  onClick={() => setIsOpen(!isOpen)}
               >
                  |||

               </button>

            </section>  

            <ul className='flex items-center gap-4'>
               

               <li>
                  <a href='/admin/dashboard'>Dashboard</a>
               </li>
               <li>
                  <a href='/admin/settings'>Settings</a>
               </li>
               <li>
                  {/* Add your navigation links here */}
               </li>
            </ul>

            <button 
               className='bg-red-500 text-white px-4 py-2 rounded-sm'
               onClick={() => {
                  localStorage.removeItem('adminToken');
                  window.location.href = '/';
               }}
            > 
               Logout   
            </button>
         </nav>
         
      </div>
   )
}

export default AdminNavbar