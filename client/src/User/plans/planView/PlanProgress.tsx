import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";

interface Task {
  _id: string;
  taskTitle: string;
  taskStatus: "To Do" | "In Progress" | "Completed";
  taskDate: string;
}

interface Plan {
  _id: string;
  planStartDate: string;
  planEndDate: string;
}

interface PlanProgressProps {
  plan: Plan;
}

const PlanProgress: React.FC<PlanProgressProps> = ({ plan }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get<{ data: { tasks: Task[] } }>(
          `/api/student/task/getTasksByPlan/${plan._id}`
        );
        setTasks(res.data.data.tasks);
      } catch (error) {
        console.error("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [plan._id]);

  const grouped = tasks.reduce((acc, task) => {
    const date = format(parseISO(task.taskDate), "yyyy-MM-dd");
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  if (loading) return <div className="text-white">Loading progress...</div>;

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow text-white space-y-6">
      <h2 className="text-2xl font-bold mb-4">Plan Progress</h2>
      {Object.entries(grouped)
        .sort(([a], [b]) => (a > b ? 1 : -1))
        .map(([date, tasks]) => {
          const total = tasks.length;
          const completed = tasks.filter((t) => t.taskStatus === "Completed").length;
          const percent = Math.round((completed / total) * 100);

          return (
            <div key={date} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-purple-300 font-medium">
                  {format(parseISO(date), "MMMM d, yyyy")}
                </span>
                <span className="text-sm text-gray-300">
                  {completed}/{total} completed &mdash;{" "}
                  <span className="text-green-400 font-semibold">{percent}%</span>
                </span>
              </div>
              <div className="w-full bg-gray-700 h-3 rounded">
                <div
                  className="h-3 rounded bg-green-500"
                  style={{ width: `${percent}%`, transition: "width 0.5s" }}
                ></div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PlanProgress;
