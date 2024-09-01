import app from './app.js';
import { connectDB } from './database/db.js';
import dotenv from 'dotenv';


dotenv.config(
   {
      path: "./.env"
   }
)



const PORT = process.env.PORT || 3000;


connectDB()
.then(() => {
   app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}
            check Server Here => http://localhost:${PORT}   
      `);
   })
})
.catch((error) => {
   console.log("Error while Starting the Express Server",error)
   process.exit(1)   
})
