import { Card, CardHeader, CardContent, CardTitle } from "../../../components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { COLORS } from "./types";

interface BarChartData {
  name: string;
  Completed: number;
  Remaining: number;
}

interface PlanSummaryChartProps {
  data: BarChartData[];
}

export const PlanSummaryChart = ({ data }: PlanSummaryChartProps) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Task Summary by Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Completed" fill={COLORS[0]} />
            <Bar dataKey="Remaining" fill={COLORS[1]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};