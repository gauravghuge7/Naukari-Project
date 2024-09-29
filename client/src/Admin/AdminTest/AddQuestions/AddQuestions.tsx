

import { useState } from 'react'

const AddQuestions: React.FC = () => {
   const [question, setQuestion] = useState('')
   const [options, setOptions] = useState([''])

   const handleAddOption = () => {
      setOptions([...options, ''])
   }

   const handleOptionChange = (index: number, value: string) => {
      const newOptions = [...options]
      newOptions[index] = value
      setOptions(newOptions)
   }

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // Handle form submission logic here
   }

   return (
      <div>
         {/* Add Questions */}
         <h3>Add Questions</h3>
         <p>Add questions to your test here.</p>
         <form onSubmit={handleSubmit}>
            <input 
               type="text" 
               placeholder="Enter your question" 
               value={question} 
               onChange={(e) => setQuestion(e.target.value)} 
            />
            {options.map((option, index) => (
               <input 
                  key={index} 
                  type="text" 
                  placeholder={`Option ${index + 1}`} 
                  value={option} 
                  onChange={(e) => handleOptionChange(index, e.target.value)} 
               />
            ))}
            <button type="button" onClick={handleAddOption}>Add Option</button>
            <button type="submit">Submit Question</button>
         </form>
      </div>
   )
}

export default AddQuestions;