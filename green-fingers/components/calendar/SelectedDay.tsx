import { View, Text, StyleSheet, Dimensions, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { WeekDay } from "@/app/profile/calendar";
import colors from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserPlant } from "@/types/models";
import { useCalendar } from "@/context/CalendarContext";

interface SelectedDayProps {
  day: WeekDay;
}

const SelectedDay: React.FC<SelectedDayProps> = ({ day }) => {
  const { wateringDay } = useCalendar();
  const [listOfPlantsToBeWatered, setListOfPlantsToBeWatered] = useState<
    Partial<UserPlant>[]
  >([]);
  const [wateringAppointments, setWateringAppointments] = useState<
    { [key: string]: Partial<UserPlant>[] } | undefined
  >(undefined);

  const getWateringAppointments = async (): Promise<
    undefined | { [key: string]: Partial<UserPlant>[] }
  > => {
    const appointments = await AsyncStorage.getItem("wateringAppointments");
    if (!appointments) return undefined;
    return JSON.parse(appointments);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      const appointments = await getWateringAppointments();
      setWateringAppointments(appointments);
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (!wateringAppointments) return;

    let plantsToWater: Partial<UserPlant>[] = [];

    // WEEKLY
    if (wateringDay === day.day) {
      plantsToWater.push(...(wateringAppointments["WEEKLY"] || []));
    }

    // BIWEEKLY
    if (wateringDay === day.day || isThreeDaysLater(wateringDay, day.day)) {
      plantsToWater.push(...(wateringAppointments["BIWEEKLY"] || []));
    }

    // DAILY (always show)
    plantsToWater.push(...(wateringAppointments["DAILY"] || []));

    // MONTHLY (only if first watering day of month)
    if (wateringDay === day.day && isFirstWeekOfMonth(day.date.toString())) {
      plantsToWater.push(...(wateringAppointments["MONTHLY"] || []));
    }

    setListOfPlantsToBeWatered(plantsToWater);
  }, [wateringAppointments, wateringDay, day.day, day.date]);

  const isFirstWeekOfMonth = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDate() <= 7;
  };

  const isThreeDaysLater = (wateringDay: string, currentDay: string) => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${day.day} - ${day.date}`}</Text>
      {listOfPlantsToBeWatered.length > 0 ? (
        listOfPlantsToBeWatered.map((plant, index) => (
          <View style={{ marginHorizontal: 5, marginVertical: 2 }} key={index}>
            <Text key={index}>{plant.nickName}</Text>
          </View>
        ))
      ) : (
        <Text>No plants need water today</Text>
      )}
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
