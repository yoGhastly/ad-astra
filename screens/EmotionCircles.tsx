import React, { useCallback, useEffect, useRef } from "react";
import { Text, View } from "../components/ui";
import {
  BaseScreen,
  Chip,
  Navbar,
  Search,
  withHapticFeedback
} from "../components/ui/reusable";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import { emotions } from "../constants";
import { ArrowLeftIcon, ShareIcon } from "../components/svg/icons";

SplashScreen.preventAutoHideAsync();

const ArrowLeftWithHaptic = withHapticFeedback(ArrowLeftIcon);
const ShareIconWithHaptic = withHapticFeedback(ShareIcon);

type colors = "red" | "yellow" | "blue" | "green" | "default";

const filterColors = [
  {
    label: "Yellow",
    color: "yellow"
  },
  {
    label: "Green",
    color: "green"
  },
  {
    label: "Blue",
    color: "blue"
  },
  {
    label: "Red",
    color: "red"
  }
];

const EmotionCircles = ({ navigation }: { navigation: any }) => {
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
      <View className="flex justify-center items-center flex-col mx-4 my-4">
        <View className="flex flex-col mx-auto w-full" style={{ gap: 20 }}>
          <Search onCancel={() => navigation.push("CheckIn")} />
          <View className="flex flex-row" style={{ gap: 5 }}>
            {filterColors.map(({ label, color }, index) => (
              <Chip label={label} color={color as colors} key={index} />
            ))}
          </View>
        </View>
      </View>
    </BaseScreen>
  );
};

export default EmotionCircles;
