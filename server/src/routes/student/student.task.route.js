
import { Router } from 'express';
import { upload } from './../../middleware/multer.middleware.js';
import { isStudentLogin } from '../../middleware/student.auth.js';
import { addTasksToPlan, createPlan, getAllPlans, getPlanDetails, getTasksByPlan } from '../../controller/Student/student.task.controller.js';

const taskRouter = Router();

taskRouter.route('/createPlan')
.post(
    isStudentLogin,
    upload.none(),
    createPlan
)

taskRouter.route('/getMyPlans')
.get(
    isStudentLogin,
    upload.none(),
    getAllPlans
)


taskRouter.route('/addTasks/:planId')
.post(
    isStudentLogin,
    upload.none(),
    addTasksToPlan
)

taskRouter.route('/getPlanDetails/:planId')
.get(
    isStudentLogin,
    upload.none(),
    getPlanDetails
)

taskRouter.route('/getTasksByPlan/:planId')
.get(
    isStudentLogin,
    upload.none(),
    getTasksByPlan
)



export default taskRouter;