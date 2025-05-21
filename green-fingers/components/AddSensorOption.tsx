import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Platform, PermissionsAndroid } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import WifiManager from "react-native-wifi-reborn";
import Button from "./Button";
import SendWifiCredentialsForm from "./SendWifiCredentialsForm";
import AssignSensorForm from "./AssignSensorForm";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import colors from "@/constants/colors";


interface AddSensorOptionProps {
  sensorChosen: boolean;
  toggleSensorMenu: () => void;
  setSensorChosen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddSensorOption: React.FC<AddSensorOptionProps> = ({ setSensorChosen }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [foundSensor, setFoundSensor] = useState<{ ssid: string; password: string; ip: string } | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [connectedToSensor, setConnectedToSensor] = useState(false);
  const [sensorIP, setSensorIP] = useState<string | null>(null);
  const [wifiConfigured, setWifiConfigured] = useState(false);
  const [assigning, setAssigning] = useState(false);

  const { showToast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (permission?.status !== "granted") {
      requestPermission();
    }
  }, [permission]);

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    try {
      const parsed = JSON.parse(data);
      if (parsed?.ssid && parsed?.password && parsed?.ip) {
        setFoundSensor({ ssid: parsed.ssid, password: parsed.password, ip: parsed.ip });
      } else {
        showToast("error", "Invalid QR code");
        setScanned(false);
      }
    } catch (error) {
      showToast("error", "Failed to parse QR code infos");
      setScanned(false);
    }
  };


  const connectToSensor = async (ssid: string, password: string, ip: string) => {
    setConnecting(true);
    try {
      if (Platform.OS === "android" && Platform.Version >= 29) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location permission required",
            message: "WiFi connection requires location access",
            buttonPositive: "OK",
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          showToast("warning", "Location permission is required.");
          setConnecting(false);
          return;
        }
      }



      await WifiManager.connectToProtectedSSID(ssid, password, true, false);
      setSensorIP(ip);
      setConnectedToSensor(true);
    } catch (error) {
      showToast("error", "Failed to connect to sensor");
      setScanned(false);
    } finally {
      setConnecting(false);

    }
  };


  if (foundSensor && !connectedToSensor) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Sensor Found</Text>
        <Text>SSID: {foundSensor.ssid}</Text>
        <Text>IP: {foundSensor.ip}</Text>
        <View style={{ flexDirection: "column", gap: 8, marginTop: 16 }}>
          <Button
            text={connecting ? "Connecting..." : "Connect"}
            onPress={() => {
              if (!connecting) {
                void connectToSensor(foundSensor.ssid, foundSensor.password, foundSensor.ip);
              }
            }}
            buttonState={connecting ? "loading" : "default"}
          />
          <Button
            text="Cancel"
            type="secondary"
            onPress={() => {
              setFoundSensor(null);
              setScanned(false);
            }}
            buttonState={connecting ? "disabled" : "default"}
          />
        </View>
      </View>
    );
  }

  if (!permission?.granted) {
    return <Text style={{ padding: 16 }}>Camera permission is required</Text>;
  }

  if (connectedToSensor && sensorIP && !wifiConfigured) {
    return <SendWifiCredentialsForm sensorIP={sensorIP} onFinish={() => setWifiConfigured(true)} />;
  }

  if (connectedToSensor && sensorIP && wifiConfigured) {
    return (
      <AssignSensorForm
        loading={assigning}
        onSubmit={async (sensorName, plantId) => {
          if (!user?.id) return;
          setAssigning(true);
          try {
            const res = await fetch(`http://${sensorIP}/assign`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId: user.id, name: sensorName, plantId }),
            });

            if (res.ok) {
              showToast("success", "Sensor assigned successfully!");
              setSensorChosen(false);
              setSensorIP(null);
              setConnectedToSensor(false);
              setWifiConfigured(false);
            } else {
              showToast("error", `Sensor responded with ${res.status}`);
            }
          } catch (err) {
            showToast("error", "Failed to assign sensor");
          } finally {
            setAssigning(false);
          }
        }}
        onCancel={() => setWifiConfigured(false)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Scan Sensor QR Code</Text>
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        />
      </View>
      {scanned && (
        <View style={{ marginTop: 12 }}>
          <Button text="Scan Again" type="secondary" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
};

export default AddSensorOption;

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cameraContainer: {
    height: 250,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.primaryDefault,
  },
  camera: {
    flex: 1,
  },
});
