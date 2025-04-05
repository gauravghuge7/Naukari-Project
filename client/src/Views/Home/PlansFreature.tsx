import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Daily Task Planner",
    description: "Organize your daily tasks efficiently and stay on track.",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your work progress over a month and analyze performance.",
  },
  {
    title: "Goal Setting",
    description: "Set achievable goals and milestones for better productivity.",
  },
  {
    title: "Reminders & Notifications",
    description: "Never miss a task with automated reminders and alerts.",
  },
];

const PlansFeature = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Features That Make Your Plans Work</h2>
        <p className="text-gray-600 mb-8">Stay organized and improve productivity with our powerful planning tools.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="p-6 bg-white shadow-md rounded-2xl">
                <CardContent className="flex flex-col items-center text-center">
                  <CheckCircle className="text-green-500 mb-4" size={32} />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlansFeature;
