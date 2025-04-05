import { View, Text } from 'react-native'
import React from 'react'

const ResultDetails = ({gpa,courseName, credits}:any) => {

    return (
        <View className='flex-row gap-14'>
            <View>
                <Text className='font-light text-black'>GPA {gpa} </Text>
            </View>
            <View className='flex-row gap-3'>
                <View className='flex-col items-center'>
                    <View className='w-2.5 h-2.5 border border-cyan-500 rounded-full'/>
                    <View className='w-1/6 bg-gray-300 h-12 mt-1'/>
                </View>
                <View>
                    <Text className='font-semibold text-black text-sm'>{courseName.slice(0,50)}</Text>
                    {courseName.length > 50 &&
                     <Text className='font-semibold text-black text-sm'>{courseName.slice(50).trim()}</Text>
                    }
                    <Text className='font-light text-black text-sm'>Credits: {credits}</Text>
                </View>
            </View>
        </View>
    );
}

const RecomendedCourse = () => {

  return (
    <View className='p-4 rounded-2xl shadow-md bg-white overflow-hidden'>
      <View className='flex-row justify-between mb-2'>
        <Text className="text-lg font-semibold text-black">
            Recomended Courses
        </Text>
        <Text className="text-sm font-semibold text-gray-400 ">Minimum 
            <Text className={`text-sm font-bold text-[#8a86d8]`}> 6 Credit</Text>
        </Text>
      </View>
 
      <View className='flex-col gap-10 mt-5 mr-5'>
        <ResultDetails gpa="CSE361" courseName="Introduction to programming language Java" credits="3"/>
        <ResultDetails gpa="CSE263" courseName="Algorithm" credits="3"/>
        <ResultDetails gpa="CSE213" courseName="Data Structure" credits="3"/>
      </View>


    </View>
  )
}

export default RecomendedCourse