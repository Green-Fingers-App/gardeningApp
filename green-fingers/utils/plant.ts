import { UserPlant } from "@/types/models";

export const shouldBeWatered = (plant: UserPlant): boolean => {
  const currentDate = new Date();
  const lastWateredDate = new Date(plant.wateredDate);
  const waterFrequency = plant.waterFrequency;
  console.log(waterFrequency);

  switch (waterFrequency) {
    case "DAILY":
      if (currentDate.getDate() - lastWateredDate.getDate() >= 1) {
        return true;
      }
      return false;
    case "WEEKLY":
      if (currentDate.getDate() - lastWateredDate.getDate() >= 7) {
        return true;
      }
      return false;
    case "BIWEEKLY":
      if (currentDate.getDate() - lastWateredDate.getDate() >= 4) {
        return true;
      }
      return false;
    case "MONTHLY":
      if (currentDate.getDate() - lastWateredDate.getDate() >= 30) {
        return true;
      }
      return false;
    default:
      return false;
  }
};
