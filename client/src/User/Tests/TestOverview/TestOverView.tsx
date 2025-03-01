import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { extractErrorMessage } from "../../../components/ResponseError/ResponseError";

interface TestOverviewProps {
   testName: string;
   testDescription: string;
   marks: number;
   testTime: number;
   questions: [];
   numberOfQuestions: number;
   attempts: number;
   testDate: Date;
   status: string;
}

const TestOverview: React.FC = () => {
   const { testId } = useParams<{ testId: string }>();
   const [testDetails, setTestDetails] = useState<TestOverviewProps | null>(null);

   const fetchTestDetails = async () => {
      try {
         const response = await axios.get(`/api/student/test/fetchTestOverview/${testId}`);

         console.log(response);

         if(response.data.success === true) {
            setTestDetails(response?.data?.data);
         }


      } catch (error) {
         console.error("Error fetching test details:", error);
      }
   };

   useEffect(() => {
      fetchTestDetails();
   }, [testId]);

   if (!testDetails) {
      return (
         <div className="flex items-center justify-center min-h-screen">
         <p className="text-xl font-semibold text-gray-500">Loading...</p>
         </div>
      );
   }


   const enrolledTest = async() => {

      try {

         const response = await axios.post(`/api/student/test/enrollTest/${testId}`);
         console.log("response", response);

         if(response.data.success === true) {
            // window.location.href = "/user/tests";
         }
         
      } 
      catch (error) {
         console.error("Error enrolling test:", error);
         const test = extractErrorMessage((error as AxiosError)?.response?.data as string);
         toast.error(test);
      }
      finally { 
         console.log("finally");
      }
   }


   const { testName, testDescription, questions, testTime, marks, attempts, status } = testDetails;

   return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      {/* Test Overview Header */}
      <ToastContainer 
         position="top-right"
      />

         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Left Section */}
         <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{testName}</h1>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">{testDescription}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
               <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
               <p className="text-xs sm:text-sm text-gray-500">Status</p>
               <p className="text-base sm:text-lg font-semibold text-gray-700">{status}</p>
               </div>
               <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
               <p className="text-xs sm:text-sm text-gray-500">Marks</p>
               <p className="text-base sm:text-lg font-semibold text-gray-700">{marks}</p>
               </div>
               <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
               <p className="text-xs sm:text-sm text-gray-500">Duration</p>
               <p className="text-base sm:text-lg font-semibold text-gray-700">
                  {testTime} Minutes
               </p>
               </div>
               <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
               <p className="text-xs sm:text-sm text-gray-500">Questions</p>
               <p className="text-base sm:text-lg font-semibold text-gray-700">{questions}</p>
               </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
               <span className="font-semibold text-gray-800">Test Attempts:</span> 0 of {attempts}
            </p>
         </div>

         {/* Right Section */}
         <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
            <div className="mb-6">
               <img
               src="/placeholder.png" // Replace with a dynamic image URL
               alt="Test Thumbnail"
               className="w-40 sm:w-56 rounded-lg"
               />
            </div>
            
            <button 
               onClick={enrolledTest}
               className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 sm:px-6 rounded-full font-medium mb-4 transition-colors duration-300"
            >
               Enrolled Test
            </button>
            <div className="w-full mt-4">
               <h3 className="text-lg font-semibold text-gray-800 mb-2">What's included</h3>
               <ul className="text-gray-600 text-sm space-y-2">
                  <li>✅ {status} Test</li>
                  <li>✅ {marks} Marks</li>
                  <li>✅ {testTime} Minutes</li>
                  <li>✅ {questions} Questions</li>
                  <li>✅ {attempts} Attempts</li>
               </ul>
            </div>
         </div>
         </div>
      </div>
   );
};

export default TestOverview;
