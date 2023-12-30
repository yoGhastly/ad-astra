import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { View } from "..";

export const Overlay: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
      <LinearGradient
        colors={[
          "transparent",
          "transparent",
          "rgba(0, 0, 0, 0.2)",
          "rgba(0,0,0,0.7)"
        ]}
        style={styles.overlay}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },

  container: {
    position: "relative",
    width: "100%",
    height: "60%",
    backgroundColor: "rgba(0,0,0,0.9)"
  }
});
