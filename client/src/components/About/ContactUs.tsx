import { Mail, Phone,  Linkedin, Github, Globe } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="mt-60 flex justify-center">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">About Me</h1>

        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Gaurav Ghuge</h2>
          <p className="text-gray-500">Aurangabad, Maharashtra, India</p>
        </div>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-blue-600" />
            <a href="mailto:gauravghuge737@gmail.com" className="hover:underline">
              gauravghuge737@gmail.com
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-green-600" />
            <span>+91 8767482793</span>
          </div>

          <div className="flex items-center space-x-3">
            <Linkedin className="w-5 h-5 text-blue-700" />
            <a
              href="https://www.linkedin.com/in/gaurav-ghuge/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              linkedin.com/in/gaurav-ghuge
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-purple-600" />
            <a
              href="https://hashnode.com/@gauravghuge"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              hashnode.com/@gauravghuge
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <Github className="w-5 h-5 text-gray-800" />
            <a
              href="https://github.com/gauravghuge7"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              github.com/gauravghuge7
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;