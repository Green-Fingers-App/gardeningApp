import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, StyleSheet, ActivityIndicator, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useMoistureSensors } from "@/context/MoistureSensorContext";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { MoistureSensor, UserPlant, MoistureDataPoint } from "@/types/models";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
import { useDeleteEntity } from "@/hooks/useDeleteEntity";
import EntityEditModal from "@/components/EntityEditModal";
import OptionMenu from "@/components/OptionMenu";
import Button from "@/components/Button";
import MoistureChart from "@/components/MoistureChart";


const SensorDetailPage = () => {
  const { sensorId } = useLocalSearchParams();
  const { fetchSensor, fetchSensorWithHistory, getMoistureLevel } = useMoistureSensors();
  const { fetchPlantDetail } = useGardensAndPlants();

  const [sensor, setSensor] = useState<MoistureSensor | undefined>(undefined);
  const [plant, setPlant] = useState<UserPlant | undefined>(undefined);

  const [iconProps, setIconProps] = useState<{
    name: keyof typeof MaterialIcons.glyphMap;
    color: string;
  }>({ name: "error", color: colors.textError });
  const [status, setStatus] = useState<string>("No value available");
  const [history, setHistory] = useState<MoistureDataPoint[]>([]);

  const getIconProps = (
    status: string
  ): { name: keyof typeof MaterialIcons.glyphMap; color: string } => {
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

  const router = useRouter();


  useEffect(() => {
    const loadSensorData = async () => {
      const currentSensor = fetchSensor(sensorId.toString());
      const sensorWithHistory = await fetchSensorWithHistory(sensorId.toString());
      if (currentSensor && sensorWithHistory) {
        const status = getMoistureLevel(
          currentSensor.plant_id,
          currentSensor.interpretedMoisture
        );
        const currentIconProps = getIconProps(status);
        const connectedPlant = fetchPlantDetail(currentSensor.plant_id.toString());
        console.log(currentSensor.current_moisture_level)
        setStatus(status);
        setSensor(currentSensor);
        setHistory(sensorWithHistory.history);
        setPlant(connectedPlant);
        setIconProps(currentIconProps);
      }
    };

    loadSensorData();
  }, [sensorId]);


  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={styles.backgroundImage}
    >
      <Stack.Screen
        options={{
          title: sensor?.name || "Sensor Details",
          headerStyle: { backgroundColor: colors.bgLight },
          headerTintColor: colors.primaryDefault,
        }}
      />
      {sensor ? (
        <View style={styles.pageContainer}>
          <View style={styles.chartContainer}>

            <MoistureChart
              data={history}
              expectedMoisture={plant?.neededMoisture}
            />

          </View>
          <View style={styles.currentMoistureLevel}>
            <MaterialIcons name={iconProps.name} color={iconProps.color} size={24} />
            <Text style={[textStyles.h4, { textAlign: "center", }]} >Soil moisture: {status} </Text>
          </View>
          <View style={styles.attributeContainer}>
            <View style={styles.attributeText}>
              <Text style={[textStyles.body, { color: colors.textSecondary }]} > Sensor type:</Text>
              {sensor.sensorType ? (
                <Text style={[textStyles.body, { color: colors.textPrimary }]} > {sensor.sensorType} sensor</Text>
              ) : (
                <Text style={[textStyles.body, { color: colors.textPrimary }]} > -</Text>
              )}
            </View>
            <View style={styles.attributeText}>
              <Text style={[textStyles.body, { color: colors.textSecondary }]} > Moisture level:</Text>
              {sensor.interpretedMoisture ? (
                <Text style={[textStyles.body, { color: colors.textPrimary }]} > {sensor.interpretedMoisture}</Text>
              ) : (
                <Text style={[textStyles.body, { color: colors.textPrimary }]} > -</Text>
              )}
            </View>
            <View style={styles.attributeText}>
              <Text style={[textStyles.body, { color: colors.textSecondary }]} > Moisture percentage:</Text>
              {sensor.percentage ? (
                <Text style={[textStyles.body, { color: colors.textPrimary }]} > {sensor.percentage}</Text>
              ) : (
                <Text style={[textStyles.body, { color: colors.textPrimary }]} > -</Text>
              )}
            </View>
            <View style={styles.attributeText}>
              <Text style={[textStyles.body, { color: colors.textSecondary }]} > Sensor name:</Text>
              {sensor.name ? (
                <Text style={[textStyles.body, { color: colors.textPrimary }]} > {sensor.name}</Text>
              ) : (
                <Text style={[textStyles.body, { color: colors.textPrimary }]} > -</Text>
              )}
            </View>
            <View style={styles.attributeText}>
              <Text style={[textStyles.body, { color: colors.textSecondary }]} > Assigned plant:</Text>
              {sensor.plant_id ? (
                <Button
                  style={{ flexShrink: 1 }}
                  type="tertiary"
                  text={sensor.nickname}
                  onPress={() => router.push(`profile/plants/${sensor.plant_id}`)}
                />
              ) : (
                <Text style={[textStyles.body, { color: colors.textPrimary }]} > -</Text>
              )}
            </View>
          </View>

        </View>
      ) : (
        <View style={styles.loadingText}>
          <ActivityIndicator size="small" color={colors.primaryDefault} />
          <Text style={[textStyles.h4, { textAlign: "center", }]} > Loading sensor... </Text>
        </View>
      )}
    </ImageBackground>
  )

}

export default SensorDetailPage;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  pageContainer: {
    alignItems: "center",
    flex: 1,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.primaryDefault,
    backgroundColor: colors.white,
  },
  chartContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryDefault,
    backgroundColor: colors.white,
    height: 280,
    width: "100%",
  },
  currentMoistureLevel: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingBottom: 8,
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryDefault,
    backgroundColor: colors.white,
    width: "100%"
  },
  attributeContainer: {
    width: "100%",
    padding: 16,
    gap: 8,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  attributeText: {
    flexDirection: "row",
    alignContent: "center",
    gap: 4,
  },
  loadingText: {
    flex: 1,
    gap: 4,
    alignContent: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: colors.primaryDefault,
    backgroundColor: colors.white,
  }
});
