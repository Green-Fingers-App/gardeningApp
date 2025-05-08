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
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <MaterialCommunityIcons
          name="nature"
          size={24}
          color={colors.secondaryDefault}
        />
        <Text style={textStyles.h3}>{garden.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GardenCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.bgCard,
    position: "relative",
    height: 96,
    width: "100%",
    paddingLeft: 8,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
});
