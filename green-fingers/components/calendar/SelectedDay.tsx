import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { WeekDay } from "@/app/profile/calendar";
import colors from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserPlant } from "@/types/models";
import { useCalendar } from "@/context/CalendarContext";
import Button from "../Button";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import {
  inTheFuture,
  plantsToBeWateredToday,
  WateringAppointment,
} from "@/utils/calendar";

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
    undefined | { [key: string]: Partial<UserPlant>[] }
  > => {
    const ids: { [key: string]: Partial<UserPlant>[] } = JSON.parse(
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

  useEffect(() => {
    const fetchAppointments = async () => {
      const ids = await getWateringIds();
      let appointments: { [key: string]: UserPlant[] } = {
        DAILY: [],
        WEEKLY: [],
        BIWEEKLY: [],
        MONTHLY: [],
      };
      for (const frequency in ids) {
        appointments[frequency] = ids[frequency]
          .map((id) => plants.find((plant) => plant.id === id.id))
          .filter((plant): plant is UserPlant => plant !== undefined);
      }
      setWateringAppointments(appointments);
    };
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
      <Text style={styles.title}>{`${day.day} - ${day.date}`}</Text>
      {listOfPlantsToBeWatered.length > 0 ? (
        listOfPlantsToBeWatered.map(({ overdue, plant }, index) => (
          <View style={{ marginHorizontal: 5, marginVertical: 2 }} key={index}>
            <Text
              style={overdue ? { color: colors.textWarning } : null}
              key={index}
            >{`${plant.nickName} - Last Watered: ${
              plant.wateredDate &&
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
          style={{ width: "80%", alignSelf: "center", marginTop: 10 }}
          onPress={waterPlants}
        />
      ) : null}
    </View>
  );
};

export default SelectedDay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: colors.primaryDefault,
    borderWidth: 1,
    margin: 20,
    width: Dimensions.get("window").width - 40,
    height: 10,
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: colors.bgCard,
  },
  title: {
    backgroundColor: colors.primaryDefault,
    paddingLeft: 10,
    height: 30,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },
});
