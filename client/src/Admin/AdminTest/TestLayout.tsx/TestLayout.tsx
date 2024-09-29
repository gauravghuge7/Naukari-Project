
import { useRef, useState } from 'react';
import CreateTest from '../CreateTest/CreateTest';
import { create } from '@mui/material/styles/createTransitions';

const TestLayout = () => {

   {/* Create Test Form for creating a test dialog */}

   const createTestRef = useRef(null);

   const [test, setTest] = useState(
      {
         testName: '',
         testDescription: '',
         numQuestions: 0,
      }
   );


   const createTestDialogOpen = () => {
      createTestRef.current.showModal();
   };

   const createTestDialogClose = () => {
      createTestRef.current.close();
   };






   return (
      <div className='flex flex-col justify-center items-center align-center'>

         {/* Create Test Form for creating a test  */}

         {test && (

            <div className='absolute top-40 left-0 p-2 m-4 w-[15rem] h-[30rem]  shadow-md shadow-gray-400 rounded-sm text-black'>
               <h2 className='text-center font-bold'>Test Details</h2>
               <p>
                  <span className='text-black font-semibold'>Test Name: </span>
                  {test.testName}</p>
               <p>
                  <span className='text-black font-semibold'>Test Description: </span>
                  {test.testDescription}
               </p>
               <p>
                  <span className='text-black font-semibold'>Test Questions: </span>
                  {test.numQuestions}
               </p>
            </div>
         )}

         <button 
            onClick={createTestDialogOpen}
            className='w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-sm shadow-md transition duration-300'
         >
            Create Test
         </button>








         {/* Create Test Form for creating a test dialog */}
         <section>
            {
               
               <dialog 
                  ref={createTestRef}
                  className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-screen w-screen m-auto my-auto p-4 opacity-90">
                  <div className="relative bg-white shadow-lg rounded-md p-4 max-w-sm mx-auto opacity-100">
                  
                     <CreateTest 
                        createTestDialogClose={createTestDialogClose}
                     />
                  </div>
               </dialog>
            }


         </section>

         



         

      


      </div>
   )
}

export default TestLayout;