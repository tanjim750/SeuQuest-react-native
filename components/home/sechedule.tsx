import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color } from 'components/color';
import { useAuth } from 'components/context/AuthContext';

const ClassDetails = ({courseCode,section, totalClass, attend, courseName, startTime,endTime,dayOfWeek, room}:any) => {
    const attendenceParcentage = (parseInt(attend)/parseInt(totalClass))*100;

    return (
        <View className='flex-row gap-10'>
            <View>
                <Text className='font-light text-black'>{courseCode}.{section} </Text>
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
                    <Text className='font-semibold text-black text-sm'>{courseName.slice(0,41)}</Text>
                    {courseName.length > 50 &&
                     <Text className='font-semibold text-black text-sm'>{courseName.slice(41).trim()}</Text>
                    }
                    <Text className='font-light text-black text-sm'>{dayOfWeek.join('/')} @{startTime} - {endTime} </Text>
                    <Text className='font-light text-black text-sm'>{room}</Text>
                </View>
            </View>
        </View>
    );
}

const collectClassSchedules = (courseList:[],attendanceList:[]) => {
  const classSchedules:any = []
  if(!courseList || courseList.length == 0) return null
  
  courseList.map((course:any) =>{
    const data:any = {
      dayOfWeek: []
    }

    const offeredSection = course.offeredSection;
    // const faculty = offeredSection.facultyList[0];
    const sectionScheduleList = offeredSection.sectionScheduleList;
    sectionScheduleList.map((s:any) => {
      data.startTime = s.timeSlot.startTime.slice(0,5)
      data.endTime = s.timeSlot.startTime.slice(0,5)
      data.dayOfWeek.push(s.timeSlot.dayOfWeek.slice(0,3).toLowerCase())
      data.roomNumber = s.room.name;
    })

    data.courseCode = offeredSection.course.code
    data.courseTitle = offeredSection.course.title

    attendanceList.map((a:any) => {
      if(a.courseCode == offeredSection.course.code){
        data.totalClass = a.totalClassCount
        data.present = a.presentCount
        data.section = a.section
      }
    })

    classSchedules.push(data)
  })

  return classSchedules;
}

const Sechedule = () => {
  const {classRecord, studentInfo} = useAuth()
  const [classSchedules, setClassShedule] = useState<null|[]>(null)

  useEffect(() => {
    if(classRecord && studentInfo){
      const registeredCourseList = studentInfo.registeredCourseList;
      const schedule = collectClassSchedules(registeredCourseList,classRecord)
      setClassShedule(schedule);
      // console.log("registeredCourseList",schedule)
    }
  },[studentInfo,classRecord])

  
  if(!classSchedules) return null;
  return (
    <View className='p-4 rounded-2xl shadow-md bg-white overflow-hidden'>
      <Text className="text-lg font-semibold text-black mb-2">
            Class Schedules
      </Text>
 
      <View className='flex-col gap-10 mt-5 mr-5'>
        {classSchedules?.map((schedule:any,idx:number) => 
          <ClassDetails key={idx} 
          courseCode={schedule.courseCode} 
          section={schedule.section} 
          totalClass={schedule.totalClass}  
          attend={schedule.present}  
          courseName={schedule.courseTitle} 
          startTime={schedule.startTime} 
          endTime={schedule.endTime} 
          dayOfWeek = {schedule.dayOfWeek}
          room={schedule.roomNumber}/>
        )}
        
      </View>


    </View>
  )
}

export default Sechedule