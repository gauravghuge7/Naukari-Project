import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Plan {
  _id: string;
  planTitle: string;
  planDescription?: string;
  planStatus: "To Do" | "In Progress" | "Completed";
  planDuration: number;
  planPriority: number;
  planEffort: "Low" | "Medium" | "High";
  planStartDate: string;
  planEndDate: string;
  createdAt: string;
}

const MyPlans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"All" | "Active" | "Expired">("All");
  const [sortBy, setSortBy] = useState<"None" | "Priority" | "Duration">("None");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState<Partial<Plan>>({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get<{ data: { plans: Plan[] } }>("/api/student/task/getMyPlans");
        setPlans(response.data.data.plans);
      } catch (err) {
        setError("Failed to fetch plans");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const openEditModal = (plan: Plan) => {
    setCurrentPlan(plan);
    setFormData({ ...plan });
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!currentPlan) return;

    try {
      await axios.post(`/api/student/task/updatePlan/${currentPlan._id}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      setEditModalOpen(false);
      const updatedPlans = plans.map(p => p._id === currentPlan._id ? { ...p, ...formData } as Plan : p);
      setPlans(updatedPlans);
    } catch (err) {
      alert("Failed to update plan");
    }
  };

  const getFilteredPlans = () => {
    const now = new Date();
    let filtered = [...plans];

    if (filter === "Active") {
      filtered = filtered.filter(p => new Date(p.planEndDate) >= now);
    } else if (filter === "Expired") {
      filtered = filtered.filter(p => new Date(p.planEndDate) < now);
    }

    if (sortBy === "Priority") {
      filtered.sort((a, b) => b.planPriority - a.planPriority);
    } else if (sortBy === "Duration") {
      filtered.sort((a, b) => b.planDuration - a.planDuration);
    }

    return filtered;
  };

  if (loading) return <div className="text-center mt-4 text-white">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

  const filteredPlans = getFilteredPlans();

  return (
    <div className="w-full min-h-screen bg-black text-white p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Plans</h2>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {["All", "Active", "Expired"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded font-semibold ${
              filter === type ? "bg-blue-600" : "bg-gray-700"
            }`}
            onClick={() => setFilter(type as any)}
          >
            {type}
          </button>
        ))}

        <select
          className="bg-gray-800 px-4 py-2 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
        >
          <option value="None">Sort By</option>
          <option value="Priority">Priority</option>
          <option value="Duration">Duration</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div
            key={plan._id}
            className="p-5 rounded-lg shadow-lg border-l-4 bg-gray-900"
            style={{
              borderColor:
                plan.planStatus === "Completed"
                  ? "green"
                  : plan.planStatus === "In Progress"
                  ? "orange"
                  : "blue",
            }}
          >
            <h3 className="text-xl font-semibold mb-2">{plan.planTitle}</h3>
            <p className="text-sm text-gray-400">{plan.planDescription}</p>
            <p className="mt-3 text-sm">Status: <span className="font-bold">{plan.planStatus}</span></p>
            <p className="text-sm">Duration: {plan.planDuration} days</p>
            <p className="text-sm">Priority: {plan.planPriority}</p>
            <p className="text-sm">Effort: {plan.planEffort}</p>
            <p className="text-sm">Start: {new Date(plan.planStartDate).toLocaleDateString()}</p>
            <p className="text-sm">End: {new Date(plan.planEndDate).toLocaleDateString()}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/user/viewPlantasks/${plan._id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                View
              </button>
              <button
                onClick={() => openEditModal(plan)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editModalOpen && currentPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-xl">
            <h3 className="text-xl font-bold mb-4">Edit Plan</h3>
            <div className="grid grid-cols-1 gap-3">
              <input
                type="text"
                placeholder="Title"
                value={formData.planTitle || ""}
                onChange={(e) => setFormData({ ...formData, planTitle: e.target.value })}
                className="p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={formData.planDescription || ""}
                onChange={(e) => setFormData({ ...formData, planDescription: e.target.value })}
                className="p-2 border rounded"
              />
              <select
                value={formData.planStatus}
                onChange={(e) => setFormData({ ...formData, planStatus: e.target.value as any })}
                className="p-2 border rounded"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <input
                type="number"
                placeholder="Duration"
                value={formData.planDuration || ""}
                onChange={(e) => setFormData({ ...formData, planDuration: Number(e.target.value) })}
                className="p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Priority"
                value={formData.planPriority || ""}
                onChange={(e) => setFormData({ ...formData, planPriority: Number(e.target.value) })}
                className="p-2 border rounded"
              />
              <select
                value={formData.planEffort}
                onChange={(e) => setFormData({ ...formData, planEffort: e.target.value as any })}
                className="p-2 border rounded"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <input
                type="date"
                value={formData.planStartDate?.split("T")[0] || ""}
                onChange={(e) => setFormData({ ...formData, planStartDate: e.target.value })}
                className="p-2 border rounded"
              />
              <input
                type="date"
                value={formData.planEndDate?.split("T")[0] || ""}
                onChange={(e) => setFormData({ ...formData, planEndDate: e.target.value })}
                className="p-2 border rounded"
              />
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button onClick={() => setEditModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPlans;
