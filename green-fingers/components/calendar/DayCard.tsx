import { WeekDay } from "@/app/profile/calendar";
import colors from "@/constants/colors";
import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

interface DayCardProps {
  day: WeekDay;
  currentDay: boolean;
  onClick?: () => void;
}

const DayCard: React.FC<DayCardProps> = ({ day, currentDay, onClick }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        currentDay ? { backgroundColor: colors.bgCard } : {},
      ]}
      onPress={onClick}
    >
      <Text style={currentDay ? { color: "white", fontWeight: "bold" } : null}>
        {day.day.substring(0, 3)}
      </Text>
      <Text style={currentDay ? { color: "white", fontWeight: "bold" } : null}>
        {day.date}
      </Text>
    </TouchableOpacity>
  );
};

export default DayCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primaryDefault,
    padding: 5,
    margin: 1,
    borderRadius: 5,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "#666",
  },
});
