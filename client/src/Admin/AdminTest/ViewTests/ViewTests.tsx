import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Test {
  _id: string;
  testName: string;
  testDescription: string;
  testTime: number;
}

const ViewTests: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("/api/admin/test/fetchTest");
        setTests(response.data.data);
      } catch (err) {
        setError("Failed to load tests. Please try again later.");
        console.error("Error fetching tests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 space-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {tests?.map((test) => (
        <div
          key={test._id}
          className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl duration-300 ease-in-out"
        >
          {/* Card Header with gradient background */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4">
            <h2 className="text-2xl font-semibold text-white">{test.testName}</h2>
            <span className="text-sm text-gray-200">{new Date(test.testTime).toLocaleDateString()}</span>
          </div>
          
          {/* Card Body */}
          <div className="p-6">
            <p className="text-gray-700 text-base">{test.testDescription}</p>
          </div>

          {/* Card Footer with action button */}
          <div className="bg-gray-100 p-4 text-right">
            <Link
              to={`/admin/test-overview/${test._id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition duration-200">
              View Details
            </Link>
          </div>
        </div>
      ))}
      
      {tests.length === 0 && (
        <div className="text-gray-600 text-center col-span-full">
          No tests available.
        </div>
      )}
    </div>
  );
};

export default ViewTests;
