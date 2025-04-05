import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useParams } from "react-router";

interface Task {
  _id: string;
  taskTitle: string;
  taskStatus: "To Do" | "In Progress" | "Completed";
  taskDescription?: string;
  taskPriority: number;
  taskDuration: number;
  taskDate: string;
}

interface TaskListsProps {
  planId: string;
}

const TaskLists: React.FC<TaskListsProps> = ({ planId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<Partial<Task>>({});

  const plan =  useParams<{ planId: string  }>();

  const fetchTasks = async () => {
    try {
      const response = await axios.get<{ data: Task[] }>(`/api/student/task/getTasksByPlan/${planId}`);
      setTasks(response.data.data?.tasks || []);
    } catch (err) {
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: Task["taskStatus"]) => {
    try {
      await axios.put(`/api/student/task/updateTaskStatus/${planId}`, {
        taskId,
        taskStatus: newStatus,
      });

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, taskStatus: newStatus } : task
        )
      );
    } catch (err) {
      setError("Failed to update task status.");
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`/api/student/task/deleteTask/${planId}`, { data: { taskId } });
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      setSelectedTask(null);
    } catch (err) {
      setError("Failed to delete task.");
    }
  };

  const handleEdit = (task: Task) => {
    setEditMode(true);
    setSelectedTask(task);
    setForm(task);
  };

  const handleFormChange = (field: keyof Task, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitUpdate = async () => {
    try {
      await axios.put(`/api/student/task/updateTask/${selectedTask?._id}`, form);
      setTasks((prev) =>
        prev.map((task) => (task._id === selectedTask?._id ? { ...task, ...form } : task))
      );
      setSelectedTask(null);
      setEditMode(false);
    } catch (err) {
      setError("Failed to update task.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [planId]);

  const groupedTasks = tasks.reduce((acc, task) => {
    const dateKey = format(parseISO(task.taskDate), "yyyy-MM-dd");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  if (loading) return <div className="text-white text-center">Loading tasks...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!tasks.length) return <div className="text-white text-center">No tasks found.</div>;

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-white space-y-6">
      <h2 className="text-2xl font-bold mb-4">Calendar Tasks</h2>

      {Object.entries(groupedTasks).map(([date, tasksOnDate]) => (
        <div key={date} className="bg-gray-800 rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-semibold text-purple-400 mb-3">
            {format(new Date(date), "eeee")} - {format(new Date(date), "MMMM d, yyyy")}
          </h3>

          <div className="space-y-2">
            {tasksOnDate.map((task) => (
              <div
                key={task._id}
                className="flex justify-between items-center bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
              >
                <div onClick={() => setSelectedTask(task)} className="cursor-pointer w-full">
                  <p className="font-medium">{task.taskTitle}</p>
                </div>

                <select
                  value={task.taskStatus}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => updateTaskStatus(task._id, e.target.value as Task["taskStatus"])}
                  className="bg-gray-900 text-white px-2 py-1 rounded ml-2"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <button
                  onClick={() => handleEdit(task)}
                  className="text-blue-400 hover:text-blue-200 ml-3"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-400 hover:text-red-200 ml-2"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Task Modal - View or Edit */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-white">
              {editMode ? "Edit Task" : selectedTask.taskTitle}
            </h3>

            {editMode ? (
              <>
                <label className="block mb-2">
                  <span className="text-sm text-gray-400">Title</span>
                  <input
                    type="text"
                    className="w-full bg-gray-700 text-white rounded px-3 py-2"
                    value={form.taskTitle || ""}
                    onChange={(e) => handleFormChange("taskTitle", e.target.value)}
                  />
                </label>

                <label className="block mb-2">
                  <span className="text-sm text-gray-400">Description</span>
                  <textarea
                    className="w-full bg-gray-700 text-white rounded px-3 py-2"
                    value={form.taskDescription || ""}
                    onChange={(e) => handleFormChange("taskDescription", e.target.value)}
                  />
                </label>

                <label className="block mb-2">
                  <span className="text-sm text-gray-400">Priority</span>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-white rounded px-3 py-2"
                    value={form.taskPriority || 1}
                    onChange={(e) => handleFormChange("taskPriority", parseInt(e.target.value))}
                  />
                </label>

                <label className="block mb-2">
                  <span className="text-sm text-gray-400">Duration (days)</span>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-white rounded px-3 py-2"
                    value={form.taskDuration || 0}
                    onChange={(e) => handleFormChange("taskDuration", parseInt(e.target.value))}
                  />
                </label>

                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setSelectedTask(null);
                    }}
                    className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitUpdate}
                    className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-300 mb-2">
                  <span className="font-semibold text-white">Status:</span> {selectedTask.taskStatus}
                </p>
                <p className="text-sm text-gray-300 mb-2">
                  <span className="font-semibold text-white">Priority:</span> {selectedTask.taskPriority}
                </p>
                <p className="text-sm text-gray-300 mb-2">
                  <span className="font-semibold text-white">Duration:</span> {selectedTask.taskDuration} days
                </p>
                {selectedTask.taskDescription && (
                  <p className="text-sm text-gray-300 mb-2">
                    <span className="font-semibold text-white">Description:</span> {selectedTask.taskDescription}
                  </p>
                )}
                <div className="text-right mt-4">
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskLists;
