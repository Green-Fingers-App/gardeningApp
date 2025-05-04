import { WeekDay } from "@/app/profile/calendar";
import { DayOfWeek } from "@/context/CalendarContext";
import { UserPlant } from "@/types/models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { shouldBeWatered } from "./plant";

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

export type WateringAppointment = {
  plant: UserPlant;
  overdue: boolean;
};

export const getWateringAppointments = async (): Promise<{
  [key: string]: Partial<UserPlant>[];
} | null> => {
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
      (plant) => plant?.id !== plantData.id
    ),
  };
  await AsyncStorage.setItem(
    "wateringAppointments",
    JSON.stringify(updatedAppointments)
  );
  return updatedAppointments;
};

export const isFirstWeekOfMonth = (dateString: string) => {
  const date = new Date(dateString);
  return date.getDate() <= 7;
};

export const isThreeDaysLater = (wateringDay: string, currentDay: string) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const wateringIndex = daysOfWeek.indexOf(wateringDay);
  const currentIndex = daysOfWeek.indexOf(currentDay);
  return currentIndex === (wateringIndex + 3) % 7;
};

export const plantsToBeWateredToday = (
  wateringDay: DayOfWeek,
  plantsToWater: { [key: string]: UserPlant[] },
  currentDay: WeekDay,
  plants: UserPlant[]
): WateringAppointment[] => {
  const currentDateString = `${currentDay.year}-${currentDay.month + 1}-${
    currentDay.date
  }`;
  let result: WateringAppointment[] = [];

  const wateringAppointments: { [key: string]: WateringAppointment[] } =
    Object.fromEntries(
      Object.entries(plantsToWater).map(
        ([frequency, plants]: [string, UserPlant[]]) => [
          frequency,
          plants.map((plant) => ({
            plant,
            overdue: false,
          })),
        ]
      )
    );

  // WEEKLY
  if (wateringDay === currentDay.day) {
    result.push(...(wateringAppointments["WEEKLY"] || []));
  }

  // BIWEEKLY
  if (
    wateringDay === currentDay.day ||
    isThreeDaysLater(wateringDay, currentDay.day)
  ) {
    result.push(...(wateringAppointments["BIWEEKLY"] || []));
  }

  // DAILY (always show)
  result.push(...(wateringAppointments["DAILY"] || []));

  // MONTHLY (only if first watering day of month)
  if (
    wateringDay === currentDay.day &&
    isFirstWeekOfMonth(currentDay.date.toString())
  ) {
    result.push(...(wateringAppointments["MONTHLY"] || []));
  }
  plants.forEach((plant) => {
    if (shouldBeWatered(plant) && new Date() >= new Date(currentDateString))
      result.push({ plant, overdue: true });
  });
  const map = new Map<string, WateringAppointment>();

  for (const appointment of result) {
    const id = appointment.plant.id; // Assumes plant has a unique `id`
    const existing = map.get(id.toString());

    if (!existing || appointment.overdue) {
      map.set(id.toString(), appointment);
    }
  }

  return Array.from(map.values());
};

export const inTheFuture = (selectedDay: WeekDay): boolean => {
  const selectedDayString = `${selectedDay.year}-${selectedDay.month + 1}-${
    selectedDay.date
  }`;
  if (new Date() < new Date(selectedDayString)) {
    return true;
  }
  return false;
};
