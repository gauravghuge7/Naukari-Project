import { useState } from "react";
import "./CreateTest.css";

interface TestData {
   testName: string;
   testDescription: string;
   numberOfQuestions: number;
}

const CreateTest: React.FC<{ 
   createTestDialogClose: () => void, 
   setTest: (value: TestData) => void, 
   setTestCreated: (value: boolean) => void }> 
   = ({ createTestDialogClose, setTestCreated }) => 
   {

   const [testData, setTestData] = useState<TestData>({
      testName: '',
      testDescription: '',
      numberOfQuestions: 0,
   });

   const [error, setError] = useState('');

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setTestData((prev) => ({
         ...prev,
         [name]: name === 'numberOfQuestions' ? Number(value) : value,
      }));
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!testData.testName || !testData.testDescription || !testData.numberOfQuestions) {
         setError('All fields are required.');
         return;
      }

      if (testData.numberOfQuestions < 1) {
         setError('Number of questions must be at least 1.');
         return;
      }

      setTestCreated(true);


      // If everything is fine, we can submit the form
      console.log('Test Data Submitted:', testData);
      createTestDialogClose(); // Close the modal on successful submission
   };

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
         <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            {/* Close Button */}
            

            {/* Form Title */}
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
               Create New Test
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

export default CreateTest;
