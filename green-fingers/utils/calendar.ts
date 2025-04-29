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
        nickName: plant.nickName,
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

export const getWateringAppointments = async () => {
  const appointments = await AsyncStorage.getItem("wateringAppointments");
  if (!appointments) return null;
  return JSON.parse(appointments);
};

export const updateWateringAppointments = async (
  plantData: Partial<UserPlant>
) => {
  const appointments = await getWateringAppointments();
  if (!appointments) return null;

  if (plantData.waterFrequency) {
    appointments[plantData.waterFrequency].push({
      nickName: plantData.nickName,
      id: plantData.id,
    });
  }

  await AsyncStorage.setItem(
    "wateringAppointments",
    JSON.stringify(appointments)
  );
  return appointments;
};

export const removeWateringAppointment = async (plantId: number) => {
  const appointments = await getWateringAppointments();
  if (!appointments) return null;
  const updatedAppointments = appointments.filter(
    (plant: Partial<UserPlant>) => plant.id !== plantId
  );
  await AsyncStorage.setItem(
    "wateringAppointments",
    JSON.stringify(updatedAppointments)
  );
  return updatedAppointments;
};
