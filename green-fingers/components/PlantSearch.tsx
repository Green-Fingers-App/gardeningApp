import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { CatalogPlant } from "@/types/models";
import Input from "@/components/Input";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";

interface PlantSearchProps {
    onSelectPlant: (plant: CatalogPlant) => void;
  }
  
  const PlantSearch: React.FC<PlantSearchProps> = ({ onSelectPlant }) => {
    const { fetchPlantsByCommonName } = useGardensAndPlants();
    const [input, setInput] = useState<string>("");
    const [suggestions, setSuggestions] = useState<CatalogPlant[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
  
    const handleSearch = async (text: string) => {
      setInput(text);
  
      if (text.trim().length > 0) {
        setShowDropdown(true);
        const results = await fetchPlantsByCommonName(text);
        setSuggestions(results);
      } else {
        setShowDropdown(false);
        setSuggestions([]);
      }
    };
  
    const handleSelectPlant = (plant: CatalogPlant) => {
      onSelectPlant(plant);
      setInput(plant.name.commonName);
      setShowDropdown(false);
    };
  
    return (
      <View style={styles.container}>
        <Input
          label="Search for a plant species"
          value={input}
          onChangeText={handleSearch}
          iconName="magnify"
          iconSize={20}
          placeholder="Enter plant name"
        />
        {showDropdown && suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelectPlant(item)}
                style={styles.suggestionContainer}
              >
                <Text style={styles.suggestionText}>{item.name.commonName}</Text>
                {item.name.scientificName && (
                  <Text style={styles.scientificNameText}>
                    {item.name.scientificName}
                  </Text>
                )}
              </TouchableOpacity>
            )}
            style={styles.suggestionList}
          />
        )}
        {showDropdown && suggestions.length === 0 && input.trim().length > 0 && (
          <Text style={styles.noResultsText}>No plants found.</Text>
        )}
      </View>
    );
  };
  
  export default PlantSearch;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  suggestionList: {
    marginTop: 0,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderColor: colors.textSecondary,
    borderWidth: 1,
    maxHeight: 200,
  },
  suggestionContainer: {
    padding: 10,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  suggestionText: {
    ...textStyles.body,
    color: colors.textPrimary,
  },
  scientificNameText: {
    ...textStyles.caption,
    color: colors.textMuted,
  },
  noResultsText: {
    marginTop: 10,
    ...textStyles.caption,
    color: colors.textMuted,
    textAlign: "center",
  },
});