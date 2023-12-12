import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import Svg, {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop
} from "react-native-svg";

export const LowPleasantSvg = ({ style }: { style: StyleProp<ViewStyle> }) => {
  return (
    <Svg
      width="150"
      height="150"
      viewBox="0 0 200 200"
      fill="none"
      style={style}
    >
      <G clip-path="url(#clip0_133_21)">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M99.9759 100C44.7585 99.987 -2.80187e-06 55.2204 -7.62939e-06 1.74846e-05L200 0C200 55.2204 155.242 99.987 100.024 100C155.242 100.013 200 144.78 200 200H1.11288e-06C1.11288e-06 144.78 44.7585 100.013 99.9759 100Z"
          fill="url(#paint0_linear_133_21)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_133_21"
          x1="157.5"
          y1="32"
          x2="44"
          y2="147.5"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.0509862" stopColor="#70C93A" />
          <Stop offset="1" stopColor="#B7FFB6" />
        </LinearGradient>
        <ClipPath id="clip0_133_21">
          <Rect width="200" height="200" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
