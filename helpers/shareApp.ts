import { Alert, Share } from "react-native";

export const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        "Ad astra | A mental health application for astronomy enthusiasts",
      title: "Ad astra"
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    Alert.alert(error.message);
  }
};
