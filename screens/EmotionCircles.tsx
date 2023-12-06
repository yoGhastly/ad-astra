import React, { useCallback } from "react";
import { ScrollView } from "react-native";
import { Text, View } from "../components/ui";
import { BaseScreen } from "../components/ui/reusable";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import { emotions, highEnergyUnpleasantEmotions } from "../constants";

SplashScreen.preventAutoHideAsync();

const EmotionCircles = () => {
  const [fontsLoaded] = useFonts({
    "Satoshi-Regular": require("../assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Bold": require("../assets/fonts/Satoshi-Bold.otf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <BaseScreen onLayoutRootView={onLayoutRootView}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {emotions.map((emotion, index) => (
          <View
            key={index}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              backgroundColor: highEnergyUnpleasantEmotions.includes(emotion)
                ? "#E22B4C" // High Unpleasant color
                : "#FFD9A0", // High Pleasant color
              marginRight: 16,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text className="text-black font-bold" style={{ fontFamily: "Satoshi-Bold" }}>{emotion}</Text>
          </View>
        ))}
      </ScrollView>
    </BaseScreen>
  );
};

export default EmotionCircles;
