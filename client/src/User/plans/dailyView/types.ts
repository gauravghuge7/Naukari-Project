export interface Task {
    _id: string;
    taskTitle: string;
    taskStatus: string;
    taskDescription: string;
    taskPriority: number;
    taskDuration: number;
    taskDate: string;
  }
  
  export interface Plan {
    _id: string;
    planTitle: string;
    planDescription: string;
    planStatus: string;
    planDuration: number;
    planStartDate: string;
    planEndDate: string;
    tasks: Task[];
  }
  
  export const COLORS = ["#22c55e", "#ef4444"];