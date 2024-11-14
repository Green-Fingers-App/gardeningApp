import { View, Text, Pressable, StyleSheet, Animated } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";

const DropDown = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { gardens } = useGardensAndPlants();
  const [selectedGarden, setSelectedGarden] = useState<string | undefined>(
    undefined
  );
  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    Animated.timing(slideAnim, {
      toValue: menuOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const animatedHeight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, gardens.length * 40],
  });

  return (
    <View style={styles.dropDownContainer}>
      <Pressable
        onPress={toggleMenu}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 18 }}>
          {selectedGarden ? selectedGarden : "Select Garden"}
        </Text>
        <MaterialCommunityIcons
          name={!menuOpen ? "menu-left" : "menu-down"}
          size={25}
        />
      </Pressable>
      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        {menuOpen &&
          gardens.map((garden) => (
            <Pressable
              key={garden.location}
              onPress={() => {
                setSelectedGarden(garden.location);
                toggleMenu();
              }}
            >
              <Text style={styles.gardenText}>{garden.location}</Text>
            </Pressable>
          ))}
      </Animated.View>
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropDownContainer: {
    width: "100%",
    borderColor: "black",
    borderWidth: 0.5,
    padding: 8,
    borderRadius: 8,
  },
  gardenText: {
    padding: 8,
    fontSize: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
});
