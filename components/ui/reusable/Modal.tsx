import React, { ReactNode } from "react";
import {
  Modal as RNModal,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { BlurView } from "expo-blur";
import { withHapticFeedback } from "./HapticButton";
import { XMarkIcon } from "../../svg/icons";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}
const XMarkWithHaptic = withHapticFeedback(XMarkIcon);

export const Modal: React.FC<ModalProps> = ({ visible, onClose, children }) => {
  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <BlurView style={styles.modalContainer}>
        <View style={styles.modalContent}>{children}</View>
        <TouchableOpacity style={styles.closeButton}>
          <XMarkWithHaptic onPress={onClose} />
        </TouchableOpacity>
      </BlurView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "relative"
  },
  modalContent: {
    width: "80%",
    height: "100%",
    padding: 20
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    top: 20,
    left: 10
  }
});
