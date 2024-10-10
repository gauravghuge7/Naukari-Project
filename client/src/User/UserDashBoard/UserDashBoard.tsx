

const UserDashboard = () => {
  // Sample data for attempted tests (you can replace this with API data)
  const attemptedTests = [
    { id: 1, testName: 'Math Test 1', date: '2023-09-15', score: '85%' },
    { id: 2, testName: 'Science Test 1', date: '2023-09-18', score: '92%' },
    { id: 3, testName: 'History Test 1', date: '2023-09-20', score: '78%' },
    { id: 4, testName: 'Math Test 2', date: '2023-09-22', score: '88%' },
  ];

  // Dummy stats (can be fetched from API)
  const totalTests = 10;
  const testsPassed = 7;
  const testsFailed = 3;
  const performance = '80%';

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
          <p className="text-gray-600">Welcome back, here's an overview of your recent activity.</p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Tests Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700">Total Tests</h2>
            <p className="text-4xl font-bold text-blue-500 mt-4">{totalTests}</p>
          </div>

          {/* Tests Passed Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700">Tests Passed</h2>
            <p className="text-4xl font-bold text-green-500 mt-4">{testsPassed}</p>
          </div>

          {/* Tests Failed Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700">Tests Failed</h2>
            <p className="text-4xl font-bold text-red-500 mt-4">{testsFailed}</p>
          </div>

          {/* Performance Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 col-span-1 md:col-span-3">
            <h2 className="text-xl font-semibold text-gray-700">Overall Performance</h2>
            <p className="text-4xl font-bold text-purple-500 mt-4">{performance}</p>
          </div>
        </div>

        {/* Attempted Tests Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Attempted Tests</h2>
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Test Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {attemptedTests.map((test) => (
                  <tr key={test.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{test.testName}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{test.date}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{test.score}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
