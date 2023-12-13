import React from "react";
import Svg, { Path } from "react-native-svg";

export const XMarkIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 18L18 6M6 6L18 18"
        stroke="#e0e0e0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
