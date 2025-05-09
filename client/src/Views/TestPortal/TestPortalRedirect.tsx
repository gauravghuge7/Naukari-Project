import React from "react";
import { Button } from "../../components/ui/button"; // Update path if needed

interface TestPortalRedirectProps {
  portalUrl?: string; // Optional, in case you want to pass it as a prop
}

const TestPortalRedirect: React.FC<TestPortalRedirectProps> = ({
  portalUrl = "https://smartexamino.netlify.app/", // Replace with your actual test portal URL
}) => {
  const handleRedirect = () => {
    window.open(portalUrl, "_blank");
  };

  return (
    <div className="flex flex-col  shadow-xl mt-20 shadow-gray-600 items-center justify-center p-6 sm:p-8 rounded-xl shadow-2xl bg-white text-black w-full max-w-md mx-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center text-black">
        Access Your Test Portal
      </h2>
      <p className="text-black-300 text-sm sm:text-base text-center mb-6 leading-relaxed">
        Explore our SmartExam Test Portal, designed to streamline your testing experience. Practice with interactive quizzes, track your progress, and prepare for success with real-time feedback and personalized insights.
      </p>
      <Button
        onClick={handleRedirect}
        className="px-6 py-3 text-base sm:text-lg bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition duration-300"
      >
        Go to Test Portal
      </Button>
    </div>
  );
};

export default TestPortalRedirect;