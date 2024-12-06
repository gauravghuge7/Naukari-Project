import React, { useEffect, useState } from "react";
import { useParams,  Link } from "react-router-dom";
import axios from "axios";

interface TestData {
   _id: string;
   testName: string;
   testDescription: string;
   createdAt: string;
   numberOfQuestions: number;
   testTime: number;
   questions?: Question[];
}

interface Question {
   _id: string;
   question: string;
}

const CreateTestOverview: React.FC = () => {
   const { id } = useParams<{ id: string }>();

   const [testData, setTestData] = useState<TestData | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   const [question, setQuestion] = useState<string>("");
   const [addingQuestion, setAddingQuestion] = useState<boolean>(false);
   const [addError, setAddError] = useState<string | null>(null);

   

   useEffect(() => {
      if (id) {
         fetchTestData(id);
      }
   }, [id]);

   const fetchTestData = async (testId: string) => {
      try {
         setLoading(true);
         setError(null);
         const response = await axios.get<TestData>(`/api/admin/test/fetchCurrentTest/${testId}`);
         console.log("Test Data:", response.data);
         setTestData(response.data?.data[0]);
      } catch (err) {
         setError("Failed to fetch test data. Please try again later." + err);
      } finally {
         setLoading(false);
      }
   };

   const handleAddQuestion = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!question.trim()) return;

      if(testData?.numberOfQuestions >= testData?.questions?.length) {
         setError("Please add all the questions before completing the test.");
         alert("only add the question that define at creating test");
         return;
      }
      try {
         setAddingQuestion(true);
         setAddError(null);

         const response = await axios.post(`/api/admin/test/addQuestionsInTest/${id}`, {
         question,
         });

         console.log("Question added:", response.data);

         setQuestion(""); // Clear the input
         fetchTestData(id!); // Refresh test details
      } catch (err) {
         setAddError("Failed to add question. Please try again." + err);
      } finally {
         setAddingQuestion(false);
      }
   };


   const handleCompleteTest = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!testData) return;

      if(testData.numberOfQuestions !== testData.questions?.length) {
         setError("Please add all the questions before completing the test.");
         alert("Please add all the questions before completing the test.");
         return;
      }

      try {
         setLoading(true);
         setError(null);

         const response = await axios.post(`/api/admin/test/completeTest/${id}`, {
         });

         console.log("Question added:", response.data);

         setQuestion(""); // Clear the input
         fetchTestData(id!); // Refresh test details

         if(response.data.success === true) {
            setTestData(null);
            window.location.href = `/admin/test-overview/${id}`;
         }
      } 
      catch (err) {
         setAddError("Failed to add question. Please try again." + err);
      } 
      finally {
         setAddingQuestion(false);
      }
   };
   


   return (
      <div className="p-6 max-w-3xl mx-auto">
         <h1 className="text-2xl font-bold text-gray-800 mb-4">Test Overview</h1>
         {testData ? (
         <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-700 mb-2">
               <strong>ID:</strong> {testData._id}
            </p>
            <p className="text-gray-700 mb-2">
               <strong>Name:</strong> {testData.testName}
            </p>
            <p className="text-gray-700 mb-2">
               <strong>Description:</strong> {testData.testDescription}
            </p>
            <p className="text-gray-700">
               <strong>Created At:</strong> {new Date(testData.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-700">
               <strong>Number of Questions:</strong> {testData.numberOfQuestions}
            </p>
         </div>
         ) : (
         <div className="text-gray-700">No test data available.</div>
         )}

         <div className="mt-6">
         <h2 className="text-lg font-bold text-gray-800 mb-4">Questions</h2>
         {testData?.questions && testData.questions.length > 0 ? (
            <ul className="list-disc pl-6">
               {testData.questions.map((q) => (
               <li key={q._id} className="text-gray-700 mb-2">
                  {q.question}
               </li>
               ))}
            </ul>
         ) : (
            <p className="text-gray-700">No questions added yet.</p>
         )}
         </div>

         <form onSubmit={handleAddQuestion} className="mt-6">

            <h2 className="text-lg font-bold text-gray-800 mb-4">Add a New Question</h2>

            <textarea
               value={question}
               onChange={(e) => setQuestion(e.target.value)}
               placeholder="Enter your question here"
               className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none mb-4"
               rows={4}
            />

            <button
               type="submit"
               disabled={addingQuestion}
               className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ${
                  addingQuestion ? "opacity-50 cursor-not-allowed" : ""
               }`}
            >
               {addingQuestion ? "Adding..." : "Add Question"}
            </button>

            {addError && <p className="text-red-500 mt-2">{addError}</p>}

         </form>

         <div className="mt-6">
         <button
            onClick={handleCompleteTest}
            className={`px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition`}
         >
            Complete Test
         </button>
     
         </div>
      </div>
   );
};

export default CreateTestOverview;
