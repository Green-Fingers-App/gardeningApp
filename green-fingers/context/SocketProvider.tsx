import React, { createContext, useContext, useEffect, useRef } from "react";
import * as SecureStore from "expo-secure-store";
import io from "socket.io-client";
import { useAuth } from "@/context/AuthContext";
import { useMoistureSensors } from "@/context/MoistureSensorContext";

const SocketContext = createContext<ReturnType<typeof io> | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { handleMoistureUpdate, handleNewSensor } = useMoistureSensors();
  const socketRef = useRef<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    const setupSocket = async () => {
      if (!user?.id) return;

      const baseUrl = await SecureStore.getItemAsync("greenfingers_base_url");
      if (!baseUrl) {
        console.warn("[SocketProvider] No base URL found in SecureStore.");
        return;
      }

      const socket = io(baseUrl, {
        transports: ["websocket"],
        autoConnect: true,
        reconnection: true,
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        socket.emit("join-user-room", user.id);
        socket.emit("client-ready", user.id);
      });

      socket.on("disconnect", () => {
        console.log("🔌 Socket disconnected");
      });

      socket.on("MOISTURE_UPDATE", handleMoistureUpdate);
      socket.on("NEW_SENSOR", handleNewSensor);
    };

    setupSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.off("MOISTURE_UPDATE", handleMoistureUpdate);
        socketRef.current.off("NEW_SENSOR", handleNewSensor);
        socketRef.current.disconnect();
        socketRef.current = null;
      }
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
