import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams
import { ToastContainer } from "react-toastify";

// Interface for the test details data
interface TestDetails {
  _id: string;
  testName: string;
  testDescription: string;
  createdAt: string;
  numberOfQuestions: number;
  testTime: number;
  attempts: number;
  leaderboard: Array<{ studentName: string; score: number }>;
}

const TestOverview: React.FC = () => {
  // Use useParams to get the id from the URL
  const { id } = useParams<{ id : string }>();

  console.log("id", id);
  
  // State to store the fetched test details
  const [testDetails, setTestDetails] = useState<TestDetails | null>(null);
  

  // Loading and error state
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestDetails = async () => {

    try {
      setLoading(true);
      setError(null);

      // Use the id from the URL parameters to fetch the test details
      const response = await axios.get(`/api/admin/test/fetchCurrentTest/${id}`);

      console.log("Test Details:", response);

      if(response.data.success === true) {
        setTestDetails(response?.data?.data[0]);
      }

    } 
    catch (error) {
      setError("Failed to fetch test details. Please try again later.");
      console.error("Error fetching test details:", error);

    } 
    finally {
      setLoading(false);
    }
  };


  // delete test
  const deleteTest = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use the id from the URL parameters to fetch the test details
      const response = await axios.delete(`/api/admin/test/deleteTest/${id}`);

      console.log("Test Details:", response);

      if(response.data.success === true) {
        setTestDetails(null);
        window.location.href = "/admin/view-test";
      }

    } 
    catch (error) {
      setError("Failed to delete test. Please try again later.");
      console.error("Error deleting test:", error);

    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    if (id) {
      fetchTestDetails();
    }
  }, [id]); // Re-run the effect if id changes


  // Show message if no test details are found
  if (!testDetails) {
    return <div className="flex justify-center items-center h-screen text-gray-500">No test details available.</div>;
  }

  // Destructure the fetched test details
  const { testName, testDescription, createdAt, numberOfQuestions, testTime, attempts, leaderboard } = testDetails;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white">

      {/* Show error message if an error occurred */}
      <ToastContainer 
        position="top-center"
        autoClose={5000}
      />

      {/* Test Overview Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{testName}</h1>

      <p className="text-gray-700 mb-4" title="testDescription">{testDescription}</p>

      {/* Test Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 bg-white shadow-md rounded-lg">
        <div className="bg-gray-100 p-4 rounded shadow">
          <p className="text-gray-600"><strong>Created At:</strong> {new Date(createdAt)?.toLocaleString()}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <p className="text-gray-600"><strong>Number of Questions:</strong> {numberOfQuestions}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <p className="text-gray-600"><strong>Test Duration:</strong> {testTime} minutes</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <p className="text-gray-600"><strong>Number of Attempts:</strong> {attempts}</p>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={deleteTest}
        >
          Delete Test
        </button>
      </div>

      

      {/* Leaderboard Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leaderboard</h2>
        {leaderboard?.length > 0 ? (
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left text-gray-600">Rank</th>
                <th className="py-2 px-4 text-left text-gray-600">Student Name</th>
                <th className="py-2 px-4 text-left text-gray-600">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4 text-gray-800">{index + 1}</td>
                  <td className="py-2 px-4 text-gray-800">{entry.studentName}</td>
                  <td className="py-2 px-4 text-gray-800">{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No leaderboard data available yet.</p>
        )}
      </div>
    </div>
  );
};

export default TestOverview;
