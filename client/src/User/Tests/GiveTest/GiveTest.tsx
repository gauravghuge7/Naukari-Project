import React, { useState } from 'react';

interface TestGiverProps {
  // Add props if needed
}

const GiveTest: React.FC<TestGiverProps> = () => {

   const [test, setTest] = useState<Test>({
    testName: "Test Name",
    testDescription: "Test Description",
    testQuestions: [
      {
        question: "Question 1",
        options: ["Option 1", "Option 2", "Option 3"],
      },
      {
        question: "Question 2",
        options: ["Option 1", "Option 2", "Option 3"],
      },
      {
        question: "Question 3",
        options: ["Option 1", "Option 2", "Option 3"],
      },
    ],
   });

   const [testQuestions, setTestQuestions] = useState([
      {
         question: "Question 1",
         options: ["Option 1", "Option 2", "Option 3"],
      },
      {
         question: "Question 2",
         options: ["Option 1", "Option 2", "Option 3"],
      }
   ]);

   const [currentQuestion, setCurrentQuestion] = useState(0);

   const [userAnswers, setUserAnswers] = useState({});

   const handleNextQuestion = () => {
      // Logic to handle next question
   };

   const handlePreviousQuestion = () => {
      // Logic to handle previous question
   };

   const handleSubmitTest = () => {
      // Logic to handle test submission
   };

  return (
    <div className="container mx-auto p-4 pt-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Test Giver
      </h2>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm">
        {testQuestions.map((question, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-bold mb-2 text-gray-800">
              {question.question}
            </h3>
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex} className="mb-2">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={(e) => setUserAnswers({ ...userAnswers, [index]: e.target.value })}
                  />
                  <span className="ml-2">{option}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex justify-between">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
            onClick={handlePreviousQuestion}
          >
            Previous
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
            onClick={handleNextQuestion}
          >
            Next
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
            onClick={handleSubmitTest}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiveTest;

