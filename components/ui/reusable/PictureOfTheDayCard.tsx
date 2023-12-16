import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  Modal as RNModal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Haptics from "expo-haptics";
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

interface ModalLayoutProps {
  isVisible: boolean;
  children: ReactNode;
  onRequestClose: () => void;
}

interface ModalContentProps {
  mediaType: "image" | "video" | undefined;
  imgSrc: string | undefined;
  videoId: string;
  title: string | undefined;
  body: string | undefined;
  onCloseModal: () => void;
  onPressCallToAction: () => void;
  onLoadImage: () => void;
  onErrorImage: () => void;
}

interface TouchableImagePoDProps {
  uri: string | undefined;
  imageTitle: string | undefined;
  mediaType: "image" | "video" | undefined;
  isLoading: boolean;
  onLoadImage: () => void;
  onErrorImage: () => void;
}
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

const gradientList = {
  imageType: ["transparent", "rgba(0, 0, 0, 0.5)"],
  videoType: ["transparent", "blue"]
};

function CallToActionButton() {
  return (
    <View style={styles.styledButton}>
      <Text style={{ fontFamily: "Satoshi-Bold" }}>
        What does this makes you feel?
      </Text>
    </View>
  );
}

const XMarkIconWithHaptic = withHapticFeedback(XMarkIcon);
const ArrowsPointingOutWithHaptic = withHapticFeedback(ArrowsPointingOut);
const CallToActionWithHaptic = withHapticFeedback(CallToActionButton);

export const PictureOfTheDayCard: React.FC<{
  onPressCallToAction: () => void;
}> = ({ onPressCallToAction }) => {
  const [fontsLoaded] = useFonts({
    "Satoshi-Bold": require("../../../assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Italic": require("../../../assets/fonts/Satoshi-Italic.otf"),
    "Satoshi-Regular": require("../../../assets/fonts/Satoshi-Regular.otf"),
    "Zodiak-Italic": require("../../../assets/fonts/Zodiak-Italic.otf"),
    "Zodiak-Regular": require("../../../assets/fonts/Zodiak-Regular.otf")
  });

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [videoId, setVideoId] = useState("");

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

  const getVideoId = (uri: string): string | null => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
    const match = uri.match(regex);

    return match ? match[1] : null;
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      fetchData(); // Fetch data when fonts are loaded
    }
  }, [fontsLoaded, fetchData]);

  useEffect(() => {
    fetchData(); // Initial data fetch
  }, [fetchData]);

  useEffect(() => {
    if (!data) return;
    const videoId = getVideoId(data?.url as string);
    setVideoId(videoId as string);
  }, [data]);

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
      <TouchableImagePoD
        uri={data?.url}
        imageTitle={data?.title}
        mediaType={data?.media_type}
        isLoading={imageLoading}
        onLoadImage={handleImageLoad}
        onErrorImage={handleImageError}
      />
      <ModalLayout isVisible={isModalVisible} onRequestClose={toggleModal}>
        <ModalContent
          title={data?.title}
          body={data?.explanation}
          imgSrc={data?.url}
          mediaType={data?.media_type}
          videoId={videoId}
          onCloseModal={toggleModal}
          onLoadImage={handleImageLoad}
          onErrorImage={handleImageError}
          onPressCallToAction={onPressCallToAction}
        />
      </ModalLayout>
    </TouchableOpacity>
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
    console.log("handleSheetChanges", index);
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
        handleIndicatorStyle={{ backgroundColor: "#9d9d9d" }}
        backgroundStyle={{ backgroundColor: "#000" }}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        animateOnMount={false}
      >
        <BottomSheetView
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <View>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalText}>{body}</Text>
          </View>
          <CallToActionWithHaptic onPress={onPressCallToAction} />
        </BottomSheetView>
      </BottomSheet>

      <View style={styles.navbar}>
        {[
          <XMarkIconWithHaptic key={0} onPress={onCloseModal} />,
          <ArrowsPointingOutWithHaptic key={1} onPress={openModal} />
        ].map((icon) => icon)}
      </View>
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
  onLoadImage,
  onErrorImage
}) => {
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
        colors={
          mediaType === "image"
            ? gradientList.imageType
            : gradientList.videoType
        }
        style={styles.overlay}
      >
        <Text style={styles.overlayText}>
          {mediaType === "image" ? "Picture of the day" : imageTitle}
        </Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 30,
    marginBottom: 55,
    marginTop: 32,
    overflow: "hidden"
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    height: 666,
    zIndex: 100
  },

  modalImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
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
    color: "white",
    padding: 20,
    fontFamily: "Satoshi-Regular"
  },

  navbar: {
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    top: 20,
    padding: 15
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
  }
});
