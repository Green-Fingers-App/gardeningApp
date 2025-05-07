import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert, Button as RNButton, Platform, PermissionsAndroid } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import WifiManager from "react-native-wifi-reborn";
import SendWifiCredentialsForm from "./SendWifiCredentialsForm";
import { useToast } from "@/context/ToastContext";
import colors from "@/constants/colors";

interface AddSensorOptionProps {
  sensorChosen: boolean;
  toggleSensorMenu: () => void;
  setSensorChosen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddSensorOption: React.FC<AddSensorOptionProps> = ({
  setSensorChosen,
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const [connectedToSensor, setConnectedToSensor] = useState(false);
  const [sensorIP, setSensorIP] = useState<string | null>(null);

  const { showToast } = useToast();

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

        Alert.alert("Sensor Found", `SSID: ${parsed.ssid}`, [
          {
            text: "Connect",
            onPress: () => {
              connectToSensor(parsed.ssid, parsed.password, parsed.ip);
            },
          },
          { text: "Cancel", onPress: () => setScanned(false), style: "cancel" },
        ]);

      } else {
        Alert.alert("Invalid QR", "Missing ssid or ip.");
        setScanned(false);
      }
    } catch (error) {
      console.error("QR parse error:", error, data);
      Alert.alert("Scan Error", `Failed to parse QR code:\n${data}`);
      setScanned(false);
    }
  };


  const connectToSensor = async (ssid: string, password: string, ip: string) => {
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
          Alert.alert("Permission Denied", "Location permission is required.");
          return;
        }
      }

      await WifiManager.connectToProtectedSSID(ssid, password, true, false);
      await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds for handshake
      setSensorIP(ip);
      setConnectedToSensor(true);
    } catch (error) {
      showToast("error", "Failed to connect to sensor");
      setScanned(false);
    }
  };

  if (!permission?.granted) {
    return <Text style={{ padding: 16 }}>Camera permission is required</Text>;
  }


  if (connectedToSensor && sensorIP) {
    return (
      <SendWifiCredentialsForm
        sensorIP={sensorIP}
        onFinish={() => {
          setSensorIP(null);
          setConnectedToSensor(false);
          setSensorChosen(false);
        }}
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
          <RNButton title="Scan Again" onPress={() => setScanned(false)} />
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
