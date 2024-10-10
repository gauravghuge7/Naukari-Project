

// Sample data for demonstration
const tests = [
  { id: 1, title: 'JavaScript Basics', description: 'Test your knowledge of JavaScript fundamentals.' },
  { id: 2, title: 'React Advanced', description: 'A test on advanced React concepts.' },
  { id: 3, title: 'CSS Mastery', description: 'Showcase your skills in CSS.' },
  { id: 4, title: 'HTML Pro', description: 'Test your HTML knowledge.' },
  { id: 5, title: 'Node.js Essentials', description: 'Understand the core concepts of Node.js.' },
  { id: 6, title: 'Python Basics', description: 'A beginner-friendly Python test.' },
];

const AllTests = () => {





  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">All Tests</h1>

      {/* Grid layout that is responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <div key={test.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{test.title}</h2>
            <p className="text-gray-600 mb-4">{test.description}</p>
            <div className="flex justify-between">
            
              <button className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition-colors">
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllTests;
