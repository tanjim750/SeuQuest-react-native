import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Color } from 'components/color'

export default function ReviewDetails({className,facultyName,totalCmnt,ratings,poor,fair,good,veryGood,excellent, onClick, onLayout}:any) {
  return (
    <View className={`p-4 rounded-2xl shadow-md bg-white ${className}`} onLayout={onLayout}>

      <View className="flex-row justify-between" >
        <View className="flex-col">
            <Text className="text-lg font-semibold text-black mb-2">
                {facultyName}
            </Text>
            
            <Text className="text-sm font-normal text-zinc-600">Positive Comments</Text>
            <View className="flex-row items-center gap-2 mt-1">
                <View className={`bg-[${Color.primary}] p-1 rounded-full`}>
                <Text className="text-white text-sm px-3">{ratings}</Text>
                </View>
                <Text className="text-gray-500 text-sm">Out of {totalCmnt}</Text>
            </View>

            
            <View className="flex-row mt-4">
                <View className="flex-row items-center mr-4">
                    <View className="w-2.5 h-2.5 rounded-full bg-red-400 mr-1"></View>
                    <Text className="text-gray-500 text-sm">{poor}</Text>
                </View>

                <View className="flex-row items-center mr-4">
                    <View className="w-2.5 h-2.5 rounded-full bg-green-400 mr-1"></View>
                    <Text className="text-gray-500 text-sm">{fair}</Text>
                </View>

                <View className="flex-row items-center mr-4">
                    <View className="w-2.5 h-2.5 bg-cyan-500 mr-1 rounded-full"></View>
                    <Text className="text-gray-500 text-sm">{good}</Text>
                </View>

                <View className="flex-row items-center mr-4">
                    <View className="w-2.5 h-2.5 bg-amber-600 mr-1 rounded-full"></View>
                    <Text className="text-gray-500 text-sm">{veryGood}</Text>
                </View>

                <View className="flex-row items-center mr-4">
                    <View className="w-2.5 h-2.5 bg-indigo-400 mr-1 rounded-full"></View>
                    <Text className="text-gray-500 text-sm">{excellent}</Text>
                </View>
                
            </View>
        </View>
        <View className="flex-col justify-start">
            <View className="flex-row items-center mt-2">
                <View className="w-2.5 h-2.5 bg-red-400 mr-1"></View>
                <Text className="text-gray-500 text-md">Teaching Proficiency</Text>
            </View>

            <View className="flex-row items-center mt-2">
                <View className="w-2.5 h-2.5 bg-green-400 mr-1"></View>
                <Text className="text-gray-500 text-md">Assessment</Text>
            </View>

            <View className="flex-row items-center mt-2">
                <View className="w-2.5 h-2.5 bg-cyan-500 mr-1"></View>
                <Text className="text-gray-500 text-md">Communication</Text>
            </View>

            <View className="flex-row items-center mt-2">
                <View className="w-2.5 h-2.5 bg-amber-600 mr-1"></View>
                <Text className="text-gray-500 text-md">Study material</Text>
            </View>

            <View className="flex-row items-center mt-2">
                <View className="w-2.5 h-2.5 bg-indigo-400 mr-1"></View>
                <Text className="text-gray-500 text-md">Question dificulty</Text>
            </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})