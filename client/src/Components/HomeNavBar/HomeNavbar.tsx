import { useState } from "react";

const HomeNavbar = () => {


   const [isOpen, setIsOpen] = useState(false)

   return (

      <div className="">

         {/* Home  Navbar */}
         <nav
            className="flex justify-around items-center absolute top-0 left-0 w-full h-20 bg-gray-100 shadow-xl z-50"
         >
            
            <section>

               {/* hamburger icon for Landing page */}
               <button 
                  className='text-blue-700 text-3xl rotate-90'
                  onClick={() => setIsOpen(!isOpen)}
               >
                  |||

               </button>

               {
                  isOpen &&

                  <ul className='flex flex-col gap-2 absolute top-0 mt-20 left-0  h-full w-80 bg-gray-100 shadow-xl'>

                     {/* close button for close the sidebar */}
                     <li className='text-end'>
                        <button 
                           className='text-blue-700 text-3xl rotate-90 text-end ' 
                           onClick={() => setIsOpen(!isOpen)}
                        >
                           X
                        </button>
                     </li>
                     {/* Home Button  */}
                     <li className='text-center border border-gray-300'>
                        <a href='/user'>Home</a>
                     </li>
                     
                  </ul>
               }
            </section>

            <div
               className="text-center text-3xl font-bold text-blue-700"
            >
               Naukari Guider 
            </div>



            {/*  list of content in navbar */}
            <ul className="flex items-center gap-4 ">
               <li>
                  <button >Software & IT Jobs</button>
               </li>
               
            </ul>

            
         </nav>
         
      </div>
   )
}


export default HomeNavbar;