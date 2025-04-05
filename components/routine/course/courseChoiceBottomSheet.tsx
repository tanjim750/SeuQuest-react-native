import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { Color } from 'components/color'
import SingleCourse from './singleCourse'
import {FontAwesome} from '@expo/vector-icons'

export default function CourseChoiceBottomSheet({courseList,courseSearchText,setCourseSearchText,addCourse,removeCourse,selectedCourses}:any) {
  return (
    <>
      <View className='p-4 bg-white rounded-lg flex-row gap-3 justify-center items-center mb-5'>
          <TextInput
              className="w-[90%] p-3 border border-gray-300 rounded-lg bg-white shadow-sm"
              style={{width:"90%"}}
              keyboardType="default"
              placeholder='Enter your keyboard'
              value={courseSearchText}
              onChangeText={(text) => setCourseSearchText(text)}
          />
          <TouchableOpacity>
              <FontAwesome name='search' size={25} color={Color.primary} className='bg-gray-100 p-2 rounded-md'/>
          </TouchableOpacity>
      </View>

      <BottomSheetScrollView className='bg-[#f1f5f9]'>
          {courseList.map((course:any,idx:any) => 
            <SingleCourse key={idx}
              courseCode={course.courseCode} 
              courseName={course.courseName}
              courseCredit={course.courseCredit}
              addCourse={addCourse}
              removeCourse={removeCourse}
              selected={selectedCourses.includes(course.courseCode)}
            />
          )}
      </BottomSheetScrollView>
    </>
  )
}

const styles = StyleSheet.create({})