import React, { ReactNode } from "react";
import { View } from "..";

export const BaseScreen: React.FC<{
  children: ReactNode;
  onLayoutRootView?: () => Promise<void>;
}> = ({ children, onLayoutRootView }) => {
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "#000",
        display: "flex",
        paddingVertical: 15,
        paddinCheckIngHorizontal: 10
      }}
      onLayout={onLayoutRootView}
    >
      {children}
    </View>
  );
};
