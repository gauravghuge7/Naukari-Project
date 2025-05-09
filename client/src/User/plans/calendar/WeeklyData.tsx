import React from "react";

interface Task {
  taskTitle: string;
  taskStatus: string;
  taskDate: string;
}

interface WeeklyDataProps {
  tasks: Task[];
}

const getWeekOfMonth = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  return Math.ceil(day / 7); // 1-4 or 1-5 depending on the month
};

const WeeklyData: React.FC<WeeklyDataProps> = ({ tasks }) => {
  const grouped = tasks.reduce((acc, task) => {
    const week = getWeekOfMonth(task.taskDate);
    if (!acc[week]) acc[week] = [];
    acc[week].push(task);
    return acc;
  }, {} as Record<number, Task[]>);

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Weekly Task Summary</h2>
      {Object.entries(grouped)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([week, weekTasks]) => {
          const completed = weekTasks.filter((t) => t.taskStatus === "Completed").length;
          const percent = Math.round((completed / weekTasks.length) * 100);
          return (
            <div key={week} className="mb-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Week {week}</span>
                <span className="text-gray-500 text-sm">{completed}/{weekTasks.length} ({percent}%)</span>
              </div>
              <div className="h-2 bg-gray-300 rounded mt-1">
                <div className="h-2 bg-blue-500 rounded" style={{ width: `${percent}%` }}></div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default WeeklyData;
