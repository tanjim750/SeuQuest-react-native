import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Checkbox from 'expo-checkbox'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import FacultyCheckbox from './facultyCheckbox'

export default function FacultyChoiceBottomSheet({courses,selectedFaculty, addFaculty, removeFaculty}:any) {
  
  return (
    <BottomSheetScrollView className='bg-[#f1f5f9]'>
      
      {courses && [...new Map(
        courses[0].sections.map((sec: any) => [sec.facultyName, sec])
      ).values()].map((sec: any) => (
        <FacultyCheckbox 
          key={sec.facultyInitial}
          courseCode={courses[0].courseCode}
          facultyName={sec.facultyName}
          facultyInital={sec.facultyInitial}
          selected={selectedFaculty.includes(sec.facultyInitial)}
          addFaculty={addFaculty}
          removeFaculty={removeFaculty}
        />
      ))}
          
      </BottomSheetScrollView>
  )
}

const styles = StyleSheet.create({})