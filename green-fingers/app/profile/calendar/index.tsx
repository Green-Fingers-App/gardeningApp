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
import { days } from "@/constants/days";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";

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
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={textStyles.h3}>{`${month} ${year}`}</Text>
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
            type="secondary"
            style={{ width: "49%" }}
          />
          <Button
            onPress={() => {
              setNav(nav + 1);
            }}
            text="Next"
            type="secondary"
            style={{ width: "49%" }}
          />
        </View>
      </View>
      {selectedDay && <SelectedDay day={selectedDay} />}
    </ImageBackground>
  );
};

export default Index;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    padding: 8,
    backgroundColor: colors.backDropLight,
  },
  daysHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 8,
    width: "100%",
  },
});
