import React, { createContext, useContext, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useAuth } from "@/context/AuthContext";
import { useMoistureSensors } from "@/context/MoistureSensorContext";

const SocketContext = createContext<ReturnType<typeof io> | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { handleMoistureUpdate, handleNewSensor } = useMoistureSensors();
  const socketRef = useRef<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const socket = io("https://greenfingers.truenas.work", {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("join-user-room", user.id);
      socket.emit("client-ready", user.id);
    });

    socket.on("disconnect", () => { });

    socket.on("MOISTURE_UPDATE", handleMoistureUpdate);
    socket.on("NEW_SENSOR", handleNewSensor);

    return () => {
      socket.off("MOISTURE_UPDATE", handleMoistureUpdate);
      socket.off("NEW_SENSOR", handleNewSensor);
      socket.disconnect();
    };
  }, [user?.id]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error("useSocket must be used within SocketProvider");
  return context;
};
