import React, { useState, FormEvent } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useNavigate } from 'react-router';

interface PlanFormData {
  planTitle: string;
  planDescription: string;
  planStatus: 'To Do' | 'In Progress' | 'Completed';
  planDuration: number;
  planPriority: number;
  planEffort: 'Low' | 'Medium' | 'High';
}

interface FormErrors {
  planTitle?: string;
  planStatus?: string;
  planDuration?: string;
  planPriority?: string;
  submit?: string;
}

const CreatePlan: React.FC = () => {
  const [formData, setFormData] = useState<PlanFormData>({
    planTitle: '',
    planDescription: '',
    planStatus: 'To Do',
    planDuration: 1,
    planPriority: 1,
    planEffort: 'Medium'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'planDuration' || name === 'planPriority' ? Number(value) : value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    let tempErrors: FormErrors = {};
    if (!formData.planTitle.trim()) tempErrors.planTitle = 'Plan title is required';
    if (!formData.planStatus) tempErrors.planStatus = 'Status is required';
    if (formData.planDuration < 1) tempErrors.planDuration = 'Duration must be at least 1';
    if (formData.planPriority < 1) tempErrors.planPriority = 'Priority must be at least 1';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response: AxiosResponse = await axios.post('/api/student/task/createPlan', formData);

      console.log("response => ", response);
      setSuccessMessage('Plan created successfully!');
      setFormData({
        planTitle: '',
        planDescription: '',
        planStatus: 'To Do',
        planDuration: 1,
        planPriority: 1,
        planEffort: 'Medium'
      });
      setTimeout(() => setSuccessMessage(''), 3000);

      if(response.data.success) {
        navigate(`/user/addTasks/${response?.data?.data?._id}`);
      }

    } 
    catch (error) {
      const axiosError = error as AxiosError;
      setErrors({ submit: 'Failed to create plan. Please try again.' });
      console.error('Error creating plan:', axiosError);
    } 
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl my-40 mx-auto p-6 bg-gray-100 border border-gray-300">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Create New Plan</h2>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Plan Title */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700">Plan Title *</label>
          <div className="flex-1">
            <input
              type="text"
              name="planTitle"
              value={formData.planTitle}
              onChange={handleChange}
              className="w-full p-1 border border-gray-400 bg-white text-gray-700"
              placeholder="Enter plan title"
            />
            {errors.planTitle && <p className="text-red-600 text-xs mt-1">{errors.planTitle}</p>}
          </div>
        </div>

        {/* Plan Description */}
        <div className="flex items-start">
          <label className="w-32 text-sm font-medium text-gray-700 pt-1">Description</label>
          <div className="flex-1">
            <textarea
              name="planDescription"
              value={formData.planDescription}
              onChange={handleChange}
              className="w-full p-1 border border-gray-400 bg-white text-gray-700"
              rows={3}
              placeholder="Describe your plan (optional)"
            />
          </div>
        </div>

        {/* Plan Status */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700">Status *</label>
          <div className="flex-1">
            <select
              name="planStatus"
              value={formData.planStatus}
              onChange={handleChange}
              className="w-full p-1 border border-gray-400 bg-white text-gray-700"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Plan Duration */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700">Duration (days) *</label>
          <div className="flex-1">
            <input
              type="number"
              name="planDuration"
              value={formData.planDuration}
              onChange={handleChange}
              min={1}
              className="w-full p-1 border border-gray-400 bg-white text-gray-700"
            />
            {errors.planDuration && <p className="text-red-600 text-xs mt-1">{errors.planDuration}</p>}
          </div>
        </div>

        {/* Plan Priority */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700">Priority (1-10) *</label>
          <div className="flex-1">
            <input
              type="number"
              name="planPriority"
              value={formData.planPriority}
              onChange={handleChange}
              min={1}
              max={10}
              className="w-full p-1 border border-gray-400 bg-white text-gray-700"
            />
            {errors.planPriority && <p className="text-red-600 text-xs mt-1">{errors.planPriority}</p>}
          </div>
        </div>

        {/* Plan Effort */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700">Effort Level *</label>
          <div className="flex-1">
            <select
              name="planEffort"
              value={formData.planEffort}
              onChange={handleChange}
              className="w-full p-1 border border-gray-400 bg-white text-gray-700"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-1 text-white font-medium bg-blue-600 hover:bg-blue-700 border border-blue-700 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Creating...' : 'Create Plan'}
          </button>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <p className="text-green-600 text-center text-sm mt-2">{successMessage}</p>
        )}
        {errors.submit && (
          <p className="text-red-600 text-center text-sm mt-2">{errors.submit}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePlan;