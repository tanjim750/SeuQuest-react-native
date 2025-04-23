import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color } from 'components/color';
import { useAuth } from 'components/context/AuthContext';

const ResultDetails = ({gpa,semester, credits}:any) => {

    return (
        <View className='flex-row gap-20'>
            
            <View className='flex-row gap-3'>
                <View className='flex-col items-center'>
                    <View className='w-2.5 h-2.5 border border-cyan-500 rounded-full'/>
                    <View className='w-1/6 bg-gray-300 h-12 mt-1'/>
                </View>
                <View>
                    <Text className='font-semibold text-black text-sm'>{semester}</Text>
                    <Text className='font-light text-black'>GPA {gpa} </Text>
                </View>
            </View>
        </View>
    );
}

const Result = () => {
  const {studentInfo} = useAuth()
  const [gradeList, setGradeList] = useState<[]>([])

  useEffect(()=>{
    if(studentInfo){
      const grade = studentInfo.gradeList;
      if(grade){
        setGradeList(grade)
      }
    }
  },[studentInfo])

  const countTotalCgpa = (grade:any) => {
    let totalCgpa = 0;
    grade.map((g:any) => {
      totalCgpa += g.cgpa
    })

    return (totalCgpa/grade.length).toFixed(2);
  }

  if(gradeList.length == 0 ) return null;
  return (
    <View className='p-4 rounded-2xl shadow-md bg-white overflow-hidden'>
      <View className='flex-row justify-between mb-2'>
        <Text className="text-lg font-semibold text-black">
            Your Results
        </Text>
        <Text className="text-sm font-semibold text-gray-400">CGPA 
            <Text className={`text-sm font-bold text-[#8a86d8]`}> {countTotalCgpa(gradeList)}</Text>
        </Text>
      </View>
 
      {/* <ScrollView horizontal> */}
      <View className='flex flex-wrap flex-row justify-around gap-10 mt-5 mr-5'>
        
      {gradeList?.map((grade:any,idx:number) => 
        <ResultDetails key={idx} gpa={grade.cgpa} semester={grade.semester.label} credits="14"/>
      )}
      </View>

      {/* </ScrollView> */}


    </View>
  )
}

export default Result