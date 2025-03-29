import { Stack } from "expo-router";
import "../global.css"
import { StatusBar } from "react-native";
import { Color } from "components/color";
import Toast from "react-native-toast-message";

export default function Layout() {
  return (
    <>
      <StatusBar hidden={false} barStyle={"dark-content"} backgroundColor={Color.bg}  />
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(dash)" />
      </Stack>
      <Toast />
    </>
  );
}
