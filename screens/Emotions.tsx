import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "../components/ui";
import {
  BaseScreen,
  Navbar,
  withHapticFeedback
} from "../components/ui/reusable";
import * as SplashScreen from "expo-splash-screen";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { SearchIcon, ArrowLeftIcon } from "../components/svg/icons";
import LavaLampAnimation from "../components/ui/reusable/LavaLampAnimation";

SplashScreen.preventAutoHideAsync();

const HaptiCArrowLeft = withHapticFeedback(ArrowLeftIcon);

const Emotions = ({
  navigation
}: {
  navigation: NativeStackScreenProps<ParamListBase>["navigation"];
}) => {
  const [fontsLoaded] = useFonts({
    "Satoshi-Regular": require("../assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Bold": require("../assets/fonts/Satoshi-Bold.otf"),
    "Zodiak-Bold": require("../assets/fonts/Zodiak-Bold.otf"),
    "Space-Grotesk-Bold": require("../assets/fonts/SpaceGrotesk-Bold.ttf")
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
    <BaseScreen
      onLayoutRootView={onLayoutRootView}
      style={{ position: "relative" }}
    >
      <LavaLampAnimation bubbleColor="#A7B5FF" />
      <BlurView intensity={100} tint="dark" style={styles.container}>
        <SafeAreaView
          style={{
            width: "100%",
            marginTop: 20,
            height: 60,
            justifyContent: "center"
          }}
        >
          <Navbar
            startContent={
              <HaptiCArrowLeft
                onPress={() => navigation.navigate("Animation")}
              />
            }
            endContent={<SearchIcon />}
          />
        </SafeAreaView>
        <View style={styles.topSection}>
          <Text className="text-light-gray text-center">
            Tap the emotion that best describes how you feel right now
          </Text>
          <View style={styles.filterSection}>
            <Text className="text-[#50555C]">Filter</Text>
            <View style={styles.filterButtonsContainer}>
              {["#FFD9A0", "#B7FFB6", "#E22B4C", "#A7B5FF"].map((c, idx) => (
                <View
                  key={idx}
                  style={[styles.filterButton, { borderColor: c }]}
                ></View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.centerSection}>
          <View style={styles.emotionContentContainer}>
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                fontFamily: "Satoshi-Regular",
                maxWidth: "80%",
                color: "white"
              }}
            >
              sad because your expectations were not met
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/shapes/shape-4.svg")}
                style={{ width: 200, height: 200 }}
              />
              <Text
                style={{
                  position: "absolute",
                  fontSize: 50,
                  fontFamily: "Space-Grotesk-Bold",
                  color: "#F2ACFF"
                }}
              >
                Disappointed
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <Text className="text-white">Button</Text>
        </View>
      </BlurView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center"
  },
  topSection: {
    alignItems: "center",
    marginTop: 15,
    flex: 1,
    gap: 30
  },
  filterSection: {
    display: "flex",
    alignItems: "center",
    gap: 15
  },
  filterButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  centerSection: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  emotionContentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 35
  },
  imageContainer: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center"
  },
  bottomSection: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  filterButton: {
    width: 30,
    height: 30,
    borderRadius: 100,
    borderWidth: 0.5
  },
  lavaLamp: {
    position: "absolute",
    width: "100%",
    height: "100%"
  }
});

export default Emotions;
