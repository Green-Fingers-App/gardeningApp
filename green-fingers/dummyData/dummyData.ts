// Dummy Data

import { Pest, PestSeverity, Plant, Month, WaterFrequency, SunLight, Garden, User, UserPlant, Level } from "../types/models";

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


// Gardens
export const gardens: Garden[] = [
  { id: 1, location: "Backyard", plantIds: [1, 2] },
  { id: 2, location: "Front Yard", plantIds: [3, 4] },
  { id: 3, location: "Community Garden", plantIds: [5] }
];

// Users
const users: User[] = [
  {
    username: "gardener_john",
    firstName: "John",
    lastName: "Doe",
    gardenIds: [1],
    plantIds: [1, 2]
  },
  {
    username: "green_thumb",
    firstName: "Jane",
    lastName: "Smith",
    gardenIds: [2],
    plantIds: [3, 4]
  },
  {
    username: "plant_lover",
    firstName: "Emily",
    lastName: "Brown",
    gardenIds: [3],
    plantIds: [5]
  }
];
