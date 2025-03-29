import { View, Text } from 'react-native'
import React from 'react'
import { Color } from 'components/color';

const ClassDetails = ({courseCode, totalClass, attend, courseName, time, room}:any) => {
    const attendenceParcentage = (parseInt(attend)/parseInt(totalClass))*100;

    return (
        <View className='flex-row gap-10'>
            <View>
                <Text className='font-light text-black'>{courseCode} </Text>
                <View className={`${attendenceParcentage >= 70? `bg-[${Color.primary}]`:"bg-red-100"} p-1 rounded-lg items-center`}>
                    <Text className={`${attendenceParcentage >= 70? "text-white":"text-red-600"} text-sm`}>{attend}/{totalClass}</Text>
                </View>
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
                    <Text className='font-light text-black text-sm'>{time}</Text>
                    <Text className='font-light text-black text-sm'>{room}</Text>
                </View>
            </View>
        </View>
    );
}

const Sechedule = () => {

  return (
    <View className='p-4 rounded-2xl shadow-md bg-white overflow-hidden'>
      <Text className="text-lg font-semibold text-black mb-2">
            Class Schedules
      </Text>
 
      <View className='flex-col gap-10 mt-5 mr-5'>
        <ClassDetails courseCode="CSE281.1" totalClass="17"  attend="11"  courseName="Introduction to programming language Java" time="10.00am to 11.20am" room="#320"/>
        <ClassDetails courseCode="CSE281.1" totalClass="18"  attend="15" courseName="Algorithm" time="10.00am to 11.20am" room="#320"/>
        <ClassDetails courseCode="CSE281.1" totalClass="20"  attend="19" courseName="Data Structure" time="10.00am to 11.20am" room="#320"/>
      </View>


    </View>
  )
}

export default Sechedule