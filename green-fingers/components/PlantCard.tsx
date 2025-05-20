import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { CatalogPlant, UserPlant } from "../types/models";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { shouldBeWatered } from "@/utils/plant";

interface PlantCardProps extends React.ComponentProps<typeof TouchableOpacity> {
  plant: UserPlant | CatalogPlant;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, ...props }) => {
  const isUserPlant = "nickName" in plant;

  const thirsty = isUserPlant ? shouldBeWatered(plant as UserPlant) : false;

  const getIconProps = (): { name: keyof typeof MaterialIcons.glyphMap; color: string; message: string } => {
    if (thirsty) {
      return { name: "warning", color: colors.textWarning, message: "I'm thirsty" };
    } else {
      return { name: "check-circle", color: colors.textSuccess, message: "I'm good" };
    }
  };

  const iconProps = getIconProps();

  const primaryText = isUserPlant && plant.nickName
    ? plant.nickName
    : plant.name.commonName;

  const secondaryText = isUserPlant && plant.nickName
    ? plant.name.commonName
    : plant.name.scientificName;

  return (
    <TouchableOpacity {...props} style={styles.cardContainer}>
      <View style={styles.row}>
        <MaterialIcons name="local-florist" size={24} color={colors.primaryDefault} />
        <View style={styles.textContainer}>
          <Text style={[textStyles.h4, { color: colors.primaryDefault }]}>
            {primaryText}
          </Text>
          <Text style={[textStyles.label, { color: colors.textMuted, marginTop: -2 }]}>
            {secondaryText}
          </Text>
        </View>
        <View style={styles.spacer} />
        {isUserPlant && (
          <View style={styles.statusContainer}>
            <MaterialIcons name={iconProps.name} size={24} color={iconProps.color} />
            <Text style={textStyles.caption}>{iconProps.message}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PlantCard;


const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.bgLight,
    borderColor: colors.primaryDefault,
    borderWidth: 2,
    width: "100%",
    borderRadius: 8,
    padding: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 12,
  },
  spacer: {
    flex: 1,
  },
  statusContainer: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 4,
  },
});
