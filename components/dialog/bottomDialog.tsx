import { Dimensions, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  runOnJS, 
  withTiming
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MIN_HEIGHT = SCREEN_HEIGHT * 0.3; // Minimum collapsed height
const MAX_HEIGHT = SCREEN_HEIGHT * 0.85; // Maximum expanded height

const BottomDialog = ({ children, onClose }: any) => {
  const translateY = useSharedValue(MIN_HEIGHT); // Default to min height
  const lastHeight = useSharedValue(MIN_HEIGHT); // Track last height
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSpring(MIN_HEIGHT, { damping: 20 });
    opacity.value = withSpring(1, { damping: 50 });
  }, []);

  // Handles swipe gestures
  const gesture = Gesture.Pan()
    .onStart(() => {
      lastHeight.value = translateY.value;
    })
    .onUpdate((event) => {
      let newHeight = lastHeight.value - event.translationY;
      newHeight = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, newHeight));
      translateY.value = newHeight;
    })
    .onEnd((event) => {
      if (translateY.value < MIN_HEIGHT + 50) {
        runOnJS(onClose)(); // Close if swiped down significantly
      } else {
        translateY.value = withSpring(translateY.value,{damping: 50});
      }
    });

  // Animated style for dialog height
  const animatedStyle = useAnimatedStyle(() => ({
    height: translateY.value,
    opacity: opacity.value
  }));

  return (
    
      <Animated.View
        className="bg-slate-200 rounded-2xl  border border-t-2 border-x-1 border-b-0 border-x-slate-200 border-t-slate-400 w-full"
        style={animatedStyle}
      >
        <View className="px-3">
          <GestureDetector gesture={gesture}>
            <TouchableOpacity className="flex-row justify-center items-center w-full h-6 bg-slate-200">
              <TouchableOpacity className="w-24 h-1.5 bg-[#8083F4] rounded-md" />
            </TouchableOpacity>
          </GestureDetector>
          {/* Drag Handle */}

        </View>
        <View className="h-full bg-slate-100 pb-6">
            <ScrollView className="h-full p-5">
                {children}
            </ScrollView>
        </View>
      </Animated.View>
  );
};

export default BottomDialog;
