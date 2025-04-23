import { View, Text, Button } from "react-native";
import { Link, Redirect, useNavigation, useRouter } from "expo-router";
import Header from "components/header";
import LoginScreen from "./login";
import { AuthContext, useAuth } from "components/context/AuthContext";
import { useContext, useEffect } from "react";
import Loader from "components/loading/Loader";

export default function HomeScreen() {
  const { authenticated, isLoading } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    // console.log("index loading.....",isLoading)
    if(isLoading){
      navigation.navigate("index");
    }
    else if(authenticated){
      navigation.navigate("(dash)");
    }else{
      navigation.navigate("login");
    }
  }, [authenticated]);

  
  if(isLoading) return <Loader/>
  if (!authenticated) {
    return <LoginScreen />;
  }

  return <Redirect href="(dash)" />;
  
}
