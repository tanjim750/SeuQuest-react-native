import { View, Text } from 'react-native'
import React from 'react'
import { Color } from 'components/color';

const ResultDetails = ({gpa,semester, credits}:any) => {

    return (
        <View className='flex-row gap-20'>
            <View>
                <Text className='font-light text-black'>GPA {gpa} </Text>
            </View>
            <View className='flex-row gap-3'>
                <View className='flex-col items-center'>
                    <View className='w-2.5 h-2.5 border border-cyan-500 rounded-full'/>
                    <View className='w-1/6 bg-gray-300 h-12 mt-1'/>
                </View>
                <View>
                    <Text className='font-semibold text-black text-sm'>{semester}</Text>
                    <Text className='font-light text-black text-sm'>Credits Taken {credits}</Text>
                </View>
            </View>
        </View>
    );
}

const Result = () => {

  return (
    <View className='p-4 rounded-2xl shadow-md bg-white overflow-hidden'>
      <View className='flex-row justify-between mb-2'>
        <Text className="text-lg font-semibold text-black">
            Your Results
        </Text>
        <Text className="text-sm font-semibold text-gray-400">CGPA 
            <Text className={`text-sm font-bold text-[#8a86d8]`}> 3.69</Text>
        </Text>
      </View>
 
      <View className='flex-col gap-10 mt-5 mr-5'>
        <ResultDetails gpa="3.87" semester="Spring 2023 (First Semester)" credits="14"/>
        <ResultDetails gpa="3.76" semester="Spring 2023 (Second Semester)" credits="14"/>
        <ResultDetails gpa="3.67" semester="Spring 2023 (Third Semester)" credits="14"/>
      </View>


    </View>
  )
}

export default Result