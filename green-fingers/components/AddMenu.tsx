import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddPlantOption from "@/components/AddPlantOption";
import AddGardenOption from "@/components/AddGardenOption";
import AddSensorOption from "@/components/AddSensorOption";
import Button from "@/components/Button";

const AddMenu = () => {
  const [plantChosen, setPlantChosen] = useState(false);
  const [gardenChosen, setGardenChosen] = useState(false);
  const [sensorChosen, setSensorChosen] = useState(false);

  const togglePlantMenu = () => setPlantChosen(!plantChosen);

  const renderHeader = () => {
    if (plantChosen) {
      return (
        <Pressable onPress={() => { setPlantChosen(false); }}>
          <Text style={textStyles.h3}>
            <MaterialCommunityIcons name="arrow-left" size={20} /> Add Plant
          </Text>
        </Pressable>
      );
    }
    if (gardenChosen) {
      return (
        <Pressable onPress={() => { setGardenChosen(false); }}>
          <Text style={textStyles.h3}>
            <MaterialCommunityIcons name="arrow-left" size={20} /> Add Garden
          </Text>
        </Pressable>
      );
    }
    if (sensorChosen) {
      return (
        <Pressable onPress={() => { setSensorChosen(false); }}>
          <Text style={textStyles.h3}>
            <MaterialCommunityIcons name="arrow-left" size={20} /> Add Sensor
          </Text>
        </Pressable>
      );
    }
    return <Text style={textStyles.h3}>Add</Text>;
  };

  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuHeaderContainer}>{renderHeader()}</View>

      {!plantChosen && !gardenChosen && !sensorChosen && (
        <View style={styles.optionContainer}>
          <Button
            text="Plant"
            iconName="flower"
            type="tertiary"
            onPress={() => { setPlantChosen(true); }}
          />
          <Button
            text="Garden"
            iconName="nature"
            type="tertiary"
            onPress={() => { setGardenChosen(true); }}
          />
          <Button
            text="Sensor"
            iconName="qrcode"
            type="tertiary"
            onPress={() => { setSensorChosen(true); }}
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
          toggleGardenMenu={() => { setGardenChosen(false); }}
          setGardenChosen={setGardenChosen}
        />
      )}

      {sensorChosen && (
        <AddSensorOption
          sensorChosen={sensorChosen}
          toggleSensorMenu={() => { setSensorChosen(false); }}
          setSensorChosen={setSensorChosen}
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
  optionContainer: {
    flexDirection: "column",
    gap: 8,
    padding: 8,
  },
});
