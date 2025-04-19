import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Checkbox from 'expo-checkbox';



export default function DayChoise({day,setDay}:any) {
    const days = [
        "Saturday/Thursday", "Sunday/Tuesday", "Monday/wednesday", "Friday"
    ]

  return (
    <View className={`p-4 rounded-2xl shadow-md bg-white`}>
      <Text className='text-md font-medium text-gray-700 mb-5'>Day Selection</Text>
      <View className='flex-wrap flex-row gap-3'>
            {days.map((d,idx) => 
                <TouchableOpacity 
                    key={idx}
                    className="flex-row gap-2 px-2 py-1 text-gray-00 font-medium bg-gray-200 rounded-l-sm"
                    onPress={() => setDay(d)}>
                    <Checkbox
                        value={day == d}
                        color={day == d? "#4ade80":"#6b7280"} 
                        style={{width:17, height:17}}
                        
                    />
                    <Text className=' text-gray-500 font-medium'>{d}</Text>
                </TouchableOpacity>
            )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})