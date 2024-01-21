import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  Animated,
  Pressable,
  Modal as RNModal,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Haptics from "expo-haptics";
import { Gyroscope } from "expo-sensors";
import YoutubePlayer from "react-native-youtube-iframe";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { API_BASE_URL } from "../../../constants";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Overlay } from "./Overlay";
import { withHapticFeedback } from "./HapticButton";
import { ArrowsPointingOut, XMarkIcon } from "../../svg/icons";
import { LinearGradient } from "expo-linear-gradient";
import { Modal } from "./Modal";
import { SafeAreaView } from "moti";
import { BlurView } from "expo-blur";
import { Easing } from "react-native-reanimated";
import {
  DominantColorsResponse,
  PictureOfTheDayResponse
} from "../../../types/api";
import {
  ModalContentProps,
  ModalLayoutProps,
  TouchableImagePoDProps
} from "../../../types/pictureOfTheDay";
import useRequest, { GetRequest } from "../../../helpers/fetcher";

function CallToActionButton() {
  return (
    <View style={styles.styledButton}>
      <Text style={{ fontFamily: "Satoshi-Bold" }}>
        Share your thoughts on this
      </Text>
    </View>
  );
}

const XMarkIconWithHaptic = withHapticFeedback(XMarkIcon);
const ArrowsPointingOutWithHaptic = withHapticFeedback(ArrowsPointingOut);
const CallToActionWithHaptic = withHapticFeedback(CallToActionButton);

const tiltValue = new Animated.ValueXY({ x: 0, y: 0 });
const sensitivityFactor = 0.3;

const requestConfig: GetRequest = {
  method: "GET",
  url: `${API_BASE_URL}`
};

export const PictureOfTheDayCard: React.FC<{
  onPressCallToAction: () => void;
  dominantColors: DominantColorsResponse["colors"];
}> = ({ onPressCallToAction, dominantColors }) => {
  const [fontsLoaded] = useFonts({
    "Satoshi-Bold": require("../../../assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Italic": require("../../../assets/fonts/Satoshi-Italic.otf"),
    "Satoshi-Regular": require("../../../assets/fonts/Satoshi-Regular.otf"),
    "Zodiak-Italic": require("../../../assets/fonts/Zodiak-Italic.otf"),
    "Zodiak-Regular": require("../../../assets/fonts/Zodiak-Regular.otf")
  });

  const [imageLoading, setImageLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [videoId, setVideoId] = useState("");

  const { data: apiData } = useRequest<PictureOfTheDayResponse>(requestConfig);

  useEffect(() => {
    const _subscribeToGyroscope = async () => {
      try {
        Gyroscope.setUpdateInterval(16);
        Gyroscope.addListener((data) => {
          const scaledData = {
            x: data.x * sensitivityFactor,
            y: data.y * sensitivityFactor
          };

          Animated.spring(tiltValue, {
            toValue: { x: -scaledData.y, y: scaledData.x },
            friction: 8,
            useNativeDriver: false // NOTE:Animated.spring does not support native driver for this configuration
          }).start();
        });
      } catch (error) {
        console.error("Error subscribing to gyroscope:", error);
      }
    };

    _subscribeToGyroscope();

    return () => {
      _unsubscribeFromGyroscope();
    };
  }, []);

  const _unsubscribeFromGyroscope = () => {
    Gyroscope.removeAllListeners();
  };

  const getVideoId = (uri: string): string | null => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
    const match = uri.match(regex);

    return match ? match[1] : null;
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (!apiData) return;
    const videoId = getVideoId(apiData?.url as string);
    setVideoId(videoId as string);
  }, [apiData]);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.card,
        {
          // Apply the tilt effect using the interpolated values
          transform: [
            { perspective: 1000 },
            {
              rotateX: tiltValue.y.interpolate({
                inputRange: [-1, 1],
                outputRange: ["10deg", "-10deg"]
              })
            },
            {
              rotateY: tiltValue.x.interpolate({
                inputRange: [-1, 1],
                outputRange: ["-10deg", "10deg"]
              })
            }
          ]
        }
      ]}
      onLayout={onLayoutRootView}
    >
      <Pressable onPress={toggleModal}>
        <TouchableImagePoD
          uri={apiData?.hdurl}
          imageTitle={apiData?.title}
          gradientOverlayColors={dominantColors}
          mediaType={apiData?.media_type}
          isLoading={imageLoading}
          onLoadImage={handleImageLoad}
          onErrorImage={handleImageError}
        />
        <ModalLayout isVisible={isModalVisible} onRequestClose={toggleModal}>
          <ModalContent
            title={apiData?.title}
            body={apiData?.explanation}
            copyright={apiData?.copyright}
            imgSrc={apiData?.hdurl}
            mediaType={apiData?.media_type}
            videoId={videoId}
            onCloseModal={toggleModal}
            onLoadImage={handleImageLoad}
            onErrorImage={handleImageError}
            onPressCallToAction={onPressCallToAction}
          />
        </ModalLayout>
      </Pressable>
    </Animated.View>
  );
};

const ModalLayout: React.FC<ModalLayoutProps> = ({
  isVisible,
  children,
  onRequestClose
}) => {
  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContainer}>{children}</View>
    </RNModal>
  );
};

export const ModalContent: React.FC<ModalContentProps> = ({
  title,
  body,
  copyright,
  mediaType,
  imgSrc,
  videoId,
  onCloseModal,
  onLoadImage,
  onErrorImage,
  onPressCallToAction
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const snapPoints = useMemo(() => ["40%", "100%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index <= 0) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, []);

  return (
    <>
      {mediaType === "image" ? (
        <Overlay>
          <Image
            source={{ uri: imgSrc }}
            style={styles.modalImage}
            onLoad={onLoadImage}
            onError={onErrorImage}
          />
        </Overlay>
      ) : (
        mediaType === "video" && (
          <YoutubePlayer
            height={300}
            videoId={videoId}
            webViewStyle={styles.modalImage}
          />
        )
      )}
      <BottomSheet
        ref={bottomSheetRef}
        style={{ borderRadius: 0 }}
        handleIndicatorStyle={{ display: "none" }}
        backgroundStyle={{ backgroundColor: "#010101" }}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        animateOnMount={false}
      >
        <BottomSheetView
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            alignItems: "center",
            flexDirection: "column",
            paddingVertical: 10
          }}
        >
          <SafeAreaView>
            <Text style={styles.modalTitle}>{title}</Text>
            <ScrollView
              contentContainerStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 30
              }}
            >
              <Text style={styles.modalText}>{body}</Text>
              {copyright && (
                <Text
                  style={[styles.modalText, { color: "#9d9d9d", fontSize: 13 }]}
                >
                  &copy;{copyright}
                </Text>
              )}
              <CallToActionWithHaptic onPress={onPressCallToAction} />
            </ScrollView>
          </SafeAreaView>
        </BottomSheetView>
      </BottomSheet>

      <SafeAreaView style={styles.navbar}>
        {[
          <XMarkIconWithHaptic key={0} onPress={onCloseModal} />,
          <ArrowsPointingOutWithHaptic key={1} onPress={openModal} />
        ].map((icon, idx) => (
          <View key={idx} style={{ marginHorizontal: 15 }}>
            {icon}
          </View>
        ))}
      </SafeAreaView>
      <Modal visible={modalVisible} onClose={closeModal}>
        <Image
          source={{ uri: imgSrc }}
          style={styles.expandedImage}
          onLoad={onLoadImage}
          onError={onErrorImage}
        />
      </Modal>
    </>
  );
};

const TouchableImagePoD: React.FC<TouchableImagePoDProps> = ({
  uri,
  imageTitle,
  mediaType,
  isLoading,
  gradientOverlayColors,
  onLoadImage,
  onErrorImage
}) => {
  const linearGradientColors = gradientOverlayColors.map((c) => `#${c}`);

  return (
    <View>
      <Image
        source={{
          uri: uri
        }}
        style={styles.image}
        onLoad={onLoadImage}
        onError={onErrorImage}
      />
      {isLoading && <Text style={styles.loadingText}>Loading Image...</Text>}
      <LinearGradient
        colors={linearGradientColors.map((color) => color + "30")} // '80' sets the alpha channel to 0.5 (adjust as needed)
        style={styles.overlay}
      >
        <View style={styles.blurredChipWrapper}>
          <BlurView style={styles.blurredChip} intensity={20} tint="default">
            <Text style={styles.overlayText}>Picture of The Day</Text>
          </BlurView>
        </View>
        <Text style={styles.overlayTitle}>{imageTitle}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 30,
    marginBottom: 55,
    marginTop: 32,
    overflow: "hidden",
    borderRadius: 10
  },
  overlayTitle: {
    fontSize: 25,
    fontFamily: "Satoshi-Bold",
    color: "#fff",
    margin: 20
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    height: 666,
    zIndex: 100,
    position: "relative"
  },

  modalImage: {
    width: "100%",
    height: "100%",
    objectFit: "fill",
    position: "absolute",
    top: 0
  },
  expandedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 20
  },
  modalTitle: {
    fontSize: 30,
    alignSelf: "flex-start",
    color: "white",
    padding: 20,
    fontFamily: "Zodiak-Regular"
  },

  modalText: {
    fontSize: 14,
    lineHeight: 24,
    color: "white",
    padding: 20,
    fontFamily: "Satoshi-Regular"
  },

  navbar: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    width: "100%",
    zIndex: 1
  },

  styledButton: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: "85%",
    padding: 10,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    borderRadius: 10,
    height: 400,
    objectFit: "cover"
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    opacity: 1,
    paddingVertical: 15
  },
  blurredChipWrapper: {
    position: "absolute",
    top: 20,
    left: 10,
    borderRadius: 100,
    overflow: "hidden"
  },

  blurredChip: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  overlayText: {
    fontFamily: "Satoshi-Regular",
    color: "white",
    textTransform: "uppercase",
    fontSize: 13,
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
  }
});
