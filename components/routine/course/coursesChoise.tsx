                          import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from "@expo/vector-icons";
import ContactInfo from 'components/contact/contactInfo';
import SingleCourse from './singleCourse';
import { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { courseList } from './courseList';
import { TextInput } from 'react-native-gesture-handler';
import { Color } from 'components/color';

const contacts = [
  {
      "name": "Sara Rahman",
      "dept": "Lecturer, Computer Science and Engineering",
      "mail": "2023000000046@seu.edu.bd", 
      "phone": "01631596699"
  },
  {
      "name": "Rafi Ahmed",
      "dept": "Assistant Professor, Information Technology",
      "mail": "2023000000047@seu.edu.bd",
      "phone": "01631596700"
  },
  {
      "name": "Muntasir Kahn",
      "dept": "Senior Lecturer, Software Engineering",
      "mail": "2023000000048@seu.edu.bd",
      "phone": "01631596701"
  },
  {
      "name": "Nadia Islam",
      "dept": "Lecturer, Computer Science and Engineering",
      "mail": "2023000000049@seu.edu.bd",
      "phone": "01631596702"
  },
  {
      "name": "Shadman Rahman",
      "dept": "Lecturer, Network Engineering",
      "mail": "2023000000050@seu.edu.bd",
      "phone": "01631596703"
  },
  {
      "name": "Fatima Zohra",
      "dept": "Assistant Professor, Cybersecurity",
      "mail": "2023000000051@seu.edu.bd",
      "phone": "01631596704"
  },
  {
      "name": "Rina Sultana",
      "dept": "Lecturer, Data Science",
      "mail": "2023000000052@seu.edu.bd",
      "phone": "01631596705"
  },
  {
      "name": "Arif Alvi",
      "dept": "Senior Lecturer, Web Development",
      "mail": "2023000000053@seu.edu.bd",
      "phone": "01631596706"
  },
  {
      "name": "Dalia Chowdhury",
      "dept": "Lecturer, AI and Machine Learning",
      "mail": "2023000000054@seu.edu.bd",
      "phone": "01631596707"
  },
  {
      "name": "Khalid Noor",
      "dept": "Lecturer, Cloud Computing",
      "mail": "2023000000055@seu.edu.bd",
      "phone": "01631596708"
  }
];

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
            {courses.map((course:any,idx:any) => 
              <Text className='px-2 py-1 text-gray-600 font-medium bg-gray-200 rounded-l-sm' key={idx}>{course}</Text>
            )};
            
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