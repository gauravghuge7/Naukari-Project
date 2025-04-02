// src/components/StudentSignUp.tsx
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { extractErrorMessage } from '../../Components/ResponseError/ResponseError';

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
   const [otpPopup, setOtpPopup] = useState(false);
   const { studentEmail, studentPassword, confirmPassword, studentPhone, studentName } = formState;
   const [message, setMessage] = useState<string | null>("");
   const [apiResponse, setApiResponse] = useState<boolean>(false);
   const [otp, setOtp] = useState('');
   const navigate = useNavigate(); // Added for navigation

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormState((prevState) => ({
         ...prevState,
         [id]: value
      }));
   };

   const sendOtpToEmail = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!studentEmail || !studentPassword || !confirmPassword || !studentPhone || !studentName) {
         setError('All fields are required.');
         return;
      }
      if (studentPassword !== confirmPassword) {
         setError('Passwords do not match.');
         return;
      }
      try {
         const body = { studentEmail, studentPassword, studentPhone, studentName };
         const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };
         setApiResponse(true);
         setMessage("Sending OTP to " + studentEmail + "...");
         const response = await axios.post("/api/student/sendOtp", body, config);
         console.log(response);
         setMessage("");
         if (response.data.success) {
            toast.success(response.data.message);
            setMessage("OTP sent successfully");
            setOtpPopup(true);
         } 
      } 
      catch (error) {
         console.error("Registration error:", error);
         setMessage("");
         const message = extractErrorMessage((error as AxiosError)?.response?.data as string);
         setMessage(message);
         toast.error(message);
      }
   };

   const verifyOtp = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         const body = { studentEmail, studentPassword, studentPhone, studentName, otp };
         const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };
         setMessage("Verifying OTP...");
         const response = await axios.post("/api/student/verifyAndRegister", body, config);
         setMessage("");
         if (response.data.success) {
            toast.success(response.data.message);
            window.location.href = "/student-login";
         } else {
            toast.error(response.data.message);
         }
      } catch (error) {
         console.error("Registration error:", error);
         const message = extractErrorMessage((error as AxiosError)?.response?.data as string);
         setMessage(message);
         toast.error(message);
      }
   };

   const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
   const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);
   const handleBack = () => navigate(-1); // Navigate back to the previous page

   if (otpPopup) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-black">
            <ToastContainer position="top-right" theme="dark" />
            <div className="w-full max-w-md p-8 bg-black rounded-xl shadow-2xl border border-gray-900 transform transition-all duration-300 hover:scale-105">
               <h2 className="text-3xl font-extrabold text-white mb-6 text-center">Verify OTP</h2>
               {message && <p className="text-green-400 text-center mb-4 animate-pulse">{message}</p>}
               <div className="mb-6">
                  <label htmlFor="otp" className="block text-gray-200 text-sm font-medium mb-2">Enter OTP</label>
                  <input
                     type="text"
                     id="otp"
                     value={otp}
                     onChange={(e) => setOtp(e.target.value)}
                     className="w-full p-3 bg-gray-950 border border-gray-900 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                     placeholder="Enter your OTP"
                     required
                  />
               </div>
               <button
                  type="submit"
                  onClick={verifyOtp}
                  className="w-full py-3 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-600 transition duration-300 shadow-md"
               >
                  Verify OTP
               </button>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
         <ToastContainer position="top-right" theme="dark" />
         <div className="w-full max-w-4xl flex flex-col md:flex-row bg-black rounded-xl shadow-2xl border border-gray-900 overflow-hidden">
            {/* Left Side: Signup Form */}
            <div className="w-full md:w-1/2 p-8">
               <h2 className="text-3xl font-extrabold text-white mb-6 text-center">Student Sign Up</h2>
               {error && (
                  <div className="mb-4 p-3 bg-red-950 text-red-300 border border-red-900 rounded-lg text-center animate-bounce">
                     {error}
                  </div>
               )}
               {apiResponse && message && (
                  <div className="mb-4 p-3 bg-green-950 text-green-300 border border-green-900 rounded-lg relative flex items-center justify-between">
                     <p>{message}</p>
                     <button
                        onClick={() => setMessage('')}
                        className="text-green-400 hover:text-green-600"
                        aria-label="Close message"
                     >
                        ×
                     </button>
                  </div>
               )}
               <form onSubmit={sendOtpToEmail}>
                  <div className="mb-5">
                     <label htmlFor="studentName" className="block text-gray-200 text-sm font-medium mb-2">Full Name</label>
                     <input
                        type="text"
                        id="studentName"
                        value={studentName}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-950 border border-gray-900 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        placeholder="Enter your full name"
                        required
                     />
                  </div>
                  <div className="mb-5">
                     <label htmlFor="studentEmail" className="block text-gray-200 text-sm font-medium mb-2">Email</label>
                     <input
                        type="email"
                        id="studentEmail"
                        value={studentEmail}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-950 border border-gray-900 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        placeholder="Enter your email"
                        required
                     />
                  </div>
                  <div className="mb-5">
                     <label htmlFor="studentPhone" className="block text-gray-200 text-sm font-medium mb-2">Phone Number</label>
                     <input
                        type="tel"
                        id="studentPhone"
                        value={studentPhone}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-950 border border-gray-900 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        placeholder="Enter your phone number"
                        required
                     />
                  </div>
                  <div className="mb-5 relative">
                     <label htmlFor="studentPassword" className="block text-gray-200 text-sm font-medium mb-2">Password</label>
                     <input
                        type={showPassword ? 'text' : 'password'}
                        id="studentPassword"
                        value={studentPassword}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-950 border border-gray-900 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        placeholder="Enter your password"
                        required
                     />
                     <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center px-3 mt-6 text-gray-400 hover:text-gray-200"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                     >
                        {showPassword ? 'Hide' : 'Show'}
                     </button>
                  </div>
                  <div className="mb-6 relative">
                     <label htmlFor="confirmPassword" className="block text-gray-200 text-sm font-medium mb-2">Confirm Password</label>
                     <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-950 border border-gray-900 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        placeholder="Confirm your password"
                        required
                     />
                     <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center px-3 mt-6 text-gray-400 hover:text-gray-200"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                     >
                        {showConfirmPassword ? 'Hide' : 'Show'}
                     </button>
                  </div>
                  <button
                     type="submit"
                     className="w-full py-3 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-600 transition duration-300 shadow-md"
                  >
                     Sign Up
                  </button>
               </form>
               <div className="mt-4 text-center">
                  <Link
                     to="/student-login"
                     className="text-green-400 hover:text-green-500 transition duration-300 font-medium"
                  >
                     Already have an account? Login
                  </Link>
               </div>
            </div>

            {/* Right Side: Content or Image with Back Button */}
            <div className="w-full md:w-1/2 bg-black p-8 flex flex-col justify-between items-center text-white border-l border-gray-900 relative">
               <button
                  onClick={handleBack}
                  className="absolute top-4 right-4 p-2 bg-gray-950 text-white rounded-full hover:bg-gray-900 transition duration-200 shadow-md"
                  aria-label="Go back"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="w-5 h-5"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                     />
                  </svg>
               </button>
               <div className="flex flex-col justify-center items-center flex-grow">
                  <h3 className="text-2xl font-bold mb-4">Welcome to Your Journey</h3>
                  <p className="text-gray-200 text-center mb-6">
                     Sign up to unlock a world of opportunities. Connect with peers, access resources, and start building your future today!
                  </p>
                  {/* Replace with an image if preferred */}
                  <div className="w-full h-64 bg-gray-950 rounded-lg flex items-center justify-center text-gray-400">
                     <span>Image Placeholder (e.g., Student Illustration)</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default StudentSignUp;