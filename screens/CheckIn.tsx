import React, { useCallback } from "react";
import { Text, TouchableOpacity, View } from "../components/ui";
import { BaseScreen, Navbar } from "../components/ui/reusable";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet } from "react-native";
import { SearchIcon, XMarkIcon } from "../components/svg";
import {
  HighEnergyPleasantButton,
  HighEnergyUnpleasantButton,
  LowEnergyPleasantButton,
  LowEnergyUnpleasantButton
} from "../components/ui/reusable/CheckInButtons";

SplashScreen.preventAutoHideAsync();

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20
  },
  item: {
    flex: 1
  },
  flex: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    gap: 50
  }
});

export default function CheckIn({ navigation }: { navigation: any }) {
  const [fontsLoaded] = useFonts({
    "Satoshi-Regular": require("../assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Bold": require("../assets/fonts/Satoshi-Bold.otf")
  });

  const navigateToEmotionCircles = useCallback(() => {
    navigation.navigate("EmotionCircles");
  }, [navigation]);

  const checkInButtons = [
    <HighEnergyUnpleasantButton
      style={styles.item}
      key={1}
      onPress={navigateToEmotionCircles}
    />,
    <HighEnergyPleasantButton
      style={styles.item}
      key={2}
      onPress={navigateToEmotionCircles}
    />,
    <LowEnergyUnpleasantButton
      style={styles.item}
      key={3}
      onPress={navigateToEmotionCircles}
    />,
    <LowEnergyPleasantButton
      style={styles.item}
      key={4}
      onPress={navigateToEmotionCircles}
    />
  ];

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
      <Navbar
        startContent={
          <TouchableOpacity onPress={() => navigation.replace("Home")}>
            <XMarkIcon />
          </TouchableOpacity>
        }
        endContent={<SearchIcon />}
      />
      <View className="mx-auto my-4" style={styles.flex}>
        <Text
          style={{ fontFamily: "Satoshi-Bold" }}
          className="text-mist_gray text-3xl text-center"
        >
          Check In with Your Cosmic Emotions
        </Text>
        <View style={styles.container}>
          {checkInButtons.map((component) => component)}
        </View>
      </View>
    </BaseScreen>
  );
}
