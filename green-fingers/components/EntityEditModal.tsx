import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Input from "@/components/Input";
import DropDown from "@/components/DropDown";
import Button from "@/components/Button";
import textStyles from "@/constants/textStyles";
import colors from "@/constants/colors";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { UserPlant } from "@/types/models";

type EntityEditModalProps = {
  visible: boolean;
  entityName: string;
  fields: Array<{
    key: string;
    label: string;
    type: "text" | "dropdown" | "userPlantSearch";
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
  }>;
  values: { [key: string]: string | number };
  onChange: (key: string, value: string | number) => void;
  onSave: () => void;
  onCancel: () => void;
};

const EntityEditModal: React.FC<EntityEditModalProps> = ({
  visible,
  entityName,
  fields,
  values,
  onChange,
  onSave,
  onCancel,
}) => {
  const { plants: contextPlants } = useGardensAndPlants();
  const [plants, setPlants] = useState<UserPlant[]>([]);

  useEffect(() => {
    setPlants(contextPlants);
  }, [contextPlants]);

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.backdrop}>
          <View style={styles.modalContainer}>
            <Text style={textStyles.h3}>Edit {entityName}</Text>

            {fields.map((field) => {
              if (field.type === "text") {
                return (
                  <Input
                    key={field.key}
                    label={field.label}
                    value={String(values[field.key] ?? "")}
                    onChangeText={(text) => onChange(field.key, text)}
                  />
                );
              }

              if (field.type === "dropdown" && field.options) {
                return (
                  <DropDown
                    key={field.key}
                    label={field.label}
                    placeholder={field.placeholder || ""}
                    options={field.options.map((option) => ({
                      ...option,
                      value: parseFloat(option.value),
                    }))}
                    onSelect={(value) => onChange(field.key, value.toString())}
                  />
                );
              }

              if (field.type === "userPlantSearch") {
                return (
                  <DropDown
                    key={field.key}
                    label={field.label}
                    placeholder={field.placeholder || "Select a plant"}
                    options={plants.map((plant) => ({
                      label: plant.nickName,
                      value: plant.id,
                    }))}
                    onSelect={(value) => onChange(field.key, value)}
                  />
                );
              }

              return null;
            })}

            <Button text="Save" iconName="floppy" onPress={onSave} />
            <Button text="Cancel" iconName="close" onPress={onCancel} type="secondary" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EntityEditModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // halbtransparenter Hintergrund
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContainer: {
    width: "100%",
    borderRadius: 12,
    padding: 16,
    gap: 8,
    backgroundColor: colors.bgLight,
    elevation: 5,
  },
});
