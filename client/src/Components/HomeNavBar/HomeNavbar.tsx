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