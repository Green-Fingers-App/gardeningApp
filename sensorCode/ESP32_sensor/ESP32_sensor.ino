#include <WiFi.h> // for ESP32
// #include <ESP8266WiFi.h> // for ESP8266
#include <WebServer.h> // for ESP32
// #include <ESP8266WebServer.h> // for ESP8266         
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <Preferences.h>

const char* ap_password = "plantsarecool";
WebServer server(80); // for ESP32
// ESP8266WebServer server(80); // for ESP8266     
Preferences preferences;

#define WIFI_RESET_PIN 0
bool wifiConnected = false;
String assignedIP = "";
bool apShutdownRequested = false;
unsigned long apShutdownTime = 0;

// --- Build dynamic SSID from SoftAP MAC ---
String buildMacBasedSSID() {
  uint8_t mac[6];
  WiFi.softAPmacAddress(mac);
  char ssid[32];
  sprintf(ssid, "GreenSensor_%02X%02X%02X", mac[3], mac[4], mac[5]);
  return String(ssid);
}

// --- Save credentials ---
void saveCredentials(const char* ssid, const char* password) {
  preferences.begin("wifi", false);
  preferences.putString("ssid", ssid);
  preferences.putString("password", password);
  preferences.end();
}

// --- Try to connect to saved WiFi ---
bool tryConnectSavedWiFi() {
  preferences.begin("wifi", true);
  String ssid = preferences.getString("ssid", "");
  String password = preferences.getString("password", "");
  preferences.end();

  if (ssid.isEmpty() || password.isEmpty()) return false;

  Serial.printf("🔄 Trying to connect to saved WiFi: %s\n", ssid.c_str());
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid.c_str(), password.c_str());

  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 15000) {
    Serial.print(".");
    delay(500);
  }

  if (WiFi.status() == WL_CONNECTED) {
    wifiConnected = true;
    assignedIP = WiFi.localIP().toString();
    Serial.println("\n✅ Connected!");
    return true;
  }

  Serial.println("\n❌ Failed to connect to saved WiFi");
  return false;
}

// --- Start fallback Access Point ---
void startAccessPoint() {
  WiFi.mode(WIFI_AP);
  WiFi.softAP("TEMP", ap_password);
  delay(100);

  String ssid = buildMacBasedSSID();
  WiFi.softAPdisconnect(true);
  delay(100);

  WiFi.softAP(ssid.c_str(), ap_password);
  Serial.printf("📡 AP started: %s\n", ssid.c_str());
  Serial.print("📍 IP: "); Serial.println(WiFi.softAPIP());
}

// --- Handle /wifi ---
void handlePostCredentials() {
  if (!server.hasArg("plain")) {
    server.send(400, "application/json", "{\"status\":\"error\",\"message\":\"Missing body\"}");
    return;
  }

  DynamicJsonDocument doc(256);
  DeserializationError error = deserializeJson(doc, server.arg("plain"));
  if (error) {
    server.send(400, "application/json", "{\"status\":\"error\",\"message\":\"Invalid JSON\"}");
    return;
  }

  const char* ssid = doc["ssid"];
  const char* password = doc["password"];
  if (!ssid || !password) {
    server.send(400, "application/json", "{\"status\":\"error\",\"message\":\"Missing ssid or password\"}");
    return;
  }

  WiFi.mode(WIFI_AP_STA);
  WiFi.begin(ssid, password);

  unsigned long startAttempt = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - startAttempt < 15000) {
    delay(500);
  }

  if (WiFi.status() == WL_CONNECTED) {
    wifiConnected = true;
    assignedIP = WiFi.localIP().toString();
    saveCredentials(ssid, password);
    server.send(200, "application/json", "{\"status\":\"connected\"}");
  } else {
    wifiConnected = false;
    assignedIP = "";
    startAccessPoint();
    server.send(500, "application/json", "{\"status\":\"failed\",\"message\":\"WiFi connection failed\"}");
  }
}

// --- Handle /status ---
void handleStatus() {
  DynamicJsonDocument doc(128);
  doc["connected"] = wifiConnected;
  doc["ip"] = assignedIP;
  String response;
  serializeJson(doc, response);
  server.send(200, "application/json", response);
}

// --- Handle /assign ---
void handleAssignSensor() {
  if (!server.hasArg("plain")) {
    server.send(400, "application/json", "{\"status\":\"error\",\"message\":\"Missing body\"}");
    return;
  }

  DynamicJsonDocument doc(512);
  DeserializationError error = deserializeJson(doc, server.arg("plain"));
  if (error) {
    server.send(400, "application/json", "{\"status\":\"error\",\"message\":\"Invalid JSON\"}");
    return;
  }

  const char* name = doc["name"];
  int userId = doc["userId"];
  int plantId = doc["plantId"];
  if (!name || !userId || !plantId) {
    server.send(400, "application/json", "{\"status\":\"error\",\"message\":\"Missing name, userId or plantId\"}");
    return;
  }

  DynamicJsonDocument payload(512);
  payload["name"] = name;
  payload["user_id"] = userId;
  payload["plant_id"] = plantId;
  String jsonPayload;
  serializeJson(payload, jsonPayload);

  HTTPClient http;
  http.begin("https://greenfingers.truenas.work/api/sensor/pair");
  http.addHeader("Content-Type", "application/json");

  int httpCode = http.POST(jsonPayload);
  String response = http.getString();

  if (httpCode == 200 || httpCode == 201) {
    server.send(200, "application/json", "{\"status\":\"success\",\"message\":\"Sensor paired with backend\"}");
    apShutdownRequested = true;
    apShutdownTime = millis() + 3000;
  } else {
    server.send(500, "application/json", "{\"status\":\"error\",\"message\":\"Backend pairing failed\"}");
  }

  http.end();
}

// --- Handle delet wifi credentials ---
void handleWiFiResetButton() {
  static unsigned long pressStart = 0;
  static bool wasLow = false;

  if (digitalRead(WIFI_RESET_PIN) == LOW) {
    if (!wasLow) {
      pressStart = millis();
      wasLow = true;
    } else if (millis() - pressStart > 2000) {
      Serial.println("🧹 Button held for 2s — clearing WiFi credentials...");
      preferences.begin("wifi", false);
      preferences.clear();
      preferences.end();
      delay(500);
      Serial.println("🔄 Restarting...");
      ESP.restart();
    }
  } else {
    wasLow = false;
  }
}


// --- Setup ---
void setup() {
  Serial.begin(115200);
  delay(500);

  pinMode(WIFI_RESET_PIN, INPUT_PULLUP);

  if (!tryConnectSavedWiFi()) {
    startAccessPoint();
  }

  server.on("/wifi", HTTP_POST, handlePostCredentials);
  server.on("/status", HTTP_GET, handleStatus);
  server.on("/assign", HTTP_POST, handleAssignSensor);
  server.begin();
  Serial.println("🌐 WebServer started");
}

// --- Loop ---
void loop() {
  server.handleClient();

  handleWiFiResetButton();

  if (apShutdownRequested && millis() > apShutdownTime) {
    WiFi.softAPdisconnect(true);
    WiFi.mode(WIFI_STA);
    Serial.println("🛑 Access Point shut down after delay.");
    apShutdownRequested = false;
  }
}
