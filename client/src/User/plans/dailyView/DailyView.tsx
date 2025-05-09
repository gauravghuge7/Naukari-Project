import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Plan, Task } from "./types";
import {TaskList} from "./TaskList";
import {OverallCompletionChart} from "./OverallCompletionChart";
import {CompletionSummaryCard} from "./CompletionSummaryCard";
import {PlanSummaryChart} from "./PlanSummaryChart";
import {PlanDetailsWithCharts} from "./PlanDetailsWithCharts";

const DailyView: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const { date } = useParams<{ date: string }>();

  const fetchTasks = async () => {
    try {
      const today = date ? date.toString() : new Date().toString();
      const res = await axios.get(
        `/api/student/task/fetchCurrentDayDetails?date=${encodeURIComponent(today)}`
      );
      const fetchedPlans: Plan[] = res.data.data.plans;
      setPlans(fetchedPlans);
      setAllTasks(fetchedPlans.flatMap((plan) => plan.tasks));
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    if (date) fetchTasks();
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
      <CompletionSummaryCard
        completionPercentage={overallCompletionPercentage}
        completedTasksCount={completedTasks.length}
        totalTasksCount={allTasks.length}
        date={date}
      />

      
      <TaskList 
        tasks={allTasks} 
        plans={plans} 
        date={date} 
        fetchTasks={fetchTasks} 
      />
      <OverallCompletionChart
        chartData={chartData}
        totalTasks={allTasks.length}
        completedTasks={completedTasks.length}
        remainingTasks={remainingTasks.length}
      />

      <PlanSummaryChart data={barChartData} />

      <PlanDetailsWithCharts plans={plans} />
    </div>
  );
};

export default DailyView;