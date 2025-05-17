import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, ImageBackground } from "react-native";
import { useMoistureSensors } from "@/context/MoistureSensorContext";
import MoistureSensorCard from "@/components/MoistureSensorCard";
import { MoistureSensor } from "@/types/models";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";

const Sensors = () => {
  const [sensors, setSensors] = useState<MoistureSensor[]>([]);
  const { sensors: contextMoistureSensors } = useMoistureSensors();
  const router = useRouter();

  useEffect(() => {
    setSensors(contextMoistureSensors);
  }, [contextMoistureSensors]);

  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {sensors.length === 0 ? (
          <Text style={[textStyles.h4, styles.emptyText]}>
            You don't have any sensors yet. Click on the plus button to add one.
          </Text>
        ) : (
          sensors.map((sensor, index) => (
            <MoistureSensorCard
              sensor={sensor}
              key={index}
              onPress={() => router.push(`profile/sensors/${sensor.id}`)}
            />
          ))
        )}
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  scrollContainer: {
    padding: 8,
    paddingBottom: 104,
    alignItems: "stretch",
    gap: 8,
  },
  emptyText: {
    textAlign: "center",
    marginTop: "75%",
    backgroundColor: colors.backDropLight,
    padding: 8,
    borderRadius: 8,
  },
});

export default Sensors;
