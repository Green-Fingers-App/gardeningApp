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
  const { fetchSensor, fetchSensorWithHistory, getMoistureLevel, updateMoistureSensor } = useMoistureSensors();
  const { fetchPlantDetail } = useGardensAndPlants();

  const [sensor, setSensor] = useState<MoistureSensor | undefined>(undefined);
  const [plant, setPlant] = useState<UserPlant | undefined>(undefined);

  const [iconProps, setIconProps] = useState<{
    name: keyof typeof MaterialIcons.glyphMap;
    color: string;
    bg: string;
  }>({ name: "error", color: colors.textError, bg: colors.bgError });
  const [status, setStatus] = useState<string>("No value available");
  const [history, setHistory] = useState<MoistureDataPoint[]>([]);

  const { deleting, handleDeleteEntity } = useDeleteEntity("Sensor");
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState<{ [key: string]: string | number }>({});

  const getIconProps = (
    status: string
  ): { name: keyof typeof MaterialIcons.glyphMap; color: string, bg: string } => {
    switch (status) {
      case "Optimal":
      case "Good":
        return { name: "check-circle", color: colors.textSuccess, bg: colors.bgSuccess };
      case "Too Low":
      case "Too High":
        return { name: "warning", color: colors.textWarning, bg: colors.bgWarning };
      case "No Value":
      default:
        return { name: "error", color: colors.textError, bg: colors.bgError };
    }
  };

  const router = useRouter();

  const handleStartEditing = () => {
    if (!sensor) return;
    setEditValues({
      name: sensor.name,
      plant_id: sensor.plant_id,
    });
    setEditing(true);
  };

  const options = [
    { label: "Edit", onPress: handleStartEditing },
    {
      label: "Delete",
      onPress: () => {
        console.log("Button Pressed, sensor: ", sensor);
        sensor && handleDeleteEntity({ id: sensor.id, name: sensor.name });
      },
    },
  ];

  const handleChange = (key: string, value: string | number) => {
    setEditValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancelEdit = () => {
    if (!sensor) return;

    setEditing(false);
    setEditValues({
      name: sensor.name,
      plant_id: sensor.plant_id,
    });
  };

  const handleSave = async () => {
    const updatedSensor = await updateMoistureSensor(
      parseInt(sensorId.toString(), 10),
      {
        name: editValues.name as string,
        plant_id: editValues.plant_id as number,
      }
    );
    setSensor(updatedSensor);
    setEditValues({});
    setEditing(false);
    router.replace(`/profile/sensors/${sensorId}`);
  };

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
          headerRight: () => <OptionMenu options={options} />,
        }}
      />
      {sensor && !deleting ? (
        <View style={styles.pageContainer}>
          <View style={styles.chartContainer}>

            <MoistureChart
              data={history}
              expectedMoisture={plant?.neededMoisture}
            />

          </View>
          <View style={[styles.currentMoistureLevel, { backgroundColor: iconProps.bg }]}>
            <MaterialIcons name={iconProps.name} color={iconProps.color} size={24} />
            <Text style={[textStyles.h4, { textAlign: "center", }]} >Soil moisture: {status} </Text>
          </View>
          <View style={styles.attributeContainer}>
            <View style={styles.attributeText}>
              <Text style={[textStyles.body, { color: colors.textSecondary }]} > Sensor type:</Text>
              {sensor.sensorType ? (
                <Text style={[textStyles.bodyMedium, { color: colors.textPrimary }]} > {sensor.sensorType} sensor</Text>
              ) : (
                <Text style={[textStyles.bodyMedium, { color: colors.textPrimary }]} > -</Text>
              )}
            </View>
            <View style={styles.attributeText}>
              <Text style={[textStyles.body, { color: colors.textSecondary }]} > Moisture level:</Text>
              {sensor.interpretedMoisture ? (
                <Text style={[textStyles.bodyMedium, { color: colors.textPrimary }]} > {sensor.interpretedMoisture}</Text>
              ) : (
                <Text style={[textStyles.bodyMedium, { color: colors.textPrimary }]} > -</Text>
              )}
            </View>
            <View style={styles.attributeText}>
              <Text style={[textStyles.body, { color: colors.textSecondary }]} > Moisture percentage:</Text>
              {sensor.percentage ? (
                <Text style={[textStyles.bodyMedium, { color: colors.textPrimary }]} > {sensor.percentage}</Text>
              ) : (
                <Text style={[textStyles.bodyMedium, { color: colors.textPrimary }]} > -</Text>
              )}
            </View>
            <View style={styles.attributeText}>
              <Text style={[textStyles.body, { color: colors.textSecondary }]} > Sensor name:</Text>
              {sensor.name ? (
                <Text style={[textStyles.bodyMedium, { color: colors.textPrimary }]} > {sensor.name}</Text>
              ) : (
                <Text style={[textStyles.bodyMedium, { color: colors.textPrimary }]} > -</Text>
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
      ) : deleting ? (
        <View style={styles.loadingText}>
          <ActivityIndicator size="large" color={colors.primaryDefault} />
          <Text style={[textStyles.h4, { textAlign: "center", }]} > Deleting sensor... </Text>
        </View>
      ) : (
        <View style={styles.loadingText}>
          <ActivityIndicator size="large" color={colors.primaryDefault} />
          <Text style={[textStyles.h4, { textAlign: "center", }]} > Loading sensor... </Text>
        </View>
      )}
      <EntityEditModal
        visible={editing}
        entityName="Sensor"
        fields={[{ key: "name", label: "Name", type: "text" }, { key: "plant_id", label: "Assigned Plant", type: "userPlantSearch" }]}
        values={editValues}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={handleCancelEdit}
      />
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
    padding: 8,
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryDefault,
    width: "100%",
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
