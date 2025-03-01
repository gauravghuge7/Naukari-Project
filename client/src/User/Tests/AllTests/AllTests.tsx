import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { extractErrorMessage } from "../../../components/ResponseError/ResponseError";


interface Test {
  _id: string;
  testName: string;
  testDescription: string;
  createdAt: string;
  numberOfQuestions: number;
  testTime: number; 
}



const AllTests = () => {

  const [tests, setTests] = useState<Test[]>([]);
  
  const fetchAllTests = async () => {

    try {

      const response = await axios.get('/api/student/test/fetchAllTests');
      console.log('response', response);
      if (response?.data?.success === true) {
        const sortedTests = response?.data?.data.sort((a: Test, b: Test) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setTests(sortedTests);
      }
    
    } 
    catch (error) {
      console.error('Error fetching tests:', error);
      const tempError = extractErrorMessage((error as AxiosError)?.response?.data as string);
      toast.error(tempError);
    }
    finally {
      console.log('finally');
    }
  };


  useEffect(() => {
    fetchAllTests();
  },[]);



  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <ToastContainer 
        position="top-right"
      />

      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">All Tests</h1>

      {/* Grid layout that is responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <div key={test._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{test.testName}</h2>
            <p className="text-gray-600 mb-4">{test.testDescription}</p>
            <p className="text-gray-600 mb-4">Date : {new Date(test.createdAt).toLocaleString()}</p>
            <div className="flex justify-between">

      
            
              <Link to={`/user/test-overview/${test._id}`} className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition-colors">
                Enroll
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllTests;
