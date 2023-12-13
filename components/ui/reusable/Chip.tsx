import React from "react";
import { StyleSheet } from "react-native";
import { Pressable, Text } from "..";

interface Props {
  color: "red" | "yellow" | "blue" | "green" | "default";
  label: string;
}

const colorMappings = {
  yellow: { borderColor: "#FFD9A0", textColor: "#E8A33A" },
  red: { borderColor: "#DE4C66", textColor: "#DC163A" },
  blue: { borderColor: "#A7B5FF", textColor: "#4560F2" },
  green: { borderColor: "#B7FFB6", textColor: "#70C93A" },
  default: { borderColor: "gray", textColor: "#e0e0e0" }
};

export const Chip: React.FC<Props> = ({ label, color = "default" }) => {
  const { borderColor, textColor } = colorMappings[color];

  return (
    <Pressable style={[styles.container, { borderColor, borderWidth: 1.5 }]}>
      <Text
        style={{
          color: textColor,
          fontFamily: "Satoshi-Regular",
          fontSize: 16
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 75,
    height: 50,
    gap: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100
  }
});
