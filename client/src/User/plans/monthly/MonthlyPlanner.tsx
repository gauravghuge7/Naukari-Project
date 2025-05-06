import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isToday,
  differenceInDays,
} from 'date-fns';
import { useState, FormEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AddTask from "./../freeStyle/AddTask"

const MonthlyPlanner = () => {
  const today = new Date();
  const start = startOfWeek(startOfMonth(today), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(today), { weekStartsOn: 1 });
  const planStartDate = startOfMonth(today);
  const planEndDate = endOfMonth(today);
  const duration = differenceInDays(planEndDate, planStartDate) + 1;

  const [planId, setPlanId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const [formData, setFormData] = useState({
    planTitle: '',
    planDescription: '',
    planStatus: 'To Do',
    planType: 'Monthly',
    planDuration: duration,
    planPriority: 1,
    planEffort: 'Medium',
    planStartDate: planStartDate.toISOString(),
    planEndDate: planEndDate.toISOString(),
  });

  const days: Date[] = [];
  for (let day = start; day <= end; day = addDays(day, 1)) {
    days.push(day);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'planPriority' ? Number(value) : value,
    }));
  };

  const handleCreatePlan = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/student/task/createPlan', formData);
      if (res.status === 201 || res.status === 200) {
        setPlanId(res.data.data._id);
        toast.success('Monthly plan created!');
        setShowModal(false);
      }
    } catch (err) {
      toast.error('Failed to create plan.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Monthly Planning: {format(today, 'MMMM yyyy')}
      </h1>

      <div className="mb-4 text-center sm:text-right">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
        >
          Create Monthly Plan
        </button>

        {planId && (
          <a
            href={`/user/viewPlantasks/${planId}`}
            className="ml-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
          >
            View Plan Tasks
          </a>
        )}
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-2 sm:gap-4 min-w-[600px] text-center">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <div key={d} className="font-semibold text-gray-300">{d}</div>
          ))}
          {days.map((day, idx) => (
            <button
              key={idx}
              disabled={!planId}
              onClick={() => {
                setSelectedDay(day);
                setShowTaskModal(true);
              }}
              className={`p-2 sm:p-3 rounded-xl text-sm sm:text-base ${
                isToday(day) ? 'bg-purple-600 text-white' : 'bg-gray-900 text-gray-300'
              } ${!isSameMonth(day, today) ? 'opacity-50' : 'hover:bg-gray-700'} transition`}
            >
              {format(day, 'd')}
            </button>
          ))}
        </div>
      </div>

      {/* Plan Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 px-4">
          <div className="relative bg-gray-900 p-6 rounded-xl w-full max-w-2xl border border-gray-700 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Create Monthly Plan</h2>
            <form onSubmit={handleCreatePlan} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Plan Title *</label>
                <input
                  type="text"
                  name="planTitle"
                  value={formData.planTitle}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="planDescription"
                  value={formData.planDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Status *</label>
                <select
                  name="planStatus"
                  value={formData.planStatus}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Priority *</label>
                <input
                  type="number"
                  name="planPriority"
                  value={formData.planPriority}
                  onChange={handleChange}
                  min={1}
                  max={10}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Effort *</label>
                <select
                  name="planEffort"
                  value={formData.planEffort}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="text-sm text-gray-400">
                <p><strong>Start Date:</strong> {format(planStartDate, 'eeee, MMM d')}</p>
                <p><strong>End Date:</strong> {format(planEndDate, 'eeee, MMM d')}</p>
                <p><strong>Duration:</strong> {formData.planDuration} days</p>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
              >
                Create Plan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showTaskModal && selectedDay && planId && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-xl border border-gray-700 relative">
            <button
              onClick={() => setShowTaskModal(false)}
              className="absolute top-4 right-4 text-white text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Add Task for {format(selectedDay, 'PPP')}</h2>
            <AddTask planId={planId} day={selectedDay.toISOString()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyPlanner;
