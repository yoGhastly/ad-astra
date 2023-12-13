import React, { ReactNode } from "react";
import { Animated } from "react-native";

export const BaseScreen: React.FC<{
  children: ReactNode;
  onLayoutRootView?: () => Promise<void>;
  style?: any;
}> = ({ children, style, onLayoutRootView, ...props }) => {
  const defaultStyles = {
    height: "100%",
    backgroundColor: "#000",
    display: "flex",
    paddingVertical: 15,
    paddingHorizontal: 10
  };
  return (
    <Animated.View
      style={{
        ...defaultStyles,
        ...style // Merge user-provided styles
      }}
      onLayout={onLayoutRootView}
    >
      {children}
    </Animated.View>
  );
};
