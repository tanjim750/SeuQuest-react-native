import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Checkbox from 'expo-checkbox'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import FacultyCheckbox from './facultyCheckbox'

export default function FacultyChoiceBottomSheet({courses,faculty, addFaculty, removeFaculty}:any) {
  return (
    <BottomSheetScrollView className='bg-[#f1f5f9]'>
          <FacultyCheckbox 
            courseCode={"CSE161"}
            facultyName={"Nizam Uddin"} facultyInital={"NU"}  selected={true} addFaculty={() => {}} removeFaculty={() => {}}
          />
          <FacultyCheckbox 
            courseCode={"CSE161"}
            facultyName={"Nizam Uddin"} facultyInital={"NU"}  selected={true} addFaculty={() => {}} removeFaculty={() => {}}
          />
          <FacultyCheckbox 
            courseCode={"CSE161"}
            facultyName={"Nizam Uddin"} facultyInital={"NU"}  selected={false} addFaculty={() => {}} removeFaculty={() => {}}
          />
      </BottomSheetScrollView>
  )
}

const styles = StyleSheet.create({})