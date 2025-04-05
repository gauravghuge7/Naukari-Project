import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { extractErrorMessage } from '../../components/ResponseError/ResponseError';
import { useNavigate } from 'react-router-dom';

interface LoginFormState {
   adminEmail: string;
   adminPassword: string;
}

const AdminLogin: React.FC = () => {
   const navigate = useNavigate();
   const [formState, setFormState] = useState<LoginFormState>({
      adminEmail: '',
      adminPassword: ''
   });

   const [error, setError] = useState<string | null>(null);
   const [showPassword, setShowPassword] = useState<boolean>(false);

   // Handle form submission
   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
         const { adminEmail, adminPassword } = formState;

         if (!adminEmail || !adminPassword) {
            setError('Both fields are required.');
            return;
         }

         const body = { adminEmail, adminPassword };
         const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
         };

         const response = await axios.post("/api/admin/login", body, config);
         
         if (response.data.success) {
            localStorage.setItem("NaukariAdmin", "admin");
            toast.success(response.data.message);
            window.location.href = '/admin';
         } else {
            toast.error(response.data.message);
         }
      } catch (error) {
         const message = extractErrorMessage((error as AxiosError)?.response?.data as string);
         setError(message);
         toast.error(message);
      }
   };

   // Toggle password visibility
   const togglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
   };

   // Set test credentials
   const setTestCredentials = () => {
      setFormState({
         adminEmail: 'gaurav@admin.com',
         adminPassword: 'gaurav'
      });
   };

   return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
         <ToastContainer position="top-right" />
         
         <div className="w-full max-w-md p-8 bg-gray-900 shadow-md rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-200 text-center">Admin Login</h2>
            
            {error && (
               <div className="mb-4 p-3 bg-red-600 text-white border border-red-400 rounded-md">
                  {error}
               </div>
            )}

            <form onSubmit={handleSubmit}>
               <div className="mb-4">
                  <label htmlFor="adminEmail" className="block text-gray-400 text-sm font-medium mb-1">Email</label>
                  <input
                     type="email"
                     id="adminEmail"
                     value={formState.adminEmail}
                     onChange={(e) => setFormState({ ...formState, adminEmail: e.target.value })}
                     className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Enter your email"
                     required
                  />
               </div>
               
               <div className="mb-6 relative">
                  <label htmlFor="adminPassword" className="block text-gray-400 text-sm font-medium mb-1">Password</label>
                  <input
                     type={showPassword ? 'text' : 'password'}
                     id="adminPassword"
                     value={formState.adminPassword}
                     onChange={(e) => setFormState({ ...formState, adminPassword: e.target.value })}
                     className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Enter your password"
                     required
                  />
                  <button
                     type="button"
                     onClick={togglePasswordVisibility}
                     className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white"
                     aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                     {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9 9 9-9-9-9-9 9z" />
                        </svg>
                     ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 12l9 9 9-9-9-9-9 9z" />
                        </svg>
                     )}
                  </button>
               </div>

               <button
                  type="button"
                  onClick={setTestCredentials}
                  className="w-full py-3 px-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300 mb-4"
               >
                  Use Test Credentials
               </button>

               <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
               >
                  Login
               </button>

               <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-full mt-4 py-3 px-4 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-600 transition duration-300"
               >
                  Back
               </button>
            </form>
         </div>
      </div>
   );
};

export default AdminLogin;
