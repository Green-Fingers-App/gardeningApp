import { UserPlant } from "@/types/models";

export const shouldBeWatered = (plant: UserPlant): boolean => {
  const currentDate = new Date();
  const lastWateredDate = new Date(plant.wateredDate);
  const waterFrequency = plant.waterFrequency;
  const msInDay = 1000 * 60 * 60 * 24;
  const daysSinceWatered = Math.floor(
    (currentDate.getTime() - lastWateredDate.getTime()) / msInDay
  );

  console.log(`Determining if plant ${plant.nickName} is thristy... `);
  console.log("Water frequency: ", plant.waterFrequency);
  console.log("Last watered day: ", lastWateredDate);
  console.log("Today: ", currentDate);
  switch (waterFrequency) {
    case "DAILY":
      if (daysSinceWatered >= 1) {
        return true;
      }
      return false;
    case "WEEKLY":
      if (daysSinceWatered >= 7) {
        return true;
      }
      return false;
    case "BIWEEKLY":
      if (daysSinceWatered >= 4) {
        return true;
      }
      return false;
    case "MONTHLY":
      if (daysSinceWatered >= 30) {
        return true;
      }
      return false;
    default:
      console.log("Returning Default");
      return false;
  }
};
