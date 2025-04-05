import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo and About Section */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold text-white tracking-wide">Goal Manager</h2>
            <p className="mt-4 text-gray-400 text-sm">
              Plan, track, and achieve your goals effectively with our smart tools. Stay organized with timers and reminders.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center md:justify-start">
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-indigo-400 transition duration-300">Home</Link></li>
              <li><Link to="/features" className="text-gray-300 hover:text-indigo-400 transition duration-300">Features</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-indigo-400 transition duration-300">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-indigo-400 transition duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Social Media and Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white">Connect with Me</h3>
            <div className="flex flex-wrap justify-center md:justify-start space-x-4 mt-4">
              <a href="https://github.com/gauravghuge7" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 transition duration-300" title="GitHub">GitHub</a>
              <a href="https://leetcode.com/gauravghuge7/" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 transition duration-300" title="LeetCode">LeetCode</a>
              <a href="https://www.linkedin.com/in/gaurav-ghuge-530651226/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 transition duration-300" title="LinkedIn">LinkedIn</a>
              <a href="https://medium.com/@gauravghuge737" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-gray-100 transition duration-300" title="Medium">Medium</a>
              <a href="https://hashnode.com/@gauravghuge" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition duration-300" title="Hashnode">Hashnode</a>
              <a href="https://instagram.com/garry_7038?igshid=OGY3MTU3OGY1MW==" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400 transition duration-300" title="Instagram">Instagram</a>
              <a href="https://twitter.com/gauravghuge737" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition duration-300" title="Twitter">Twitter</a>
            </div>
            <p className="mt-4 text-gray-400 text-sm">Email: gauravghuge737@gmail.com</p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Goal Manager. Stay productive and achieve your dreams with efficient planning.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
