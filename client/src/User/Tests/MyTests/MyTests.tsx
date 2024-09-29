const MyTests = () => {
  const tests = [
    { title: "Test 1", description: "This is a test card", image: "https://via.placeholder.com/300" },
    { title: "Test 2", description: "This is another test card", image: "https://via.placeholder.com/300" },
    { title: "Test 3", description: "This is yet another test card", image: "https://via.placeholder.com/300" },
    { title: "Test 4", description: "This is a test card", image: "https://via.placeholder.com/300" },
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {tests.map((test) => (
        <div key={test.title} className="bg-white rounded-lg shadow-md p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 m-4">
          <h2 className="text-lg font-bold mb-2">{test.title}</h2>
          <p className="text-gray-600">{test.description}</p>
          <img src={test.image} alt={test.title} className="w-full h-48 object-cover mt-2" />
        </div>
      ))}
    </div>
  );
};

export default MyTests;