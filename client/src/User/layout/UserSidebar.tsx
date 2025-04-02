// src/components/UserSidebar.jsx

import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const UserSidebar: React.FC<{ isOpen: boolean; setIsOpen: (isOpen: boolean) => void }> = ({ isOpen, setIsOpen }) => {
   const handleCloseSidebar = () => {
      setIsOpen(false);
   };

   return (
      <>
         {/* Overlay */}
         {isOpen && (
            <div 
               className="fixed inset-0 bg-black bg-opacity-50 z-40"
               onClick={handleCloseSidebar}
            />
         )}
         
         {/* Sidebar */}
         <div 
            className={`h-screen w-64 bg-black text-gray-200 p-4 fixed top-0 left-0 z-50 transition-transform duration-700 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
         >
            {/* Close Button */}
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-2xl font-bold text-white">User Menu</h2>
               <button 
                  onClick={handleCloseSidebar} 
                  className="text-gray-200 hover:text-white focus:outline-none transition-colors duration-200"
               >
                  <FaTimes size={24} />
               </button>
            </div>
            
            <nav>
               <ul>
                  <li className="mb-3">
                     <Link
                        to="/user/dashboard"
                        className="block py-2.5 px-4 rounded hover:bg-gray-900 text-gray-200 hover:text-white transition-colors duration-200"
                        onClick={handleCloseSidebar}
                     >
                        Dashboard
                     </Link>
                  </li>
                  <li className="mb-3">
                     <Link
                        to="/user/profile"
                        className="block py-2.5 px-4 rounded hover:bg-gray-900 text-gray-200 hover:text-white transition-colors duration-200"
                        onClick={handleCloseSidebar}
                     >
                        Profile
                     </Link>
                  </li>
                  <li className="mb-3">
                     <Link
                        to="/user/myTest"
                        className="block py-2.5 px-4 rounded hover:bg-gray-900 text-gray-200 hover:text-white transition-colors duration-200"
                        onClick={handleCloseSidebar}
                     >
                        My Tests
                     </Link>
                  </li>
                  <li className="mb-3">
                     <Link
                        to="/user/myPlans"
                        className="block py-2.5 px-4 rounded hover:bg-gray-900 text-gray-200 hover:text-white transition-colors duration-200"
                        onClick={handleCloseSidebar}
                     >
                        My Plans
                     </Link>
                  </li>
                  <li className="mb-3">
                     <Link
                        to="/user/create-plan"
                        className="block py-2.5 px-4 rounded hover:bg-gray-900 text-gray-200 hover:text-white transition-colors duration-200"
                        onClick={handleCloseSidebar}
                     >
                        Create Preparation Plan
                     </Link>
                  </li>
                  <li className="mb-3">
                     <Link
                        to="/user/messages"
                        className="block py-2.5 px-4 rounded hover:bg-gray-900 text-gray-200 hover:text-white transition-colors duration-200"
                        onClick={handleCloseSidebar}
                     >
                        Messages
                     </Link>
                  </li>
               </ul>
            </nav>
         </div>
      </>
   );
};

export default UserSidebar;