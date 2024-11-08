import { View } from "react-native";
import React, { useEffect } from "react";
import { usePlants } from "@/context/GardensAndPlantsContext";
import PlantCard from "@/components/PlantCard";

const Plants = () => {
  const { plants, error, fetchAllPlants, createPlant, removePlant } = usePlants();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlantData, setNewPlantData] = useState({
    name: "",
    type: "",
    water_frequency: "",
  });

  useEffect(() => {
    fetchAllPlants();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Plants</Text>
      <Button title="Show Add Plant Form" onPress={() => setShowAddForm(!showAddForm)} />

      {showAddForm && (
        <View style={styles.form}>
          <Text>Add a New Plant</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newPlantData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Type"
            value={newPlantData.type}
            onChangeText={(text) => handleInputChange("type", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Water Frequency"
            value={newPlantData.water_frequency}
            onChangeText={(text) => handleInputChange("water_frequency", text)}
          />
          <Button title="Add Plant" onPress={handleAddPlant} />
          <Button title="Cancel" onPress={() => setShowAddForm(false)} />
        </View>
      )}

      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <FlatList
        data={plants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.plantItem}>
            {customOrder
              .filter((key) => key in item)
              .map((key) => (
                <Text key={key}>
                  <Text style={styles.boldText}>{key}: </Text>
                  {item[key]}
                </Text>
              ))}
            <Button title="Delete Plant" onPress={() => removePlant(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  form: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  input: {
    borderBottomWidth: 1,
    marginVertical: 8,
    padding: 8,
  },
  plantItem: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default Plants;
