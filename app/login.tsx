import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import { UmsApiRequest } from "components/apiRequest";
import AlertBox from "components/alertBox";
import Toast from "react-native-toast-message";
import { useAuth } from "components/context/AuthContext";
import { Redirect } from "expo-router";

const LoginScreen = () => {
  const { login, authenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [signInBtn, setSignInBtn] = useState(false);
  const [IspasswordShow, setIsPasswordShow] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if(email.length>0 && password.length>0){
        setSignInBtn(true);
    }else{
        setSignInBtn(false);
    }
  },[email, password]);

  const signIn = async () => {
    

    // if(email.toLocaleLowerCase() == "default" && password.toLocaleLowerCase() == "default"){
    //     navigation.navigate("(dash)");
    //     return;
    // }
    
    if(email.length>4 && password.length>8){
        setSignInBtn(false);
        // if(await login(email,password)){
        //     navigation.navigate("(dash)");
        // }
        login(email,password)
        
    }else{
        
        Toast.show({
            type: 'error',
            text1:"Warning",
            text2: "Please enter correct username and password",
            text1Style:{color: "red"}
        })
    }
  }

  if(authenticated) return <Redirect href={"(dash)"}/>

  return (
    <>
        <View className="flex-1 bg-[#f1f5f9] justify-center items-center p-6">
            <View className="bg-white ml-5 mr-5 w-[100%] pt-14 pb-10 rounded-xl p-5">
                <View className="items-center">
                    <Image source={require("assets/logo.png")} className="w-32 h-32" />
                    <Text className="text-4xl font-bold text-gray-800 mt-2">Sign in</Text>
                </View>

                {/* Input Fields */}
                <View className="w-full mt-6">
                    <Text className="mb-1 ">Username/Student Code*</Text>
                    <TextInput
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm"
                    
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    />
                </View>

                <View className="w-full mt-4">
                    <Text className="mb-1 ">Password*</Text>
                    <View className="flex-row pr-2 items-center w-full border border-gray-300 rounded-lg bg-white shadow-sm">
                        <TextInput
                            className="h-full w-[95%] p-3"
                            
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!IspasswordShow}
                        />
                        <TouchableOpacity className="w-10" onPress={() => setIsPasswordShow(!IspasswordShow)}>
                            
                            <FontAwesome name={IspasswordShow? "eye-slash":"eye"} color={"gray"} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Register Link */}
                <View className="flex-row items-center justify-between mt-10">
                    {/* Checkbox */}
                    <TouchableOpacity className="flex-row items-center" onPress={() => setCheckbox(!checkbox)}>
                        <Checkbox
                            value={checkbox}
                            color={"#4F46E5"} 
                            style={{width:17, height:17}}
                            onValueChange={() => setCheckbox(!checkbox)}
                        />
                        <Text className="text-gray-600 ml-2">Remember me</Text>
                    </TouchableOpacity>

                    {/* Forget Password */}
                    <TouchableOpacity onPress={() => Linking.openURL("https://ums.seu.edu.bd/forgot-password")}>
                        <Text className="text-[#8083F4] font-semibold" >Forget password</Text>
                    </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity disabled={!signInBtn} onPress={signIn}
                    className={`w-full p-3 rounded-full mt-6 shadow-md ${signInBtn ? "bg-[#4F46E5]":"bg-[#8a86d8]"}`}>
                    <Text className="text-white text-center text-lg">Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Linking.openURL("https://ums.seu.edu.bd/important-contact")}
                    className="flex-row items-center justify-center w-full bg-white border border-gray-300 p-3 rounded-full mt-6 active:bg-blue-600">
                    <FontAwesome name="question-circle-o" size={20} color="gray" className="mr-2" />
                    <Text className="text-black text-lg font-medium">Important Contact</Text>
                </TouchableOpacity>

                <View className="flex-row items-center justify-center w-full bg-white p-3 rounded-full mt-6">
                    <View className="w-[20%] h-[1px] bg-gray-300 mr-4" />
                    <Text className="text-gray-400 text-md">SEUQuest App Version: 1.0.0</Text>
                    <View className="w-[20%] h-[1px] bg-gray-300 ml-4" />
                </View>

                <View className="flex-row items-center justify-center w-full bg-white rounded-full">
                    <Text className="text-gray-400 text-md">Developed By</Text>
                    <Text className="text-[#acacb5] font-semibold text-md" 
                        onPress={() => Linking.openURL("https://tanjim-abubokor.github.io/")}> Tanjim Abubokor</Text>
                </View>

                
            </View>
            
            </View>
    </>
  );
};

export default LoginScreen;
