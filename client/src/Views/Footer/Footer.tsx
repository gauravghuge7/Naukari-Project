


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About Section */}
          <div>
            <h2 className="text-xl font-semibold text-white">Student Test Solver</h2>
            <p className="mt-4 text-gray-500">
              Simplifying the learning process, one test at a time.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center md:justify-start">
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-white">Home</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">Features</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">About</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social Media and Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-medium text-white">Connect with Us</h3>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <p className="mt-4 text-gray-500">Email: gauravghuge737@gmail.com</p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          &copy; {new Date().getFullYear()} Student Test Solver. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
