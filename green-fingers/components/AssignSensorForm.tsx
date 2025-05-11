import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import DropDown from "@/components/DropDown";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { UserPlant } from "@/types/models";

interface AssignSensorProps {
  onSubmit: (sensorName: string, plantId: number) => void;
  onCancel: () => void;
  loading?: boolean;
}

const AssignSensorForm: React.FC<AssignSensorProps> = ({ onSubmit, onCancel, loading }) => {
  const { plants: contextPlants } = useGardensAndPlants();
  const [plants, setPlants] = useState<UserPlant[]>([]);
  const [sensorName, setSensorName] = useState("");
  const [selectedPlantId, setSelectedPlantId] = useState<number | null>(null);

  useEffect(() => {
    setPlants(contextPlants);
  }, [contextPlants]);

  const handleSubmit = () => {
    const trimmed = sensorName.trim();
    if (trimmed && selectedPlantId !== null) {
      onSubmit(trimmed, selectedPlantId);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Sensor Name"
        placeholder="Enter sensor name"
        value={sensorName}
        onChangeText={setSensorName}
      />

      <DropDown
        label="Assign to Plant"
        placeholder="Select plant"
        options={plants.map((plant) => ({
          label: plant.nickName,
          value: plant.id,
        }))}
        onSelect={setSelectedPlantId}
      />

      <View style={styles.buttons}>
        <Button
          text="Assign Sensor"
          onPress={handleSubmit}
          buttonState={loading ? "loading" : "default"}
        />
        <Button
          text="Cancel"
          type="secondary"
          onPress={onCancel}
          buttonState={loading ? "disabled" : "default"}
        />
      </View>
    </View>
  );
};

export default AssignSensorForm;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  buttons: {
    marginTop: 16,
    gap: 8,
  },
});
