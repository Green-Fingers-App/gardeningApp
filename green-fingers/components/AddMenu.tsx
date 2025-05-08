import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddPlantOption from "@/components/AddPlantOption";
import AddGardenOption from "@/components/AddGardenOption";
import Button from "@/components/Button";

const AddMenu = () => {
  const [plantChosen, setPlantChosen] = useState(false);
  const [gardenChosen, setGardenChosen] = useState(false);
  const togglePlantMenu = () => {
    setPlantChosen(!plantChosen);
  };
  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuHeaderContainer}>
        <Text style={textStyles.h3}>
          {plantChosen ? (
            <Pressable
              onPress={() => {
                setPlantChosen(false);
              }}
            >
              <Text style={textStyles.h3}>
                <MaterialCommunityIcons name="arrow-left" size={20} /> Add Plant
              </Text>
            </Pressable>
          ) : (
            "Add"
          )}
        </Text>
      </View>
      {!plantChosen && !gardenChosen && (
        <View style={styles.optionContainer}>
          <Button
            text="Plant"
            iconName="flower"
            type="tertiary"
            onPress={togglePlantMenu}
          />
          <Button
            text="Garden"
            iconName="nature"
            type="tertiary"
            onPress={() => {
              setGardenChosen(true);
            }}
          />
        </View>
      )}
      {plantChosen && (
        <AddPlantOption
          plantChosen={plantChosen}
          togglePlantMenu={togglePlantMenu}
          setPlantChosen={setPlantChosen}
        />
      )}
      {gardenChosen && (
        <AddGardenOption
          gardenChosen={gardenChosen}
          toggleGardenMenu={() => {
            setGardenChosen(false);
          }}
          setGardenChosen={setGardenChosen}
        />
      )}
    </View>
  );
};

export default AddMenu;

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "column",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    position: "absolute",
    bottom: 70,
    width: "95%",
    margin: "2.5%",
    paddingBottom: 16,
  },
  menuHeaderContainer: {
    backgroundColor: colors.primaryDefault,
    width: "100%",
    padding: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.bgLight,
  },
  optionContainer: {
    flexDirection: "column",
    gap: 8,
    padding: 8,
  },
  menuOption: {
    padding: 8,
    fontSize: 18,
    color: colors.textPrimary,
  },
});
