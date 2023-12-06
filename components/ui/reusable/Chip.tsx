import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Pressable, Text } from "..";

export const Chip: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Pressable style={styles.container}>{children}</Pressable>;
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 50,
    gap: 15,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 3,
    paddingVertical: 1.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginHorizontal: 25
  }
});
