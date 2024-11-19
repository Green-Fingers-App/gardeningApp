import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "@/constants/colors";
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
      onPress={() => router.push(`/profile/gardens/${garden.id}`)}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="nature"
          size={20}
          color={colors.secondaryDefault}
        />
        <Text style={styles.title}>{garden.location}</Text>
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
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
