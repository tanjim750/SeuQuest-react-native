import { Animated, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useRef } from 'react'

export default function Loader() {
  const dot1 = useRef(new Animated.Value(1)).current;
  const dot2 = useRef(new Animated.Value(1)).current;
  const dot3 = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    const createBounce = (animatedValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animatedValue, {
            toValue: 1.5,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      );
    };

    createBounce(dot1, 500).start();
    createBounce(dot2, 1000).start();
    createBounce(dot3, 1500).start();
  }, []);

  return (
    <>
        <StatusBar hidden={false} barStyle={"light-content"} backgroundColor={"#0F172A"}  />
        <View className='flex-col bg-[#0F172A] gap-7 w-full h-full justify-center items-center '>
            <Image source={require("assets/logo.png")} className='border border-gray-300 rounded-full w-36 h-36' />
            <View className='flex-row gap-1'>
                <Animated.View className='w-3 h-3 bg-blue-500 rounded-full' style={{transform:[{scale:dot1}]}}/>
                <Animated.View className='w-3 h-3 bg-blue-500 rounded-full' style={{transform:[{scale:dot2}]}}/>
                <Animated.View className='w-3 h-3 bg-blue-500 rounded-full' style={{transform:[{scale:dot3}]}}/>
            </View>
        </View>
    </>
  )
}

const styles = StyleSheet.create({})