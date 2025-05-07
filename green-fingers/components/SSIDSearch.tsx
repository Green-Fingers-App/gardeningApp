import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from "react-native";
import WifiManager from "react-native-wifi-reborn";
import Input from "@/components/Input";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";

interface SSIDSearchProps {
  onSelectSSID: (ssid: string) => void;
}

const SSIDSearch: React.FC<SSIDSearchProps> = ({ onSelectSSID }) => {
  const [input, setInput] = useState("");
  const [availableSSIDs, setAvailableSSIDs] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const scanNetworks = async () => {
    try {
      if (Platform.OS === "android" && Platform.Version >= 29) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          return;
        }
      }

      const results = await WifiManager.loadWifiList();
      const ssids = results.map((entry) => entry.SSID).filter(Boolean);
      setAvailableSSIDs(ssids);
    } catch (err) {
      console.error("WiFi list scan failed", err);
    }
  };

  useEffect(() => {
    scanNetworks();
  }, []);

  const filtered = input.trim().length > 0
    ? availableSSIDs.filter((ssid) =>
      ssid.toLowerCase().includes(input.toLowerCase())
    )
    : availableSSIDs;

  const handleSelectSSID = (ssid: string) => {
    setInput(ssid);
    setShowDropdown(false);
    onSelectSSID(ssid);
  };

  return (
    <View style={styles.container}>
      <Input
        label="Select Wi-Fi Network"
        value={input}
        onChangeText={(text) => {
          setInput(text);
          setShowDropdown(true);
        }}
        iconName="wifi"
        iconSize={20}
        placeholder="Enter or select SSID"
      />
      {showDropdown && filtered.length > 0 && (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectSSID(item)}
              style={styles.suggestionContainer}
            >
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionList}
        />
      )}
    </View>
  );
};

export default SSIDSearch;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  suggestionList: {
    marginTop: 0,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderColor: colors.textSecondary,
    borderWidth: 1,
    maxHeight: 200,
  },
  suggestionContainer: {
    padding: 10,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  suggestionText: {
    ...textStyles.body,
    color: colors.textPrimary,
  },
});
