import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Color } from 'components/color'
import { FontAwesome } from "@expo/vector-icons";
import FastImage from 'react-native-fast-image';
import { ButtonBgGray, ButtonBgLime } from 'components/buttons/buttons';

export default function QuestionShortInfo({className,facultyName,totalQns,onLayout,onPressReviewBtn, onPressAddBtn}:any) {
  return (
    <View className={`p-4 rounded-2xl shadow-md bg-white ${className}`} onLayout={onLayout}>

      <View className="flex-row justify-between" >
        <View className="flex-col">
            <Text className="text-lg font-semibold text-black ">
                {facultyName}
            </Text>
            <Text className="text-sm font-base text-gray-400 mb-2">Computer Science and Engenering</Text>

            <Text className="text-sm font-bold text-gray-700">{totalQns} Quesions</Text>

            <View className='flex-row gap-2 mt-4'>
                <ButtonBgLime title="View Question" onPress={onPressReviewBtn} />
                <ButtonBgGray title="Upload" onPress={onPressAddBtn} />
            </View>
        </View>
        <View className="flex-col justify-start">
            <View className='p-2 bg-indigo-200 rounded-lg'>
              
            <Image 
                source={require("assets/qnspapernobg.png")} 
                style={{ width: 100, height: 100 }} 
            />
            </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})