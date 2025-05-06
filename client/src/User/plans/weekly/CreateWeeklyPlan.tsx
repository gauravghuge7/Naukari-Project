import { useParams } from 'react-router-dom';
import { startOfWeek, addDays, format } from 'date-fns';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

type Task = {
  _id?: string;
  taskTitle: string;
  taskDescription: string;
  taskStatus: string;
  taskDuration: number;
  taskPriority: number;
  taskDate: string;
};

const CreateWeeklyPlan = () => {
  const { planId } = useParams<{ planId: string }>();
  const [weekStart, setWeekStart] = useState<Date | null>(null);
  const [tasksByDate, setTasksByDate] = useState<{ [key: string]: Task[] }>({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addDate, setAddDate] = useState<string>('');
  const [newTask, setNewTask] = useState<Task>({
    taskTitle: '',
    taskDescription: '',
    taskStatus: 'To Do',
    taskDuration: 30,
    taskPriority: 1,
    taskDate: '',
  });

  // Fetch plan start date
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axios.get(`/api/student/task/getPlanDetails/${planId}`);
        const start = new Date(res.data.data.plan.planStartDate);
        setWeekStart(startOfWeek(start, { weekStartsOn: 1 }));
      } catch {
        toast.error('Failed to load plan');
      }
    };
    fetchPlan();
  }, [planId]);

  // Fetch all tasks for the plan
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`/api/student/task/getTasksByPlan/${planId}`);
      const grouped: { [key: string]: Task[] } = {};
      console.log("tasks => ", res.data.data.tasks);

      res.data.data.tasks.forEach((task: Task) => {
        const dateKey = format(new Date(task.taskDate), 'yyyy-MM-dd'); // use new Date for safety
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push(task);
      });

      setTasksByDate(grouped);
    } catch {
      toast.error('Failed to load tasks');
    }
  };

  useEffect(() => {
    if (planId) fetchTasks();
  }, [planId]);

  const days = weekStart ? Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)) : [];

  const handleTaskClick = (task: Task) => {
    setEditTask(task);
    setShowEditModal(true);
  };

  const handleTaskUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTask) return;
    try {
      const formData = new FormData();
      Object.entries(editTask).forEach(([key, value]) =>
        formData.append(key, String(value))
      );

      const res = await axios.put(`/api/student/task/updateTask/${planId}`, formData);
      if (res.status === 200) {
        toast.success('Task updated');
        fetchTasks();
        setShowEditModal(false);
      }
    } catch {
      toast.error('Update failed');
    }
  };

  const handleTaskAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const taskWithDate = { ...newTask, taskDate: addDate };
      Object.entries(taskWithDate).forEach(([key, value]) =>
        formData.append(key, String(value))
      );

      const res = await axios.post(`/api/student/task/addTasks/${planId}`, formData);
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

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editTask) return;
    setEditTask({ ...editTask, [e.target.name]: e.target.value });
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Weekly Plan</h1>
      <div className="space-y-6">
        {days.map((day, idx) => {
          const dayKey = format(day, 'yyyy-MM-dd');
          return (
            <div key={idx} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="text-xl text-indigo-400 font-bold">{format(day, 'EEEE')}</h2>
                  <p className="text-sm text-gray-400">{format(day, 'MMM d, yyyy')}</p>
                </div>
                <button
                  onClick={() => {
                    setAddDate(dayKey); // Set selected date for task
                    setShowAddModal(true);
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  + Add Task
                </button>
              </div>

              <ul className="list-disc list-inside text-sm text-gray-200 space-y-1">
                {(tasksByDate[dayKey] || []).map((task) => (
                  <li key={task._id} className="flex justify-between items-center">
                    <span>{task.taskTitle}</span>
                    <button
                      onClick={() => handleTaskClick(task)}
                      className="text-xs text-purple-400 hover:underline"
                    >
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {showEditModal && editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md relative">
            <button onClick={() => setShowEditModal(false)} className="absolute top-2 right-3 text-white text-xl">
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
            <form onSubmit={handleTaskUpdate} className="space-y-4">
              <input type="hidden" name="taskId" value={editTask._id} />
              <div>
                <label className="text-sm">Task Title</label>
                <input
                  name="taskTitle"
                  value={editTask.taskTitle}
                  onChange={handleEditChange}
                  className="w-full bg-gray-700 border border-gray-600 p-2 rounded"
                />
              </div>
              <div>
                <label className="text-sm">Description</label>
                <input
                  name="taskDescription"
                  value={editTask.taskDescription}
                  onChange={handleEditChange}
                  className="w-full bg-gray-700 border border-gray-600 p-2 rounded"
                />
              </div>
              <div>
                <label className="text-sm">Status</label>
                <select
                  name="taskStatus"
                  value={editTask.taskStatus}
                  onChange={handleEditChange}
                  className="w-full bg-gray-700 border border-gray-600 p-2 rounded"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="text-sm">Priority</label>
                <input
                  name="taskPriority"
                  type="number"
                  min={1}
                  max={5}
                  value={editTask.taskPriority}
                  onChange={handleEditChange}
                  className="w-full bg-gray-700 border border-gray-600 p-2 rounded"
                />
              </div>
              <div>
                <label className="text-sm">Duration (minutes)</label>
                <input
                  name="taskDuration"
                  type="number"
                  min={1}
                  value={editTask.taskDuration}
                  onChange={handleEditChange}
                  className="w-full bg-gray-700 border border-gray-600 p-2 rounded"
                />
              </div>
              <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-2 right-3 text-white text-xl">
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
            <form onSubmit={handleTaskAdd} className="space-y-4">
              <div>
                <label className="text-sm">Task Title</label>
                <input
                  name="taskTitle"
                  value={newTask.taskTitle}
                  onChange={handleAddChange}
                  className="w-full bg-gray-700 border border-gray-600 p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="text-sm">Description</label>
                <input
                  name="taskDescription"
                  value={newTask.taskDescription}
                  onChange={handleAddChange}
                  className="w-full bg-gray-700 border border-gray-600 p-2 rounded"
                />
              </div>
              <div>
                <label className="text-sm">Status</label>
                <select
                  name="taskStatus"
                  value={newTask.taskStatus}
                  onChange={handleAddChange}
                  className="w-full bg-gray-700 border border-gray-600 p-2 rounded"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="text-sm">Priority</label>
                <input
                  name="taskPriority"
                  type="number"
                  min={1}
                  max={5}
                  value={newTask.taskPriority}
                  onChange={handleAddChange}
                  className="w-full bg-gray-700 border border-gray-600 p-2 rounded"
                />
              </div>
              <div>
                <label className="text-sm">Duration (minutes)</label>
                <input
                  name="taskDuration"
                  type="number"
                  min={1}
                  value={newTask.taskDuration}
                  onChange={handleAddChange}
                  className="w-full bg-gray-700 border border-gray-600 p-2 rounded"
                />
              </div>
              <button type="submit" className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded text-white">
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateWeeklyPlan;
