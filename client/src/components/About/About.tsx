// pages/about.js
import {Link} from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900 p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-white">
          About <span className="text-cyan-400">MputeTest</span>
        </h1>

        {/* Gaurav Ghuge Card */}
        <Card className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 transition-transform transform hover:scale-105 duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-cyan-400">
              Gaurav Ghuge - Founder of MputeTest
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Image Placeholder */}
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQHKJAINVKWP3A/profile-displayphoto-shrink_800_800/B56ZQidPCRHoAc-/0/1735744877406?e=1747267200&v=beta&t=FlhJUGZ5r93uCABJHxzW461iszwz8qrP2CB32M2HRwI" // Replace with your actual photo URL or local path
                alt="Gaurav Ghuge"
                className="w-32 h-32 rounded-full object-cover border-2 border-cyan-500"
              />
              <div className="text-gray-300">
                <p className="text-lg font-medium text-white mb-2">
                  Software Developer 
                </p>
                <p className="text-base mb-2">
                  <span className="font-semibold">Education:</span> Bachelor’s in Computer Science, Maratha Shikshan Sanstha's Late Pandharinath Patil Institute of Management Studies (BAMU University, 2022 - 2025)
                </p>
                <p className="text-base mb-2">
                  <span className="font-semibold">Location:</span> Aurangabad, Maharashtra, India
                </p>
                <p className="text-base mb-4">
                  I’m Gaurav Ghuge, the founder of MputeTest—a platform born from my passion for technology and problem-solving. As a full-stack developer skilled in MERN stack, Java, and more, I created MputeTest to empower users with a cross-platform tool to diagnose and optimize computer performance. My journey includes building impactful projects like the Laptop Checker App during my internship at Arohi Softwares. I’m driven to innovate and deliver solutions that make tech accessible and effective for everyone.
                </p>
                <Link to="https://www.linkedin.com/in/gaurav-ghuge-530651226/" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="bg-transparent border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all duration-300"
                  >
                    View LinkedIn Profile
                  </Button>
                </Link>
              </div>
            </div>
            {/* Key Skills */}
            <div>
              <p className="text-sm text-gray-400 font-semibold">Key Skills:</p>
              <ul className="text-sm text-gray-300 list-disc list-inside">
                <li>Java, C++, JavaScript, TypeScript</li>
                <li>MERN Stack (MongoDB, Express.js, React, Node.js)</li>
                <li>Next.js, Spring (Learning), Data Structures</li>
                <li>AWS, Docker, RESTful APIs</li>
              </ul>
            </div>
            {/* About MputeTest */}
            <div>
              <p className="text-sm text-gray-400 font-semibold">About MputeTest:</p>
              <p className="text-base text-gray-300">
                MputeTest is my vision to simplify computer diagnostics. Inspired by my experiences developing tools like the Laptop Checker App, I built this platform to provide fast, reliable insights into hardware and software health. Whether you’re a student, professional, or tech enthusiast, MputeTest is here to help you understand and optimize your system. Download the app and join me in making technology work better for all!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}