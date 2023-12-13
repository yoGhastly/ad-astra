import { StyleSheet } from "react-native";
import { View, Text } from "..";
import {
  HighPleasantSvg,
  HighUnpleasantSvg,
  LowPleasantSvg,
  LowUnpleasantSvg
} from "../../svg";
import { withHapticFeedback } from "./HapticButton";

const HighEnergyUnpleasant = () => {
  return (
    <View className="flex flex-col gap-5 justify-center items-center">
      <HighUnpleasantSvg style={styles.item} />
      <Text
        className="text-mist_gray text-center capitalize"
        style={{ marginTop: 10 }}
      >
        High energy Unpleasant
      </Text>
    </View>
  );
};

const HighEnergyPleasant = () => {
  return (
    <View className="flex flex-col gap-5 justify-center items-center">
      <HighPleasantSvg style={styles.item} />
      <Text
        className="text-mist_gray text-center capitalize"
        style={{ marginTop: 10 }}
      >
        High energy pleasant
      </Text>
    </View>
  );
};

const LowEnergyUnpleasant = () => {
  return (
    <View className="flex flex-col gap-5 justify-center items-center">
      <LowUnpleasantSvg style={styles.item} />
      <Text
        className="text-mist_gray text-center capitalize"
        style={{ marginTop: 10 }}
      >
        Low energy unpleasant
      </Text>
    </View>
  );
};

const LowEnergyPleasant = () => {
  return (
    <View className="flex flex-col gap-5 justify-center items-center">
      <LowPleasantSvg style={styles.item} />
      <Text
        className="text-mist_gray text-center capitalize"
        style={{ marginTop: 10 }}
      >
        Low energy pleasant
      </Text>
    </View>
  );
};

export const HighEnergyUnpleasantButton =
  withHapticFeedback(HighEnergyUnpleasant);
export const HighEnergyPleasantButton = withHapticFeedback(HighEnergyPleasant);
export const LowEnergyUnpleasantButton =
  withHapticFeedback(LowEnergyUnpleasant);
export const LowEnergyPleasantButton = withHapticFeedback(LowEnergyPleasant);

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
  }
});
