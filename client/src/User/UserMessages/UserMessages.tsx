import { useEffect, useState } from "react";
import { socket } from "../../main";



const UserMessages  = () => {


   const [messages, setMessages] = useState<string[]>([]);
   const [input, setInput] = useState("");


   useEffect(() => {
      // Listen for messages from the server
      socket.on('message', (message: string) => {
         setMessages((prevMessages: string[]) => [...prevMessages, message]);
      });

      // Cleanup on component unmount
      return () => {
         socket.disconnect();
      };
   }, []);

   const sendMessage = () => {
      if (input) {
        socket.emit('message', input); // Send message to server
        setInput(''); // Clear the input field
      }
   };

   return (
   <div>
      <h1>Socket.IO Chat</h1>
      <div>
         {messages.map((msg, index) => (
         <p key={index}>{msg}</p>
         ))}
      </div>
      <input
         type="text"
         value={input}
         onChange={(e) => setInput(e.target.value)}
         placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
   </div>
   );
}

export default UserMessages
