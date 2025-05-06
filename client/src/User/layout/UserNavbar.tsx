import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaPlus } from "react-icons/fa";
import UserSidebar from "./UserSidebar";

const UserNavbar: React.FC = () => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
   const navigate = useNavigate();

   useEffect(() => {
      const user = localStorage.getItem("NaukariUser");
      setIsLoggedIn(!!user);
   }, []);

   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };

   const handleLogout = async () => {
      try {
         localStorage.removeItem("NaukariUser");
         setIsLoggedIn(false);
      } catch (error) {
         console.log(error);
      }
   };

   const navLinks = [
      {
         label: "Goal",
         to: "/user/createStudyPlan",
         icon: <FaPlus size={12} />,
         className: "bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg shadow",
      },
   ];

   return (
      <div>
         {isLoggedIn && <UserSidebar isOpen={isOpen} setIsOpen={setIsOpen} />}

         <nav className="flex items-center justify-between w-full h-16 px-6 bg-black shadow-xl z-50 border-b border-gray-700">
            {/* Left Section */}
            <div className="flex items-center text-white">
               {isLoggedIn ? (
                  <div onClick={toggleMenu} className="cursor-pointer">
                     {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                  </div>
               ) : (
                  <div className="flex space-x-4">
                     <button
                        className="w-auto sm:w-36 py-1 px-3 sm:py-2 sm:px-4 bg-green-500 text-black font-semibold rounded-lg shadow-md hover:bg-green-600 transform hover:scale-105 transition duration-300 ease-in-out"
                        onClick={() => navigate("/student-login")}
                     >
                        Student Login
                     </button>
                  </div>
               )}
            </div>

            {/* Logo (Centered) */}
            <Link
               to="/"
               className="text-xl md:text-2xl font-bold text-white tracking-wide"
            >
               Goal Tracker
            </Link>

            {/* Navigation Links (Right) */}
            <div
               className={`${
                  isLoggedIn ? "flex" : "hidden"
               } flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-white text-sm font-medium`}
            >
               {navLinks.map((link, index) => (
                  <Link
                     key={index}
                     to={link.to}
                     className={`flex items-center gap-1 ${link.className}`}
                  >
                     {link.icon} {link.label}
                  </Link>
               ))}
            </div>

            {/* Logout (Far Right) */}
            {isLoggedIn && (
               <div className="text-white text-sm font-medium">
                  <Link
                     to="/"
                     className="hover:text-gray-400"
                     onClick={handleLogout}
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
