import { View, Text } from "react-native";
import { XCircleIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons"

export default function AlertBox({ message, visible, color, success }:any) {
  if (!visible) return null; // Hide the alert when not needed

  return (
    <View className={`absolute top-10 left-5 right-5 bg-white border ${success? "border-green-600":"border-red-600"} p-3 rounded-lg flex-row items-center z-50`}>
        {/* {success && 
            
        } */}
        <FontAwesome name={!success? "question-circle-o":"check-circle-o"} color={color} size={20} />
      <Text className="font-semibold" style={{color:color}}> {message}</Text>
    </View>
  );
}
