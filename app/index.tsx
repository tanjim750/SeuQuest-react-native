import { View, Text, Button } from "react-native";
import { Link, useRouter } from "expo-router";
import Header from "components/header";
import LoginScreen from "./login";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <LoginScreen/>
  );
}
