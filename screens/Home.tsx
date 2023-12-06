import React, { useRef, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { View, Text } from "../components/ui";
import {
  BaseScreen,
  BottomNavigation,
  Chip,
  Navbar,
  PictureOfTheDayCard
} from "../components/ui/reusable";
import CircularGradient from "../components/svg/CircularGradient";
import { Pressable } from "react-native";
import { PlusIcon } from "../components/svg/PlusIcon";
import { ScrollView } from "moti";
import clsx from "clsx";
import Animated, {
  SharedTransition,
  withSpring
} from "react-native-reanimated";
import { ConfigIcon } from "../components/svg/ConfigIcon";
import { ShareIcon } from "../components/svg/ShareIcon";

SplashScreen.preventAutoHideAsync();
const customTransition = SharedTransition.custom((values) => {
  "worklet";
  return {
    height: withSpring(values.targetHeight),
    width: withSpring(values.targetWidth),
    originX: withSpring(values.targetOriginX),
    originY: withSpring(values.targetOriginY)
  };
});
export default function HomeScreen({ navigation }: { navigation: any }) {
  const [fontsLoaded] = useFonts({
    "Satoshi-Regular": require("../assets/fonts/Satoshi-Regular.otf"),
    "Boska-Bold": require("../assets/fonts/Boska-Bold.otf")
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
      <Navbar startContent={<ConfigIcon />} endContent={<ShareIcon />} />
      <ScrollView style={{ flex: 1 }}>
        <View className="flex flex-col gap-5 justify-center items-center mt-4">
          <Text
            style={{ fontFamily: "Satoshi-Regular" }}
            className="text-light-gray text-[16px] w-full text-center"
          >
            Share your thoughts inspired by the universe
          </Text>
          <Text
            style={{ fontFamily: "Boska-Bold" }}
            className="text-3xl text-mist_gray text-center max-w-xs"
          >
            How are you feeling today?
          </Text>
        </View>
        <Pressable
          style={{
            alignSelf: "center",
            marginTop: 20,
            position: "relative",
            alignItems: "center"
          }}
          onPress={() => navigation.navigate("NextScreen")}
        >
          <CircularGradient />
          <PlusIcon />
          <Text
            style={{ fontFamily: "Satoshi-Regular" }}
            className="text-light-gray mt-4 text-[16px]"
          >
            Check in
          </Text>
        </Pressable>
        <View className="flex flex-row justify-between items-center mt-16 mx-auto">
          <Chip>
            <Text
              style={{ fontFamily: "Boska-Bold" }}
              className="text-mist_gray text-5xl"
            >
              {10}
            </Text>

            <Text
              style={{ fontFamily: "Satoshi-Regular" }}
              className="text-mist_gray text-[15px] w-[50px]"
            >
              unique feelings
            </Text>
          </Chip>

          <Chip>
            <Text
              style={{ fontFamily: "Boska-Bold" }}
              className="text-mist_gray text-5xl"
            >
              {10}
            </Text>

            <Text
              style={{ fontFamily: "Satoshi-Regular" }}
              className="text-mist_gray text-[15px] w-[50px]"
            >
              day streak
            </Text>
          </Chip>
        </View>
        <Text
          className="text-mist_gray self-center  text-[16px] mx-8 mt-8"
          style={{ fontFamily: "Satoshi-Regular" }}
        >
          Each day a different image or photograph of our fascinating{" "}
          <Text className={clsx("text-secondary/80")}>universe.</Text>
        </Text>
        <PictureOfTheDayCard />
      </ScrollView>
      <BottomNavigation />
    </BaseScreen>
  );
}
