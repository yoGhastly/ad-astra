import React, { useCallback, useEffect, useState } from "react";
import { Image } from "expo-image";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Button
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Text } from "..";
import { useFonts } from "expo-font";
import * as VideoThumbnails from "expo-video-thumbnails";
import YoutubePlayer from "react-native-youtube-iframe";
import { LinearGradient } from "expo-linear-gradient";
import { API_BASE_URL } from "../../../constants";
import { XMarkIcon } from "../../svg";
import Animated from "react-native-reanimated";

type ApiResponse = {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: "image" | "video";
  service_version: "v1";
  title: string;
  url: string;
};

export const PictureOfTheDayCard = () => {
  const [fontsLoaded] = useFonts({
    "Satoshi-Bold": require("../../../assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Italic": require("../../../assets/fonts/Satoshi-Italic.otf"),
    "Satoshi-Regular": require("../../../assets/fonts/Satoshi-Regular.otf"),
    "Zodiak-Italic": require("../../../assets/fonts/Zodiak-Italic.otf")
  });

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [videoId, setVideoId] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}`);
      const result = await response.json();
      console.log(result);
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, []);

  const generateThumbnail = async () => {
    try {
      if (!data?.url) return;
      const { uri } = await VideoThumbnails.getThumbnailAsync(data?.url, {
        time: 15000
      });
      console.log(uri);
      setThumbnail(uri);
    } catch (e) {
      console.warn(e);
    }
  };

  const getVideoId = (uri: string): string | null => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
    const match = uri.match(regex);

    return match ? match[1] : null;
  };

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);
  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      fetchData(); // Fetch data when fonts are loaded
    }
  }, [fontsLoaded, fetchData]);

  useEffect(() => {
    fetchData(); // Initial data fetch
    const videoId = getVideoId(data?.url);
    setVideoId(videoId);
    generateThumbnail();
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
          uri: data?.media_type === "image" ? data.url : (thumbnail as string)
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
            {data?.media_type === "image" ? (
              <Image
                source={{ uri: data?.url }}
                placeholder={require("../../../assets/icon.png")}
                style={styles.modalImage}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            ) : (
              <View>
                <YoutubePlayer
                  height={300}
                  play={playing}
                  videoId={videoId}
                  onChangeState={onStateChange}
                  webViewStyle={styles.modalImage}
                />
                <Button
                  title={playing ? "pause" : "play"}
                  onPress={togglePlaying}
                />
              </View>
            )}
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
    fontFamily: "Satoshi-Italic",
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
