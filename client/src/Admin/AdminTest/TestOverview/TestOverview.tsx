import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface TestOverviewProps {
   testName: string;
   description: string;
   totalParticipants: number;
   duration: string;
   date: string;
   passingScore: number;
   ranking: {
      user: string;
      score: number;
   }[];
}

const TestOverview: React.FC = () => {

   const { testId } = useParams<{ testId: string }>();

   const [testDetails, setTestDetails] = useState<TestOverviewProps | null>(null);

   useEffect(() => {

      const fetchTestDetails = async () => {
         try {
            const response = await axios.get(`/api/tests/${testId}`);
            setTestDetails(response.data);
         } 
         catch (error) {
            console.error("Error fetching test details:", error);
         }
      };

      fetchTestDetails();
   }, [testId]);

   if (!testDetails) {
      return <div>Loading...</div>;
   }

   const { testName, description, totalParticipants, duration, date, passingScore, ranking } = testDetails;

   return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
         <h2 className="text-2xl font-bold mb-4">{testName}</h2>
         <p className="text-gray-700 mb-4">{description}</p>
         <div className="mb-4">
               <p className="text-gray-600">Date: <span className="font-semibold">{date}</span></p>
               <p className="text-gray-600">Duration: <span className="font-semibold">{duration}</span></p>
               <p className="text-gray-600">Passing Score: <span className="font-semibold">{passingScore}%</span></p>
               <p className="text-gray-600">Total Participants: <span className="font-semibold">{totalParticipants}</span></p>
         </div>
         <h3 className="text-xl font-semibold mt-6 mb-4">Ranking</h3>
         <ul>
               {ranking.map((item, index) => (
                  <li key={index} className="flex justify-between bg-gray-100 p-2 mb-2 rounded">
                     <span>{item.user}</span>
                     <span className="font-bold">{item.score}</span>
                  </li>
               ))}
         </ul>
      </div>
   );
};

export default TestOverview;
