import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import colors from "@/constants/colors";

type WeekDay = {
  date: number;
  day: string;
};

const Index: React.FC = () => {
  const days: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dt: Date = new Date();
  const year: number = dt.getFullYear();
  const month: string = dt.toLocaleDateString("en-us", { month: "long" });

  const [nav, setNav] = useState<number>(0);
  const [currentWeek, setCurrentWeek] = useState<WeekDay[]>([]);

  useEffect(() => {
    const today: Date = new Date();
    today.setDate(today.getDate() + nav * 7);
    const startOfWeek: Date = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Start on Monday

    const week: WeekDay[] = Array.from({ length: 7 }, (_, i) => {
      const day: Date = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return { date: day.getDate(), day: days[i] };
    });
    setCurrentWeek(week);
  }, [nav]);

  return (
    <View style={styles.container}>
      <View style={styles.monthContainer}>
        <Text style={styles.monthText}>{`${month} ${year}`}</Text>
      </View>
      <View style={styles.daysHeaderContainer}>
        {currentWeek.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayText}>{day.day.substring(0, 3)}</Text>
            <Text style={styles.dateText}>{day.date}</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setNav(nav - 1)} style={styles.button}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNav(nav + 1)} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
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
  dayContainer: {
    borderColor: colors.detail,
    borderWidth: 1,
    padding: 2,
    alignItems: "center",
    marginHorizontal: 5,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
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
