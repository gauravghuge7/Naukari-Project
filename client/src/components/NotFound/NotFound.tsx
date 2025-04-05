
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for "Back" functionality

const NotFound = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
        {/* 404 Illustration */}
        <div className="mb-6">
          <svg
            className="w-32 h-32 mx-auto text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Title and Description */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Oops! It looks like this page got lost in the study notes. Let's get you back on track!
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-4">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            Back
          </button>

          {/* Go to Home Button */}
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Go to Home
          </Link>
        </div>

        {/* Optional Help Link */}
        <p className="text-sm text-gray-500">
          Need help?{' '}
          <Link to="/support" className="text-blue-500 hover:underline">
            Contact our study guides
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;