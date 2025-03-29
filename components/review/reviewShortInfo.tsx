import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Color } from 'components/color'

export default function ReviewShortInfo({className,facultyName,totalReview,ratings,poor,fair,good,veryGood,excellent, onLayout,onPressReviewBtn, onPressAddBtn}:any) {
  return (
    <View className={`p-4 rounded-2xl shadow-md bg-white ${className}`} onLayout={onLayout}>

      <View className="flex-row justify-between" >
        <View className="flex-col">
            <Text className="text-lg font-semibold text-black mb-2">
                {facultyName}
            </Text>

            <Text className="text-lg font-bold text-zinc-600">{totalReview} Reviews</Text>
            <View className="flex-row items-center gap-2 mt-1">
                <View className={`bg-[${Color.primary}] p-1 rounded-full`}>
                <Text className="text-white text-sm px-3">{ratings}</Text>
                </View>
                <Text className="text-gray-500 text-sm">Out of 5</Text>
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

            <View className='flex-row gap-2 mt-4'>
                <TouchableOpacity className={`py-1 px-2 bg-lime-400 rounded-md`} onPress={onPressReviewBtn}>
                    <Text className='text-md text-gray-500 font-semibold'>Review Details</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`py-1 px-2 bg-gray-300 rounded-md`} onPress={onPressAddBtn}>
                    <Text className='text-md text-gray-500 font-semibold'>Add Review</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View className="flex-col justify-start">
            <View className="flex-row items-center mt-2">
                <View className="w-2.5 h-2.5 bg-red-400 mr-1"></View>
                <Text className="text-gray-500 text-md">Poor Reviews</Text>
            </View>

            <View className="flex-row items-center mt-2">
                <View className="w-2.5 h-2.5 bg-green-400 mr-1"></View>
                <Text className="text-gray-500 text-md">Fair Reviews</Text>
            </View>

            <View className="flex-row items-center mt-2">
                <View className="w-2.5 h-2.5 bg-cyan-500 mr-1"></View>
                <Text className="text-gray-500 text-md">Good Reviews</Text>
            </View>

            <View className="flex-row items-center mt-2">
                <View className="w-2.5 h-2.5 bg-amber-600 mr-1"></View>
                <Text className="text-gray-500 text-md">Very Good Reviews</Text>
            </View>

            <View className="flex-row items-center mt-2">
                <View className="w-2.5 h-2.5 bg-indigo-400 mr-1"></View>
                <Text className="text-gray-500 text-md">Exellent Reviews</Text>
            </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})