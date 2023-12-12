import React, { useCallback } from "react";
import { Text, View } from "../components/ui";
import { BaseScreen } from "../components/ui/reusable";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import { emotions } from "../constants";

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
      <View className="flex justify-center items-center">
        <Text className="text-mist_gray">Holaaa</Text>
      </View>
    </BaseScreen>
  );
};

export default EmotionCircles;
