import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import DayCard from "@/components/calendar/DayCard";
import Button from "@/components/Button";
import SelectedDay from "@/components/calendar/SelectedDay";
import { useCalendar } from "@/context/CalendarContext";

export type WeekDay = {
  date: number;
  day: string;
  month: number;
  year: number;
};

const Index: React.FC = () => {
  const dt: Date = new Date();
  const year: number = dt.getFullYear();
  const month: string = dt.toLocaleDateString("en-us", { month: "long" });

  const [nav, setNav] = useState<number>(0);
  const [currentWeek, setCurrentWeek] = useState<WeekDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<WeekDay | null>(null);
  const { days } = useCalendar();

  useEffect(() => {
    const today: Date = new Date();
    today.setDate(today.getDate() + nav * 7);
    const startOfWeek: Date = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Start on Monday

    const week: WeekDay[] = Array.from({ length: 7 }, (_, i) => {
      const day: Date = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return {
        date: day.getDate(),
        day: days[i],
        year: day.getFullYear(),
        month: day.getMonth(),
      };
    });
    setCurrentWeek(week);
  }, [nav]);

  const isCurrentDay = (day: WeekDay): boolean => {
    const today: Date = new Date();
    if (
      day.date === today.getDate() &&
      day.day === days[today.getDay() - 1 < 0 ? 6 : today.getDay() - 1]
    ) {
      return true;
    }
    return false;
  };

  const selectDay = (day: WeekDay) => {
    setSelectedDay(day);
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.monthContainer}>
          <Text style={styles.monthText}>{`${month} ${year}`}</Text>
        </View>
        <View style={styles.daysHeaderContainer}>
          {currentWeek.map((day, index) => (
            <DayCard
              key={index}
              day={day}
              currentDay={isCurrentDay(day)}
              onClick={() => {
                selectDay(day);
              }}
            />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              setNav(nav - 1);
            }}
            text="Previous"
            style={{ width: "30%" }}
          />
          <Button
            onPress={() => {
              setNav(nav + 1);
            }}
            text="next"
            style={{ width: "30%" }}
          />
        </View>
        <View>{selectedDay && <SelectedDay day={selectedDay} />}</View>
      </View>
    </ImageBackground>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    width: Dimensions.get("window").width,
  },
  monthContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  monthText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  daysHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  dateText: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 4,
  },
  button: {
    padding: 10,
    backgroundColor: "#007bff",
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
