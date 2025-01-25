import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Test {
  id: number;
  name: string;
  createdAt: string;
  status: string;
}

const ViewAllTests: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Replace this with your API call to fetch tests
    const fetchTests = async () => {
      try {
        // Simulating an API request
        const response = await axios.get('/api/tests'); // Replace with actual API URL

        

      } catch (err) {
        setError('Failed to load tests. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) {
    return <div>Loading tests...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-3 py-4">
      <h1 className="text-2xl font-bold mb-4">All Tests</h1>
      {tests.length === 0 ? (
        <p>No tests available.</p>
      ) : (
        <div className="flex flex-wrap">
          {tests.map((test) => (
            <div key={test.id} className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="shadow-lg rounded-lg p-4 bg-white">
                <h2 className="text-lg font-bold mb-2">{test.name}</h2>
                <p className="text-gray-600 text-sm mb-2">Created At: {new Date(test.createdAt).toLocaleDateString()}</p>
                <p className={`text-sm font-bold mb-4 ${test.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                  Status: {test.status}
                </p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllTests;
