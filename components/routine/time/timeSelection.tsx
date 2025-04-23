import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Checkbox from 'expo-checkbox';
import Toast from 'react-native-toast-message';

export default function TimeSelection({start,setStartTime,end,setEndTime}:any) {

    const startTimes = [
        "8:00","9:00","10:00","11:00","12:00","13:00","14:00", "15:00", "16:00","17:00"
    ]

    const endTimes = [
        "11:00","12:00","13:00","14:00", "15:00", "16:00","17:00","18:00","19:00","20:00"
    ]

    useEffect(() => {
        setStartTime(startTimes[0])
        setEndTime(endTimes[endTimes.length-1])
    },[])

    const handleEndTime = (endTime:string) => {
        console.log(`${endTime.replace(":",".")}-${start.replace(":",".")}`,parseFloat(endTime.replace(":",".")) > parseFloat(start.replace(":",".")))
        if(parseFloat(endTime.replace(":",".")) > parseFloat(start.replace(":","."))){
            setEndTime(endTime)
        }else{
            Toast.show({
                type:"error",
                text1:"Warning",
                text2:"End time must be grater then start time.",
                text1Style:{color:"red"}
            })
        }
    }

    const handleStartTime = (startTime:string) => {
        if(parseFloat(end.replace(":",".")) > parseFloat(startTime.replace(":","."))){
            setStartTime(startTime)
        }else{
            Toast.show({
                type:"error",
                text1:"Warning",
                text2:"Start time must be smaller then end time",
                text1Style:{color:"red"}
            })
        }
    }

  return (
    <View className={`p-4 rounded-2xl shadow-md bg-white`}>
      <Text className='text-md font-medium text-gray-700 mb-5'>Time Selection</Text>
      <View className="flex-row items-center w-full">
            <View className="h-0.5 flex-1 bg-gray-200" />
            <Text className="text-sm text-gray-400 mx-2">Start Time</Text>
            <View className="h-0.5 flex-1 bg-gray-200" />
      </View>
      <View className='flex-wrap flex-row gap-3 mt-3'>
            {startTimes.map((time,idx) => 
                <TouchableOpacity  key={idx}
                    className="flex-row gap-2 px-2 py-1 text-gray-600 font-medium bg-gray-200 rounded-l-sm"
                    onPress={() => handleStartTime(time)}>
                    <Checkbox
                        value={start == time}
                        color={start == time? "#4ade80":"#6b7280"} 
                        style={{width:17, height:17}}
                        onChange={() => handleStartTime(time)}
                    />
                    <Text className=' text-gray-500 font-medium'>{time}</Text>
                </TouchableOpacity>
            )}
      </View>
      <View className="flex-row items-center w-full mt-7">
            <View className="h-0.5 flex-1 bg-gray-200" />
            <Text className="text-sm text-gray-400 mx-2">End Time</Text>
            <View className="h-0.5 flex-1 bg-gray-200" />
      </View>
      <View className='flex-wrap flex-row gap-3 mt-3'>
            {endTimes.map((time,idx) => 
                <TouchableOpacity  key={idx}
                    className="flex-row gap-2 px-2 py-1 text-gray-600 font-medium bg-gray-200 rounded-l-sm"
                    onPress={() => handleEndTime(time)}>
                    <Checkbox
                        value={end==time}
                        color={end==time? "#4ade80":"#6b7280"} 
                        style={{width:17, height:17}}
                        onChange={() => handleEndTime(time)}
                    />
                    <Text className=' text-gray-500 font-medium'>{time}</Text>
                </TouchableOpacity>
            )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})