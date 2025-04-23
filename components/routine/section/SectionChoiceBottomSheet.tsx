import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import Checkbox from 'expo-checkbox'
import SectionCheckbox from './sectionCheckbox'

export default function SectionChoiceBottomSheet({sections,selectedSection,addSection, removeSection}:any) {
  return (
    <BottomSheetScrollView>
        {sections && sections[0].sections.map((sec:any,idx:number) => 
            <SectionCheckbox
                key={idx}
                courseCode = {sections[0].courseCode}
                section = {sec.section}
                facultyName = {sec.facultyName}
                classDays = {sec.classDays}
                classTime = {[sec.classStart,sec.classEnd]}
                selected = {selectedSection.includes(sec.section)}
                addSection = {addSection}
                removeSection = {removeSection}
            />
        )}
    </BottomSheetScrollView>
  )
}

const styles = StyleSheet.create({})