import React, { ComponentProps } from "react";
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

export const HighUnpleasantSvg = ({
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
      <G clip-path="url(#clip0_234_869)">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M50 0H0V100H50C22.3858 100 0 122.386 0 150V200H100V150C100 177.614 122.386 200 150 200H200V100H150C177.614 100 200 77.6142 200 50V0H100V50C100 22.3858 77.6142 0 50 0ZM100 100H50C77.6142 100 100 122.386 100 150V100ZM100 100V50C100 77.6142 122.386 100 150 100H100Z"
          fill="url(#paint0_linear_234_869)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_234_869"
          x1="100"
          y1="0"
          x2="100"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E22B4C" />
          <Stop offset="1" stopColor="#A7B5FF" />
        </LinearGradient>
        <ClipPath id="clip0_234_869">
          <Rect width="200" height="200" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
