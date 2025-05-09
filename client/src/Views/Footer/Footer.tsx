import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaMedium, FaCode, FaBlog } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Logo and About Section */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Goal Manager
            </h2>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs">
              Plan, track, and conquer your goals with our cutting-edge tools. Stay on top with timers and reminders!
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center sm:justify-start">
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-indigo-500 transform hover:scale-105 transition duration-300 text-sm sm:text-base"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-gray-300 hover:text-indigo-500 transform hover:scale-105 transition duration-300 text-sm sm:text-base"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-indigo-500 transform hover:scale-105 transition duration-300 text-sm sm:text-base"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-indigo-500 transform hover:scale-105 transition duration-300 text-sm sm:text-base"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media and Contact */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-lg font-bold text-white sm:text-xl">Connect with Me</h3>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
              <a
                href="https://github.com/gauravghuge7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transform hover:scale-110 transition duration-300"
                title="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://leetcode.com/gauravghuge7/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-300 transform hover:scale-110 transition duration-300"
                title="LeetCode"
              >
                <FaCode size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/gaurav-ghuge-530651226/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transform hover:scale-110 transition duration-300"
                title="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://medium.com/@gauravghuge737"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-gray-100 transform hover:scale-110 transition duration-300"
                title="Medium"
              >
                <FaMedium size={24} />
              </a>
              <a
                href="https://hashnode.com/@gauravghuge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transform hover:scale-110 transition duration-300"
                title="Hashnode"
              >
                <FaBlog size={24} />
              </a>
              <a
                href="https://instagram.com/garry_7038?igshid=OGY3MTU3OGY1MW=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-400 transform hover:scale-110 transition duration-300"
                title="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com/gauravghuge737"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transform hover:scale-110 transition duration-300"
                title="Twitter"
              >
                <FaTwitter size={24} />
              </a>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Email: <a href="mailto:gauravghuge737@gmail.com" className="hover:text-indigo-500 transition duration-300">gauravghuge737@gmail.com</a>
            </p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Goal Manager. Empowering you to achieve your dreams!
        </div>
      </div>
    </footer>
  );
};

export default Footer;