
const UserNavbar= () => {
   return (

      <div className="">
         <nav
            className="flex justify-around items-center fixed top-0 left-0 w-full h-20 bg-gray-100 shadow-xl z-50"
         >
            
            <div
               className="text-center text-3xl font-bold text-blue-700"
            >
               Naukari Finder 
            </div>

            {/*  list of content in navbar */}
            <ul className="flex items-center gap-4 ">
               <li>
                  <button >Software & IT Jobs</button>
               </li>
               
            </ul>

            {/*  Profile section in navbar */}

            <div>
                  Profile
            </div>
         </nav>
         
      </div>
   )
}


export default UserNavbar;