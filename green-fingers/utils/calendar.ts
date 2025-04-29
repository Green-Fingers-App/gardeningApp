import { UserPlant } from "@/types/models";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setWateringAppointments = async (
  plantData: Partial<UserPlant>[]
) => {
  if (!plantData || plantData.length === 0) {
    return null;
  }

  if (await AsyncStorage.getItem("wateringAppointments")) return;

  let appointments: { [key: string]: Partial<UserPlant>[] } = {
    DAILY: [],
    WEEKLY: [],
    BIWEEKLY: [],
    MONTHLY: [],
  };

  plantData.forEach((plant) => {
    if (!plant.nickName) return;
    if (plant.waterFrequency) {
      appointments[plant.waterFrequency].push({
        id: plant.id,
      });
    }
  });

  await AsyncStorage.setItem(
    "wateringAppointments",
    JSON.stringify(appointments)
  );

  return appointments;
};

type WateringAppointments = { [key: string]: Partial<UserPlant>[] } | null;

export const getWateringAppointments =
  async (): Promise<WateringAppointments> => {
    const appointments = await AsyncStorage.getItem("wateringAppointments");
    if (!appointments) return null;
    return JSON.parse(appointments);
  };

export const addWateringAppointments = async (
  plantData: Partial<UserPlant>
) => {
  const appointments = await getWateringAppointments();
  if (!appointments) return null;

  if (plantData.waterFrequency && plantData.id) {
    appointments[plantData.waterFrequency].push({
      id: plantData.id,
    });
  }

  await AsyncStorage.setItem(
    "wateringAppointments",
    JSON.stringify(appointments)
  );
  return appointments;
};

export const removeWateringAppointment = async (
  plantData: Partial<UserPlant>
) => {
  const appointments = await getWateringAppointments();
  const waterFrequency = plantData.waterFrequency;
  if (!appointments || !waterFrequency) return null;

  const updatedAppointments = {
    ...appointments,
    [waterFrequency]: appointments[waterFrequency].filter(
      (plant: Partial<UserPlant> | undefined) => plant?.id !== plantData.id
    ),
  };
  await AsyncStorage.setItem(
    "wateringAppointments",
    JSON.stringify(updatedAppointments)
  );
  return updatedAppointments;
};
