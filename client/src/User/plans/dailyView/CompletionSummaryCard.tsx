import { Card, CardHeader, CardContent, CardTitle } from "../../../components/ui/card";
import { format } from "date-fns";

interface CompletionSummaryCardProps {
  completionPercentage: number;
  completedTasksCount: number;
  totalTasksCount: number;
  date?: string;
}

export const CompletionSummaryCard = ({
  completionPercentage,
  completedTasksCount,
  totalTasksCount,
  date,
}: CompletionSummaryCardProps) => {
  return (
    <Card className="md:col-span-2 bg-green-50 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl text-center">
          Day Completion: {completionPercentage}%
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center text-sm text-gray-600">
        You have completed {completedTasksCount} out of {totalTasksCount} tasks for{" "}
        {date ? format(new Date(date), "PPPP") : "the selected day"}.
      </CardContent>
    </Card>
  );
};