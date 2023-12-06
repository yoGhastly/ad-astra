import { motifySvg } from "moti/svg";
import React from "react";
import { StyleSheet } from "react-native";
import { Easing } from "react-native-reanimated";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";

const positions = [
  {
    cx: "29.5",
    cy: "89.5"
  },
  {
    cx: "39.5",
    cy: "49.5"
  },
  {
    cx: "49.5",
    cy: "109.5"
  },
  {
    cx: "59.5",
    cy: "129.5"
  },
  {
    cx: "89.5",
    cy: "69.5"
  },
  {
    cx: "109.5",
    cy: "109.5"
  },
  {
    cx: "115.9",
    cy: "69.9"
  }
];

const MotiCircle = motifySvg(Circle)();

const CircularGradient = () => {
  return (
    <Svg
      width="200"
      height="200"
      viewBox="0 0 139 139"
      fill="none"
      style={styles.svg}
    >
      <Defs>
        <RadialGradient
          id="paint0_radial_7_9"
          cx="53.6%"
          cy="29.5%"
          r="70.6%"
          gradientUnits="objectBoundingBox"
        >
          <Stop offset="0.671064" />
          <Stop offset="0.802083" stopColor="#5B3BCC" />
          <Stop offset="0.903095" stopColor="#BE82DD" />
          <Stop offset="1" stopColor="#D9D9D9" />
        </RadialGradient>
      </Defs>
      <Circle cx="69.5" cy="69.5" r="69.5" fill="url(#paint0_radial_7_9)" />
      {positions.map(({ cx, cy }, idx) => (
        <MotiCircle
          cx={cx}
          cy={cy}
          r={0.5}
          fill="#fff"
          key={idx}
          from={{
            opacity: 0
          }}
          animate={{
            opacity: [1, 0]
          }}
          transition={{
            loop: true,
            duration: 3000,
            type: "timing",
            easing: Easing.linear
          }}
        />
      ))}
    </Svg>
  );
};

const styles = StyleSheet.create({
  svg: {
    position: "relative",
    display: "flex"
  }
});

export default CircularGradient;
