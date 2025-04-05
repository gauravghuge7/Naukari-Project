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
  createdAt: string;
}

const MyPlans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get<{ data: { plans: Plan[] } }>(
          "/api/student/task/getMyPlans"
        );
        setPlans(response.data.data.plans);
      } catch (err) {
        setError("Failed to fetch plans");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  if (loading) return <div className="text-center mt-4 text-white">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="w-full min-h-screen bg-black text-white p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
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
            <button
              onClick={() => navigate(`/user/viewPlantasks/${plan._id}`)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPlans;
