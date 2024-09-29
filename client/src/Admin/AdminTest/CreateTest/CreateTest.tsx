import "./CreateTest.css"


const CreateTest = ({createTestDialogClose}) => {

   




   return (
      <div className='flex flex-col justify-center items-center align-center'>


         <button 
            onClick={createTestDialogClose}
            className='absolute top-0 right-0 p-2  text-black font-bold rounded-sm shadow-md transition duration-300 rotate-45 text-3xl'
         >
            +
         </button>
         
         {/* Create Test Form for creating a test  */}

         <main className="flex flex-col  border w-[20rem]">
            
            <h3 className="text-center">Test Form For Creating A Test</h3>

            <form className='flex flex-col p-4 bg-gray-50 gap-3 border shadow-md w-[18rem] rounded-md'>

               {/* Test Name Field */}
               <section className='flex flex-col gap-1'>
                  
                  <label htmlFor='testName' className='text-xs font-semibold text-gray-700'>
                     Test Name
                  </label>

                  <fieldset className='fieldDesign'>
                     
                     <legend className='text-[10px] text-gray-700 ml-2'>Test Name</legend>
   
                     <input 
                        type='text' 
                        id='testName' 
                        name='testName' 
                        required
                        className='inputDesign'
                        placeholder='Enter the test name (e.g., Math Test)' 
                     />

                  </fieldset>

               </section>

               {/* Test Description Field */}
               <section>
                  <label htmlFor='testDescription' className='text-xs font-medium text-gray-700'>
                     Test Description
                  </label>
                  <fieldset className='fieldDesign'>
                     <legend className='text-[10px] text-gray-700 ml-2'>Test Description</legend>
                     <textarea 
                        id='testDescription' 
                        name='testDescription' 
                        className='inputDesign'
                        placeholder='Enter the test description (e.g., Math Test Description)'  
                     ></textarea>
                  </fieldset>
               </section>


               {/* Number of Questions Field */}
               <section className='flex flex-col gap-1'>
                  <label htmlFor='numQuestions' className='text-xs font-medium text-gray-700'>
                     Number of Questions
                  </label>
                  
                  <fieldset>
                     <legend className='text-[10px] text-gray-700 ml-2'>questions</legend>
                     <input 
                        type='number' 
                        id='numQuestions' 
                        name='numQuestions' 
                        required
                        className='inputDesign'
                        placeholder='Enter the number of questions (e.g., 10)' 
                     />
                  </fieldset>
               </section>

               <button 
                  type='submit' 
                  className='w-full py-1 px-2 bg-green-600 text-white rounded-sm shadow-md hover:bg-green-700 transition duration-300 text-xs font-medium'
               >
                  Create Test
               </button>

               


            </form>




            
         </main>

      


      </div>
   )
}

export default CreateTest;