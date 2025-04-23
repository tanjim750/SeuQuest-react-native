import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Checkbox from 'expo-checkbox';
import DayCheckbox from './dayCheckbox';



export default function DayChoise({selectedDays,setDay}:any) {
    const days = [
        "Saturday/Thursday", "Sunday/Tuesday", "Monday/wednesday", "Friday"
    ]

    const handleBtnPress = (checked:boolean,day:string) => {
      if(checked){
        const newList = [...selectedDays]
        newList.push(day)
        setDay(newList)
        // console.log("added",selectedDays)
      }else{
        const newList = [...selectedDays.filter((d:string)=> d != day)]
        setDay(newList)
        // console.log("removed",selectedDays)

      }
    }

  return (
    <View className={`p-4 rounded-2xl shadow-md bg-white`}>
      <Text className='text-md font-medium text-gray-700 mb-5'>Day Selection</Text>
      <View className='flex-wrap flex-row gap-3'>
            {days.map((d,idx) => 
          
                <DayCheckbox
                  key={idx}
                  selected={selectedDays.includes(d)}
                  day={d}
                  handleBtnPress={handleBtnPress}
                />
            )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})