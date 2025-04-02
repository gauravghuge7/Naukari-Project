
import { Router } from 'express';
import { upload } from './../../middleware/multer.middleware.js';
import { isStudentLogin } from '../../middleware/student.auth.js';
import { createPlan, getAllPlans } from '../../controller/Student/student.task.controller.js';

const taskRouter = Router();

taskRouter.route('/createPlan')
.post(
    isStudentLogin,
    upload.none(),
    createPlan
)

taskRouter.route('/getPlans')
.get(
    isStudentLogin,
    upload.none(),
    getAllPlans
)


taskRouter.route('/addTasks/:planId')
.post(
    isStudentLogin,
    upload.none(),
    getAllPlans
)



export default taskRouter;