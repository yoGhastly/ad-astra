import React, { FC, useEffect } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle
} from "react-native";

interface OverlayProps {
  isVisible: boolean;
  onClose: () => void;
  style?: StyleProp<ViewStyle>;
}

const OverlayComponent: FC<OverlayProps> = ({ isVisible, onClose, style }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, style]}></View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 1)"
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 5
  }
});

export default OverlayComponent;
