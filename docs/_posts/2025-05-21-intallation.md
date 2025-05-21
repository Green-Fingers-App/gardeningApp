---
layout: post
title: "Installation"
date: 2025-05-21
author: "Sima, Casimir & Malte"
---

# 🌱 How to Install GreenFingers

GreenFingers helps you manage your plants and soil moisture sensors with ease. This guide walks you through installing the mobile app and setting up the backend with Docker.

---

## 📋 What You’ll Need

Before you begin, make sure you have the following ready:

* ✅ A device running **Android** (or an emulator)
* ✅ A computer with **Docker & Docker Compose** installed
* ✅ Your **Wi-Fi name (SSID)** and **password** for sensor provisioning
* ✅ A **local IP address or domain** where your backend will run (e.g., `192.168.2.160` or `greenfingers.example.com`)
* ✅ Your own **JWT secret strings** (or generate them using `openssl rand -hex 32`)
* ✅ A **GreenFingers-compatible sensor setup**:

  * An **ESP32 microcontroller**
  * A **capacitive soil moisture sensor**
  * A **5V USB power supply** (e.g., power bank or wall adapter)

---

## 📱 Step 1: Install the GreenFingers App

1. Download the latest APK here:
   👉 **[GreenFingers\_v1.1.0.apk](https://github.com/Green-Fingers-App/gardeningApp/releases/download/v1.1.0/app-release.apk)**

2. Transfer the file to your Android device or use an Android emulator.

3. On your phone, go to **Settings → Security**, and allow installations from **unknown sources** (for your browser or file manager).

4. Tap the `.apk` file to install the app.

5. 🛠️ On first launch, the app will ask you to enter the base URL of your backend. This is usually `http://<your-local-ip>:3000` if you're running the backend locally.

---

## 🐳 Step 2: Set Up the Backend and Database with Docker

### 🔧 Prerequisites

* Docker & Docker Compose installed
  → [Install Docker](https://docs.docker.com/get-started/get-docker/)

### 📂 Clone the Project

```bash
git clone https://github.com/Green-Fingers-App/gardeningApp-backend.git
cd gardeningApp-backend
```

### 🔑 Create the `.env` File

Create a `.env` file in the project root with the following content:

```env
# --- Database Configuration ---
DB_HOST=db
DB_PORT=5432
DB_NAME=greenfingers
DB_USER=postgres
DB_PASSWORD=postgres

# --- Backend Configuration ---
PORT=3000

# --- Security ---
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
```

To generate secure JWT secrets, you can run the following command in your terminal:

```bash
openssl rand -hex 32
```

---

### ▶️ Start Everything with Docker

Start the backend and database using Docker Compose:

```bash
docker-compose up --build -d
```

Make sure both containers (`green-fingers-backend` and `green-fingers-db`) are running:

```bash
docker ps
```

---

### 🗃️ Prepare the Database

We use a SQL dump (`dump.sql`) to initialize the database schema.

In the `installation/` folder, you will find a Bash script that imports the dump into the running PostgreSQL container:

```bash
./installation/init-db.sh
```

You should see messages indicating the database is ready and the schema was imported successfully.

The backend is now running at:
🌐 [http://localhost:3000](http://localhost:3000)

If you're testing from a mobile device, replace `localhost` with your computer's IP address (e.g., `http://192.168.2.160:3000`).

---

## 🔌 Step 3: Prepare and Connect a Sensor

### 🧰 Hardware Requirements

To use GreenFingers with a soil moisture sensor, you need:

* ✅ 1x ESP32 board (e.g., DOIT or Wemos)
* ✅ 1x Capacitive Soil Moisture Sensor
* ✅ Jumper wires
* ✅ 1x 5V USB power source

### 🧾 Adjust the Firmware

The firmware (`ESP32_sensor.ino`) is located directly inside the backend repository under `firmware/ESP32_sensor.ino`.

In your `ESP32_sensor.ino` sketch, make sure to set the correct base URL for your backend:

```cpp
#define USE_HTTPS         // comment out if using local HTTP
const char* BASE_API_URL = "http://192.168.2.160:3000";  // or your production URL
```

When using HTTP, make sure `USE_HTTPS` is **commented out**.

### 📶 Connecting the Sensor

1. Flash the ESP32 with the adjusted `.ino` sketch using the Arduino IDE.
2. Open the **Serial Monitor** and reset the board.
3. You will see an SSID like:

   ```
   GreenSensor_8B1DAD
   ```
4. Create a QR code that contains the following JSON:

```json
{
  "ssid": "GreenSensor_8B1DAD",
  "password": "plantsarecool",
  "ip": "192.168.4.1"
}
```

5. In the app, go to "Add Sensor" → Scan QR code → Connect to sensor.
6. Enter your **home Wi-Fi credentials** in the app to provision the sensor.
7. The sensor will then send data to the backend automatically.

---

## ✅ You're All Set!

You can now use the GreenFingers app to:

* 📲 Add gardens and plants
* 🌱 Connect soil moisture sensors
* 📊 Track real-time and historical moisture data

Enjoy growing smart! 🌿
