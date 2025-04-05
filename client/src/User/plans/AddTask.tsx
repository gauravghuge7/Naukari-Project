import { useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-hot-toast";
import axios from "axios";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Select } from "../../components/ui/select";

const AddTask = () => {
  const { planId } = useParams<{ planId: string }>();
  const [task, setTask] = useState({
    taskTitle: "",
    taskStatus: "To Do",
    taskDescription: "",
    taskPriority: 1,
    taskDuration: 30, // Default duration in minutes
    plan: planId,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/student/task/addTasks/${planId}`, task, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      if (response.status === 201) {
        toast.success("Task created successfully!");
        setTask({ ...task, taskTitle: "", taskDescription: "" }); // Reset form
      } else {
        toast.error("Failed to create task");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6 shadow-lg rounded-2xl">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Task Title</Label>
            <Input name="taskTitle" value={task.taskTitle} onChange={handleChange} required />
          </div>
          <div>
            <Label>Task Status</Label>
            <Select name="taskStatus" value={task.taskStatus} onChange={handleChange}>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Select>
          </div>
          <div>
            <Label>Description</Label>
            <Input name="taskDescription" value={task.taskDescription} onChange={handleChange} />
          </div>
          <div>
            <Label>Priority (1-5)</Label>
            <Input type="number" name="taskPriority" value={task.taskPriority} onChange={handleChange} min="1" max="5" />
          </div>
          <div>
            <Label>Duration (mins)</Label>
            <Input type="number" name="taskDuration" value={task.taskDuration} onChange={handleChange} min="1" />
          </div>
          <Button type="submit" className="w-full">Create Task</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTask;