
import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Plan } from './../../models/Task/plan.model.js';
import { Task } from './../../models/Task/task.model.js';



const createPlan = asyncHandler(async (req, res, next) => {

   try {

      const { planTitle, planDescription, planStatus, planDuration, planPriority, planEffort, planType, planStartDate, planEndDate } = req.body;

      console.log("req.body => ", req.body);

      if(!planTitle || !planDescription || !planStatus || !planDuration || !planPriority || !planEffort || !planType || !planEndDate || !planStartDate) {
         throw new ApiError(400, "Please provide all the required fields"); 
      }

      
      const plan = await Plan.create({
        student: req.user._id,
        planTitle: planTitle.trim(),
        planDescription: planDescription.trim(),
        planStatus: planStatus.trim(),
        planDuration: planDuration,
        planPriority: planPriority,
        planType: planType.trim(),
        planEffort: planEffort.trim(),
        planStartDate,
        planEndDate
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

        const { taskTitle, taskDescription, taskStatus, taskDuration, taskPriority, taskDate } = req.body;
        console.log("taskDate => ", taskDate)

        const { planId } = req.params;

        if(!planId || !taskTitle || !taskStatus || !taskDuration || !taskPriority || !taskDate) {
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
            taskPriority: taskPriority, 
            taskDate
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

const updateTask = asyncHandler(async (req, res, next) => {
    try {

        const { taskTitle, taskDescription, taskStatus, taskDuration, taskPriority, _id, taskDate } = req.body;
        const { planId } = req.params;

   

        const isplan = await Plan.findById(planId);

        if(!isplan) {
            throw new ApiError(400, "Plan Not Found");
        }

        const task = await Task.findByIdAndUpdate(_id, {
            taskTitle: taskTitle.trim(),
            taskDescription: taskDescription.trim(),
            taskStatus: taskStatus.trim(),
            taskDuration: taskDuration,
            taskPriority: taskPriority
        });

        return res  
            .status(200)
            .json(
                new ApiResponse(200, "Task Updated Successfully", task)
            )

    } 
    catch (error) {
        console.log(error.message);
        throw new ApiError(400, error.message, error);
    }
})

const deleteTask = asyncHandler(async (req, res, next) => {
    try {

        const { taskId } = req.body;
        const { planId } = req.params;

        console.log(req.body)

        console.log("taskId => ", taskId)
        console.log("planId => ", planId)

        if(!planId || !taskId) {
            throw new ApiError(400, "Please provide all the required fields");
        }

        const isplan = await Plan.findById(planId);

        if(!isplan) {
            throw new ApiError(400, "Plan Not Found");
        }

        const task = await Task.findByIdAndDelete(taskId);

        return res  
            .status(200)
            .json(
                new ApiResponse(200, "Task Deleted Successfully", task)
            )

    } 
    catch (error) {
        console.log(error.message);
        throw new ApiError(400, error.message, error);
    }
})

const updateTaskStatus = asyncHandler(async (req, res, next) => {
    try {

        const { taskId, taskStatus } = req.body;

        if( !taskId || !taskStatus) {
            throw new ApiError(400, "Please provide all the required fields");
        }

        const task = await Task.findByIdAndUpdate(taskId, {
            taskStatus: taskStatus.trim()
        });

        return res  
            .status(200)
            .json(
                new ApiResponse(200, "Task Status Updated Successfully", task)
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

const getDailyTasks = asyncHandler(async (req, res, next) => {
    try {
        
        const { date } = req.query || new Date();

        const tasks = await Task.aggregate([
            {
                $match: {
                    taskDate: date
                }
            }
        ])

        return res  
            .status(200)
            .json(
                new ApiResponse(
                    200, 
                    "Daily Tasks Fetched Successfully", 
                    {
                        tasks
                    }
                )
            )

    } 
    catch (error) {
        console.log("Error => ", error);
        throw new ApiError(500, error.message);    
    }
})

const getDailyDashboard = asyncHandler(async (req, res, next) => {
    try {

        const { date } = req.query || new Date();

        const tasks = await Task.aggregate([
            {
                $match: {
                    taskDate: date
                }
            },
            {
                $addFields: {
                    allTasks: {
                        $size: "$$ROOT"
                    }
                }
            },
            {
                $group: {
                    taskStatus: "$taskStatus",
                    totalTasks: { $sum: "$allTasks" },
                    completedTasks: {
                        $sum: {
                            $cond: {
                                if: {
                                    $eq: ["$taskStatus", "Completed"]
                                }
                            }
                        }
                    }
                }
            }, 
            {
                $group: {
                    uncompletedTasks: {
                        $sum: {
                            $cond: {
                                if: {
                                    $eq: ["$taskStatus", "To Do"]
                                }
                            }
                        } 
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$taskDate",
                    allTasks: 1,
                    totalTasks: 1,
                    completedTasks: 1,
                }
            }
        ])

        return res  
            .status(200)
            .json(
                new ApiResponse(
                    200, 
                    "Daily Dashboard Fetched Successfully", 
                    {
                        tasks
                    }
                )
            )
        
    } 
    catch (error) {
        console.log("Error => ", error);
        throw new ApiError(500, error.message);    
    }
})


const getPlanDashboard = asyncHandler(async (req, res, next) => {
    try {
        
        const { planId } = req.params;

        const tasks = await Task.aggregate([
            {
                $match: {
                    plan: new mongoose.Types.ObjectId(planId)
                }
            },
            {
                $addFields: {
                    allTasks: {
                        $size: "$$ROOT"
                    }
                }
            }
        ])
    } 
    catch (error) {
        console.log("Error => ", error);
        throw new ApiError(500, error.message);
    }
})

const getMonthlyDashboard = asyncHandler(async (req, res) => {
    try {
        const month = req.params.month;  // The month will be in YYYY-MM format
        const studentId = req.user._id;  // Assuming user is logged in and student ID is available

        // Get the start and end date of the month
        const startDate = new Date(`${month}-01T00:00:00.000Z`);
        const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1)); // First day of next month
        endDate.setHours(23, 59, 59, 999);  // End of the current month

        // Generate the list of dates for the entire month
        const daysInMonth = [];
        const currentDay = new Date(startDate);
        while (currentDay <= endDate) {
            daysInMonth.push(currentDay.toISOString().split("T")[0]);  // Add each day in YYYY-MM-DD format
            currentDay.setDate(currentDay.getDate() + 1);
        }

        // Fetch all plans and tasks for the given student within the month
        const plans = await Plan.aggregate([
            {
                $match: {
                    student: studentId,  // Match the student ID
                    planStartDate: { $lte: endDate },
                    planEndDate: { $gte: startDate }
                }
            },
            {
                $lookup: {
                    from: "tasks",
                    localField: "_id",
                    foreignField: "plan",
                    as: "tasks",
                    pipeline: [
                        {
                            $match: {
                                taskDate: { $gte: startDate, $lte: endDate }  // Match tasks within the month range
                            }
                        }
                    ]
                }
            },
            { $unwind: { path: "$tasks", preserveNullAndEmptyArrays: true } },  // Unwind tasks to get each task separately
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$tasks.taskDate" } },  // Group by date
                    tasks: { $push: "$tasks" }  // Push tasks for each date
                }
            },
            {
                $project: {
                    date: "$_id",  // Date in YYYY-MM-DD format
                    tasks: 1,  // List of tasks for that date
                    _id: 0
                }
            },
            { $sort: { date: 1 } }  // Sort by date
        ]);

        // Merge the array of all days in the month with the tasks data
        const monthlyData = daysInMonth.map(day => {
            const tasksForDay = plans.find(plan => plan.date === day);
            return {
                date: day,
                tasks: tasksForDay ? tasksForDay.tasks : []  // If no tasks for that day, return an empty array
            };
        });

        // Sort the monthlyData array by date in ascending order (to ensure it's properly sorted)
        monthlyData.sort((a, b) => new Date(a.date) - new Date(b.date));

        console.log("monthlyData => ", monthlyData);

        return res.status(200).json(
            new ApiResponse(200, "Monthly Dashboard Data Fetched Successfully", {
                monthlyData  // Return the structured array of days with tasks
            })
        );
    } catch (error) {
        console.error("Error => ", error);
        throw new ApiError(500, error.message);
    }
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

/***
 * 
 *  get the current day details 
 *  
 */

const fetchCurrentDayDetails = asyncHandler(async (req, res) => {
    try {
      const { date } = req.query;
  
      if (!date) {
        throw new ApiError(400, "Date query parameter is required");
      }
  
      const selectedDate = new Date(date);
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);
  
      const plans = await Plan.aggregate([
        {
          $match: {
            student: new mongoose.Types.ObjectId(req.user._id),
            planStartDate: { $lte: endOfDay },
            planEndDate: { $gte: startOfDay },
          },
        },
        {
          $lookup: {
            from: "tasks",
            localField: "_id",
            foreignField: "plan",
            as: "tasks",
            pipeline: [
              {
                $match: {
                  taskDate: {
                    $gte: startOfDay,
                    $lte: endOfDay,
                  },
                },
              },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            planTitle: 1,
            planDescription: 1,
            planStatus: 1,
            planDuration: 1,
            planStartDate: 1,
            planEndDate: 1,
            tasks: 1,
          },
        },
      ]);

      console.log("plans => ", plans)
  
      return res.status(200).json(
        new ApiResponse(200, "Today's detailed fetched successfully", {
          plans,
        })
      );
    } catch (error) {
      console.error("Error fetching day details:", error.message);
      throw new ApiError(500, error.message);
    }
  });
  





export {
   createPlan,
   addTasksToPlan, 
   getAllPlans,
   getPlanDetails,
   getTasksByPlan, 
   updateTask, 
   updateTaskStatus, 
   deleteTask,
   fetchCurrentDayDetails,
   getMonthlyDashboard
   
}