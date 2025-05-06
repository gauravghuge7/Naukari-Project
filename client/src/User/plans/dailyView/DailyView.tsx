import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./../../../components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

interface Task {
  _id: string;
  taskTitle: string;
  taskStatus: string;
  taskDescription: string;
  taskPriority: number;
  taskDuration: number;
  taskDate: string;
}

interface Plan {
  _id: string;
  planTitle: string;
  planDescription: string;
  planStatus: string;
  planDuration: number;
  planStartDate: string;
  planEndDate: string;
  tasks: Task[];
}

const COLORS = ["#22c55e", "#ef4444"];

const DailyView: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const { date } = useParams<{ date: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/student/task/fetchCurrentDayDetails?date=${date}`);

        console.log("res => ", res)

        const fetchedPlans: Plan[] = res.data.data.plans;
        setPlans(fetchedPlans);

        const tasks = fetchedPlans.flatMap((plan) => plan.tasks);
        setAllTasks(tasks);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    if (date) fetchData();
  }, [date]);

  const completedTasks = allTasks.filter((task) => task.taskStatus === "Completed");
  const remainingTasks = allTasks.filter((task) => task.taskStatus !== "Completed");

  const overallCompletionPercentage = allTasks.length
    ? Math.round((completedTasks.length / allTasks.length) * 100)
    : 0;

  const chartData = [
    { name: "Completed", value: completedTasks.length },
    { name: "Remaining", value: remainingTasks.length },
  ];

  const barChartData = plans.map((plan) => {
    const completed = plan.tasks.filter((t) => t.taskStatus === "Completed").length;
    const total = plan.tasks.length;
    return {
      name: plan.planTitle,
      Completed: completed,
      Remaining: total - completed,
    };
  });

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="md:col-span-2 bg-green-50 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Day Completion: {overallCompletionPercentage}%
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-sm text-gray-600">
          You have completed {completedTasks.length} out of {allTasks.length} tasks for the selected day.
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>All Tasks - {date ? format(new Date(date), "PPPP") : "Selected Day"}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {allTasks.map((task) => (
              <li
                key={task._id}
                className={`p-3 border rounded-lg shadow-sm ${task.taskStatus === "Completed" ? "bg-green-100" : "bg-red-100"}`}
              >
                <div className="font-semibold">{task.taskTitle}</div>
                <p className="text-sm">{task.taskDescription}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Overall Task Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((_, index) => (
                  <div>
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  </div>
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <p>Total Tasks: {allTasks.length}</p>
            <p>Completed: {completedTasks.length}</p>
            <p>Remaining: {remainingTasks.length}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Task Summary by Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Completed" fill="#22c55e" />
              <Bar dataKey="Remaining" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Plan Details with Pie Charts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {plans.map((plan) => {
              const completed = plan.tasks.filter((t) => t.taskStatus === "Completed");
              const remaining = plan.tasks.filter((t) => t.taskStatus !== "Completed");
              const planChartData = [
                { name: "Completed", value: completed.length },
                { name: "Remaining", value: remaining.length },
              ];

              return (
                <div key={plan._id} className="p-4 border rounded-md bg-blue-50 shadow-sm">
                  <div className="font-bold text-lg mb-2">{plan.planTitle}</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={planChartData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {planChartData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <ul className="list-disc list-inside mt-4 text-sm">
                    {plan.tasks.map((task) => (
                      <li key={task._id}>
                        {task.taskTitle} ({task.taskStatus})
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyView;

