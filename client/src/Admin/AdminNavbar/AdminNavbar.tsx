import React, { useState } from 'react'

export const AdminNavbar: React.FC<JSX.IntrinsicElements['div']> = () => {


   const [isOpen, setIsOpen] = useState(false)
   
   

   return (
      <div>
         {/** Admin Navbar  */}
         <nav className='flex justify-around items-center absolute top-0 left-0 w-full h-20 bg-gray-100 shadow-xl z-50'>
            <section>
               <button 
                  className='text-blue-700 text-3xl rotate-90'
                  onClick={() => setIsOpen(!isOpen)}
               >
                  |||

               </button>

               {
                  isOpen &&


                  <ul className='flex flex-col gap-2 absolute top-0 mt-20 left-0  h-full w-80 bg-gray-100 shadow-xl'>

                     <li className='text-end'>
                        <button 
                           className='text-blue-700 text-3xl rotate-90 text-end ' 
                           onClick={() => setIsOpen(!isOpen)}
                        >
                           X
                        </button>
                     </li>
                     <li className='text-center border border-gray-300'>
                        <a href='/admin'>Home</a>
                     </li>
                     <li className='text-center border border-gray-300'>
                        <a href='/admin/profile'>Profile</a>
                     </li>
                     <li className='text-center border border-gray-300'>
                        <a href='/admin/dashboard'>Dashboard</a>
                     </li>
                     <li className='text-center border border-gray-300'>
                        <a href='/admin/settings'>Settings</a>
                     </li>
                     <li className='text-center border border-gray-300'>
                        <a href='/admin/test'> Create Test</a>
                     </li>
                  </ul>
               }
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
         </nav>
         
      </div>
   )
}