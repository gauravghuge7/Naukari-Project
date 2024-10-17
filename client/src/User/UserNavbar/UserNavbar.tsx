import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // For the hamburger icon
import UserSidebar from "../UserSidebar/UserSidebar/UserSidebar";

const UserNavbar = () => {
   const[isOpen, setIsOpen] = useState(false);

   // Toggle menu for mobile
   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };



   return (
      <div>


         <UserSidebar  isOpen={isOpen} setIsOpen={setIsOpen} />


         <nav className="flex justify-between items-center w-full h-20 px-4 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 shadow-xl z-50">
         
          {/* Hamburger Icon for Mobile */}
            <div className=" text-white cursor-pointer" onClick={toggleMenu}>
               {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </div>


         {/* Logo */}
         <div className="text-3xl font-bold text-white">
            Naukari Guider
         </div>


         {/* Profile */}
         <div className="text-black font-semibold">
            <Link to="/" className="hover:text-yellow-300">
               logout
            </Link>
         </div>

        
         </nav>

      
      </div>
   );
};

export default UserNavbar;
