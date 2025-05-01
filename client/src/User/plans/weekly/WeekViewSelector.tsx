import React, { useState, useEffect, FormEvent } from 'react';
import { addWeeks, startOfWeek, format, differenceInDays } from 'date-fns';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const getWeeks = (totalWeeks = 8) => {
  const today = new Date();
  return Array.from({ length: totalWeeks }, (_, i) =>
    startOfWeek(addWeeks(today, i), { weekStartsOn: 1 })
  );
};

interface PlanFormData {
  planTitle: string;
  planDescription: string;
  planStatus: 'To Do' | 'In Progress' | 'Completed';
  planType: 'Weekly';
  planDuration: number;
  planPriority: number;
  planEffort: 'Low' | 'Medium' | 'High';
  planStartDate: string;
  planEndDate: string;
}

interface FormErrors {
  planTitle?: string;
  planStatus?: string;
  planType?: string;
  planPriority?: string;
  submit?: string;
}

interface CreatePlanProps {
  startDate: Date;
  endDate: Date;
  onClose: () => void;
}

const CreatePlan: React.FC<CreatePlanProps> = ({ startDate, endDate, onClose }) => {
  const [formData, setFormData] = useState<PlanFormData>({
    planTitle: '',
    planDescription: '',
    planStatus: 'To Do',
    planType: 'Weekly',
    planDuration: 1,
    planPriority: 1,
    planEffort: 'Medium',
    planStartDate: startDate.toISOString(),
    planEndDate: endDate.toISOString()
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const duration = differenceInDays(endDate, startDate);
    setFormData(prev => ({
      ...prev,
      planStartDate: startDate.toISOString(),
      planEndDate: endDate.toISOString(),
      planDuration: duration > 0 ? duration : 1
    }));
  }, [startDate, endDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'planPriority' ? Number(value) : value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    let tempErrors: FormErrors = {};
    if (!formData.planTitle.trim()) tempErrors.planTitle = 'Plan title is required';
    if (!formData.planStatus) tempErrors.planStatus = 'Status is required';
    if (!formData.planType) tempErrors.planType = 'Type is required';
    if (formData.planPriority < 1) tempErrors.planPriority = 'Priority must be at least 1';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response: AxiosResponse = await axios.post('/api/student/task/createPlan', formData);
      setSuccessMessage('Plan created successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);

      if (response.data.success) {
        navigate(`/user/createWeeklyPlan/${response.data.data._id}`);
      }
    } 
    catch (error) {
      const axiosError = error as AxiosError;
      setErrors({ submit: 'Failed to create plan. Please try again.' });
      console.error('Error:', axiosError);
    } 
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto p-6 bg-gray-900 text-white border border-gray-700 rounded-xl shadow-lg">
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl font-bold">&times;</button>
      <h2 className="text-2xl font-bold mb-6 text-center">Create Weekly Plan</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium">Plan Title *</label>
          <input
            type="text"
            name="planTitle"
            value={formData.planTitle}
            onChange={handleChange}
            className="flex-1 p-2 bg-gray-800 text-white border border-gray-600"
            placeholder="Enter plan title"
          />
        </div>
        {errors.planTitle && <p className="text-red-500 text-sm">{errors.planTitle}</p>}

        <div className="flex items-start">
          <label className="w-32 text-sm font-medium pt-2">Description</label>
          <textarea
            name="planDescription"
            value={formData.planDescription}
            onChange={handleChange}
            rows={3}
            className="flex-1 p-2 bg-gray-800 text-white border border-gray-600"
            placeholder="Describe your plan (optional)"
          />
        </div>

        <div className="flex items-center">
          <label className="w-32 text-sm font-medium">Status *</label>
          <select
            name="planStatus"
            value={formData.planStatus}
            onChange={handleChange}
            className="flex-1 p-2 bg-gray-800 text-white border border-gray-600"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="w-32 text-sm font-medium">Type</label>
          <input
            type="text"
            name="planType"
            value={formData.planType}
            disabled
            className="flex-1 p-2 bg-gray-800 text-gray-400 border border-gray-600"
          />
        </div>

        <div className="flex items-center">
          <label className="w-32 text-sm font-medium">Priority *</label>
          <input
            type="number"
            name="planPriority"
            value={formData.planPriority}
            onChange={handleChange}
            min={1}
            max={10}
            className="flex-1 p-2 bg-gray-800 text-white border border-gray-600"
          />
        </div>
        {errors.planPriority && <p className="text-red-500 text-sm">{errors.planPriority}</p>}

        <div className="flex items-center">
          <label className="w-32 text-sm font-medium">Effort *</label>
          <select
            name="planEffort"
            value={formData.planEffort}
            onChange={handleChange}
            className="flex-1 p-2 bg-gray-800 text-white border border-gray-600"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="w-32 text-sm font-medium">Start Date</label>
          <div className="text-sm text-gray-400">
            {format(startDate, 'eeee, MMM d')}
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-32 text-sm font-medium">End Date</label>
          <div className="text-sm text-gray-400">
            {format(endDate, 'eeee, MMM d')}
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-32 text-sm font-medium">Duration</label>
          <div className="text-sm text-gray-300">
            {formData.planDuration} day{formData.planDuration > 1 ? 's' : ''}
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-700 border border-indigo-500 rounded ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Creating...' : 'Create Plan'}
          </button>
        </div>

        {successMessage && <p className="text-green-500 text-center text-sm">{successMessage}</p>}
        {errors.submit && <p className="text-red-500 text-center text-sm">{errors.submit}</p>}
      </form>
    </div>
  );
};

const WeekViewSelector: React.FC = () => {
  const weeks = getWeeks();
  const [selectedWeek, setSelectedWeek] = useState<Date | null>(null);
  const [showCreatePlan, setShowCreatePlan] = useState<boolean>(false);

  const handleWeekClick = (weekStart: Date) => {
    setSelectedWeek(weekStart);
    setShowCreatePlan(true);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Select a Week</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {weeks.map((weekStart, i) => (
          <div
            key={i}
            onClick={() => handleWeekClick(weekStart)}
            className="cursor-pointer p-4 bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 hover:border-indigo-500 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-indigo-400">
              {format(weekStart, 'MMM d')} - {format(addWeeks(weekStart, 1), 'MMM d')}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Start Date: {format(weekStart, 'eeee, MMM d')}
            </p>
          </div>
        ))}
      </div>

      {showCreatePlan && selectedWeek && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <CreatePlan
            startDate={selectedWeek}
            endDate={addWeeks(selectedWeek, 1)}
            onClose={() => {
              setShowCreatePlan(false);
              setSelectedWeek(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default WeekViewSelector;
