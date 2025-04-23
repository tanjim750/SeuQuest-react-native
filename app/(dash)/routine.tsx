import { Animated, Easing, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import FacultyChoiceBottomSheet from 'components/routine/faculty/facultyChoiceBottomSheet'
import { useAuth } from 'components/context/AuthContext'
import SectionChoiceBottomSheet from 'components/routine/section/SectionChoiceBottomSheet'
import { FontAwesome } from "@expo/vector-icons";
import { generateValidSchedules, Section } from 'utils/generateRoutine/generateValidSchedule'
import Toast from 'react-native-toast-message'
import RoutineView from 'components/routine/routineView'
import DisplayRoutine from 'components/routine/display/displayRoutine'

const makeScheduleRequirement = (
  courses:{},
  faculty:any,
  sections:any,
  startTime:string|null,
  endTime:string|null,
  daysOfWeek:[],) => {

    const requirement:any = {}

    Object.keys(courses).map((key:string) =>{
      const getFaculty = faculty[key];
      const getSection = sections[key];

      requirement[key] = {
        faculty: getFaculty ? getFaculty:[],
        section: getSection ? getSection:[]
      }
    })

    requirement["startTime"] = startTime;
    requirement["endTime"] = endTime
    requirement["days"] = []

    daysOfWeek.map((days:string) => {
      days.split("/").map((day:string) => {
        requirement["days"].push(day.toLocaleLowerCase().slice(0,3))
      })
    })

    return requirement;

}

export default function Routin() {
  const {advisedCourses} = useAuth();

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["15%","25%", "50%","70%", "90%"], []);
  const [dialogContent, setDialogContent] = useState<any>(false);
  
  // course choice
  const [selectedCourses, setSelectedCourse] = useState<any>(null);
  const [filteredCourseList, setFilteredCourseList] = useState<any>(advisedCourses)
  const [courseSearchText, setCourseSearchText] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null); // {"CSE161":[SM,TA]}
  const [selectedSection, setSelectedSection] = useState<any>(null); // {"CSE161":[2,5]}
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [seletedDay, setSelectedDay] = useState<any>([])
  const [selectedCourseForFacultyChoice,setSelectedCourseForFacultyChoice] = useState<null|string>(null)
  const [selectedCourseForSectionChoice,setSelectedCourseForSectionChoice] = useState<null|string>(null)
  const [isBulidBtnActive,setIsBuildBtnActive] = useState(false)
  const [validRoutine,setValidRoutine] = useState<any>(null)
  // const [isRoutineBuilding, setIsRoutineBuilding] = useState(false)

  // // sping gear icon
  // const spinValue = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   Animated.loop(
  //     Animated.timing(spinValue, {
  //       toValue: 1,
  //       duration: 1000, // 1 second for a full spin
  //       easing: Easing.linear,
  //       useNativeDriver: true,
  //     })
  //   ).start();
  // }, [spinValue]);

  // const spin = spinValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '360deg'],
  // });


  useEffect(() =>{
    setFilteredCourseList(advisedCourses)
  },[advisedCourses]);

  useEffect(() =>{
    if(selectedCourses && startTime && endTime && seletedDay && seletedDay.length > 0){
      setIsBuildBtnActive(true)
    }else{
      setIsBuildBtnActive(false)
    }
  },[selectedCourses,startTime,endTime,seletedDay]);

  // callbacks
  const handleSheetChange = useCallback((index:any) => {
    if(index == 0){
      sheetRef.current?.close();
    }
  }, []);

  const addCourse = (courseCode:string,course:{}) => {
    setSelectedCourse({...selectedCourses, [courseCode]:course})
    setSelectedFaculty({...selectedFaculty,[courseCode]:[]})
    setSelectedSection({...selectedSection,[courseCode]:[]})
  };

  const removeCourse = (course:string) => {
    const removedCourese:{} = Object.fromEntries(
      Object.entries(selectedCourses).filter(([key, _]) => key !== course)
    );
    
    setSelectedCourse(Object.keys(removedCourese).length > 0 ? removedCourese:null)

    // remove faculty
    const removedFaculty = Object.fromEntries(
      Object.entries(selectedFaculty).filter(([key, _]) => key !== course)
    );
    setSelectedFaculty(Object.keys(removedCourese).length > 0 ? removedFaculty:null)

    // remove section 
    const removedSection = Object.fromEntries(
      Object.entries(selectedSection).filter(([key, _]) => key !== course)
    );
    setSelectedSection(Object.keys(removedCourese).length > 0 ? removedSection:null)
  };

  const addFaculty = (courseCode: string, faculty: string) => {
    setSelectedFaculty((prev:any) => ({
      ...prev,
      [courseCode]: [...(prev[courseCode] || []), faculty]
    }));
  };
  
  const removeFaculty = (courseCode:string,faculty:string) => {
    setSelectedFaculty((prev: any) => {
      const updated = { ...prev };
      if (updated[courseCode]) {
        updated[courseCode] = updated[courseCode].filter((f: string) => f !== faculty);
      }
      return updated;
    });
  }

  const addSection = (courseCode: string, section: string) => {
    setSelectedSection((prev:any) => ({
      ...prev,
      [courseCode]: [...(prev[courseCode] || []), section]
    }));
  };
  
  const removeSection = (courseCode:string,section:string) => {
    setSelectedSection((prev: any) => {
      const updated = { ...prev };
      if (updated[courseCode]) {
        updated[courseCode] = updated[courseCode].filter((f: string) => f !== section);
      }
      return updated;
    });
  }

  useEffect(() => {
    searchCourse();
  },[courseSearchText]);
  
  const searchCourse = () => {
    // console.log("searching", courseSearchText);
    if (courseSearchText.length < 1){
      setFilteredCourseList(advisedCourses)
      return;
    }
    const filters = advisedCourses?.filter((course:any) => 
                  course.courseCode.toLocaleLowerCase().includes(courseSearchText.toLocaleLowerCase()) || 
                  course.courseTitle.toLocaleLowerCase().includes(courseSearchText.toLocaleLowerCase())
              );

    setFilteredCourseList(filters)
  }

  const generateRoutine = () => {
    // setIsRoutineBuilding(true);

    const requirement = makeScheduleRequirement(
      selectedCourses,
      selectedFaculty,
      selectedSection,
      startTime,
      endTime,
      seletedDay
    )
    const routine = generateValidSchedules(requirement,Object.values(selectedCourses))

    if(routine && routine.length > 0){
      setValidRoutine(routine)
      setDialogContent("routineView")

      Toast.show({
        type:"success",
        text1:"Congrates!!",
        text2:`Total ${routine.length} routines generated`
      })
    }else{
      setValidRoutine(null)
      Toast.show({
        type:"info",
        text1:"Sorry!!",
        text2:"No valid Routine. Please adjust day and time."
      })
    }
  }

  useEffect(()=>{
    // setTimeout(()=> {
    //   setIsRoutineBuilding(false)
    // },3000)
    // console.log(validRoutine[0][1])
  },[validRoutine])

  return (
    <View className='bg-[#f1f5f9] h-full p-5 gap-2 pb-1' style={{paddingBottom:5}}>
        <Header/>
        <ScrollView className='bg-[#f1f5f9]'>
          <View className='flex-col bg-transparent' style={{gap:7}}>

            <CoursesChoise courses={selectedCourses} setDialogContent={setDialogContent} />
            <FacultyChoise faculty={selectedFaculty} setDialogContent={setDialogContent} setCourse={setSelectedCourseForFacultyChoice}/>
            <SectionChoise sections={selectedSection} setDialogContent={setDialogContent} setSection={setSelectedCourseForSectionChoice}/>
            <DayChoise selectedDays={seletedDay} setDay={setSelectedDay}/>
            <TimeSelection start={startTime} setStartTime={setStartTime} end={endTime} setEndTime={setEndTime}/>

            <View>
              <TouchableOpacity disabled={!isBulidBtnActive}
              onPress={generateRoutine}
              className={`flex-row gap-2 w-full p-3 rounded-md mt-3 shadow-md bg-[#8a86d8]
               justify-center items-center ${isBulidBtnActive? "opacity-100":"opacity-50"}`}>
                  <FontAwesome name="gear" size={20} color="white" />
                  <Text className="text-white text-lg font-bold">Build</Text>
              </TouchableOpacity>

            </View>
          </View>
          
        </ScrollView>

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

                {dialogContent == "facultyChoice" && <FacultyChoiceBottomSheet
                  courses={advisedCourses?.filter((value:any,idx:number) => value.courseCode == selectedCourseForFacultyChoice)}
                  addFaculty={addFaculty}
                  removeFaculty={removeFaculty}
                  selectedFaculty={selectedCourseForFacultyChoice ? selectedFaculty[selectedCourseForFacultyChoice]:[]}
                />}

                {dialogContent == "sectionChoice" && <SectionChoiceBottomSheet
                  sections={advisedCourses?.filter((value:any,idx:number) => value.courseCode == selectedCourseForSectionChoice)}
                  addSection={addSection}
                  removeSection={removeSection}
                  selectedSection={selectedCourseForSectionChoice ? selectedSection[selectedCourseForSectionChoice]:[]}
                />}

                {validRoutine && dialogContent == "routineView" && <DisplayRoutine
                  schedules={validRoutine}
                />}

              </View>
              
            </BottomSheet>
          }
    </View>
  )
}

const styles = StyleSheet.create({})