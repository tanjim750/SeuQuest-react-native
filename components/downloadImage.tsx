import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

export const DownloadImages = async (imageUrls: string[]) => {
  // console.log(`Downloading fn`);
  // Request permission to save images to gallery
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== "granted") {
    Toast.show({
      type: "error",
      text1: "Permission Denied",
      text2: "Allow storage permission to save images.",
    });
    return;
  }

  Toast.show({
    type: "success",
    text1: "Downloading...",
    text2: "Please wait a moment while images download.",
  });

  try {
    for (const [index, url] of imageUrls.entries()) {
      const fileUri = FileSystem.documentDirectory + `image_${index + 1}.jpg`;
      
      // Download the image to app storage
      const { uri } = await FileSystem.downloadAsync(url, fileUri);

      // Save the downloaded image to gallery
      await MediaLibrary.saveToLibraryAsync(uri);
    }

    Toast.show({
      type: "success",
      text1: "Download Complete",
      text2: "All images have been saved to your gallery.",
    });
  } catch (error:any) {
    Toast.show({
      type: "error",
      text1: "Download Failed",
      text2: error.message.toString(), // "An error occurred while downloading."
    });
  }
};
