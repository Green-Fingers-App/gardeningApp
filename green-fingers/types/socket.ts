import { SoilMoisture } from "./models";

export interface MoistureUpdateMessage {
  type: "MOISTURE_UPDATE";
  sensorId: number;
  moisture_level: number;
  interpreted_level: SoilMoisture;
  percentage: string;
  sensorName: string;
}
