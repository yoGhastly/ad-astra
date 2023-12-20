import React, { useCallback, useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "../components/ui";
import {
  BaseScreen,
  Chip,
  Search,
  withHapticFeedback
} from "../components/ui/reusable";
import * as SplashScreen from "expo-splash-screen";
import { ArrowLeftIcon, ShareIcon } from "../components/svg/icons";
import { Image } from "expo-image";
import clsx from "clsx";

SplashScreen.preventAutoHideAsync();

const ArrowLeftWithHaptic = withHapticFeedback(ArrowLeftIcon);
const ShareIconWithHaptic = withHapticFeedback(ShareIcon);

type colors = "red" | "yellow" | "blue" | "green" | "default";
type FilterColors = { label: string; color: colors };

const emotionsColorList: FilterColors[] = [
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

const EmotionCircles = ({
  navigation
}: {
  navigation: NativeStackScreenProps<ParamListBase>["navigation"];
}) => {
  const [fontsLoaded] = useFonts({
    "Satoshi-Regular": require("../assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Bold": require("../assets/fonts/Satoshi-Bold.otf"),
    "Zodiak-Bold": require("../assets/fonts/Zodiak-Bold.otf")
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
        <View
          className="flex flex-col mx-auto w-full h-full"
          style={{ gap: 20 }}
        >
          <Search onCancel={() => navigation.push("EmotionCircles")} />
          <View className="flex flex-row" style={{ gap: 5 }}>
            {emotionsColorList.map(({ label, color }, index) => (
              <Chip label={label} color={color} key={index} />
            ))}
          </View>
          <SafeAreaView>
            <ScrollView
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                width: "100%"
              }}
              showsVerticalScrollIndicator={false}
            >
              {Array.from({ length: 123 }).map((_, idx) => (
                <View
                  key={idx}
                  className={clsx(
                    "h-20 flex flex-row justify-between items-center"
                  )}
                >
                  <View className="flex flex-row items-center gap-8">
                    <Image
                      source={require(`../assets/shapes/shape-1.svg`)}
                      contentFit="cover"
                      style={{ width: 48, height: 48 }}
                    />
                    <Text
                      className="text-white text-lg"
                      style={{ fontFamily: "Zodiak-Bold" }}
                    >
                      Name
                    </Text>
                  </View>

                  <Text className="text-[#9d9d9d]">Description</Text>
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </BaseScreen>
  );
};

export default EmotionCircles;
