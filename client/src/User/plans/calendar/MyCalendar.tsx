import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "./../../../components/ui/card";
import MonthlyData from "./MonthlyData"; // Assume this is your monthly dashboard component

function MyCalendar() {
  const [overallCompletion, setOverallCompletion] = useState<number>(0);
  const [monthlyTasks, setMonthlyTasks] = useState<any[]>([]);
  const navigate = useNavigate();

  // Fetch daily completion (today)
  useEffect(() => {
    const fetchTodayCompletion = async () => {
      try {
        const today = new Date().toString();
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

  // When visible calendar month changes
  const handleDatesSet = async (arg: any) => {
    const visibleStart = new Date(arg.startStr);
    const month = new Date(visibleStart.getFullYear(), visibleStart.getMonth(), 1).toISOString();

    try {
      const res = await axios.get(`/api/student/task/getMonthlyDashboard/${month}`);
      setMonthlyTasks(res.data?.data?.tasks || []);
    } 
    catch (error) {
      toast.error("Failed to fetch monthly data");
    }
  };

  const handleDateClick = (info: any) => {
    navigate(`/user/dailyTarget/${encodeURIComponent(info.date.toString())}`);
  };

  return (
    <div className="container mt-4">
      <div className="container mt-4 flex flex-col items-center">
    <Card className="mb-4 bg-green-50 shadow w-full md:w-2/3">
      <CardHeader>
        <CardTitle className="text-xl text-center">
          Today's Completion: {overallCompletion}%
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center text-gray-600">
        Check your progress for today or click a date below to explore another day.
      </CardContent>
    </Card>

    <div className="w-full md:w-4/5 lg:w-3/4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth",
        }}
        height="75vh"
        dateClick={handleDateClick}
        datesSet={handleDatesSet} 
      />
    </div>
  </div>

      {/* Pass monthlyTasks to your dashboard */}
      <MonthlyData tasks={monthlyTasks} />
    </div>
  );
}

export default MyCalendar;
