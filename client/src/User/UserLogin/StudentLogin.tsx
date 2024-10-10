// src/components/StudentLogin.tsx
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { extractErrorMessage } from '../../Components/ResponseError/ResponseError';

interface LoginFormState {
   studentEmail: string;
   studentPassword: string;
   studentPhone?: string; // Optional for sign-up
}

const StudentLogin: React.FC = () => {

   const [formState, setFormState] = useState<LoginFormState>({
      studentEmail: '',
      studentPassword: '',
      studentPhone: ''
   });

   const [error, setError] = useState<string | null>(null);
   const [showPassword, setShowPassword] = useState<boolean>(false);
   const [showSignUp, setShowSignUp] = useState<boolean>(false); // Toggle between login and sign-up

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormState((prevState) => ({
         ...prevState,
         [id]: value
      }));
   };

   const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();

      const { studentEmail, studentPassword } = formState;

      // Basic validation
      if (!studentEmail || !studentPassword) {
         setError('Both email and password are required.');
         return;
      }

      try {
         const body = {
            studentEmail,
            studentPassword
         };

         const config = {
            headers: {
               'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
         }

         // API call to login student
         const response = await axios.post("/api/student/login", body, config);
         console.log(response.data);

         if (response.data.success) {
            toast.success(response.data.message);
            window.location.href = "/user/profile";
         } 
         else {
            toast.error(response.data.message);
         }
      } 
      catch (error) {
         console.error("Login error:", error);
         const message = extractErrorMessage(error.response.data);
         toast.error(message);
         
      }
   };

   const togglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
   };

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">

         <ToastContainer
            position="top-right" 
         />

         <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
               {showSignUp ? 'Student Sign Up' : 'Student Login'}
            </h2>
            {error && (
               <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded-md">
                  {error}
               </div>
            )}

            <form onSubmit={handleSubmit}>
               {!showSignUp && (
                  <>
                     <div className="mb-4">
                        <label htmlFor="studentEmail" className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                        <input
                           type="email"
                           id="studentEmail"
                           value={formState.studentEmail}
                           onChange={handleChange}
                           className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="Enter your email"
                           required
                        />
                     </div>

                     <div className="mb-6 relative">
                        <label htmlFor="studentPassword" className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                        <input
                           type={showPassword ? 'text' : 'password'}
                           id="studentPassword"
                           value={formState.studentPassword}
                           onChange={handleChange}
                           className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="Enter your password"
                           required
                        />
                        <button
                           type="button"
                           onClick={togglePasswordVisibility}
                           className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                           aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                           {showPassword ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9 9 9-9-9-9-9 9z" />
                              </svg>
                           ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 12l9 9 9-9-9-9-9 9z" />
                              </svg>
                           )}
                        </button>
                     </div>

                     <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                     >
                        Login
                     </button>
                  </>
               )}

               
            </form>

            <div className="mt-4 text-center">
               <Link
                  to={showSignUp ? '/login' : '/student-register'}
                  className="text-blue-500 hover:text-blue-600 transition duration-300"
                  onClick={() => setShowSignUp(!showSignUp)}
               >
                  {showSignUp ? 'Already have an account? Login' : 'New user? Sign Up'}
               </Link>
            </div>
         </div>
      </div>
   );
};

export default StudentLogin;
