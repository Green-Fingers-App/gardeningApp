import React, { useState } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import Input from "@/components/Input";
import DropDown from "@/components/DropDown";
import Button from "@/components/Button";
import textStyles from "@/constants/textStyles";
import colors from "@/constants/colors";

type EntityEditModalProps = {
  visible: boolean;
  entityName: string;
  fields: Array<{
    key: string;
    label: string;
    type: "text" | "dropdown";
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
  }>;
  values: { [key: string]: string };
  onChange: (key: string, value: string) => void;
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
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={textStyles.h1}>Edit {entityName}</Text>
        {fields.map((field) => {
          if (field.type === "text") {
            return (
              <Input
                key={field.key}
                label={field.label}
                value={values[field.key] || ""}
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
          return null;
        })}
        <Button text="Save" iconName="floppy" onPress={onSave} />
        <Button
          text="Cancel"
          iconName="close"
          onPress={onCancel}
          type="secondary"
        />
      </View>
    </Modal>
  );
};

export default EntityEditModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: "95%",
    marginHorizontal: "2.5%",
    backgroundColor: colors.bgLight,
  },
});
