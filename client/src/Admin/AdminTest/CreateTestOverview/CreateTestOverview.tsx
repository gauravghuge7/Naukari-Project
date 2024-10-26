import React, { useState } from 'react';

interface TestData {
   testName: string;
   testDescription: string;
   numberOfQuestions: number;
}

const CreateTestOverview: React.FC = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [testData, setTestData] = useState<TestData>({
      testName: '',
      testDescription: '',
      numberOfQuestions: 0,
   });
   const [error, setError] = useState('');

   const handleOpenModal = () => {
      setIsModalOpen(true);
   };

   const handleCloseModal = () => {
      setIsModalOpen(false);
      setError('');
      setTestData({ testName: '', testDescription: '', numberOfQuestions: 0 });
   };

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

      // If everything is fine, we can submit the form
      console.log('Test Data Submitted:', testData);
      handleCloseModal();
   };

   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
         <button
         onClick={handleOpenModal}
         className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-500 transition-colors"
         >
         Create Test
         </button>

         {isModalOpen && (
         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
               <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create New Test</h2>
               
               {error && <p className="text-red-500 text-center mb-4">{error}</p>}

               <form onSubmit={handleSubmit} className="space-y-4">
               {/* Test Name */}
               <div>
                  <label htmlFor="testName" className="block text-gray-700 font-semibold mb-2">
                     Test Name
                  </label>
                  <input
                     type="text"
                     id="testName"
                     name="testName"
                     placeholder="Enter test name"
                     value={testData.testName}
                     onChange={handleInputChange}
                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  />
               </div>

               {/* Test Description */}
               <div>
                  <label htmlFor="testDescription" className="block text-gray-700 font-semibold mb-2">
                     Test Description
                  </label>
                  <textarea
                     id="testDescription"
                     name="testDescription"
                     placeholder="Enter test description"
                     value={testData.testDescription}
                     onChange={handleInputChange}
                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                     rows={4}
                  />
               </div>

               {/* Number of Questions */}
               <div>
                  <label htmlFor="numberOfQuestions" className="block text-gray-700 font-semibold mb-2">
                     Number of Questions
                  </label>
                  <input
                     type="number"
                     id="numberOfQuestions"
                     name="numberOfQuestions"
                     placeholder="Enter number of questions"
                     value={testData.numberOfQuestions}
                     onChange={handleInputChange}
                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  />
               </div>

               {/* Submit Button */}
               <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-500 transition-colors"
               >
                  Submit
               </button>
               <button
                  onClick={handleCloseModal}
                  type="button"
                  className="w-full bg-gray-300 text-gray-700 font-bold py-2 rounded-lg mt-2 hover:bg-gray-400 transition-colors"
               >
                  Cancel
               </button>
               </form>
            </div>
         </div>
         )}

         
      </div>
   );
};

export default CreateTestOverview;
