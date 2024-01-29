import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LavaLampAnimation from "../components/ui/reusable/LavaLampAnimation";

export default function Animation() {
  return (
    <View style={styles.container}>
      <LavaLampAnimation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
