import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Header from 'components/header'
import CoursesChoise from 'components/routine/course/coursesChoise'
import FacultyChoise from 'components/routine/faculty/facultyChoise'
import SectionChoise from 'components/routine/section/sectionChoise'
import DayChoise from 'components/routine/day/dayChoice'
import TimeSelection from 'components/routine/time/timeSelection'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { Color } from 'components/color'
import { courseList } from 'components/routine/course/courseList'
import { TextInput } from 'react-native-gesture-handler'
import SingleCourse from 'components/routine/course/singleCourse'
import CourseChoiceBottomSheet from 'components/routine/course/courseChoiceBottomSheet'

export default function Routin() {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["15%","25%", "50%","70%", "90%"], []);
  const [dialogContent, setDialogContent] = useState<any>(false);
  
  // course choice
  const [selectedCourses, setSelectedCourse] = useState<any>([]);
  const [filteredCourseList, setFilteredCourseList] = useState<any>(courseList)
  const [courseSearchText, setCourseSearchText] = useState("");

  // useEffect(() =>{
  //   console.log("courseList",selectedCourses);
  //   console.log("selectedCourses.includes",selectedCourses.includes("CSE161"));
  // },[selectedCourses]);

  // callbacks
  const handleSheetChange = useCallback((index:any) => {
    if(index == 0){
      sheetRef.current?.close();
    }
  }, []);

  const addCourse = (course:string) => {
    const newList = [...selectedCourses, course]
    setSelectedCourse(newList)
    
  };

  const removeCourse = (course:string) => {
    const revomedCourse:any = [];
    selectedCourses.map((c:any) => {
      if(c != course){
        revomedCourse.push(c);
      }
      console.log(c);
    })
    setSelectedCourse(revomedCourse)
  };

  useEffect(() => {
    searchCourse();
  },[courseSearchText]);
  
  const searchCourse = () => {
    console.log("searching", courseSearchText);
    if (courseSearchText.length < 1){
      setFilteredCourseList(courseList)
      return;
    }
    const filters = courseList.filter(contact => 
                  contact.courseCode.toLocaleLowerCase().includes(courseSearchText.toLocaleLowerCase()) || 
                  contact.courseName.toLocaleLowerCase().includes(courseSearchText.toLocaleLowerCase())
              );

    setFilteredCourseList(filters)
  }

  return (
    <View className='bg-[#f1f5f9] h-full p-5 gap-2 pb-1' style={{paddingBottom:5}}>
        <Header/>

        <CoursesChoise courses={selectedCourses} setDialogContent={setDialogContent} />
        <FacultyChoise/>
        <SectionChoise/>
        <DayChoise/>
        <TimeSelection/>

        { dialogContent && 
            <BottomSheet
              ref={sheetRef}
              index={3}
              snapPoints={snapPoints}
              enableDynamicSizing={false}
              onChange={handleSheetChange}
              onClose={() => setDialogContent(false)}
              handleIndicatorStyle={{width: 70, backgroundColor:Color.primary}}
              handleStyle={{backgroundColor:"#d1d5db", borderTopEndRadius:15, borderTopLeftRadius:15}}
              
            >
              <View className='p-5 h-full w-full bg-[#f1f5f9]'>
                {dialogContent == "courseChoice" && <CourseChoiceBottomSheet
                  courseList={filteredCourseList}
                  courseSearchText= {courseSearchText}
                  setCourseSearchText= {setCourseSearchText}
                  addCourse = {addCourse}
                  removeCourse= {removeCourse}
                  selectedCourses = {selectedCourses}
                />}

              </View>
              
            </BottomSheet>
          }
    </View>
  )
}

const styles = StyleSheet.create({})