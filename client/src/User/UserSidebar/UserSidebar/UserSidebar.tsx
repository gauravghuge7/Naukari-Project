// src/components/UserSidebar.jsx

import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa"; // Importing an icon for the close button

const UserSidebar: React.FC<{ isOpen: boolean; setIsOpen: (isOpen: boolean) => void }> = ({ isOpen, setIsOpen }) => {

   // Function to handle the closing of the sidebar
   const handleCloseSidebar = () => {
      setIsOpen(false);
   };

   return (
      <div className={`h-screen w-64 bg-gray-800 mt-20 text-white p-4 fixed top-0 left-0 transition-transform duration-700  ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         {/* Close Button */}
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">User Menu</h2>
            <button onClick={handleCloseSidebar} className="text-white focus:outline-none">
               <FaTimes size={24} />
            </button>
         </div>
         
         <nav>
            <ul>
               <li className="mb-2">
                  <Link
                     to="/user/dashboard"
                     className="block py-2 px-4 rounded hover:bg-gray-700 transition"
                     onClick={handleCloseSidebar} // Optionally close sidebar on link click
                  >
                     Dashboard
                  </Link>
               </li>
               <li className="mb-2">
                  <Link
                     to="/user/profile"
                     className="block py-2 px-4 rounded hover:bg-gray-700 transition"
                     onClick={handleCloseSidebar} // Optionally close sidebar on link click
                  >
                     Profile
                  </Link>
               </li>

               <li className="mb-2">
                  <Link
                     to="/user/myTest"
                     className="block py-2 px-4 rounded hover:bg-gray-700 transition"
                     onClick={handleCloseSidebar} // Optionally close sidebar on link click
                  >
                     my Tests
                  </Link>
               </li>

         
               
               <li className="mb-2">
                  <Link
                     to="/user/Test"
                     className="block py-2 px-4 rounded hover:bg-gray-700 transition"
                     onClick={handleCloseSidebar} // Optionally close sidebar on link click
                  >
                     Tests
                  </Link>
               </li>

            </ul>
         </nav>
      </div>
   );
};

export default UserSidebar;
