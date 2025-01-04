import { useRef, useState } from 'react';
import CreateTest from '../CreateTest/CreateTest';
import CreateTestUsingAi from '../CreateTest/CreateTestUsingAi';



interface TestData {
   testId: string;
   testName: string;
   testDescription: string;
   numQuestions: number;
}



const TestLayout = () => {

   {/* Create Test Form for creating a test dialog */}
   const createTestRef = useRef<HTMLDialogElement>(null);
   const CreateTestUsingAiRef = useRef<HTMLDialogElement>(null);

   // State to check if test is created
   const [testCreated, setTestCreated] = useState<boolean>(false);

   const [test, setTest] = useState<TestData | undefined>()


   const createTestDialogOpen = () => {
      createTestRef.current?.showModal();
   };

   const createTestDialogClose = () => {
      createTestRef.current?.close();
   };

   const createTestUsingAiDialogOpen = () => {
      CreateTestUsingAiRef.current?.showModal();
   };

   const createTestUsingAiDialogClose = () => {
      CreateTestUsingAiRef.current?.close();
   };





   return (
      <div className='w-full justify-center items-center align-center mt-20'>

         <section
            className='flex w-full flex-wrap justify-center items-center align-center gap-4'
         >
            {/* Create Test Form for creating a test  */}

            <button 
               onClick={createTestDialogOpen}
               className='w-[40%] py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-sm shadow-md transition duration-300'
            >
               Create Test Manually 
            </button>
            <button 
               onClick={createTestUsingAiDialogOpen}
               className='w-[40%] py-2 px-4 bg-pink-500 hover:bg-pink-700 text-white font-bold rounded-sm shadow-md transition duration-300'
            >
               Create Test Using AI 
            </button>
         </section>


         {/* { testCreated && test && (

            <aside className='top-20 left-0 p-2 m-4 w-[15rem] h-[30rem]  shadow-md shadow-gray-400 rounded-sm text-black'>
               <h2 className='text-center font-bold'>Test Details</h2>
               <p>
                  <span className='text-black font-semibold'>Test Name: </span>
                  {test.testName}
               </p>
               
               <p>
                  <span className='text-black font-semibold'>Test Description: </span>
                  {test.testDescription}
               </p>
               <p>
                  <span className='text-black font-semibold'>Test Questions: </span>
                  {test.numQuestions}
               </p>
            </aside>
         )} */}

         






         {/* Create Test Form for creating a test dialog */}
         <section>
            {
               
               <dialog 
                  ref={createTestRef}
                  className="absolute inset-0 bg-black bg-opacity-50 overflow-y-auto h-screen w-screen m-auto my-auto p-4 opacity-90">
                  <div className="relative bg-white shadow-lg rounded-md p-4 max-w-sm mx-auto opacity-100">
                  
                     <CreateTest 
                        createTestDialogClose={createTestDialogClose}
                        setTestCreated={setTestCreated}
                        setTest={setTest}
                     />
                  </div>
               </dialog>
            }


         </section>

         {/* Create Test Using the AI */}
         <section
            className='w-full'
         >
            {
               
               <dialog 
                  ref={CreateTestUsingAiRef}
                  className="fixed inset-0 bg-black object-cover bg-opacity-50 overflow-y-auto h-screen w-screen m-auto my-auto p-4 opacity-90">  

                  <div className="rounded-md overflow-scroll  max-w-sm mx-auto opacity-100">
                  
                     <CreateTestUsingAi 
                        createTestDialogClose={createTestUsingAiDialogClose}
                        setTestCreated={setTestCreated}
                        setTest={setTest}
                     />
                  </div>
               </dialog>
            }


         </section>

         

      </div>
   )
}

export default TestLayout;
