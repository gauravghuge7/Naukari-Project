// src/components/StudentSignUp.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SignUpFormState {
   studentEmail: string;
   studentPassword: string;
   studentPhone: string;
   studentName: string;
   confirmPassword: string;
}

const StudentSignUp: React.FC = () => {
   const [formState, setFormState] = useState<SignUpFormState>({
      studentEmail: '',
      studentPassword: '',
      studentPhone: '',
      studentName: '',
      confirmPassword: ''
   });

   const [error, setError] = useState<string | null>(null);
   const [showPassword, setShowPassword] = useState<boolean>(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormState((prevState) => ({
         ...prevState,
         [id]: value
      }));
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      const { studentEmail, studentPassword, confirmPassword, studentPhone, studentName } = formState;

      // Basic validation
      if (!studentEmail || !studentPassword || !confirmPassword || !studentPhone || !studentName) {
         setError('All fields are required.');
         return;
      }

      if (studentPassword !== confirmPassword) {
         setError('Passwords do not match.');
         return;
      }

      // Here you would typically handle form submission
      console.log('Student Email:', studentEmail);
      console.log('Student Password:', studentPassword);
      console.log('Student Phone:', studentPhone);
      console.log('Student Name:', studentName);

      // Reset error on successful submit
      setError(null);
   };

   const togglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
   };

   const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword((prevState) => !prevState);
   };

   return (
      <div className="flex items-center justify-center min-h-screen mt-20 bg-gray-100">
         <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Sign Up</h2>
            {error && (
               <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded-md">
                  {error}
               </div>
            )}

            <form onSubmit={handleSubmit}>
               <div className="mb-4">
                  <label htmlFor="studentName" className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
                  <input
                     type="text"
                     id="studentName"
                     value={formState.studentName}
                     onChange={handleChange}
                     className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Enter your full name"
                     required
                  />
               </div>

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

               <div className="mb-4">
                  <label htmlFor="studentPhone" className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
                  <input
                     type="tel"
                     id="studentPhone"
                     value={formState.studentPhone}
                     onChange={handleChange}
                     className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Enter your phone number"
                     required
                  />
               </div>

               <div className="mb-4 relative">
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

               <div className="mb-6 relative">
                  <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-1">Confirm Password</label>
                  <input
                     type={showConfirmPassword ? 'text' : 'password'}
                     id="confirmPassword"
                     value={formState.confirmPassword}
                     onChange={handleChange}
                     className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Confirm your password"
                     required
                  />
                  <button
                     type="button"
                     onClick={toggleConfirmPasswordVisibility}
                     className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                     aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                     {showConfirmPassword ? (
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
                  Sign Up
               </button>
            </form>


            <div className="mt-4 text-center">
               <Link
                  to={'/student-login'}
                  className="text-blue-500 hover:text-blue-600 transition duration-300"
               >
                  {'Already have an account? Login'}
               </Link>
            </div>
         </div>
      </div>
   );
};

export default StudentSignUp;
