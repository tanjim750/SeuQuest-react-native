                          import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from "@expo/vector-icons";
import ContactInfo from 'components/contact/contactInfo';
import SingleCourse from './singleCourse';
import { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { courseList } from './courseList';
import { TextInput } from 'react-native-gesture-handler';
import { Color } from 'components/color';

export default function CoursesChoise({courses,setDialogContent}:any) {

  const handleBtnPress = () => {
    setDialogContent(
      "courseChoice"
    )
  }
    // const courses = ["CSE161", "MAT281", "CSE241", "MAT281", "CSE241", "MAT281"]
  return (
    <View className={`p-4 rounded-2xl shadow-md bg-white`}>
      <Text className='text-md font-medium text-gray-700 mb-5'>Course Choice</Text>
      <View className='flex-wrap flex-row gap-3'>
            {courses && Object.values(courses).map((course:any,idx:number) => 
              <Text className='px-2 py-1 text-gray-600 font-medium bg-gray-200 rounded-l-sm' key={idx}>{course.courseCode}</Text>
            )}
            
            <TouchableOpacity className='flex-row' onPress={handleBtnPress}>
                <Text className='px-2 py-1 text-gray-600 font-medium bg-gray-200 rounded-l-sm'>Add</Text>
                <View className='py-1 px-2 flex justify-center items-center bg-green-200 rounded-r-sm'>
                    <FontAwesome name='plus' size={13} color={"#4b5563"} />
                </View>
            </TouchableOpacity>
      </View>
    </View>
  )
}