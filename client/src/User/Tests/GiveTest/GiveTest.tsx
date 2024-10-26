import { useState, useEffect } from "react";

const sampleQuestions = [
  { id: 1, question: "What is the capital of France?", options: ["Paris", "Rome", "Berlin", "Madrid"], answer: "" },
  { id: 2, question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "" },
  { id: 3, question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "" },
  { id: 4, question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "" },
];

const GiveTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(sampleQuestions.length).fill(""));

  const handleOptionChange = (questionId: number, selectedOption: string) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionId - 1] = selectedOption; // Update the answer for the question
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    // Handle the submission of the test
    console.log("Test Submitted", answers);
    alert("Test Submitted!");
  };

  // Effect to handle tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleSubmit(); // Automatically submit the test
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [answers]); // Add answers to the dependency array to avoid stale closures

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Give Test</h2>
      <div className="mb-6">
        {sampleQuestions.map((question, index) => (
          <button
            key={question.id}
            className={`px-4 py-2 mr-2 rounded ${index === currentQuestionIndex ? "bg-blue-600 text-white" : "bg-gray-300"}`}
            onClick={() => setCurrentQuestionIndex(index)}
          >
            Question {question.id}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-2">{sampleQuestions[currentQuestionIndex].question}</h3>
        <div className="flex flex-col mb-4">
          {sampleQuestions[currentQuestionIndex].options.map((option) => (
            <label key={option} className="flex items-center mb-2">
              <input
                type="radio"
                name={`question-${sampleQuestions[currentQuestionIndex].id}`}
                value={option}
                checked={answers[currentQuestionIndex] === option}
                onChange={() => handleOptionChange(sampleQuestions[currentQuestionIndex].id, option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-400 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === sampleQuestions.length - 1}
            className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <button onClick={handleSubmit} className="mt-6 bg-green-600 text-white py-2 px-4 rounded">
        Submit Test
      </button>
    </div>
  );
};

export default GiveTest;
