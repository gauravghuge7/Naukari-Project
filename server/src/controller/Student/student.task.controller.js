
import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Plan } from './../../models/Task/plan.model.js';
import { Task } from './../../models/Task/task.model.js';




const createPlan = asyncHandler(async (req, res, next) => {

   try {

      const { planTitle, planDescription, planStatus, planDuration, planPriority, planEffort } = req.body;

      console.log("req.body => ", req.body);

      if(!planTitle || !planDescription || !planStatus || !planDuration || !planPriority || !planEffort) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const plan = await Plan.create({
        student: req.user._id,
        planTitle: planTitle.trim(),
        planDescription: planDescription.trim(),
        planStatus: planStatus.trim(),
        planDuration: planDuration,
        planPriority: planPriority,
        planEffort: planEffort.trim()
      });


      return res 
      .status(201)
      .json(
         new ApiResponse(201, "Plan Created Successfully", plan)
      )

   } 
   catch (error) {
      console.log(error.message);
      throw new ApiError(400, error.message, error);
   }

})  


const getAllPlans = asyncHandler(async (req, res, next) => {

    try {
        
        const {_id} = req.user;

        const plans = await Plan.find({
            student: _id
        })

        return res  
            .status(200)
            .json(
                new ApiResponse(200, "all plans fetched successfully", {
                    plans
                })
            )

    } 
    catch (error) {
        console.log(error.message);
    }
})


const getPlanDetails = asyncHandler(async (req, res, next) => {
    try {

        const { planId } = req.params;

        if(!planId) {
            throw new ApiError(400, "Please provide all the required fields");
        }

        const plan = await Plan.findById(planId);

        console.log("plan => ", plan)

        if(!plan) {
            throw new ApiError(400, "Plan Not Found");
        }

        return res  
            .status(200)
            .json(
                new ApiResponse(
                    200, 
                    "Plan Details Fetched Successfully", 
                    {
                        plan
                    }
                )
            )

    } 
    catch (error) {
        console.log(error.message);
        throw new ApiError(400, error.message, error);
    }
})

const addTasksToPlan = asyncHandler(async (req, res, next) => {
    try {

        const { taskTitle, taskDescription, taskStatus, taskDuration, taskPriority } = req.body;

        const { planId } = req.params;

        if(!planId || !taskTitle || !taskDescription || !taskStatus || !taskDuration || !taskPriority) {
            throw new ApiError(400, "Please provide all the required fields");
        }

        const plan = await Plan.findById(planId);

        if(!plan) {
            throw new ApiError(400, "Plan Not Found");
        }

        const task = await Task.create({
            plan: plan._id,
            taskTitle: taskTitle.trim(),
            taskDescription: taskDescription.trim(),
            taskStatus: taskStatus.trim(),
            taskDuration: taskDuration,
            taskPriority: taskPriority
        });

        return res 
        .status(201)
        .json(
            new ApiResponse(201, "Task Added Successfully", task)
        )

    } 
    catch (error) {
        console.log(error.message);
        throw new ApiError(400, error.message, error);
    }

})

const getTasksByPlan = asyncHandler(async (req, res, next) => {
    try {

        const { planId } = req.params;

        if(!planId) {
            throw new ApiError(400, "Please provide all the required fields");
        }

        console.log("planId => ", planId)

        const task = await Task.findOne({ plan: planId })

        console.log("task => ", task)

        const tasks = await Task.aggregate([
            { $match: { plan: new mongoose.Types.ObjectId(planId) } },
            
        ])

        console.log("tasks => ", tasks)

        return res  
            .status(200)
            .json(
                new ApiResponse(200, "Tasks Fetched Successfully", {
                    tasks
                })
            )

    } 
    catch (error) {
        console.log(error.message);
        throw new ApiError(400, error.message, error);
    }
})




export {
   createPlan,
   addTasksToPlan, 
   getAllPlans,
   getPlanDetails,
   getTasksByPlan

}