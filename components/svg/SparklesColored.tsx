import React from "react";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

function SparklesColored() {
  return (
    <Svg width="28" height="28" viewBox="0 0 25 24" fill="none">
      <Path
        d="M10.3132 15.9038L9.5 18.75L8.6868 15.9038C8.25968 14.4089 7.09112 13.2403 5.59619 12.8132L2.75 12L5.59619 11.1868C7.09113 10.7597 8.25968 9.59112 8.6868 8.09619L9.5 5.25L10.3132 8.09619C10.7403 9.59113 11.9089 10.7597 13.4038 11.1868L16.25 12L13.4038 12.8132C11.9089 13.2403 10.7403 14.4089 10.3132 15.9038Z"
        stroke="url(#paint0_linear_10_35)"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.7589 8.71454L18.5 9.75L18.2411 8.71454C17.9388 7.50533 16.9947 6.56117 15.7855 6.25887L14.75 6L15.7855 5.74113C16.9947 5.43883 17.9388 4.49467 18.2411 3.28546L18.5 2.25L18.7589 3.28546C19.0612 4.49467 20.0053 5.43883 21.2145 5.74113L22.25 6L21.2145 6.25887C20.0053 6.56117 19.0612 7.50533 18.7589 8.71454Z"
        stroke="url(#paint1_linear_10_35)"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M17.3942 20.5673L17 21.75L16.6058 20.5673C16.3818 19.8954 15.8546 19.3682 15.1827 19.1442L14 18.75L15.1827 18.3558C15.8546 18.1318 16.3818 17.6046 16.6058 16.9327L17 15.75L17.3942 16.9327C17.6182 17.6046 18.1454 18.1318 18.8173 18.3558L20 18.75L18.8173 19.1442C18.1454 19.3682 17.6182 19.8954 17.3942 20.5673Z"
        stroke="url(#paint2_linear_10_35)"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_10_35"
          x1="12.5"
          y1="2.25"
          x2="12.5"
          y2="21.75"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E0E0E0" />
          <Stop offset="0.536458" stopColor="#6E8AD1" />
          <Stop offset="1" stopColor="#A068BD" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_10_35"
          x1="12.5"
          y1="2.25"
          x2="12.5"
          y2="21.75"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E0E0E0" />
          <Stop offset="0.536458" stopColor="#6E8AD1" />
          <Stop offset="1" stopColor="#A068BD" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_10_35"
          x1="12.5"
          y1="2.25"
          x2="12.5"
          y2="21.75"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E0E0E0" />
          <Stop offset="0.536458" stopColor="#6E8AD1" />
          <Stop offset="1" stopColor="#A068BD" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export { SparklesColored };
