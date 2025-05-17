import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MoistureSensor } from "@/types/models";
import { MaterialIcons } from "@expo/vector-icons";
import { useMoistureSensors } from "@/context/MoistureSensorContext";

interface MoistureSensorCardProps extends React.ComponentProps<typeof TouchableOpacity> {
  sensor: MoistureSensor;
}

const MoistureSensorCard: React.FC<MoistureSensorCardProps> = ({
  sensor,
  ...props
}) => {
  const { getMoistureLevel } = useMoistureSensors();
  const status = getMoistureLevel(sensor.plant_id, sensor.interpretedMoisture);

  const getIconProps = (): { name: keyof typeof MaterialIcons.glyphMap; color: string } => {
    switch (status) {
      case "Optimal":
      case "Good":
        return { name: "check-circle", color: colors.textSuccess };
      case "Too Low":
      case "Too High":
        return { name: "warning", color: colors.textWarning };
      case "No Value":
      default:
        return { name: "error", color: colors.textError };
    }
  };

  const iconProps = getIconProps();

  return (
    <TouchableOpacity style={styles.cardContainer} {...props}>
      <View style={styles.row}>
        <MaterialIcons name="sensors" size={24} color={colors.primaryDefault} />
        <View style={styles.textContainer}>
          <Text style={[textStyles.h4, { color: colors.primaryDefault }]}>{sensor.name}</Text>
          <Text style={[textStyles.label, { color: colors.textMuted, marginTop: -2 }]}>
            {`${sensor.sensorType} sensor`}
          </Text>
        </View>
        <View style={styles.spacer} />
        <View style={styles.statusContainer}>
          <MaterialIcons name={iconProps.name} size={24} color={iconProps.color} />
          <Text style={textStyles.caption} >{status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.bgLight,
    borderColor: colors.primaryDefault,
    borderWidth: 2,
    width: "100%",
    borderRadius: 8,
    padding: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 12,
  },
  spacer: {
    flex: 1,
  },
  statusContainer: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 4,
  },
});

export default MoistureSensorCard;
