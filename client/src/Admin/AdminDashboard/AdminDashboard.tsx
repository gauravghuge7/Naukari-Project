import React from 'react';
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-3">
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/2 p-4">
          <div className="shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">Create Test</h2>
            <p className="mb-4">Create a new test for your students.</p>
            <Link to="/admin/test" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Test
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <div className="shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">Monitor Tests</h2>
            <p className="mb-4">View and monitor the progress of your tests.</p>
            <Link to="/admin/test" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Monitor Tests
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
