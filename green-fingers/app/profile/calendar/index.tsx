import { View, Text, StyleSheet } from "react-native";
import React from "react";

const index = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dt = new Date();
  let nav = 0;
  const year = dt.getFullYear();
  const date = dt.getDate();
  const month = dt.toLocaleDateString("en-us", { month: "long" });

  const fillCalendar = (date: number) => {};

  return (
    <View>
      <View>
        <View>
          <Text>{`${month} ${year}`}</Text>
        </View>
        <View style={styles.daysHeaderContainer}>
          <Text>Mon</Text>
          <Text>Tue</Text>
          <Text>Wed</Text>
          <Text>Thu</Text>
          <Text>Fri</Text>
          <Text>Sat</Text>
          <Text>Sun</Text>
        </View>
        <View>
          <Text>{date}</Text>
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  daysHeaderContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
});
