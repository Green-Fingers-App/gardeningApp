// Enum for frequency of water
export enum WaterFrequency {
  DAILY = "Daily",
  WEEKLY = "Weekly",
  BIWEEKLY = "Biweekly",
  MONTHLY = "Monthly",
}

// Enum for months to restrict blooming, harvesting, and planting periods
export enum Month {
  JANUARY = 1,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER,
}

// Enum for sunlight exposure
export enum SunLight {
  FULL_SUN = "Full Sun",
  PARTIAL_SUN = "Partial Sun",
  SHADE = "Shade",
}

// Enum for growth rate
export enum GrowthRate {
  SLOW = "Slow",
  MODERATE = "Moderate",
  FAST = "Fast",
}

// Enum for toxicity levels
export enum ToxicityLevel {
  NON_TOXIC = "Non-toxic",
  MILD_TOXIC = "Mildly toxic",
  HIGHLY_TOXIC = "Highly toxic",
}

// Enum for hardiness zones
export enum HardinessZone {
  ZONE_1 = "Zone 1",
  ZONE_2 = "Zone 2",
  ZONE_3 = "Zone 3",
  ZONE_4 = "Zone 4",
  ZONE_5 = "Zone 5",
  ZONE_6 = "Zone 6",
  ZONE_7 = "Zone 7",
  ZONE_8 = "Zone 8",
  ZONE_9 = "Zone 9",
  ZONE_10 = "Zone 10",
}

// Enum for pest severity
export enum PestSeverity {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

// Pest interface
export interface Pest {
  id: number;
  name: string;
  description: string;
  severity: PestSeverity;
  controlMethods: string[];
}

// Plant name interface
export interface PlantName {
  commonName: string;
  scientificName: string;
}

// Blooming period and details
export interface Blooming {
  start: Month;
  end: Month;
  flowerColor: string;
}

// Soil details
export interface Soil {
  ph: number;
  type: string;
}

// Harvest period and details
export type Harvest =
  | false
  | {
      start: Month;
      end: Month;
      yield: number;
      edibleParts: string;
  };

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
  start: Month;
  end: Month;
}

// Main Plant interface
export interface Plant {
  name: PlantName;
  blooming: Blooming;
  waterFrequency: WaterFrequency;
  harvest: Harvest;
  sunLight: SunLight;
  temperature: Temperature;
  size: Size;
  fertilizerType: string;
  planting: Planting;
}

// Catalog Plant interface
export interface CatalogPlant extends Plant {
  id: string;
}

// Add Plant interface
export interface AddUserPlant extends Plant {
  nickName: string;
  garden_id: string;
  userId: string;
  catalogPlant_id: string;
  wateredDate: string;
  plantedDate: string;
  feededDate: string;
  moistureLevel: Level;
  sunlightLevel: Level;
  harvested: boolean;
}

//User's own plant interface
export interface UserPlant extends AddUserPlant {
  id: string;
}

//Garden interface
export interface Garden extends AddGarden {
  id: string;  
}

export interface AddGarden {
  name: string;
  location: string;
  userId: string;
}

//expected Level interface
export type Level = "Optimal" | "Too Low" | "High";

export interface MoistureSensor {
  //tba
}

export interface SunlightSensor {
  //tba
}