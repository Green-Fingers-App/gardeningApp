// Dummy Data

import { Pest, PestSeverity, Plant, Month, WaterFrequency, SunLight, HardinessZone, GrowthRate, ToxicityLevel, Garden, User, UserPlant, Level } from "../types/models";

// Pests
const pests: Pest[] = [
  {
    id: 1,
    name: "Aphids",
    description: "Small sap-sucking insects that can damage plants by stunting growth and transmitting diseases.",
    severity: PestSeverity.HIGH,
    controlMethods: ["Neem oil", "Ladybugs", "Insecticidal soap"]
  },
  {
    id: 2,
    name: "Spider Mites",
    description: "Tiny mites that create webbing on plants and cause yellowing of leaves.",
    severity: PestSeverity.MEDIUM,
    controlMethods: ["Miticides", "Horticultural oils", "Beneficial insects"]
  },
  {
    id: 3,
    name: "Whiteflies",
    description: "Flying pests that suck sap from the undersides of plant leaves.",
    severity: PestSeverity.LOW,
    controlMethods: ["Yellow sticky traps", "Insecticidal soap", "Neem oil"]
  }
];

// Plants
export const plants: Plant[] = [
  {
    id: "1",
    name: { commonName: "Tomato", scientificName: "Solanum lycopersicum" },
    blooming: { start: Month.JUNE, end: Month.AUGUST, flowerColor: "Yellow" },
    waterFrequency: WaterFrequency.WEEKLY,
    harvest: { start: Month.JULY, end: Month.SEPTEMBER, yield: 20, edibleParts: "Fruit" },
    sunLight: SunLight.FULL_SUN,
    temperature: { min: 15, max: 35 },
    size: { height: 100, width: 60 },
    fertilizerType: "Organic compost",
    planting: { start: Month.MARCH, end: Month.APRIL },
  },
  {
    id: "2",
    name: { commonName: "Rose", scientificName: "Rosa" },
    blooming: { start: Month.MAY, end: Month.OCTOBER, flowerColor: "Red" },
    waterFrequency: WaterFrequency.WEEKLY,
    harvest: false,
    sunLight: SunLight.PARTIAL_SUN,
    temperature: { min: 10, max: 30 },
    size: { height: 150, width: 100 },
    fertilizerType: "Rose fertilizer",
    planting: { start: Month.MARCH, end: Month.MAY },
  },
  {
    id: "3",
    name: { commonName: "Carrot", scientificName: "Daucus carota" },
    blooming: { start: Month.JUNE, end: Month.AUGUST, flowerColor: "White" },
    waterFrequency: WaterFrequency.WEEKLY,
    harvest: { start: Month.AUGUST, end: Month.SEPTEMBER, yield: 50, edibleParts: "Root" },
    sunLight: SunLight.FULL_SUN,
    temperature: { min: 10, max: 25 },
    size: { height: 30, width: 5 },
    fertilizerType: "All-purpose fertilizer",
    planting: { start: Month.MARCH, end: Month.JUNE },
  },
  {
    id: "4",
    name: { commonName: "Basil", scientificName: "Ocimum basilicum" },
    blooming: { start: Month.JUNE, end: Month.AUGUST, flowerColor: "Purple" },
    waterFrequency: WaterFrequency.DAILY,
    harvest: { start: Month.JUNE, end: Month.AUGUST, yield: 30, edibleParts: "Leaves" },
    sunLight: SunLight.FULL_SUN,
    temperature: { min: 15, max: 30 },
    size: { height: 45, width: 30 },
    fertilizerType: "Balanced fertilizer",
    planting: { start: Month.APRIL, end: Month.MAY },
  },
  {
    id: "5",
    name: { commonName: "Lavender", scientificName: "Lavandula" },
    blooming: { start: Month.JUNE, end: Month.AUGUST, flowerColor: "Purple" },
    waterFrequency: WaterFrequency.BIWEEKLY,
    harvest: false,
    sunLight: SunLight.FULL_SUN,
    temperature: { min: 10, max: 30 },
    size: { height: 60, width: 90 },
    fertilizerType: "No fertilizer required",
    planting: { start: Month.MARCH, end: Month.APRIL },
  }
];

// Gardens
export const gardens: Garden[] = [
  { id: 1, location: "Backyard", plantIds: [1, 2] },
  { id: 2, location: "Front Yard", plantIds: [3, 4] },
  { id: 3, location: "Community Garden", plantIds: [5] }
];

// Users
const users: User[] = [
  {
    id: "1",
    username: "gardener_john",
    firstName: "John",
    lastName: "Doe",
    gardenIds: [1],
    plantIds: [1, 2]
  },
  {
    id: "2",
    username: "green_thumb",
    firstName: "Jane",
    lastName: "Smith",
    gardenIds: [2],
    plantIds: [3, 4]
  },
  {
    id: "3",
    username: "plant_lover",
    firstName: "Emily",
    lastName: "Brown",
    gardenIds: [3],
    plantIds: [5]
  }
];

// UserPlants
export const userPlants: UserPlant[] = [
  {
    id: "1",
    nickName: "Tommy Tomato",
    plant: plants[0],
    wateredDate: "2024-09-12",
    plantedDate: "2024-04-10",
    feededDate: "2024-10-10",
    moistureLevel: Level.OPTIMAL,
    sunlightLevel: Level.OPTIMAL,
    harvested: false
  },
  {
    id: "2",
    nickName: "Red Rose",
    plant: plants[1],
    wateredDate: "2024-09-10",
    plantedDate: "2024-05-01",
    feededDate: "2024-10-23",
    moistureLevel: Level.TOO_LOW,
    sunlightLevel: Level.OPTIMAL,
    harvested: false
  },
  {
    id: "3",
    nickName: "Orange King",
    plant: plants[2],
    wateredDate: "2024-09-14",
    plantedDate: "2024-03-15",
    feededDate: "2024-11-01",
    moistureLevel: Level.OPTIMAL,
    sunlightLevel: Level.TOO_HIGH,
    harvested: true
  },
  {
    id: "4",
    nickName: "Basilico",
    plant: plants[3],
    wateredDate: "2024-09-13",
    plantedDate: "2024-05-01",
    feededDate: "2024-10-22",
    moistureLevel: Level.TOO_HIGH,
    sunlightLevel: Level.OPTIMAL,
    harvested: false
  },
  {
    id: "5",
    nickName: "Frensh Princess",
    plant: plants[4],
    wateredDate: "2024-09-11",
    plantedDate: "2024-04-01",
    feededDate: "2024-10-13",
    moistureLevel: Level.OPTIMAL,
    sunlightLevel: Level.OPTIMAL,
    harvested: true
  }
];
