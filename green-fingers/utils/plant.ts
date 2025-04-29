import { UserPlant } from "@/types/models";

export const shouldBeWatered = (plant: UserPlant): boolean => {
  const currentDate = new Date();
  const lastWateredDate = new Date(plant.wateredDate);
  const waterFrequency = plant.waterFrequency;

  switch (waterFrequency) {
    case "Daily":
      if (currentDate.getDate() - lastWateredDate.getDate() >= 1) {
        return true;
      }
      return false;
    case "Weekly":
      if (currentDate.getDate() - lastWateredDate.getDate() >= 7) {
        return true;
      }
      return false;
    case "Biweekly":
      if (currentDate.getDate() - lastWateredDate.getDate() >= 4) {
        return true;
      }
      return false;
    case "Monthly":
      if (currentDate.getDate() - lastWateredDate.getDate() >= 30) {
        return true;
      }
      return false;
    default:
      return false;
  }
};
