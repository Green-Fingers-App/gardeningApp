import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Garden } from "@/types/models";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

interface GardenCardProps {
  garden: Garden;
}

const GardenCard: React.FC<GardenCardProps> = ({ garden }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        router.push(`/profile/gardens/${garden.id}`);
      }}
    >
      <View style={styles.row}>
        <MaterialCommunityIcons
          name="nature"
          size={24}
          color={colors.primaryDefault}
        />
        <View style={styles.textContainer}>
          <Text style={[textStyles.h4, { color: colors.primaryDefault }]}>{garden.name}</Text>
          <Text style={[textStyles.label, { color: colors.textMuted, marginTop: -2 }]}>
            {`${garden.location}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GardenCard;

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
});
