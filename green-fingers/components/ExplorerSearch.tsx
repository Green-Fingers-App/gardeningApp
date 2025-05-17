import { StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { CatalogPlant } from "@/types/models";
import Input from "./Input";
import colors from "@/constants/colors";

interface ExplorerSearchProps {
  filteredPlants: CatalogPlant[];
  plants: CatalogPlant[];
  setFilteredPlants: React.Dispatch<React.SetStateAction<CatalogPlant[]>>;
}

const ExplorerSearch: React.FC<ExplorerSearchProps> = ({
  plants,
  setFilteredPlants,
}) => {
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSearch = (text: string) => {
    setError(undefined);
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      const filteredPlants = plants.filter((plant) =>
        plant.name.commonName.toLowerCase().includes(text.toLowerCase())
      );

      setFilteredPlants(filteredPlants);

      if (text.trim().length > 0 && filteredPlants.length === 0) {
        setError("No plants found");
      }
    }, 500);
  };

  return (
    <View style={styles.componentContainer}>
      <Input
        label="Search a plant"
        onChangeText={(text) => {
          handleSearch(text);
        }}
        iconName="magnify"
        style={{ margin: 10 }}
        error={error}
      />
    </View>
  );
};

export default ExplorerSearch;

const styles = StyleSheet.create({
  componentContainer: {
    width: "100%",
  },
});
