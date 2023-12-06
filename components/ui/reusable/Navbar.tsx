import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "..";
import clsx from "clsx";
import { ConfigIcon } from "../../svg/ConfigIcon";
import { ShareIcon } from "../../svg/ShareIcon";

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
      <TouchableOpacity>{startContent}</TouchableOpacity>
      <TouchableOpacity>{endContent}</TouchableOpacity>
    </View>
  );
};
