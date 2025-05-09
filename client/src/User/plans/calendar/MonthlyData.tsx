import React from "react";

interface Task {
  taskTitle: string;
  taskStatus: string;
  taskDate: string;
}

interface MonthlyDataProps {
  tasks: Task[];
}

const MonthlyData: React.FC<MonthlyDataProps> = ({ tasks }) => {
  const grouped = tasks.reduce((acc, task) => {
    const date = task.taskDate.split("T")[0]; // format as yyyy-mm-dd
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Monthly Task Summary</h2>
      {Object.entries(grouped)
        .sort(([a], [b]) => (a > b ? 1 : -1))
        .map(([date, dayTasks]) => {
          const completed = dayTasks.filter((t) => t.taskStatus === "Completed").length;
          const percent = Math.round((completed / dayTasks.length) * 100);
          return (
            <div key={date} className="mb-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{date}</span>
                <span className="text-gray-500 text-sm">{completed}/{dayTasks.length} ({percent}%)</span>
              </div>
              <div className="h-2 bg-gray-300 rounded mt-1">
                <div className="h-2 bg-green-500 rounded" style={{ width: `${percent}%` }}></div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MonthlyData;
