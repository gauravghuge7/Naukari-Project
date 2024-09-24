import React from 'react'

export const AdminNavbar: React.FC<JSX.IntrinsicElements['div']> = () => {
   return (
      <div>

         <nav>
            <ul>
               <li>
                  <a href='/admin'>Home</a>
               </li>
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