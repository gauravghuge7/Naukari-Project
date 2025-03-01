import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaBook, FaClipboardList, FaFileAlt } from "react-icons/fa";
import UserSidebar from "../UserSidebar/UserSidebar";

const UserNavbar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
      const user = localStorage.getItem("NaukariUser");
      setIsLoggedIn(!!user);
   }, []);

   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };

   return (
      <div>
         {isLoggedIn && <UserSidebar isOpen={isOpen} setIsOpen={setIsOpen} />}

         <nav className="flex flex-wrap justify-between items-center w-full h-16 px-4 bg-black shadow-xl z-50 border-b border-gray-700">
            {/* Left Section */}
            <div className="text-white cursor-pointer text-sm">
               {isLoggedIn ? (
                  <div onClick={toggleMenu}>{isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}</div>
               ) : (
                  <div className="flex gap-3">
                     <Link to="/student-login" className="text-white hover:text-gray-400">Login</Link>
                     <Link to="/student-register" className="text-white hover:text-gray-400">Signup</Link>
                  </div>
               )}
            </div>

            {/* Logo */}
            <Link to="/" className="text-xl md:text-2xl font-bold text-white tracking-wide order-1 md:order-none">
               Student Career Portal
            </Link>

            {/* Navigation Links */}
            <div className={`${
               isLoggedIn ? 'flex' : 'hidden'
            } flex-col md:flex-row gap-4 md:gap-6 text-white text-sm font-medium mt-4 md:mt-0 w-full md:w-auto order-3 md:order-2`}>
               <Link to="/user/study-plan" className="flex items-center gap-1 hover:text-gray-400">
                  <FaBook size={14} /> Study Plan
               </Link>
               <Link to="/user/create-quiz" className="flex items-center gap-1 hover:text-gray-400">
                  <FaClipboardList size={14} /> Create Quiz
               </Link>
               <Link to="/user/create-sheet" className="flex items-center gap-1 hover:text-gray-400">
                  <FaFileAlt size={14} /> Create Sheet
               </Link>
            </div>

            {/* Right Section */}
            {isLoggedIn && (
               <div className="text-white text-sm font-medium order-2 md:order-3">
                  <Link
                     to="/"
                     className="hover:text-gray-400"
                     onClick={() => {
                        localStorage.removeItem("NaukariUser");
                        setIsLoggedIn(false);
                     }}
                  >
                     Logout
                  </Link>
               </div>
            )}
         </nav>
      </div>
   );
};

export default UserNavbar;