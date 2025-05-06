import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // no need to import DateClickArg here
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "./../../components/ui/card";

function MyCalendar() {
  const [overallCompletion, setOverallCompletion] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodayCompletion = async () => {
      try {
        const today = new Date().toString(); // e.g., "Tue May 06 2025 ..."
        const res = await axios.get(`/api/student/task/fetchCurrentDayDetails?date=${encodeURIComponent(today)}`);
        const tasks = res.data?.data?.plans?.flatMap((p: any) => p.tasks) || [];
        const completed = tasks.filter((t: any) => t.taskStatus === "Completed").length;
        const percentage = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
        setOverallCompletion(percentage);
      } catch {
        toast.error("Failed to fetch today's completion data");
      }
    };

    fetchTodayCompletion();
  }, []);

  const handleDateClick = (info: any) => {  // Use 'any' here to avoid type errors
    navigate(`/user/dailyTarget/${encodeURIComponent(info.date.toString())}`);
  };

  return (
    <div className="container mt-4">
      <Card className="mb-4 bg-green-50 shadow">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Today's Completion: {overallCompletion}%
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-gray-600">
          Check your progress for today or click a date below to explore another day.
        </CardContent>
      </Card>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth",
        }}
        height="75vh"
        dateClick={handleDateClick}  // This works now
      />
    </div>
  );
}

export default MyCalendar;
