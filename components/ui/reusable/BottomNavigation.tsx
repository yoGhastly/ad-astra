import React from "react";
import { BlurView } from "expo-blur";
import { SafeAreaView, StyleSheet } from "react-native";
import { TouchableOpacity } from "..";
import { SparklesColored } from "../../svg/SparklesColored";
import { PuzzledPieceColored } from "../../svg/PuzzlePieceColored";
import { PlusIconColored } from "../../svg/icons/PlusIcon";

export const BottomNavigation = () => {
  return (
    <SafeAreaView>
      <BlurView style={styles.pillContainer} intensity={60} tint="dark">
        <TouchableOpacity
          style={{ flex: 1 }}
          className="flex justify-center items-center"
        >
          <PlusIconColored />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flex: 1 }}
          className="flex justify-center items-center"
        >
          <SparklesColored />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flex: 1 }}
          className="flex justify-center items-center"
        >
          <PuzzledPieceColored />
        </TouchableOpacity>
      </BlurView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    position: "absolute",
    width: "80%",
    height: 60,
    bottom: "0%",
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    overflow: "hidden"
  }
});
