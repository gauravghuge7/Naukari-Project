import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

interface AddTaskProps {
  planId: string;
  day: string;
  fetchTasks?: () => void; // Optional callback
  setShowAddModal?: (visible: boolean) => void; // Optional close handler
}

const AddTask: React.FC<AddTaskProps> = ({ planId, day, fetchTasks, setShowAddModal }) => {
  const [newTask, setNewTask] = useState({
    taskTitle: '',
    taskDescription: '',
    taskStatus: 'To Do',
    taskDuration: 30,
    taskPriority: 1,
    taskDate: '',
  });

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleTaskAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const taskWithDate = { ...newTask, taskDate: day };
      Object.entries(taskWithDate).forEach(([key, value]) =>
        formData.append(key, String(value))
      );

      const res = await axios.post(`/api/student/task/addTasks/${planId}`, formData);
      if (res.status === 201) {
        toast.success('Task added');



        fetchTasks?.();
        setShowAddModal?.(false);
        setNewTask({
          taskTitle: '',
          taskDescription: '',
          taskStatus: 'To Do',
          taskDuration: 30,
          taskPriority: 1,
          taskDate: '',
        });
      }
    } 
    catch {
      toast.error('Add failed');
    }
  };

  return (
    <form onSubmit={handleTaskAdd} className="space-y-4 text-black">

      <ToastContainer />

      <div>
        <label className="block mb-1">Title *</label>
        <input
          type="text"
          name="taskTitle"
          value={newTask.taskTitle}
          onChange={handleAddChange}
          required
          className="w-full p-2 bg-gray-200 border border-gray-600 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="taskDescription"
          value={newTask.taskDescription}
          onChange={handleAddChange}
          className="w-full p-2 bg-gray-200 border border-gray-600 rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Status</label>
          <select
            name="taskStatus"
            value={newTask.taskStatus}
            onChange={handleAddChange}
            className="w-full p-2 bg-gray-200 border border-gray-600 rounded"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Duration (min)</label>
          <input
            type="number"
            name="taskDuration"
            value={newTask.taskDuration}
            onChange={handleAddChange}
            className="w-full p-2 bg-gray-200 border border-gray-600 rounded"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1">Priority (1-10)</label>
        <input
          type="number"
          name="taskPriority"
          value={newTask.taskPriority}
          min={1}
          max={10}
          onChange={handleAddChange}
          className="w-full p-2 bg-gray-200 border border-gray-600 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-4 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-semibold"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
