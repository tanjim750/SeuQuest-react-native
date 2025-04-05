import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Checkbox from 'expo-checkbox';

export default function TimeSelection() {
    const [checkbox, setCheckbox] = useState(false);
    const courses = [
        "8 am","9 am","10 am","11 am","12 am","1 am",
    ]

  return (
    <View className={`p-4 rounded-2xl shadow-md bg-white`}>
      <Text className='text-md font-medium text-gray-700 mb-5'>Time Selection</Text>
      <View className="flex-row items-center w-full">
            <View className="h-0.5 flex-1 bg-gray-200" />
            <Text className="text-sm text-gray-400 mx-2">Start Time</Text>
            <View className="h-0.5 flex-1 bg-gray-200" />
      </View>
      <View className='flex-wrap flex-row gap-3 mt-3'>
            {courses.map((day,idx) => 
                <TouchableOpacity  key={idx}
                    className="flex-row gap-2 px-2 py-1 text-gray-600 font-medium bg-gray-200 rounded-l-sm"
                    onPress={() => setCheckbox(!checkbox)}>
                    <Checkbox
                        value={checkbox}
                        color={checkbox? "#4ade80":"#6b7280"} 
                        style={{width:17, height:17}}
                        
                    />
                    <Text className=' text-gray-500 font-medium'>{day}</Text>
                </TouchableOpacity>
            )}
      </View>
      <View className="flex-row items-center w-full mt-7">
            <View className="h-0.5 flex-1 bg-gray-200" />
            <Text className="text-sm text-gray-400 mx-2">End Time</Text>
            <View className="h-0.5 flex-1 bg-gray-200" />
      </View>
      <View className='flex-wrap flex-row gap-3 mt-3'>
            {courses.map((day,idx) => 
                <TouchableOpacity  key={idx}
                    className="flex-row gap-2 px-2 py-1 text-gray-600 font-medium bg-gray-200 rounded-l-sm"
                    onPress={() => setCheckbox(!checkbox)}>
                    <Checkbox
                        value={checkbox}
                        color={checkbox? "#4ade80":"#6b7280"} 
                        style={{width:17, height:17}}
                        
                    />
                    <Text className=' text-gray-500 font-medium'>{day}</Text>
                </TouchableOpacity>
            )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})