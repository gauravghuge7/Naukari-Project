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
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center">Access Your Test Portal</h2>
      <Button onClick={handleRedirect} className="px-6 py-2 text-base">
        Go to Test Portal
      </Button>
    </div>
  );
};

export default TestPortalRedirect;
