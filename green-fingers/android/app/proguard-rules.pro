# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# --- Core React Native ---
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

# --- React Native Hermes JS Engine ---
-keep class com.facebook.hermes.** { *; }
-dontwarn com.facebook.hermes.**

# --- React Native TurboModules & Bridging ---
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.uimanager.** { *; }
-keep class com.facebook.react.modules.** { *; }
-keep class com.facebook.react.common.** { *; }

# --- Prevent Obfuscation of RN Dev/Release Configs ---
-keepclassmembers class * {
  @com.facebook.react.uimanager.annotations.ReactProp <methods>;
}

# --- Expo Modules (recommended by Expo team) ---
-keep class expo.** { *; }
-dontwarn expo.**

# --- WifiManager (react-native-wifi-reborn) ---
-keep class com.rn.wifimanager.** { *; }
-dontwarn com.rn.wifimanager.**

# --- Android native Wifi system access ---
-keep class android.net.wifi.** { *; }

# --- Reanimated ---
-keep class com.swmansion.reanimated.** { *; }
-dontwarn com.swmansion.reanimated.**

