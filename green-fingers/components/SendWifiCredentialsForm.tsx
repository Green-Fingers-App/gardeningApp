import React, { useEffect, useState } from "react";
import { View, Alert, StyleSheet, Platform, PermissionsAndroid } from "react-native";
import WifiManager from "react-native-wifi-reborn";
import SSIDSearch from "./SSIDSearch";
import Input from "@/components/Input";
import Button from "@/components/Button";


interface Props {
  sensorIP: string;
  onFinish: () => void;
}

const SendWifiCredentialsForm: React.FC<Props> = ({ sensorIP, onFinish }) => {
  const [ssidList, setSsidList] = useState<string[]>([]);
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestPermissionAndScan = async () => {
      if (Platform.OS === "android" && Platform.Version >= 29) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Permission Denied", "Location permission is required to list WiFi networks.");
          return;
        }
      }

      try {
        const results = await WifiManager.loadWifiList();
        const ssids = results.map((net: any) => net.SSID).filter(Boolean);
        setSsidList(ssids);
      } catch (error) {
        console.error("WiFi scan error:", error);
      }
    };

    requestPermissionAndScan();
  }, []);

  const handleSubmit = async () => {
    if (!ssid || !password) {
      Alert.alert("Missing Fields", "Please enter SSID and password.");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending to:", `http://${sensorIP}/wifi`, "Body:", { ssid, password });
      const res = await fetch(`http://${sensorIP}/wifi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ssid, password }),
      });

      const text = await res.text();
      console.log("Sensor response:", text);


      if (res.ok) {
        Alert.alert("Credentials sent", "Sensor will try to connect now...");
        await waitForSensorConnection();
      } else {
        Alert.alert("Error", `Sensor responded with status ${res.status}`);
      }

    } catch (error) {
      console.error("Credential send error:", error);
      Alert.alert("Network Error:", `Submitting credentials failed to http://${sensorIP}/wifi`);
    } finally {
      setLoading(false);
    }
  };


  const waitForSensorConnection = async () => {
    console.log("⏳ Waiting for sensor to connect to WiFi...");

    const maxRetries = 15;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const res = await fetch(`http://${sensorIP}/status`);
        if (res.ok) {
          const data = await res.json();
          if (data.connected && data.ip) {
            console.log("✅ Sensor connected to WiFi!", data);
            Alert.alert("Sensor Online", `Connected IP: ${data.ip}`);
            onFinish(); // <-- Jetzt erst zurück zur UI
            return;
          }
        }
      } catch (e) {
        console.log(`Polling attempt ${attempt + 1} failed`);
      }

      await new Promise(resolve => setTimeout(resolve, 1000)); // wait 1s
    }

    Alert.alert("Timeout", "Sensor did not confirm WiFi connection in time.");
  };

  return (
    <View style={styles.container}>
      <SSIDSearch onSelectSSID={(value) => setSsid(value)} />
      <Input
        label="WiFi Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        password
      />
      <Button
        text={loading ? "Sending..." : "Send to Sensor"}
        onPress={handleSubmit}
        buttonState={loading ? "disabled" : "default"}
      />
    </View>
  );
};

export default SendWifiCredentialsForm;

const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 16,
  },
});
