import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { extractErrorMessage } from '../../components/ResponseError/ResponseError';

interface LoginFormState {
  studentEmail: string;
  studentPassword: string;
}

const StudentLogin: React.FC = () => {
  const [formState, setFormState] = useState<LoginFormState>({
    studentEmail: '',
    studentPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);

  const { loginWithPopup, user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { studentEmail, studentPassword } = formState;

    if (!studentEmail || !studentPassword) {
      setError('Both email and password are required.');
      return;
    }

    try {
      const body = { studentEmail, studentPassword };
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      const response = await axios.post('/api/student/login', body, config);
      if (response.data.success) {
        localStorage.setItem('NaukariUser', 'user');
        toast.success(response.data.message);
        window.location.href = '/user/profile';
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      const message = extractErrorMessage((error as AxiosError)?.response?.data as string);
      toast.error(message);
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const setTestCredentials = () => {
    setFormState({
      studentEmail: 'ghugegaurav43@gmail.com',
      studentPassword: 'gaurav',
    });
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-black text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" theme="dark" />

      {/* Main Container */}
      <div className="relative z-10 flex w-full max-w-4xl mx-4 p-8 bg-gray-900 rounded-xl shadow-2xl border border-gray-800">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 right-4 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transform hover:scale-105 transition duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        {/* Informative Text Column */}
        <div className="hidden lg:flex lg:w-1/2 lg:pr-10 flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-4">Welcome Back!</h2>
          <p className="text-gray-300">
            Log in to access your student dashboard, track your progress, and explore our powerful tools.
          </p>
          <p className="text-gray-300 mt-4">
            New here? Sign up to join our community and unlock a world of learning opportunities!
          </p>
        </div>

        {/* Login Form Column */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            {showSignUp ? 'Student Sign Up' : 'Student Login'}
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-900 text-red-200 border border-red-800 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="studentEmail" className="block text-gray-200 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="studentEmail"
                value={formState.studentEmail}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="studentPassword" className="block text-gray-200 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="studentPassword"
                value={formState.studentPassword}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-indigo-400 transition duration-300"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <button
              type="button"
              onClick={setTestCredentials}
              className="w-full py-3 px-4 bg-yellow-500 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-600 transform hover:scale-105 transition duration-300"
            >
              Use Test Credentials
            </button>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transform hover:scale-105 transition duration-300"
            >
              {showSignUp ? 'Sign Up' : 'Login'}
            </button>
          </form>

          {/* <div className="mt-6 text-center">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition duration-300"
            >
              Login with Google
            </button>
          </div> */}

          <div className="mt-6 text-center">
            <Link
              to={showSignUp ? '/login' : '/student-register'}
              className="text-indigo-400 hover:text-indigo-300 transition duration-300"
              onClick={() => setShowSignUp(!showSignUp)}
            >
              {showSignUp ? 'Already have an account? Login' : 'New user? Sign Up'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;