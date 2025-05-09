import { Stack } from "expo-router";
import "../global.css"
import { StatusBar } from "react-native";
import { Color } from "components/color";
import Toast from "react-native-toast-message";
import { AuthProvider } from "components/context/AuthContext";

export default function Layout() {
  return (
    <>
      <StatusBar hidden={false} barStyle={"dark-content"} backgroundColor={Color.bg}  />
      <AuthProvider>
        <Stack screenOptions={{headerShown:false}}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          {/* <Stack.Screen name="loader" /> */}
          <Stack.Screen name="(dash)" />
        </Stack>
      </AuthProvider>
      <Toast />
    </>
  );
}
