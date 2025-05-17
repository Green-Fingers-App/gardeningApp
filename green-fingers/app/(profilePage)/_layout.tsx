import { Stack } from "expo-router";
import colors from "@/constants/colors";

const ProfileLayout = () => {
    return <Stack>
        <Stack.Screen
            name="profilePage"
            options={{
                title: "Profile",
                headerStyle: {
                    backgroundColor: colors.primaryDefault,
                },
                headerTintColor: colors.bgLight,
            }}
        />
    </Stack>;
}

export default ProfileLayout;
