import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { WeekDay } from "@/app/profile/calendar";
import colors from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserPlant, WaterFrequency } from "@/types/models";
import { useCalendar } from "@/context/CalendarContext";
import Button from "../Button";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { inTheFuture, plantsToBeWateredToday, WateringAppointment } from "@/utils/calendar";
import textStyles from "@/constants/textStyles";

interface SelectedDayProps {
  day: WeekDay;
}

const SelectedDay: React.FC<SelectedDayProps> = ({ day }) => {
  const { batchUpdateWateredDate } = useGardensAndPlants();
  const { wateringDay } = useCalendar();
  const { plants } = useGardensAndPlants();
  const [listOfPlantsToBeWatered, setListOfPlantsToBeWatered] = useState<
    WateringAppointment[]
  >([]);
  const [wateringAppointments, setWateringAppointments] = useState<
    { [key: string]: UserPlant[] } | undefined
  >(undefined);

  const getWateringIds = async (): Promise<
    undefined | Record<WaterFrequency, Partial<UserPlant[]>>
  > => {
    const ids: Record<WaterFrequency, Partial<UserPlant[]>> = JSON.parse(
      (await AsyncStorage.getItem("wateringAppointments")) || "null"
    );
    if (!ids) return undefined;
    return ids;
  };

  const waterPlants = async () => {
    const plantIds = listOfPlantsToBeWatered
      .map((appointment) => appointment.plant.id)
      .filter((id): id is number => id !== undefined);

    if (plantIds.length > 0) {
      await batchUpdateWateredDate(plantIds);
    }
  };

  const fetchAppointments = async () => {
    const ids = await getWateringIds();
    if (!ids) return;
    let appointments: Record<WaterFrequency, UserPlant[]> = {
      DAILY: [],
      WEEKLY: [],
      BIWEEKLY: [],
      MONTHLY: [],
    };
    for (const frequency of Object.keys(ids) as WaterFrequency[]) {
      appointments[frequency] = ids[frequency]
        .map((id) =>
          id ? plants.find((plant) => plant.id === id.id) : undefined
        )
        .filter((plant): plant is UserPlant => plant !== undefined);
    }
    setWateringAppointments(appointments);
  };

  useEffect(() => {
    fetchAppointments();
  }, [plants]);

  useEffect(() => {
    if (!wateringAppointments) return;
    const plantsToWater = plantsToBeWateredToday(
      wateringDay,
      wateringAppointments,
      day,
      plants
    );
    setListOfPlantsToBeWatered(plantsToWater);
  }, [wateringAppointments, wateringDay, day.day, day.date]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={[textStyles.h4, { color: colors.primaryDefault }]}>{`${day.day} - ${day.date}`}</Text>
      </View>
      <View style={styles.todoContainer}>
        {listOfPlantsToBeWatered.length > 0 ? (
          listOfPlantsToBeWatered.map(({ overdue, plant }, index) => (
            <View key={index}>
              <Text
                style={[overdue ? textStyles.bodyMedium : textStyles.body, { color: overdue ? colors.textWarning : colors.textPrimary }]}
                key={index}
              >{`${plant.nickName} - Last Watered: ${plant.wateredDate &&
                new Date(plant.wateredDate).toLocaleDateString()
                }`}</Text>
            </View>
          ))
        ) : (
          <Text>No plants need water today</Text>
        )}
        {listOfPlantsToBeWatered.length > 0 && !inTheFuture(day) ? (
          <Button
            text="I've watered the plants"
            iconName="watering-can-outline"
            onPress={waterPlants}
          />
        ) : null}
      </View>
    </View>
  );
};

export default SelectedDay;

const styles = StyleSheet.create({
  container: {
    borderColor: colors.primaryDefault,
    borderWidth: 1,
    margin: 8,
    marginTop: 16,
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  title: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.bgLight,
    padding: 16,
    borderBottomColor: colors.primaryDefault,
    borderBottomWidth: 1,
  },
  todoContainer: {
    flexDirection: "column",
    gap: 8,
    padding: 8,
  }
});
