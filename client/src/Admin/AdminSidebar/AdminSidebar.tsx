import React from "react";
import { Link } from "react-router-dom"; // Importing Link for navigation
import { FaTachometerAlt, FaClipboardList, FaUser, FaSignOutAlt, FaTimes } from "react-icons/fa"; // Importing icons

const AdminSidebar = ({ isOpen, setIsOpen }) => {
   return (
      <div
         className={`fixed inset-y-0 left-0 mt-20 transform ${
         isOpen ? "translate-x-0" : "-translate-x-full"
         } transition-transform duration-300 ease-in-out bg-gray-800 text-white w-64 z-50`}
      >
         <div className="flex items-center justify-between h-16 bg-gray-900 px-4 relative">
         <h1 className="text-lg font-semibold">Admin Panel</h1>
         <span
               onClick={() => setIsOpen(false)} // Close sidebar on click
               className="text-gray-400 hover:text-white cursor-pointer"
         >
            <FaTimes size={20} /> {/* Close icon for the sidebar */}
         </span>
         </div>
         <nav className="mt-4">
         <ul>
            <li className="mb-2">
               <Link
               to="/admin/dashboard"
               className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
               >
               <FaTachometerAlt className="mr-3" />
               Dashboard
               </Link>
            </li>
            <li className="mb-2">
               <Link
               to="/admin/test"
               className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
               >
               <FaClipboardList className="mr-3" />
               Create Test
               </Link>
            </li>
            <li className="mb-2">
               <Link
               to="/admin/view-test"
               className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
               >
               <FaClipboardList className="mr-3" />
               View Test
               </Link>
            </li>
            <li className="mb-2">
               <Link
               to="/admin/profile"
               className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
               >
               <FaUser className="mr-3" />
               Profile
               </Link>
            </li>
         </ul>
         </nav>
      
      </div>
   );
};

export default AdminSidebar;
