import { ReactNode } from "react";

export interface ModalLayoutProps {
  isVisible: boolean;
  children: ReactNode;
  onRequestClose: () => void;
}

export interface ModalContentProps {
  mediaType: "image" | "video" | undefined;
  imgSrc: string | undefined;
  videoId: string;
  copyright?: string;
  title: string | undefined;
  body: string | undefined;
  onCloseModal: () => void;
  onPressCallToAction: () => void;
  onLoadImage: () => void;
  onErrorImage: () => void;
}

export interface TouchableImagePoDProps {
  uri: string | undefined;
  imageTitle: string | undefined;
  mediaType: "image" | "video" | undefined;
  isLoading: boolean;
  onLoadImage: () => void;
  onErrorImage: () => void;
}
