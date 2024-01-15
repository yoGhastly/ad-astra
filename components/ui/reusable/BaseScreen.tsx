import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native";

export const BaseScreen: React.FC<{
  children: ReactNode;
  onLayoutRootView?: () => Promise<void>;
  style?: any;
}> = ({ children, style, onLayoutRootView, ...props }) => {
  const defaultStyles = {
    height: "100%",
    backgroundColor: "#000",
    display: "flex",
    paddingVertical: "auto",
    paddingHorizontal: "auto"
  };
  return (
    <SafeAreaView
      style={{
        ...defaultStyles,
        ...style
      }}
      {...props}
      onLayout={onLayoutRootView}
    >
      {children}
    </SafeAreaView>
  );
};
