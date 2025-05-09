import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Card, CardHeader, CardContent, CardTitle } from "../../../components/ui/card";
import { format } from 'date-fns';
import { Task, Plan } from "./types";
import AddTask from "./AddTask";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";

interface TaskListProps {
  tasks: Task[];
  plans: Plan[];
  date?: string;
  fetchTasks: () => void;
}

export const TaskList = ({ tasks, plans, date, fetchTasks }: TaskListProps) => {
  const [showPlanSelection, setShowPlanSelection] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
    setShowPlanSelection(false);
    setShowAddTask(true);
  };

  const updateTaskStatus = async (taskId: string, isChecked: boolean) => {
    const newStatus = isChecked ? "Completed" : "To Do";
    setIsUpdating(true);
    
    try {
      await axios.put(`/api/student/task/updateTaskStatus`, {
        taskId,
        taskStatus: newStatus
      });
      
      // Update local state immediately for better UX
      fetchTasks();
      toast.success(`Task marked as ${newStatus}`);
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Failed to update task status');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>All Tasks - {date ? format(new Date(date), "PPPP") : "Selected Day"}</CardTitle>
        <Button onClick={() => setShowPlanSelection(true)} variant="outline">
          Add Task
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`p-3 border rounded-lg shadow-sm flex items-start gap-3 transition-colors ${
                task.taskStatus === "Completed" 
                  ? "bg-green-50 border-green-200" 
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-center h-5 mt-1">
                <input
                  type="checkbox"
                  checked={task.taskStatus === "Completed"}
                  onChange={(e) => updateTaskStatus(task._id, e.target.checked)}
                  disabled={isUpdating}
                  className={`w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 ${
                    isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-semibold flex items-center gap-2 truncate ${
                  task.taskStatus === "Completed" ? "text-green-800" : "text-gray-800"
                }`}>
                  {task.taskStatus === "Completed" && (
                    <svg 
                      className="w-4 h-4 text-green-500 flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  <span className="truncate">{task.taskTitle}</span>
                </div>
                {task.taskDescription && (
                  <p className={`text-sm truncate ${
                    task.taskStatus === "Completed" ? "text-green-600" : "text-gray-600"
                  }`}>
                    {task.taskDescription}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Plan Selection Dialog */}
        <Dialog open={showPlanSelection} onOpenChange={setShowPlanSelection}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select a Plan</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {plans.map((plan) => (
                <div 
                  key={plan._id}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => handlePlanSelect(plan._id)}
                >
                  <h3 className="font-medium">{plan.planTitle}</h3>
                  <p className="text-sm text-gray-600">{plan.planDescription}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Task Dialog */}
        <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
          <DialogContent className="text-black">
            {selectedPlanId && (
              <AddTask
                planId={selectedPlanId}
                day={date || new Date().toISOString().split('T')[0]}
                fetchTasks={fetchTasks}
                setShowAddModal={setShowAddTask}
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};