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
import { MoistureSensor, SoilMoisture, Level, SensorWithHistory, AddMoistureSensor } from "@/types/models";
import { apiDeleteSensor, apiGetAllMoistureSensors, apiGetSensorHistoryData, apiUpdateSensor } from "@/api/sensorService";

interface MoistureSensorContextProps {
  sensors: MoistureSensor[];
  fetchAllSensors: () => void;
  fetchSensor: (sensorId: string) => MoistureSensor | undefined;
  fetchSensorWithHistory: (sensorId: string) => Promise<SensorWithHistory | undefined>;
  getMoistureLevel: (plantId: number, actualLevel: SoilMoisture) => Level;
  updateMoistureSensor: (sensorId: number, sensorData: Partial<AddMoistureSensor>) => Promise<MoistureSensor | undefined>;
  deleteMoistureSensor: (sensorId: number) => void;
}

const MoistureSensorContext = createContext<MoistureSensorContextProps | undefined>(undefined);

export const MoistureSensorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sensors, setSensors] = useState<MoistureSensor[]>([]);
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
    try {
      const data = await apiGetSensorHistoryData(parseInt(sensorId, 10));
      return data;
    } catch (error) {
      showToast("error", `Fetching sensor with history ${(error as Error).message}`);
    }
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
    if (user?.id) {
      void fetchAllSensors();
    }
  }, [user?.id]);

  return (
    <MoistureSensorContext.Provider
      value={{ sensors, fetchAllSensors, fetchSensor, fetchSensorWithHistory, getMoistureLevel, updateMoistureSensor, deleteMoistureSensor }}
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
