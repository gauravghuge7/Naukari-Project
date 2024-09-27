import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState } from 'react';
import axios from 'axios';

const AdminSignUp: React.FC = () => {
   const [adminName, setAdminName] = useState('');
   const [adminEmail, setAdminEmail] = useState('');
   const [adminPassword, setAdminPassword] = useState('');

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      try {

         const body = {
            adminName,
            adminEmail,
            adminPassword
         };

         // API call to register admin
         const response = await axios.post("/api/admin/register", body);

         console.log(response.data);
         
         if (response.data.success) {
            toast.success(response.data.message);
         } 
         else {
            toast.error(response.data.message);
         }

      
         

      } 
      catch (error) {
         console.error("Registration error:", error);
         toast.error(error?.message);
      }
   };

   return (
      <div>

         <ToastContainer
            position="top-right" 
         />

         {/* Form to Register Admin */}
         <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="mb-4">
               <label htmlFor="adminName" className="block text-gray-700 font-bold mb-2">Name:</label>
               <input
                  type="text"
                  id="adminName"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>

            <div className="mb-4">
               <label htmlFor="adminEmail" className="block text-gray-700 font-bold mb-2">Email:</label>
               <input
                  type="email"
                  id="adminEmail"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>

            <div className="mb-4">
               <label htmlFor="adminPassword" className="block text-gray-700 font-bold mb-2">Password:</label>
               <input
                  type="password"
                  id="adminPassword"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>
            
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
               Sign Up
            </button>
         </form>

      
         
      </div>
   );
}

export default AdminSignUp;
