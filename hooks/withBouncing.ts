import { useValue } from "@shopify/react-native-skia";
import {
  defineAnimation,
  withSpring,
  withRepeat
} from "react-native-reanimated";

export const withBouncing = (velocity, lowerBound, upperBound) => {
  "worklet";

  return defineAnimation({}, () => {
    "worklet";
    const state = {
      current: useValue(lowerBound + Math.random() * upperBound),
      direction: 1,
      lastTimestamp: 0
    };

    const onFrame = (state, now) => {
      "worklet";
      const { direction } = state;
      state.current.value += direction * velocity;
      if (
        state.current.value >= upperBound ||
        state.current.value < lowerBound
      ) {
        state.direction *= -1;
      }

      state.lastTimestamp = now;
      return false;
    };

    const onStart = (state, _, now) => {
      "worklet";
      state.current.value = lowerBound + Math.random() * upperBound;
      state.lastTimestamp = now;
      state.direction = 1;
    };

    return {
      onFrame,
      onStart
    };
  });
};
