import Toast from "react-native-toast-message";
import * as PickImage from 'expo-image-picker'

export const ImagePicker = async () => {
    const { status } = await PickImage.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
        Toast.show({
            type: "error",
            text1: "Permission Denied",
            text2: "Allow storage permission to save images.",
        });
        return [];
    }
    
    let result = await PickImage.launchImageLibraryAsync({
        allowsMultipleSelection:true
    });
    if (!result.canceled) {
        Toast.show({
            type: "success",
            text1: "Uploaded",
            text2: "Uploaded image was successfully uploaded",
        });

        return result.assets.map(asset => asset.uri)
    } else {
        Toast.show({
            type: "error",
            text1: "Canceled",
            text2: "Image upload cancelled",
        });

        return [];
    }

}
