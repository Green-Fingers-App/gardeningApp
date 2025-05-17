import { WeekDay } from "@/app/profile/calendar";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
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
        currentDay ? { backgroundColor: colors.secondaryDark } : {},
      ]}
      onPress={onClick}
    >

      <Text style={[currentDay ? textStyles.bodyMedium : textStyles.body, { color: currentDay ? colors.white : colors.textPrimary }]}>
        {day.day.substring(0, 3)}
      </Text>

      <Text style={[currentDay ? textStyles.bodyMedium : textStyles.body, { color: currentDay ? colors.white : colors.textPrimary }]}>
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
    backgroundColor: colors.bgLight,
    padding: 4,
    borderRadius: 8,
  }
});
