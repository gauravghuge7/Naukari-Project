import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo and About Section */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold text-white tracking-wide">Student Test Solver</h2>
            <p className="mt-4 text-gray-400 text-sm">
              Empowering education with smart tools for students and admins.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center md:justify-start">
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-indigo-400 transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-gray-300 hover:text-indigo-400 transition duration-300"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-indigo-400 transition duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-indigo-400 transition duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media and Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white">Connect with Me</h3>
            <div className="flex flex-wrap justify-center md:justify-start space-x-4 mt-4">
              <a
                href="https://github.com/gauravghuge7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-300 transition duration-300"
                title="GitHub"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 00-3.16 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.2-1.5-1.2-1.5-1-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 1 1.6 2.5 1.2 3.1.9.1-.7.4-1.2.7-1.5-2.4-.3-4.9-1.2-4.9-5.3 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 .9a10.5 10.5 0 015.5 0c2.1-1.2 3-.9 3-.9.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.1-2.5 5-4.9 5.3.4.3.7 1 .7 1.5v1.8c0 .3.2.6.7.5A10 10 0 0012 2z" />
                </svg>
              </a>
              <a
                href="https://leetcode.com/gauravghuge7/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-500 hover:text-yellow-400 transition duration-300"
                title="LeetCode"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5 21.5l6-6V18h2V6h-2v2.5l-6-6-9 9h3v6h3v-6h3v6h3z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/gaurav-ghuge-530651226/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-500 transition duration-300"
                title="LinkedIn"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 00-12 0v8a6 6 0 0012 0V8zm-6 10a2 2 0 110-4 2 2 0 010 4zm6.5-10h-1.8a3.5 3.5 0 100-2h1.8a2 2 0 110 4z" />
                </svg>
              </a>
              <a
                href="https://hashnode.com/@gauravghuge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition duration-300"
                title="HashNode"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12s4.5 10 10 10 10-4.5 10-10zm-8 2H10v4H8v-4H4v-2h4V8h2v4h4v2z" />
                </svg>
              </a>
              <a
                href="https://medium.com/@gauravghuge737"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-gray-100 transition duration-300"
                title="Medium"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4v16h16V4zM8 6h8v2H8V6zm8 4H8v6h8v-6zm-2 2h-4v2h4v-2z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/garry_7038?igshid=OGY3MTU3OGY1MW=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-400 transition duration-300"
                title="Instagram"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0 4a6 6 0 00-6 6c0 3.3 2.7 6 6 6s6-2.7 6-6-2.7-6-6-6zm4 2a1 1 0 110 2 1 1 0 010-2z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/gauravghuge737"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition duration-300"
                title="Twitter"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
            </div>
            <p className="mt-4 text-gray-400 text-sm">Email: gauravghuge737@gmail.com</p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Student Test Solver. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;