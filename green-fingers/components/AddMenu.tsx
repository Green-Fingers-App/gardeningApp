import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddPlantOption from "@/components/AddPlantOption";
import AddGardenOption from "@/components/AddGardenOption";
import AddSensorOption from "@/components/AddSensorOption";
import Button from "@/components/Button";

type AddMenuProps = {
  visible: boolean;
  onClose: () => void;
};

const AddMenu: React.FC<AddMenuProps> = ({ visible, onClose }) => {
  const [plantChosen, setPlantChosen] = useState(false);
  const [gardenChosen, setGardenChosen] = useState(false);
  const [sensorChosen, setSensorChosen] = useState(false);

  const renderHeader = () => {
    if (plantChosen) {
      return (
        <Pressable
          onPress={() => {
            setPlantChosen(false);
          }}
        >
          <Text style={[textStyles.h3, { color: colors.bgLight }]}>
            <MaterialCommunityIcons name="arrow-left" size={20} /> Add Plant
          </Text>
        </Pressable>
      );
    }
    if (gardenChosen) {
      return (
        <Pressable
          onPress={() => {
            setGardenChosen(false);
          }}
        >
          <Text style={[textStyles.h3, { color: colors.bgLight }]}>
            <MaterialCommunityIcons name="arrow-left" size={20} /> Add Garden
          </Text>
        </Pressable>
      );
    }
    if (sensorChosen) {
      return (
        <Pressable
          onPress={() => {
            setSensorChosen(false);
          }}
        >
          <Text style={[textStyles.h3, { color: colors.bgLight }]}>
            <MaterialCommunityIcons name="arrow-left" size={20} /> Add Sensor
          </Text>
        </Pressable>
      );
    }
    return <Text style={[textStyles.h3, { color: colors.bgLight }]}>Add</Text>;
  };

  const closeAll = () => {
    setPlantChosen(false);
    setGardenChosen(false);
    setSensorChosen(false);
    onClose();
  };

  if (!visible) return null;

  return (
    <>
      <Pressable style={styles.backdrop} onPress={closeAll} />

      <View style={styles.menuContainer}>
        <View style={styles.menuHeaderContainer}>{renderHeader()}</View>

        {!plantChosen && !gardenChosen && !sensorChosen && (
          <View style={styles.optionContainer}>
            <Button
              text="Plant"
              iconName="flower"
              type="tertiary"
              onPress={() => setPlantChosen(true)}
            />
            <Button
              text="Garden"
              iconName="nature"
              type="tertiary"
              onPress={() => setGardenChosen(true)}
            />
            <Button
              text="Sensor"
              iconName="qrcode"
              type="tertiary"
              onPress={() => setSensorChosen(true)}
            />
          </View>
        )}

        {plantChosen && <AddPlantOption setPlantChosen={setPlantChosen} />}
        {gardenChosen && <AddGardenOption setGardenChosen={setGardenChosen} />}
        {sensorChosen && <AddSensorOption setSensorChosen={setSensorChosen} />}
      </View>
    </>
  );
};

export default AddMenu;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.backDrop,
    zIndex: 1,
  },
  menuContainer: {
    flexDirection: "column",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primaryDefault,
    position: "absolute",
    bottom: 120,
    width: "95%",
    margin: "2.5%",
    paddingBottom: 16,
    zIndex: 2, // über dem Backdrop
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
    gap: 16,
    padding: 8,
  },
});
