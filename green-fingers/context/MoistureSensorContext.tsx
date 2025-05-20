import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useGardensAndPlants } from "./GardensAndPlantsContext";
import { MoistureSensor, SoilMoisture, Level, SensorWithHistory, AddMoistureSensor, MoistureDataPoint } from "@/types/models";
import { MoistureUpdateMessage } from "@/types/socket";
import { initSocket } from "@/services/socket";
import { apiDeleteSensor, apiGetAllMoistureSensors, apiGetSensorHistoryData, apiUpdateSensor } from "@/api/sensorService";

interface MoistureSensorContextProps {
  sensors: MoistureSensor[];
  fetchAllSensors: () => void;
  fetchSensor: (sensorId: string) => MoistureSensor | undefined;
  fetchSensorWithHistory: (sensorId: string) => Promise<SensorWithHistory | undefined>;
  getSensorWithHistory: (sensorId: number) => SensorWithHistory | undefined;
  getMoistureLevel: (plantId: number, actualLevel: SoilMoisture) => Level;
  updateMoistureSensor: (sensorId: number, sensorData: Partial<AddMoistureSensor>) => Promise<MoistureSensor | undefined>;
  deleteMoistureSensor: (sensorId: number) => void;
}

const MoistureSensorContext = createContext<MoistureSensorContextProps | undefined>(undefined);

export const MoistureSensorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sensors, setSensors] = useState<MoistureSensor[]>([]);
  const [sensorHistories, setSensorHistories] = useState<Record<number, MoistureDataPoint[]>>({});
  const { user } = useAuth();
  const { plants } = useGardensAndPlants();
  const { showToast } = useToast();

  const fetchAllSensors = async () => {
    try {
      const data = await apiGetAllMoistureSensors();
      data.forEach((sensor) => {
        sensor.sensorType = "Moisture";
      });
      setSensors(data);
    } catch (error) {
      showToast("error", `Fetching all sensors ${(error as Error).message}`);
    }
  };

  const fetchSensor = (sensorId: string): MoistureSensor | undefined => {
    return sensors.find((sensor) => sensor.id === parseInt(sensorId, 10));
  };


  const fetchSensorWithHistory = async (sensorId: string): Promise<SensorWithHistory | undefined> => {
    const id = parseInt(sensorId, 10);
    try {
      if (sensorHistories[id]) {
        const sensor = fetchSensor(sensorId);
        if (!sensor) return undefined;

        return {
          sensor,
          history: sensorHistories[id],
        };
      }

      const data = await apiGetSensorHistoryData(id);
      if (data?.history) {
        setSensorHistories(prev => ({
          ...prev,
          [id]: data.history,
        }));
      }
      return data;
    } catch (error) {
      showToast("error", `Fetching sensor with history ${(error as Error).message}`);
    }
  };


  const getSensorWithHistory = (sensorId: number): SensorWithHistory | undefined => {
    const sensor = sensors.find(s => s.id === sensorId);
    const history = sensorHistories[sensorId];
    if (!sensor || !history) return undefined;

    return {
      sensor,
      history,
    };
  };

  const updateMoistureSensor = async (
    sensorId: number,
    sensorData: Partial<AddMoistureSensor>
  ): Promise<MoistureSensor | undefined> => {
    try {
      await apiUpdateSensor(sensorId, sensorData);
      setSensors((prevSensors) =>
        prevSensors.map((sensor) =>
          sensor.id === sensorId ? { ...sensor, ...sensorData } : sensor
        )
      );
      showToast("success", "Sensor updated");
      return sensors.find((sensor) => sensor.id === sensorId);
    } catch (error) {
      showToast("error", (error as Error).message);
      return undefined;
    }
  };

  const deleteMoistureSensor = async (sensorId: number) => {
    try {
      await apiDeleteSensor(sensorId);
      setSensors((prevSensors) =>
        prevSensors.filter((sensor) => sensor.id !== sensorId)
      );
      showToast("success", "Sensor deleted");
    } catch (error) {
      showToast("error", (error as Error).message);
    }
  };

  const evaluateMoistureLevel = (
    expected: SoilMoisture,
    actual: SoilMoisture
  ): Level => {
    const levels: SoilMoisture[] = ["Very Dry", "Dry", "Moist", "Wet", "Very Wet"];
    const expectedIndex = levels.indexOf(expected);
    const actualIndex = levels.indexOf(actual);

    if (expectedIndex === -1 || actualIndex === -1) return "No Value";
    const diff = actualIndex - expectedIndex;

    if (diff === 0) return "Optimal";
    if (Math.abs(diff) === 1) return "Good";
    return diff < 0 ? "Too Low" : "Too High";
  };

  const getMoistureLevel = (
    plantId: number,
    actualLevel: SoilMoisture
  ): Level => {
    const plant = plants.find((p) => p.id === plantId);
    if (!plant || !plant.neededMoisture) return "No Value";

    return evaluateMoistureLevel(
      plant.neededMoisture as SoilMoisture,
      actualLevel
    );
  };



  useEffect(() => {
    if (!user?.id) return;

    const socket = initSocket(user.id);

    socket.on("MOISTURE_UPDATE", async (data: MoistureUpdateMessage) => {
      setSensors(prev =>
        prev.map(sensor =>
          sensor.id === data.sensorId
            ? {
              ...sensor,
              current_moisture_level: data.moisture_level,
              interpretedMoisture: data.interpreted_level,
              percentage: data.percentage,
            }
            : sensor
        )
      );

      const updated = await apiGetSensorHistoryData(data.sensorId);
      if (updated?.history) {
        setSensorHistories(prev => ({
          ...prev,
          [data.sensorId]: updated.history,
        }));
      }
    });

    socket.on("NEW_SENSOR", async (data: MoistureUpdateMessage & {
      plant_nickname?: string;
      user_plant_id?: number;
    }) => {
      console.log(data)
      setSensors(prev => {
        const alreadyExists = prev.some(sensor => sensor.id === data.sensorId);
        if (alreadyExists) return prev;
        const newSensor: MoistureSensor = {
          id: data.sensorId,
          name: `Sensor ${data.sensorId}`,
          current_moisture_level: data.moisture_level,
          interpretedMoisture: data.interpreted_level,
          percentage: data.percentage,
          nickname: data.plant_nickname || "Unnamed",
          plant_id: data.user_plant_id || -1,
          user_id: user.id,
          sensorType: "Moisture",
        };

        return [...prev, newSensor];
      });

      const updated = await apiGetSensorHistoryData(data.sensorId);
      if (updated?.history) {
        setSensorHistories(prev => ({
          ...prev,
          [data.sensorId]: updated.history,
        }));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [user?.id]);



  return (
    <MoistureSensorContext.Provider
      value={{ sensors, fetchAllSensors, fetchSensor, fetchSensorWithHistory, getMoistureLevel, updateMoistureSensor, deleteMoistureSensor, getSensorWithHistory }}
    >
      {children}
    </MoistureSensorContext.Provider>
  );
};

export const useMoistureSensors = () => {
  const context = useContext(MoistureSensorContext);
  if (!context) {
    throw new Error("useMoistureSensors must be used within a MoistureSensorProvider");
  }
  return context;
};
