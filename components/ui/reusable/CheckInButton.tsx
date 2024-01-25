import React from "react";
import { View, Text } from "..";
import CircularGradient from "../../svg/CircularGradient";
import { PlusIcon } from "../../svg/icons";

export const CheckInButton = () => {
  return (
    <View
      style={{
        alignSelf: "center",
        marginTop: 20,
        position: "relative",
        alignItems: "center"
      }}
    >
      <CircularGradient />
      <PlusIcon />
      <Text
        style={{ fontFamily: "Satoshi-Regular" }}
        className="text-light-gray mt-8 text-[16px]"
      >
        Check in
      </Text>
    </View>
  );
};
