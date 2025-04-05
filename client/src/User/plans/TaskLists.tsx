import React, { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  _id: string;
  taskTitle: string;
  taskStatus: "To Do" | "In Progress" | "Completed";
  taskDescription?: string;
  taskPriority: number;
  taskDuration: number;
}

interface TaskListsProps {
  planId: string;
}

const TaskLists: React.FC<TaskListsProps> = ({ planId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<{ data: Task[] }>(
        `/api/student/task/getTasksByPlan/${planId}`
      );

      console.log("response => ", response);

      setTasks(response.data.data?.tasks);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchTasks();
  }, [planId]);

  const updateTaskStatus = async (taskId: string, newStatus: Task["taskStatus"]) => {
    try {
      await axios.put(`/api/student/task/updateTaskStatus/${taskId}`, { taskStatus: newStatus });

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? { ...task, taskStatus: newStatus } : task))
      );
    } 
    catch (err) {
      setError("Failed to update task status");
    }
  };

  if (loading) return <div className="text-center text-white mt-4">Loading tasks...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;
  if (!tasks.length) return <div className="text-white text-center">No tasks found.</div>;

  return (
    <div className="w-full bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-gray-800 p-4 rounded mb-3 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-white">{task.taskTitle}</h3>
              <p className="text-sm text-gray-400">{task.taskDescription}</p>
              <p className="text-sm">Priority: {task.taskPriority} | Duration: {task.taskDuration} days</p>
              <p className="text-sm">Status: <span className="font-bold">{task.taskStatus}</span></p>
            </div>
            <select
              value={task.taskStatus}
              onChange={(e) => updateTaskStatus(task._id, e.target.value as Task["taskStatus"])}
              className="bg-gray-700 text-white p-2 rounded"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskLists;
