import { View, Text, Button } from "react-native";
import { Link, Redirect, useNavigation, useRouter } from "expo-router";
import Header from "components/header";
import LoginScreen from "./login";
import { AuthContext, useAuth } from "components/context/AuthContext";
import { useContext, useEffect } from "react";

export default function HomeScreen() {
  const { authenticated } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if(authenticated){
      navigation.navigate("(dash)");
    }else{
      navigation.navigate("login");
    }
  }, [authenticated]);

  if (!authenticated) {
    return <LoginScreen />;
  }

  return <Redirect href="(dash)" />;
  
}
