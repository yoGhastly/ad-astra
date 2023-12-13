import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "..";

interface NavbarProps {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ startContent, endContent }) => {
  return (
    <View
      style={{
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      {startContent && <TouchableOpacity>{startContent}</TouchableOpacity>}
      {endContent && <TouchableOpacity>{endContent}</TouchableOpacity>}
    </View>
  );
};
