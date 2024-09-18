import { Router } from 'express';
import { 
   loginStudent, 
   registerStudent 

} from '../controller/Student/student.login.controller.js';


// create a student router to handle all the requests
const studentRouter = Router();


// register a student
studentRouter.route("/register").post(
   registerStudent
)


// login route of a student 
studentRouter.route("/login").post(
   loginStudent
)






export default studentRouter;