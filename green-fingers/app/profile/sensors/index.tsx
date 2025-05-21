import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, Text, StyleSheet, ImageBackground, RefreshControl } from "react-native";
import { useMoistureSensors } from "@/context/MoistureSensorContext";
import MoistureSensorCard from "@/components/MoistureSensorCard";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";

const Sensors = () => {
  const { sensors, fetchAllSensors } = useMoistureSensors();
  const [refreshing, setRefreshing] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();
  const { user } = useAuth();


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      fetchAllSensors();
    } catch (err) {
      showToast("error", "Could not refresh sensors");
    }
    setRefreshing(false);
  }, [user?.id]);


  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={styles.backgroundImage}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
