import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TaskLists from "./TaskLists";
import MyCalendar from "./MyCalendar";

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

const Navbar: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({
  activeTab,
  setActiveTab,
}) => {
  const navigate = useNavigate();
  const tabs = ["overview", "tasks", "progress", "dashboard", "calendar"];

  return (
    <nav className="bg-gray-900 text-white p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
      <div className="flex flex-wrap gap-2 items-center">
        <h1 className="text-xl font-bold mr-4">Plan Details</h1>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize px-3 py-1 rounded hover:bg-gray-800 transition ${
                activeTab === tab ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
      >
        Back
      </button>
    </nav>
  );
};

const ViewPlansDetails: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");

  const fetchPlanDetails = async () => {
    try {
      const response = await axios.get<{ data: Plan }>(
        `/api/student/task/getPlanDetails/${planId}`
      );
      console.log("response => ", response);
      setPlan(response.data.data?.plan);
    } catch (err) {
      setError("Failed to fetch plan details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanDetails();
  }, [planId]);

  if (loading) return <div className="text-center text-white mt-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;
  if (!plan) return <div className="text-white text-center">No plan found.</div>;

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">{plan.planTitle}</h2>
            <p className="text-gray-400">{plan.planDescription}</p>
            <p className="mt-3">Status: <span className="font-bold">{plan.planStatus}</span></p>
            <p>Duration: {plan.planDuration} days</p>
            <p>Priority: {plan.planPriority}</p>
            <p>Effort: {plan.planEffort}</p>
          </div>
        )}

        {activeTab === "tasks" && (
          <TaskLists planId={plan._id} />
        )}

        {activeTab === "progress" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Progress</h2>
            <p className="text-gray-400">Tracking progress of the plan.</p>
          </div>
        )}

        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Dashboard</h2>
            <p className="text-gray-400">Here you can show charts, summary, task breakdown, etc.</p>
          </div>
        )}

        {activeTab === "calendar" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Calendar View</h2>
            <MyCalendar />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPlansDetails;
