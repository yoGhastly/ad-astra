import React, { useState, useEffect } from "react";
import { View, Animated, Easing, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

interface Bubble {
  size: number;
  position: Animated.Value;
  translateY: Animated.Value;
  translateX: Animated.Value;
  opacity: Animated.Value;
  duration: number;
  initialX: number;
  initialY: number;
}

interface Props {
  bubbleColor: string;
}

const BubbleAnimation: React.FC<Props> = ({ bubbleColor }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const generateBubble = () => {
      const size = Math.random() * 80 + 40;
      const duration = Math.random() * 5000 + 2000;
      const maxInitialX = width * -0.1 + 100;
      const initialX = maxInitialX;
      const initialY = Math.random() * height;

      return {
        size,
        position: new Animated.Value(0),
        translateY: new Animated.Value(0),
        translateX: new Animated.Value(0),
        opacity: new Animated.Value(1),
        duration,
        initialX,
        initialY
      };
    };

    const bubblesArray = Array.from({ length: 10 }, () => generateBubble());
    setBubbles(bubblesArray);
  }, []);

  useEffect(() => {
    const animateBubble = (bubble) => {
      // Set initial values
      bubble.position.setValue(0);
      bubble.translateY.setValue(0);
      bubble.translateX.setValue(0);
      bubble.opacity.setValue(1);

      Animated.loop(
        Animated.parallel([
          Animated.timing(bubble.position, {
            toValue: 1,
            duration: bubble.duration,
            easing: Easing.linear,
            useNativeDriver: true
          }),
          Animated.timing(bubble.translateY, {
            toValue: 1,
            duration: bubble.duration / 2,
            easing: Easing.sin,
            useNativeDriver: true
          }),
          Animated.timing(bubble.translateX, {
            toValue: 1,
            duration: bubble.duration,
            easing: Easing.linear,
            useNativeDriver: true
          }),
          Animated.timing(bubble.opacity, {
            toValue: 0,
            duration: bubble.duration / 2,
            easing: Easing.linear,
            useNativeDriver: true
          })
        ])
      ).start(() => {
        // Save the final position after each animation loop
        bubble.initialX = bubble.translateX
          .interpolate({
            inputRange: [0, 1],
            outputRange: [0, width + bubble.size]
          })
          .__getValue();
        bubble.initialY = bubble.position
          .interpolate({
            inputRange: [0, 1],
            outputRange: [0, -height - bubble.size]
          })
          .__getValue();

        // Restart the animation loop
        animateBubble(bubble);
      });
    };

    bubbles.forEach((bubble) => {
      animateBubble(bubble);
    });
  }, [bubbles]);

  return (
    <View style={styles.container}>
      {bubbles.map((bubble, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bubble,
            {
              width: bubble.size,
              height: bubble.size,
              backgroundColor: bubbleColor,
              transform: [
                {
                  translateY: bubble.position.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -height - bubble.size]
                  })
                },
                {
                  translateX: bubble.translateX.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, width + bubble.size]
                  })
                }
              ],
              opacity: bubble.opacity,
              top: bubble.initialY,
              left: bubble.initialX
            }
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bubble: {
    borderRadius: 50,
    position: "absolute"
  }
});

export default BubbleAnimation;
