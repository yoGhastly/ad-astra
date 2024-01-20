import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "..";
import { SparklesColored } from "../../svg/SparklesColored";
import { PuzzledPieceColored } from "../../svg/PuzzlePieceColored";
import { PlusIconColored } from "../../svg/icons/PlusIcon";
import DropShadow from "react-native-drop-shadow";

export const BottomNavigation = () => {
  return (
    <SafeAreaView>
      <DropShadow
        style={{
          shadowColor: "#fff",
          shadowOffset: {
            width: 0,
            height: 0
          },
          shadowOpacity: 0.2,
          shadowRadius: 1
        }}
      >
        <View style={styles.pillContainer}>
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
        </View>
      </DropShadow>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    position: "absolute",
    backgroundColor: "#010101",
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
