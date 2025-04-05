import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome } from "@expo/vector-icons";

export default function FacultyChoise() {
    const courses = [
        {course:"CSE161", faculty:["SM","DSK"]},
        {course:"CSE162", faculty:["SM"]},
        {course:"CSE163", faculty:[]}
    ]

  return (
    <View className={`p-4 rounded-2xl shadow-md bg-white`}>
      <Text className='text-md font-medium text-gray-700 mb-5'>Faculty Choice</Text>
      <View className='flex-wrap flex-row gap-3'>
            {courses.map((course,idx) => 
                <View key={idx} className='flex-row'>
                    <Text className='px-2 py-1 text-gray-500 font-medium bg-gray-200 rounded-l-sm'>
                        {course.course}{` [${course.faculty.length > 0? course.faculty.join(","):"Any"}]`}
                    </Text>
                    <TouchableOpacity className='py-1 px-2 flex justify-center items-center bg-green-200 rounded-r-sm'>
                        <Text className=' text-gray-500 font-medium'>Choose</Text>
                    </TouchableOpacity>
                </View>
            )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})