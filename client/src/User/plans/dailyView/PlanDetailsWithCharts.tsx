import { Card, CardHeader, CardContent, CardTitle } from "../../../components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Plan, COLORS } from "./types";

interface PlanDetailsWithChartsProps {
  plans: Plan[];
}

export const PlanDetailsWithCharts = ({ plans }: PlanDetailsWithChartsProps) => {
  return (
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
  );
};