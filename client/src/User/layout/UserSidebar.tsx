// src/components/UserSidebar.tsx

import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

interface UserSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface MenuItem {
  to: string;
  label: string;
}

const UserSidebar: React.FC<UserSidebarProps> = ({ isOpen, setIsOpen }) => {
  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  const menuItems: MenuItem[] = [
    { to: "/user/profile", label: "Profile" },
    { to: "/user/myPlans", label: "My Plans" },
    { to: `/user/dailyTarget/${new Date()}`, label: "Daily Target" },
    { to: "/user/myCalendar", label: "Calendar" },
    { to: "/user/createStudyPlan", label: "Create  Plan" },
    { to: "/user/myTest", label: "Tests" },

  ];

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
        className={`h-screen w-64 bg-black text-gray-200 p-4 fixed top-0 left-0 z-50 transition-transform duration-700 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
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
            {menuItems.map((item) => (
              <li key={item.to} className="mb-3">
                <Link
                  to={item.to}
                  className="block py-2.5 px-4 rounded hover:bg-gray-900 text-gray-200 hover:text-white transition-colors duration-200"
                  // onClick={handleCloseSidebar}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default UserSidebar;