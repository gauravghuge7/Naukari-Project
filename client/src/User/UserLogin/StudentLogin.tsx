import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // Import Auth0 React SDK
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles
import { extractErrorMessage } from '../../Components/ResponseError/ResponseError';

interface LoginFormState {
  studentEmail: string;
  studentPassword: string;
}

const StudentLogin: React.FC = () => {
  const [formState, setFormState] = useState<LoginFormState>({
    studentEmail: '',
    studentPassword: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false); // Toggle between login and sign-up

  // Auth0 methods
  const { loginWithPopup, user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value
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
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      };

      // API call to login student
      const response = await axios.post('/api/student/login', body, config);
      if (response.data.success) {
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

  const handleGoogleLogin = async () => {
    try {
      // Show Google login popup
      await loginWithPopup({
        connection: 'google-oauth2'
      });

      const claims = await getIdTokenClaims();
      const email = claims?.email;

      if (email) {
        // Send the email to the backend for login or registration
      
          const body = { 
            studentEmail: email, 
            studentPassword: user?.name

          };

          const config = {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        };

        const response = await axios.post('/api/student/login', body, config);
        if (response.data.success) {
          toast.success('Logged in with Google successfully!');
          window.location.href = '/user/profile';
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to log in with Google.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-green-300 to-red-300">
      <ToastContainer position="top-right" />

      <div className="flex w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Informative Text Column */}
        <div className="hidden lg:flex lg:w-1/2 lg:pr-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-gray-700">
              Please log in to your account to access your student portal.
              If you don’t have an account, you can create one easily!
            </p>
            <p className="text-gray-700">
              Ensure you enter the correct email and password associated with your account.
            </p>
            <p className="text-gray-700">
              If you encounter any issues, feel free to contact support for assistance.
            </p>
          </div>
        </div>

        {/* Login Form Column */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            {showSignUp ? 'Student Sign Up' : 'Student Login'}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="studentEmail" className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="studentEmail"
                value={formState.studentEmail}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="studentPassword" className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="studentPassword"
                value={formState.studentPassword}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300"
            >
              {showSignUp ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300"
            >
              Login with Google
            </button>
          </div>

          <div className="mt-6 text-center">
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
    </div>
  );
};

export default StudentLogin;
