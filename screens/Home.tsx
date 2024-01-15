import React, { useEffect, useRef, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { View, Text } from "../components/ui";
import {
  BaseScreen,
  BottomNavigation,
  CheckInButton,
  Navbar,
  PictureOfTheDayCard,
  withHapticFeedback
} from "../components/ui/reusable";
import { SafeAreaView, ScrollView } from "react-native";
import clsx from "clsx";
import { ConfigIcon, ShareIcon } from "../components/svg/icons";
import { onShare } from "../helpers/shareApp";
import DropShadow from "react-native-drop-shadow";
import useRequest from "../helpers/fetcher";
import { DominantColorsResponse } from "../types/api";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

const CheckInWithHaptic = withHapticFeedback(CheckInButton);
const ShareIconWithHaptic = withHapticFeedback(ShareIcon);

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [fontsLoaded] = useFonts({
    "Satoshi-Regular": require("../assets/fonts/Satoshi-Regular.otf"),
    "Zodiak-Bold": require("../assets/fonts/Zodiak-Bold.otf")
  });
  const [isBottomNavigationVisible, setIsBottomNavigationVisible] =
    useState(true);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  let previousOffset = 0;

  const { data: dominantColors, error } = useRequest<DominantColorsResponse>({
    url: "https://ad-astra-api-production.up.railway.app",
    method: "GET"
  });

  const gradientDominantColorsList = [
    Array(6).fill("transparent"),
    `#${dominantColors?.colors[0] as string}`,
    `#${dominantColors?.colors[1] as string}`
  ];

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction =
      currentOffset > 0 && currentOffset > previousOffset ? "down" : "up";
    previousOffset = currentOffset;

    const threshold = 10;

    if (direction === "down" && isBottomNavigationVisible) {
      setTimeout(() => {
        setIsBottomNavigationVisible(false);
        opacity.value = withSpring(0); // Fade out
        translateY.value = withTiming(100);
      }, 2300);
    } else if (
      direction === "up" &&
      !isBottomNavigationVisible &&
      currentOffset < threshold
    ) {
      setIsBottomNavigationVisible(true);
      opacity.value = withSpring(1); // Fade in
      translateY.value = withTiming(0);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value
    };
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (error) {
    console.error("Error fetching dominant colors", error);
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <BaseScreen onLayoutRootView={onLayoutRootView}>
      <Navbar
        startContent={<ConfigIcon />}
        endContent={<ShareIconWithHaptic onPress={onShare} />}
      />
      <ScrollView
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 15
          }}
        >
          <Text
            style={{ fontFamily: "Satoshi-Regular" }}
            className="text-light-gray text-[16px] w-full text-center"
          >
            Share your thoughts inspired by the universe
          </Text>
          <Text
            style={{ fontFamily: "Zodiak-Bold" }}
            className="text-3xl text-mist_gray text-center max-w-xs"
          >
            How are you feeling today?
          </Text>
          <CheckInWithHaptic onPress={() => navigation.navigate("CheckIn")} />
        </View>
        <View className="flex flex-row justify-between items-center mt-16 mx-auto">
          <View className="flex flex-row gap-4">
            <Text
              style={{ fontFamily: "Zodiak-Bold" }}
              className="text-mist_gray text-5xl"
            >
              {10}
            </Text>

            <Text
              style={{ fontFamily: "Satoshi-Regular" }}
              className="text-mist_gray text-[15px] w-[60px]"
            >
              unique feelings
            </Text>
          </View>

          <View className="flex flex-row gap-4 ml-4">
            <Text
              style={{ fontFamily: "Zodiak-Bold" }}
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
          </View>
        </View>
        <Text
          className="text-mist_gray self-center  text-[16px] mx-8 mt-8"
          style={{ fontFamily: "Satoshi-Regular" }}
        >
          Each day a different image or photograph of our fascinating{" "}
          <Text style={{ color: `#${dominantColors?.colors[2]}` }}>
            universe.
          </Text>
        </Text>
        <LinearGradient colors={gradientDominantColorsList as string[]}>
          <DropShadow
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 0
              },
              shadowOpacity: 0.8,
              shadowRadius: 10
            }}
          >
            <PictureOfTheDayCard
              onPressCallToAction={() => navigation.navigate("Home")}
            />
          </DropShadow>
        </LinearGradient>
      </ScrollView>
      <Animated.View
        style={[
          { ...animatedStyle },
          { position: "absolute", bottom: 30, left: 0, right: 0 }
        ]}
      >
        {isBottomNavigationVisible && <BottomNavigation />}
      </Animated.View>
    </BaseScreen>
  );
}
