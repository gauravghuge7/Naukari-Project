import React from 'react';

const ViewTests: React.FC = () => {
  // Sample test data
  const testData = [
    { title: 'Test 1', description: 'Description for Test 1', date: '2024-10-25' },
    { title: 'Test 2', description: 'Description for Test 2', date: '2024-10-26' },
    { title: 'Test 3', description: 'Description for Test 3', date: '2024-10-27' },
  ];

  // Inner component for TestCard
  const TestCard: React.FC<{ title: string; description: string; date: string }> = ({ title, description, date }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 max-w-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <span className="text-gray-500 text-sm">{date}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      {testData.map((test, index) => (
        <TestCard 
          key={index}
          title={test.title}
          description={test.description}
          date={test.date}
        />
      ))}
    </div>
  );
};

export default ViewTests;
