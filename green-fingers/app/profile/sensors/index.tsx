import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useMoistureSensors } from "@/context/MoistureSensorContext";
import MoistureSensorCard from "@/components/MoistureSensorCard";
import { MoistureSensor } from "@/types/models";
import { useRouter } from "expo-router";

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
      <View style={styles.pageContainer}>
        {sensors.length === 0 ? (
          <Text style={styles.emptyText}>
            You don't have any sensors yet.
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
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    gap: 12,
    marginTop: 8,
    padding: 8,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
    textAlign: "center",
    marginTop: 16,
  },
});

export default Sensors;
