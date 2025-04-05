import {
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isToday,
  differenceInDays,
} from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const FreestylePlanner = () => {
  const navigate = useNavigate();
  const [planId, setPlanId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [formData, setFormData] = useState({
    planTitle: '',
    planDescription: '',
    planStatus: 'To Do',
    planType: 'Freestyle',
    planDuration: 0,
    planPriority: 1,
    planEffort: 'Medium',
    planStartDate: '',
    planEndDate: '',
  });

  const generateDays = () => {
    if (!formData.planStartDate || !formData.planEndDate) return [];
    const start = new Date(formData.planStartDate);
    const end = new Date(formData.planEndDate);
    const days = [];
    for (let d = start; d <= end; d = addDays(d, 1)) {
      days.push(new Date(d));
    }
    return days;
  };

  const days = generateDays();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'planPriority' ? Number(value) : value,
    }));

    if (name === 'planStartDate' || name === 'planEndDate') {
      const start = new Date(name === 'planStartDate' ? value : formData.planStartDate);
      const end = new Date(name === 'planEndDate' ? value : formData.planEndDate);
      if (start && end && start <= end) {
        const duration = differenceInDays(end, start) + 1;
        setFormData((prev) => ({ ...prev, planDuration: duration }));
      }
    }
  };

  const handleCreatePlan = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/student/task/createPlan', formData);
      if (res.status === 201 || res.status === 200) {
        setPlanId(res.data.data._id);
        toast.success('Freestyle plan created!');
        setShowModal(false);
      }
    } catch (err) {
      toast.error('Failed to create plan.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Freestyle Planner</h1>

      <div className="mb-4 text-right">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
        >
          Create Freestyle Plan
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4 text-center">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <div key={d} className="font-semibold text-gray-300">{d}</div>
        ))}
        {days.map((day, idx) => (
          <button
            key={idx}
            disabled={!planId}
            onClick={() => navigate(`/user/freestylePlan/${planId}/${day.toISOString()}`)}
            className={`p-3 rounded-xl ${
              isToday(day) ? 'bg-purple-600 text-white' : 'bg-gray-900 text-gray-300'
            } hover:bg-gray-700 transition`}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-2xl border border-gray-700 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Create Freestyle Plan</h2>
            <form onSubmit={handleCreatePlan} className="space-y-4">
              <input type="hidden" name="planType" value="Freestyle" />

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

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Start Date *</label>
                  <input
                    type="date"
                    name="planStartDate"
                    value={formData.planStartDate}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">End Date *</label>
                  <input
                    type="date"
                    name="planEndDate"
                    value={formData.planEndDate}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                  />
                </div>
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
    </div>
  );
};

export default FreestylePlanner;