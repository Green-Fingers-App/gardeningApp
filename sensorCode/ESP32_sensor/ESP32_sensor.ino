// #include <ESP8266WiFi.h>
#include <WiFi.h> // ESP32
// #include <ESP8266WebServer.h>
#include <WebServer.h> // ESP32
#include <ArduinoJson.h>
// #include <ESP8266HTTPClient.h>
#include <HTTPClient.h> // ESP32
#include <LittleFS.h>
#include <WiFiClientSecure.h>
#include <Preferences.h> // ESP32


Preferences preferences; // For ESP32

const char* ap_password = "plantsarecool";
// ESP8266WebServer server(80);  // Correct type for ESP8266
WebServer server(80);

// #define WIFI_RESET_PIN 2
#define WIFI_RESET_PIN 0 // ESP32
bool wifiConnected = false;
String assignedIP = "";
bool apShutdownRequested = false;
unsigned long apShutdownTime = 0;

// #define MOISTURE_PIN A0// moisture sensor analog pin
#define MOISTURE_PIN 34 // ESP32

int readMoisture() {
  int value = analogRead(MOISTURE_PIN);
  Serial.println("🌱 Moisture reading: " + String(value));
  return value;
}  

unsigned long lastMoistureSent = 0;
const unsigned long moistureInterval = 30000;  // 30 seconds

String accessToken = "";
String refreshToken = "";
int sensorId = -1;

// --- Save credentials using LittleFS ---
void saveCredentials(const char* ssid, const char* password) {
  DynamicJsonDocument doc(256);
  doc["ssid"] = ssid;
  doc["password"] = password;

  File file = LittleFS.open("/wifi.json", "w");
  if (file) {
    serializeJson(doc, file);
    file.close();
    Serial.println("💾 WiFi credentials saved");
  } else {
    Serial.println("❌ Failed to open file for writing");
  }
}

// --- Try to connect to saved WiFi ---
bool tryConnectSavedWiFi() {
  if (!LittleFS.exists("/wifi.json")) return false;

  File file = LittleFS.open("/wifi.json", "r");
  if (!file) return false;

  DynamicJsonDocument doc(256);
  DeserializationError error = deserializeJson(doc, file);
  file.close();
  if (error) return false;

  String ssid = doc["ssid"];
  String password = doc["password"];

  if (ssid.isEmpty() || password.isEmpty()) return false;

  Serial.printf("🔄 Trying to connect to saved WiFi: %s\n", ssid.c_str());
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid.c_str(), password.c_str());

  unsigned long start = millis();
  while (WiFi.waitForConnectResult() != WL_CONNECTED && millis() - start < 15000) {
    Serial.print(".");
    delay(500);
  }

  if (WiFi.waitForConnectResult() == WL_CONNECTED) {
    wifiConnected = true;
    assignedIP = WiFi.localIP().toString();
    Serial.println("\n✅ Connected!");
    Serial.print("📶 Assigned IP: ");
    Serial.println(WiFi.localIP());
    return true;
  }
  Serial.print("📶 Assigned IP: ");
  Serial.println(WiFi.localIP());
  Serial.println("\n❌ Failed to connect to saved WiFi");
  return false;
}

// --- Build dynamic SSID from SoftAP MAC ---
String buildMacBasedSSID() {
  WiFi.softAP("dummy", "dummy123");
  delay(100);

  uint8_t mac[6];
  WiFi.softAPmacAddress(mac);

  char ssid[32];
  sprintf(ssid, "GreenSensor_%02X%02X%02X", mac[3], mac[4], mac[5]);

  WiFi.softAPdisconnect(true);
  delay(100);

  return String(ssid);
}


// --- Start fallback Access Point ---
void startAccessPoint() {
  WiFi.mode(WIFI_AP);
  String ssid = buildMacBasedSSID();
  WiFi.softAP(ssid.c_str(), ap_password);
  delay(100);
  Serial.printf("📡 AP started: %s\n", ssid.c_str());
  Serial.print("📍 IP: ");
  Serial.println(WiFi.softAPIP());
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
  while (WiFi.waitForConnectResult() != WL_CONNECTED && millis() - startAttempt < 15000) {
    Serial.print(".");
    delay(500);
  }

 if (WiFi.waitForConnectResult() == WL_CONNECTED) {
  Serial.println("✅ WiFi connected");
  Serial.print("📶 IP address: ");
  Serial.println(WiFi.localIP());

  wifiConnected = true;
  assignedIP = WiFi.localIP().toString();
  saveCredentials(ssid, password);
  server.send(200, "application/json", "{\"status\":\"connected\"}");
 } else {
  Serial.print("❌ WiFi status: ");
  Serial.println(WiFi.waitForConnectResult());

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

  // Build payload
  DynamicJsonDocument payload(512);
  payload["name"] = name;
  payload["user_id"] = userId;
  payload["plant_id"] = plantId;
  payload["current_moisture_level"] = readMoisture();

  String jsonPayload;
  serializeJson(payload, jsonPayload);

  WiFiClientSecure client;
  client.setInsecure();  // Skip SSL certificate check (for dev/testing only), ESP8266 does not support HTTPS

  HTTPClient https;
  https.begin(client, "https://greenfingers.truenas.work/api/sensor/pair");
  https.addHeader("Content-Type", "application/json");

  int httpCode = https.POST(jsonPayload);
  String response = https.getString();

  Serial.println("📥 Backend response:");
  Serial.println(response);

  if (httpCode == 200 || httpCode == 201) {
    DynamicJsonDocument responseDoc(1024);
    DeserializationError err = deserializeJson(responseDoc, response);

    if (!err) {
      accessToken = responseDoc["accessToken"].as<String>();
      refreshToken = responseDoc["refreshToken"].as<String>();
      sensorId = responseDoc["sensor"]["id"].as<int>();

      DynamicJsonDocument tokenDoc(512);
      tokenDoc["accessToken"] = accessToken;
      tokenDoc["refreshToken"] = refreshToken;
      tokenDoc["sensorId"] = sensorId;

      File tokenFile = LittleFS.open("/token.json", "w");
      serializeJson(tokenDoc, tokenFile);
      tokenFile.close();

      Serial.println("✅ Sensor paired and tokens saved.");
      server.send(200, "application/json", "{\"status\":\"success\",\"message\":\"Sensor paired and token saved\"}");
      apShutdownRequested = true;
      apShutdownTime = millis() + 7000;
    } else {
      Serial.println("❌ Failed to parse backend JSON");
      server.send(500, "application/json", "{\"status\":\"error\",\"message\":\"Failed to parse backend response\"}");
    }
  } else {
    Serial.println("❌ Backend responded with error: " + String(httpCode));
    server.send(500, "application/json", "{\"status\":\"error\",\"message\":\"Backend pairing failed\"}");
  }

  https.end();
}
// --- Handle button to delete WiFi credentials ---
void handleWiFiResetButton() {
  static unsigned long pressStart = 0;
  static bool wasLow = false;

  if (digitalRead(WIFI_RESET_PIN) == LOW) {
    if (!wasLow) {
      pressStart = millis();
      wasLow = true;
    } else if (millis() - pressStart > 2000) {
      Serial.println("🧹 Button held for 2s — clearing WiFi credentials...");
      LittleFS.remove("/wifi.json");
      delay(500);
      Serial.println("🔄 Restarting...");
      ESP.restart();
    }
  } else {
    wasLow = false;
  }
}
const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>WiFi Setup</title>
  </head>
  <body>
    <h2>Configure WiFi</h2>
    <form id="wifi-form">
      <label>SSID:</label>
      <input type="text" id="ssid" required><br>
      <label>Password:</label>
      <input type="password" id="password" required><br>
      <button type="submit">Submit</button>
    </form>
    <script>
      document.getElementById("wifi-form").addEventListener("submit", async function(e) {
        e.preventDefault();
        const ssid = document.getElementById("ssid").value;
        const password = document.getElementById("password").value;

        const res = await fetch("/wifi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ssid, password })
        });

        const json = await res.json();
        alert(json.message || json.status || "Done!");
      });
    </script>
  </body>
</html>
)rawliteral";
// --- Setup ---
void setup() {
  Serial.begin(115200);
  delay(500);

  pinMode(WIFI_RESET_PIN, INPUT_PULLUP);

  if (!LittleFS.begin(true)) {
    Serial.println("❌ LittleFS mount failed");
    return;
  }


  if (!tryConnectSavedWiFi()) {
    startAccessPoint();
  }

  server.on("/wifi", HTTP_POST, handlePostCredentials);
  server.on("/status", HTTP_GET, handleStatus);
  server.on("/assign", HTTP_POST, handleAssignSensor);
  server.on("/", HTTP_GET, []() {
  server.send_P(200, "text/html", index_html);
 });
  server.begin();
  Serial.println("🌐 WebServer started");
  loadTokens();
}
// -- tokens ---
void loadTokens() {
  if (!LittleFS.exists("/token.json")) {
    Serial.println("❌ No token.json found");
    return;
  }

  File file = LittleFS.open("/token.json", "r");
  if (!file) {
    Serial.println("❌ Failed to open token.json");
    return;
  }

  DynamicJsonDocument doc(512);
  DeserializationError err = deserializeJson(doc, file);
  file.close();

  if (err) {
    Serial.println("❌ Failed to parse token.json");
    return;
  }

  accessToken = doc["accessToken"].as<String>();
  refreshToken = doc["refreshToken"].as<String>();
  sensorId = doc["sensorId"].as<int>();

  Serial.println("🔐 Token loaded successfully:");
  Serial.println("AccessToken: " + accessToken);
  Serial.println("Sensor ID: " + String(sensorId));
}
bool refreshAccessToken() {
  if (refreshToken == "") {
    Serial.println("⚠️ No refresh token available");
    return false;
  }

  DynamicJsonDocument doc(512);
  doc["refreshToken"] = refreshToken;

  String payload;
  serializeJson(doc, payload);

  WiFiClientSecure client;
  client.setInsecure(); // Skip SSL certificate check (for dev/testing only), ESP8266 does not support HTTPS
  HTTPClient https;
  https.begin(client, "https://greenfingers.truenas.work/api/sensor/refresh-token");
  https.addHeader("Content-Type", "application/json");

  int code = https.POST(payload);
  String response = https.getString();
  https.end();

  if (code == 200 || code == 201) {
    DynamicJsonDocument resDoc(512);
    deserializeJson(resDoc, response);

    accessToken = resDoc["accessToken"].as<String>();
    Serial.println("🔄 Access token refreshed!");

    // Save updated token
    DynamicJsonDocument tokenDoc(512);
    tokenDoc["accessToken"] = accessToken;
    tokenDoc["refreshToken"] = refreshToken;
    tokenDoc["sensorId"] = sensorId;
    File tokenFile = LittleFS.open("/token.json", "w");
    serializeJson(tokenDoc, tokenFile);
    tokenFile.close();

    return true;
  } else {
    Serial.println("❌ Failed to refresh token. Code: " + String(code));
    Serial.println("Response: " + response);
    return false;
  }
}
void sendMoistureReading() {
  if (accessToken == "" || sensorId == -1) {
    Serial.println("⚠️ No access token or sensor ID");
    return;
  }

  int moisture = readMoisture();

  DynamicJsonDocument doc(256);
  doc["moisture"] = moisture;

  String payload;
  serializeJson(doc, payload);

  WiFiClientSecure client;
  client.setInsecure();  // Skip SSL certificate check (for dev/testing only), ESP8266 does not support HTTPS

  HTTPClient https;
  https.begin(client, "https://greenfingers.truenas.work/api/sensor/data");
  https.addHeader("Content-Type", "application/json");
  https.addHeader("Authorization", "Bearer " + accessToken);

  int code = https.POST(payload);
String response = https.getString();

if (code == 200 || code == 201) {
  Serial.println("✅ Moisture data sent successfully");
} else if (code == 401 || code == 403) {
  Serial.println("🔐 Token expired, trying refresh...");
  if (refreshAccessToken()) {
    sendMoistureReading(); // Try again once
    return;
  }
} else {
  Serial.println("❌ Failed to send data. Code: " + String(code));
  Serial.println("Response: " + response);
}

  https.end();
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

  if (wifiConnected && millis() - lastMoistureSent > moistureInterval) {
    sendMoistureReading();
    lastMoistureSent = millis();
  }
}
