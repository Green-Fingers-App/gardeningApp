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
import { useToast } from "@/context/ToastContext";

interface WifiNetwork {
  SSID: string;
  frequency: number;
  [key: string]: any;
}

interface SSIDSearchProps {
  onSelectSSID: (ssid: string) => void;
}

const SSIDSearch: React.FC<SSIDSearchProps> = ({ onSelectSSID }) => {
  const [input, setInput] = useState("");
  const [availableSSIDs, setAvailableSSIDs] = useState<WifiNetwork[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const scanNetworks = async () => {
      if (Platform.OS === "android" && Platform.Version >= 29) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
      }

      try {
        const results: WifiNetwork[] = await WifiManager.loadWifiList();
        const unique = new Map<string, WifiNetwork>();

        results.forEach((net) => {
          if (net.SSID) {
            unique.set(net.SSID, {
              SSID: net.SSID,
              frequency: net.frequency,
            });
          }
        });

        setAvailableSSIDs(Array.from(unique.values()));
      } catch (err) {
        showToast("error", "Scan for local WiFis failed");
      }
    };

    void scanNetworks();
  }, []);

  const filtered = input.trim().length > 0
    ? availableSSIDs.filter((net) =>
      net.SSID.toLowerCase().includes(input.toLowerCase())
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
          keyExtractor={(item) => item.SSID}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => { handleSelectSSID(item.SSID); }}
              style={styles.suggestionContainer}
            >
              <Text style={styles.suggestionText}>
                {item.SSID} ({item.frequency < 3000 ? "2.4GHz" : "5GHz"})
              </Text>
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
