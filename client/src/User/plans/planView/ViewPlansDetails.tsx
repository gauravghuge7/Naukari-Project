import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TaskLists from "./TaskLists";

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
      setPlan(response.data.data?.plan );
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
          <div className="bg-gray-900 rounded-xl shadow-2xl p-6 max-w-md w-full hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-shadow duration-300 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-3">{plan.planTitle}</h2>
          <p className="text-gray-400 italic mb-4">{plan.planDescription}</p>
          <hr className="border-gray-600 mb-4" />
          <div className="space-y-3">
            <p className="text-gray-200">
              Status: <span className="font-semibold text-red-400">{plan.planStatus}</span>
            </p>
            <p className="text-gray-200">
              Duration: <span className="font-medium">{plan.planDuration} days</span>
            </p>
            <p className="text-gray-200">
              Priority: <span className="font-medium text-blue-400">{plan.planPriority}</span>
            </p>
            <p className="text-gray-200">
              Effort: <span className="font-medium text-green-400">{plan.planEffort}</span>
            </p>
            <hr className="border-gray-600 my-2" />
            <p className="text-gray-200">
              Start Date: <span className="font-medium">
                {new Date(plan.planStartDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </p>
            <p className="text-gray-200">
              End Date: <span className="font-medium">
                {new Date(plan.planEndDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </p>
            <hr className="border-gray-600 my-2" />
            <p className="text-gray-200">
              Plan Type: <span className="font-medium">{plan.planType}</span>
            </p>
            <p className="text-gray-200">
              Created: <span className="font-medium">
                {new Date(plan.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </p>
            <p className="text-gray-200">
              Updated: <span className="font-medium">
                {new Date(plan.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </p>
            <p className="text-gray-200">
              Student ID: <span className="font-medium text-gray-400">{plan.student}</span>
            </p>
          </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <TaskLists plan={plan} />
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
            {/* <MyCalendar planId={plan._id} /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPlansDetails;
