import React, { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import { io, Socket } from "socket.io-client";
import { url } from "./../../main"


interface NotificationData {
  message: string;
}

const TaskNotification: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(url);
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("task:notification", (data: NotificationData) => {
      handleNotification(data.message);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleNotification = (msg: string): void => {
    setMessage(msg);
    setVisible(true);
    playSound();

    setTimeout(() => {
      setVisible(false);
    }, 4000);
  };

  const playSound = (): void => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err: Error) => {
        console.warn("Sound play failed:", err);
      });
    }
  };

  return (
    <div className="relative p-6">
      <audio
        ref={audioRef}
        src="/sounds/notification.mp3" // Put this file in public/sounds/
        preload="auto"
      />

      {visible && (
        <motion.div
          className="fixed top-6 right-6 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="bg-white shadow-xl border border-gray-200 rounded-2xl w-80 p-4 flex items-center space-x-3">
            <Bell className="text-blue-500 w-6 h-6" />
            <div>
              <p className="text-gray-800 font-medium">{message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TaskNotification;
