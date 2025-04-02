import { Router } from 'express';
import { 
   loginStudent, 
   logoutStudent, 
   registerStudent, 
   sendOtp

} from '../../controller/Student/student.login.controller.js';
import { upload } from '../../middleware/multer.middleware.js';
import profileRouter from './student.profile.routes.js';
import studentTestRouter from './student.test.routes.js';
import taskRouter from './student.task.route.js';


// create a student router to handle all the requests
const studentRouter = Router();



studentRouter.use("/profile", profileRouter);
studentRouter.use("/test", studentTestRouter);
studentRouter.use("/task", taskRouter);



// register a student
studentRouter.route("/sendOtp").post(
   upload.none(),
   sendOtp
)

studentRouter.route("/verifyAndRegister").post(
   upload.none(),
   registerStudent
)


// login route of a student 
studentRouter.route("/login").post(
   upload.none(),
   loginStudent
)

studentRouter.route("/logout").get(
   upload.none(),
   logoutStudent
)






export default studentRouter;