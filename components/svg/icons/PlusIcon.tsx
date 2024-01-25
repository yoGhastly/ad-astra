import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

function PlusIcon() {
  return (
    <Svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      style={styles.container}
    >
      <Path
        d="M12 4.5V19.5M19.5 12L4.5 12"
        stroke="#E0E0E0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function PlusIconColored() {
  return (
    <Svg width="28" height="28" viewBox="0 0 25 24" fill="none">
      <Path
        d="M12.5 4.5V19.5M20 12L5 12"
        stroke="url(#paint0_linear_10_23)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_10_23"
          x1="12.5"
          y1="4.5"
          x2="12.5"
          y2="19.5"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFFF00" />
          <Stop offset="1" stopColor="#5B3BCC" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: "28%",
    top: "43%"
  }
});

export { PlusIcon, PlusIconColored }; // Exporting styles along with components
