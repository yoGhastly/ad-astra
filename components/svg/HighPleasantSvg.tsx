import { useAnimationState } from "moti";
import { motifySvg } from "moti/svg";
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

const MotiG = motifySvg(G)();

export const HighPleasantSvg = ({ style }: { style: StyleProp<ViewStyle> }) => {
  return (
    <Svg
      width="150"
      height="150"
      viewBox="0 0 200 200"
      fill="none"
      style={style}
    >
      <G clip-path="url(#clip0_133_2)">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M50.7143 0H0.71429V50C0.71429 75.462 19.7466 96.4788 44.361 99.6002C19.4015 102.402 4.22025e-06 123.578 2.18557e-06 149.286L0 199.286H50C75.462 199.286 96.4788 180.253 99.6002 155.639C102.402 180.599 123.578 200 149.286 200H199.286V150C199.286 124.538 180.253 103.521 155.639 100.4C180.599 97.5984 200 76.422 200 50.7143V0.714286L150 0.714284C124.538 0.714282 103.521 19.7466 100.4 44.361C97.5984 19.4015 76.422 0 50.7143 0Z"
          fill="url(#paint0_linear_133_2)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_133_2"
          x1="27.5"
          y1="19"
          x2="149"
          y2="174.5"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFD9A0" />
          <Stop offset="1" stopColor="#FFF5F1" />
        </LinearGradient>
        <ClipPath id="clip0_133_2">
          <Rect width="200" height="200" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
