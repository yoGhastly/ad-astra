export type PictureOfTheDayResponse = {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: "image" | "video";
  service_version: "v1";
  title: string;
  url: string;
};

export interface DominantColorsResponse {
  code: number;
  colors: string[];
  message: string;
  success: boolean;
}
