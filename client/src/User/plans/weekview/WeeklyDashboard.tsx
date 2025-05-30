import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, startOfWeek, addDays, subWeeks, addWeeks, isSameDay, parseISO } from "date-fns";

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

interface WeeklyDashboardProps {
  plan: Plan;
}

const WeeklyDashboard: React.FC<WeeklyDashboardProps> = ({ plan }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get<{ data: { tasks: Task[] } }>(
          `/api/student/task/getTasksByPlan/${plan._id}`
        );
        setTasks(res.data.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [plan._id]);

  const handlePrevWeek = () => {
    setCurrentWeekStart((prev) => subWeeks(prev, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => addWeeks(prev, 1));
  };

  const renderCandy = (count: number) => {
    return Array.from({ length: count }).map((_, idx) => (
      <span key={idx} className="text-green-400 mr-1">🍬</span>
    ));
  };

  if (loading) return <div className="text-white">Loading weekly dashboard...</div>;

  const daysOfWeek = Array.from({ length: 7 }).map((_, i) => addDays(currentWeekStart, i));

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow text-white space-y-6">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevWeek} className="bg-purple-700 px-4 py-2 rounded hover:bg-purple-800">
          ⬅️ Prev Week
        </button>
        <h2 className="text-2xl font-bold text-center">
          Week of {format(currentWeekStart, "MMMM d, yyyy")}
        </h2>
        <button onClick={handleNextWeek} className="bg-purple-700 px-4 py-2 rounded hover:bg-purple-800">
          Next Week ➡️
        </button>
      </div>

      {daysOfWeek.map((day) => {
        const formatted = format(day, "yyyy-MM-dd");
        const dayTasks = tasks.filter((task) =>
          isSameDay(parseISO(task.taskDate), day)
        );
        const total = dayTasks.length;
        const completed = dayTasks.filter((t) => t.taskStatus === "Completed").length;
        const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

        return (
          <div key={formatted} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-purple-300 font-medium">{format(day, "EEEE, MMM d")}</span>
              <span className="text-sm text-gray-300">
                {completed}/{total} completed —{" "}
                <span className="text-green-400 font-semibold">{percent}%</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {renderCandy(completed)}
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

export default WeeklyDashboard;
