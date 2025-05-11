import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import SSIDSearch from "./SSIDSearch";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useToast } from "@/context/ToastContext";

interface Props {
  sensorIP: string;
  onFinish: () => void;
}

const SendWifiCredentialsForm: React.FC<Props> = ({ sensorIP, onFinish }) => {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async () => {
    if (!ssid || !password) {
      showToast("warning", "Please enter both SSID and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://${sensorIP}/wifi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ssid, password }),
      });

      const text = await res.text();
      console.log("Sensor response:", text);

      if (res.ok) {
        showToast("success", "Credentials sent. Sensor will try to connect...");
        await waitForSensorConnection();
      } else {
        showToast("error", `Sensor responded with status ${res.status}`);
      }
    } catch (error) {
      console.error("Credential send error:", error);
      showToast("error", "Failed to send credentials to the sensor");
    } finally {
      setLoading(false);
    }
  };

  const waitForSensorConnection = async () => {
    const maxRetries = 15;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const res = await fetch(`http://${sensorIP}/status`);
        if (res.ok) {
          const data = await res.json();
          if (data.connected && data.ip) {
            showToast("success", `Sensor connected. IP: ${data.ip}`);
            onFinish();
            return;
          }
        }
      } catch { }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    showToast("error", "Sensor did not confirm WiFi connection in time.");
  };

  return (
    <View style={styles.container}>
      <SSIDSearch onSelectSSID={setSsid} />
      <Input
        label="WiFi Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        password
      />
      <Button
        text="Send to Sensor"
        onPress={handleSubmit}
        buttonState={loading ? "loading" : "default"}
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
