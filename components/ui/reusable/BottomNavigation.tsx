import React from "react";
import { View, Text, TouchableOpacity } from "..";
import { FontAwesome } from "@expo/vector-icons"; // Import icons from Expo vector icons library
import { PlusIconColored } from "../../svg/PlusIcon";
import { SparklesColored } from "../../svg/SparklesColored";
import { PuzzledPieceColored } from "../../svg/PuzzlePieceColored";

export const BottomNavigation = () => {
  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: "#010101",
        width: "100%",
        bottom: "0%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",
        padding: 10
      }}
    >
      <TouchableOpacity className="flex items-center">
        <PlusIconColored />
        <Text style={{ color: "#e0e0e0", marginTop: 4 }}>Check in</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex items-center">
        <SparklesColored />

        <Text style={{ color: "#e0e0e0", marginTop: 4 }}>Learn</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex items-center">
        <PuzzledPieceColored />
        <Text style={{ color: "#e0e0e0", marginTop: 4 }}>Analyze</Text>
      </TouchableOpacity>
    </View>
  );
};
