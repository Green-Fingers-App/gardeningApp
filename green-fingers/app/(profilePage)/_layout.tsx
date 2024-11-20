import { Stack } from "expo-router";
import { Text } from "react-native";

import textStyles from "@/constants/textStyles";
import colors from "@/constants/colors";

const ProfileLayout = () => {
  return <Stack>
    <Stack.Screen
        name= "profilePage"
        options={{
            title: "Profile",
            headerStyle: {
                backgroundColor: colors.primaryDefault,
            },
        }}
    />
  </Stack>;
}

export default ProfileLayout;