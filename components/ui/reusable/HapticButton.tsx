import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import * as Haptics from "expo-haptics";
import { Pressable } from "..";

interface WithHapticFeedbackProps {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const withHapticFeedback = <P extends WithHapticFeedbackProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return ({ onPress, ...props }: P) => {
    const handlePress = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      if (onPress) {
        onPress();
      }
    };

    return (
      <Pressable onPress={handlePress}>
        <WrappedComponent {...(props as P)} />
      </Pressable>
    );
  };
};
