import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
const Explore = () => {
  const { databasePlants, fetchAllPlants } = useGardensAndPlants();
  useEffect(() => {
    fetchAllPlants();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Plant Catalog</Text>
      <FlatList
        data={databasePlants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.plantName}>{item.name.commonName}</Text>
            <Text style={styles.plantDetails}>
              Scientific Name: {item.name.scientificName}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
export default Explore;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
  },
  plantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  plantDetails: {
    fontSize: 14,
    color: "#555",
  },
});