import React, { useCallback, useEffect, useState } from "react";
import { Image } from "expo-image";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Text } from "..";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { API_BASE_URL } from "../../../constants";
import { XMarkIcon } from "../../svg";
import Animated from "react-native-reanimated";

type ApiResponse = {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: "image";
  service_version: "v1";
  title: string;
  url: string;
};

export const PictureOfTheDayCard = () => {
  const [fontsLoaded] = useFonts({
    "Satoshi-Bold": require("../../../assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Regular": require("../../../assets/fonts/Satoshi-Regular.otf")
  });

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}`);
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      fetchData(); // Fetch data when fonts are loaded
    }
  }, [fontsLoaded, fetchData]);

  useEffect(() => {
    fetchData(); // Initial data fetch
  }, [fetchData]);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  if (!fontsLoaded || loading) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onLayout={onLayoutRootView}
      onPress={toggleModal}
    >
      <Animated.Image
        source={{
          uri: data?.url
        }}
        style={styles.image}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      {imageLoading && <Text style={styles.loadingText}>Loading Image...</Text>}
      <LinearGradient
        colors={["transparent", "rgba(0, 0, 0, 0.4)"]}
        style={styles.overlay}
      >
        <Text style={styles.overlayText}>Picture of the day</Text>
      </LinearGradient>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.modalContainer}>
            <Image
              source={{ uri: data?.url }}
              placeholder={require("../../../assets/icon.png")}
              style={styles.modalImage}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            <Text style={styles.modalText}>{data?.explanation}</Text>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <XMarkIcon />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 30,
    marginBottom: 55,
    marginTop: 32,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "cover"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },
  overlayText: {
    fontFamily: "Satoshi-Bold",
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  loadingText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontFamily: "Satoshi-Bold",
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: 10,
    height: 666
  },
  modalText: {
    fontSize: 14,
    color: "white",
    padding: 20,
    fontFamily: "Satoshi-Regular"
  },
  modalImage: {
    width: 350,
    height: 200,
    objectFit: "cover",
    marginTop: 70
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10
  }
});
