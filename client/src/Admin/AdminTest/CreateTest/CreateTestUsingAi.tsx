import { useState } from "react";

import axios, { AxiosError } from "axios";
import { extractErrorMessage } from "../../../components/ResponseError/ResponseError";
import { toast, ToastContainer } from "react-toastify";

interface TestData {
   testName: string;
   testDescription: string;
   numberOfQuestions: number;
   testTime: number;
   marks: number;
}

const CreateTestUsingAi: React.FC<{ 
   createTestDialogClose: () => void, 
   setTest: (value: object) => void,
   setTestCreated: (value: boolean) => void }> 
   = ({ createTestDialogClose, setTest, setTestCreated }) => 
   {

   const [testData, setTestData] = useState<TestData>({
      testName: '',
      testDescription: '',
      numberOfQuestions: 0,
      testTime: 0,
      marks: 0,
   });

   const [error, setError] = useState('');


   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setTestData((prev) => ({
         ...prev,
         [name]: name === 'numberOfQuestions' ? Number(value) : value,
      }));
   };

   const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();

      try {
         if (!testData.testName || !testData.testDescription || !testData.numberOfQuestions) {
            setError('All fields are required.');
            return;
         }
   
         if (testData.numberOfQuestions < 1) {
            setError('Number of questions must be at least 1.');
            return;
         }
   
         const config = {
            headers: {
               'Content-Type': 'application/json',
            },
            withCredentials: true,
         };
   
         const testDataToSubmit = {
            testName: testData.testName,
            testDescription: testData.testDescription,
            numberOfQuestions: testData.numberOfQuestions,
            testTime: testData.testTime,
            marks: testData.marks,
         };
   
         const response = await axios.post('/api/admin/test/createTest', testDataToSubmit, config);
   
         console.log('Response:', response);
         
         if(response.data.success) {
            toast.success('Test created successfully!');
            setTestCreated(true);
            setTest(response.data.data);
            
            window.location.href =`/admin/create-test-overview/${response.data.data._id}`;    

            
            
         }
         
   
   
         // If everything is fine, we can submit the form
         console.log('Test Data Submitted:', testData);
         createTestDialogClose(); // Close the modal on successful submission
      } 
      catch (error) {
         console.error('Error submitting test:', error);
         const message = extractErrorMessage((error as AxiosError)?.response?.data as string);
         toast.error(message);
         setError(message);
      }
   };


   return (
      <div className="">


         

         <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
   
            {/* Form Title */}
            
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
               Create New Test Using AI
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
               
               {/* Test Name */}
               <div>
                  <label htmlFor="testName" className="block text-gray-700 font-semibold mb-1">
                     Test Name
                  </label>
                  <input
                     type="text"
                     id="testName"
                     name="testName"
                     placeholder="Enter test name"
                     value={testData.testName}
                     onChange={handleInputChange}
                     className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  />
               </div>

               {/* Test Description */}
               <div>
                  <label htmlFor="testDescription" className="block text-gray-700 font-semibold mb-1">
                     Test Description
                  </label>
                  <textarea
                     id="testDescription"
                     name="testDescription"
                     placeholder="Enter test description"
                     value={testData.testDescription}
                     onChange={handleInputChange}
                     className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                     rows={4}
                  />
               </div>

               <div>
                  <label htmlFor="testDescription" className="block text-gray-700 font-semibold mb-1">
                     Test Description
                  </label>
                  <textarea
                     id="testDescription"
                     name="testDescription"
                     placeholder="Enter test description"
                     value={testData.testDescription}
                     onChange={handleInputChange}
                     className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                     rows={4}
                  />
               </div>

               {/* Number of Questions */}
               <div>
                  <label htmlFor="numberOfQuestions" className="block text-gray-700 font-semibold mb-1">
                     Number of Questions
                  </label>
                  <input
                     type="number"
                     id="numberOfQuestions"
                     name="numberOfQuestions"
                     placeholder="Enter number of questions"
                     value={testData.numberOfQuestions}
                     onChange={handleInputChange}
                     className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  />
               </div>

               {/* Test Time */}
               <div>
                  <label htmlFor="testTime" className="block text-gray-700 font-semibold mb-1">
                     Test Time
                  </label>
                  <input
                     type="number"
                     id="testTime"
                     name="testTime"
                     placeholder="Enter test time"
                     value={testData.testTime}
                     onChange={handleInputChange}
                     className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  />
               </div>

              

               {/* Test Time */}
               <div>
                  <label htmlFor="marks" className="block text-gray-700 font-semibold mb-1">
                     Test Marks
                  </label>
                  <input
                     type="marks"
                     id="marks"
                     name="marks"
                     placeholder="Enter test time"
                     value={testData.marks}
                     onChange={handleInputChange}
                     className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  />
               </div>

               {/* Error Message */}
               {error && (
                  <p className="text-red-500 text-sm text-center mt-2">
                     {error}
                  </p>
               )}

               {/* Submit and Cancel Buttons */}
               <div className="flex space-x-2 mt-4">
                  <button
                     type="submit"
                     className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-500 transition-colors"
                  >
                     Submit
                  </button>
                  <button
                     type="button"
                     onClick={createTestDialogClose}
                     className="w-full bg-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                     Cancel
                  </button>
               </div>

            </form>
         </div>
      </div>
   );
};

export default CreateTestUsingAi;
