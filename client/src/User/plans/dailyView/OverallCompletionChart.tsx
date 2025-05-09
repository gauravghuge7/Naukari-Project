import { Card, CardHeader, CardContent, CardTitle } from "../../../components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { COLORS } from "./types";

interface ChartData {
  name: string;
  value: number;
}

interface OverallCompletionChartProps {
  chartData: ChartData[];
  totalTasks: number;
  completedTasks: number;
  remainingTasks: number;
}

export const OverallCompletionChart = ({
  chartData,
  totalTasks,
  completedTasks,
  remainingTasks,
}: OverallCompletionChartProps) => {
  return (
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <p>Total Tasks: {totalTasks}</p>
          <p>Completed: {completedTasks}</p>
          <p>Remaining: {remainingTasks}</p>
        </div>
      </CardContent>
    </Card>
  );
};