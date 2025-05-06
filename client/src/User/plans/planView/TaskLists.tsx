import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface Task {
  _id: string;
  taskTitle: string;
  taskStatus: "To Do" | "In Progress" | "Completed";
  taskDescription?: string;
  taskPriority: number;
  taskDuration: number;
  taskDate: string;
}

interface Plan {
  _id: string;
  planTitle: string;
  planDescription?: string;
  planStatus: "To Do" | "In Progress" | "Completed";
  planDuration: number;
  planPriority: number;
  planEffort: "Low" | "Medium" | "High";
  createdAt: string;
  updatedAt: string;
  student: string;
  planType: string;
  planStartDate: string;
  planEndDate: string;
}

interface TaskListsProps {
  plan: Plan;
}


const TaskLists: React.FC<TaskListsProps> = ({ plan }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<Partial<Task>>({});
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTask, setNewTask] = useState({
    taskTitle: '',
    taskDescription: '',
    taskStatus: 'To Do',
    taskDuration: 30,
    taskPriority: 1,
    taskDate: '',
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get<{ data: { tasks: Task[] } }>(`/api/student/task/getTasksByPlan/${plan._id}`);
      setTasks(response.data.data.tasks || []);
    } catch (err) {
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: Task["taskStatus"]) => {
    try {
      await axios.put(`/api/student/task/updateTaskStatus/${plan._id}`, {
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
      await axios.delete(`/api/student/task/deleteTask/${plan._id}`, { data: { taskId } });
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
      await axios.put(`/api/student/task/updateTask/${plan._id}`, form);
      setTasks((prev) => prev.map((task) => task._id === selectedTask?._id ? { ...task, ...form } : task));
      setSelectedTask(null);
      setEditMode(false);
    } catch {
      setError("Failed to update task.");
    }
  };



  const handleTaskAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const taskWithDate = { ...newTask, taskDate: newTask.taskDate };
      Object.entries(taskWithDate).forEach(([key, value]) =>
        formData.append(key, String(value))
      );

      const res = await axios.post(`/api/student/task/addTasks/${plan._id}`, formData);
      if (res.status === 201) {
        toast.success('Task added');
        fetchTasks();
        setShowAddModal(false);
        setNewTask({
          taskTitle: '',
          taskDescription: '',
          taskStatus: 'To Do',
          taskDuration: 30,
          taskPriority: 1,
          taskDate: '',
        });
      }
    } catch {
      toast.error('Add failed');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [plan._id]);

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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Calendar Tasks</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded"
        >
          + Add Task
        </button>
      </div>

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
                <div onClick={() => setSelectedTask(task)} className="cursor-pointer w-full flex items-center gap-2">
                  {task.taskStatus === "Completed" ? (
                    <span className="text-green-400">✔️</span>
                  ) : (
                    <span className="w-4" />
                  )}
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

      {/* View/Edit Task Modal (unchanged) */}
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



      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <form
            onSubmit={handleTaskAdd}
            className="bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg"
          >
            <h3 className="text-xl text-white font-bold mb-4">Add New Task</h3>

            <input
              type="text"
              placeholder="Title"
              required
              className="w-full mb-2 px-3 py-2 bg-gray-700 text-white rounded"
              value={newTask.taskTitle}
              onChange={(e) => setNewTask({ ...newTask, taskTitle: e.target.value })}
            />

            <textarea
              placeholder="Description"
              className="w-full mb-2 px-3 py-2 bg-gray-700 text-white rounded"
              value={newTask.taskDescription}
              onChange={(e) => setNewTask({ ...newTask, taskDescription: e.target.value })}
            />

            <DatePicker
              selected={newTask.taskDate ? new Date(newTask.taskDate) : null}
              onChange={(date: Date | null) =>
                setNewTask({ ...newTask, taskDate: date ? date.toISOString().split('T')[0] : '' })
              }
              minDate={new Date(plan.planStartDate)}
              maxDate={new Date(plan.planEndDate)}
              placeholderText="Select task date"
              dateFormat="yyyy-MM-dd"
              className="w-full mb-2 px-3 py-2 bg-gray-700 text-white rounded"
              required
            />

            <input
              type="number"
              placeholder="Priority"
              className="w-full mb-2 px-3 py-2 bg-gray-700 text-white rounded"
              value={newTask.taskPriority}
              onChange={(e) => setNewTask({ ...newTask, taskPriority: +e.target.value })}
            />

            <input
              type="number"
              placeholder="Duration (days)"
              className="w-full mb-4 px-3 py-2 bg-gray-700 text-white rounded"
              value={newTask.taskDuration}
              onChange={(e) => setNewTask({ ...newTask, taskDuration: +e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskLists;
