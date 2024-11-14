import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import LoadingSVG from '@/app/LoadingSVG';

const LoadingScreen = () => (
  <View style={styles.container}>
    <LoadingSVG />
    <ActivityIndicator size="large" color="#457D58" />
    <Text style={styles.text}>Loading your experience...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#457d58"
  },
  text: {
    marginTop: 20,
    fontSize: 18,
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default LoadingScreen;

// import React, { useEffect, useRef } from "react";
// import { View, Text, Animated, StyleSheet } from "react-native";
// import LoadingSVG from "@/app/LoadingSVG"; 

// const LoadingScreen = () => {
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(20)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [fadeAnim, slideAnim]);

//   return (
//     <View style={styles.container}>
//       <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
//         <LoadingSVG />
//       </Animated.View>
//       <Animated.Text style={[styles.text, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
//         Loading your experience...
//       </Animated.Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#38682B",
//   },
//   text: {
//     marginTop: 20,
//     fontSize: 18,
    
//   },
// });

// export default LoadingScreen;
