
import { Router } from 'express';
import { upload } from './../../middleware/multer.middleware.js';
import { isStudentLogin } from '../../middleware/student.auth.js';
import { addTasksToPlan, updatePlan,  getMonthlyDashboard , fetchCurrentDayDetails, createPlan, deleteTask, getAllPlans, getPlanDetails, getTasksByPlan, updateTask, updateTaskStatus } from '../../controller/Student/student.task.controller.js';

const taskRouter = Router();

taskRouter.route('/createPlan')
.post(
    isStudentLogin,
    upload.none(),
    createPlan
)

taskRouter.route('/updatePlan/:planId')
.post(
    isStudentLogin,
    upload.none(),
    updatePlan
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

taskRouter.route('/updateTask/:planId')
.put(
    isStudentLogin,
    upload.none(),
    updateTask
)


taskRouter.route('/deleteTask/:planId')
.delete(
    isStudentLogin,
    upload.none(),
    deleteTask
)

taskRouter.route('/updateTaskStatus')
.put(
    isStudentLogin,
    upload.none(),
    updateTaskStatus
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


taskRouter.route('/fetchCurrentDayDetails')
.get(
    isStudentLogin,
    upload.none(),
    fetchCurrentDayDetails
)

taskRouter.route('/getMonthlyDashboard/:month')
.get(
    isStudentLogin,
    upload.none(),
    getMonthlyDashboard
)



export default taskRouter;