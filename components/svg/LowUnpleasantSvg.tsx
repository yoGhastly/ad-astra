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

export const LowUnpleasantSvg = ({
  style
}: {
  style: StyleProp<ViewStyle>;
}) => {
  return (
    <Svg
      width="150"
      height="150"
      viewBox="0 0 200 200"
      fill="none"
      style={style}
    >
      <G clip-path="url(#clip0_221_10)">
        <Path
          d="M0 0H100C155.228 0 200 44.7715 200 100V200H100C44.7715 200 0 155.228 0 100V0Z"
          fill="url(#paint0_linear_221_10)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_221_10"
          x1="100"
          y1="0"
          x2="100"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#A7B5FF" />
          <Stop offset="1" stopColor="#A0d0FF" />
        </LinearGradient>
        <ClipPath id="clip0_221_10">
          <Rect width="200" height="200" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
