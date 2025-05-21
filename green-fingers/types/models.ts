// Enum for frequency of water
export type WaterFrequency = "DAILY" | "WEEKLY" | "BIWEEKLY" | "MONTHLY";

// Enum for sunlight exposure
export enum SunLight {
  FULL_SUN = "Full Sun",
  PARTIAL_SUN = "Partial Sun",
  SHADE = "Shade",
}

export interface PlantName {
  commonName: string;
  scientificName: string;
}

// Blooming period and details
export interface Blooming {
  start: string;
  end: string;
  flowerColor: string;
}

export interface Harvest {
  start: string;
  end: string;
  yield: number;
  edibleParts: string;
}

// Temperature details
export interface Temperature {
  min: number;
  max: number;
}

// Size details
export interface Size {
  height: number;
  width: number;
}

// Planting period
export interface Planting {
  start: string;
  end: string;
}

// Main Plant interface
export interface Plant {
  name: PlantName;
  blooming: Blooming;
  waterFrequency: WaterFrequency;
  neededMoisture: SoilMoisture;
  harvest?: Harvest;
  sunLight: SunLight;
  temperature: Temperature;
  size: Size;
  fertilizerType: string;
  planting: Planting;
  imageUrl: string;
}

// Catalog Plant interface
export interface CatalogPlant extends Plant {
  id: number;
}

// Add Plant interface
export interface AddUserPlant extends Plant {
  nickName: string;
  garden_id: number;
  userId: number;
  catalogPlant_id: number;
  wateredDate: string;
  plantedDate: string;
  feededDate: string;
  moistureLevel: Level;
  sunlightLevel: Level;
  harvested: boolean;
  sensorId: string;
}

//User's own plat interface
export interface UserPlant extends AddUserPlant {
  id: number;
}

//Garden interface
export interface Garden extends AddGarden {
  id: number;
}

export interface AddGarden {
  name: string;
  location: string;
  userId: number;
}

export type SoilMoisture = "Very Dry" | "Dry" | "Moist" | "Wet" | "Very Wet";

export type Level = "Optimal" | "Good" | "Too Low" | "Too High" | "No Value";

export interface MoistureSensor extends AddMoistureSensor {
  id: number;
}

export interface AddMoistureSensor {
  name: string;
  current_moisture_level: number;
  sensorType: string;
  plant_id: number;
  nickname: string;
  user_id: number;
  percentage: string;
  interpretedMoisture: SoilMoisture;
}

export interface MoistureDataPoint {
  id: number;
  interpreted: SoilMoisture;
  moisture_level: number;
  sensor_id: number;
  time_stamp: string;
}

export interface SensorWithHistory {
  sensor: MoistureSensor;
  history: MoistureDataPoint[];
}

export interface ErrorData {
  title: string;
  message: string;
  stackTrace: string;
}
