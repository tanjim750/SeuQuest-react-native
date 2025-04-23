import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'

type Course = {
    courseCode: string;
    section: number;
    facultyInitial: string;
    classDays: string[];
    classStart: string;
    classEnd: string;
  };
  
  type Props = {
    schedules: Course[];
  };
  
  const daysOrder = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu'];

const DisplayRoutine: React.FC<Props> = ({ schedules }) => {
    const sortByDaysOrder = (schedule:any) => {
        const sorted:any = []
        const classDays: { [day: string]: Course[] } = {};
        
        schedule.forEach((course:any) => {
          course.classDays.forEach((day:string) => {
            if (!classDays[day]) classDays[day] = [];
            classDays[day].push(course);
          });
        });
    
        daysOrder.map(day => {
          if(classDays[day]){
            sorted.push([day,classDays[day]])
          }
        })
    
        return sorted;
      }
    
      return (
        <BottomSheetScrollView contentContainerStyle={{ padding: 0 }}>
          {schedules.slice(0,20).map(([score, schedule]:any, idx:number) =>
            <View key={idx} className="flex w-full gap-5 bg-white px-2 py-3 rounded-lg mb-5">
            {sortByDaysOrder(schedule).map(([day, classes]:any, idx:number) => (
              <View key={idx} className="flex-row w-full gap-5 items-start">
                <View className={`flex-col bg-violet-100/70 px-2 py-1 h-full rounded-md ${idx%2 == 0? "bg-violet-50/80":"bg-green-50/80"}`}>
                  <Text className="text-xl font-bold text-gray-800 it">
                    {day.toUpperCase()}
                  </Text>
                </View>
                <View className="flex-1 flex-row flex-wrap gap-5">
                  {classes.map((cls:any, cidx:number) => (
                    <View
                      key={cidx}
                      className="bg-slate-200/90 rounded-md px-3 py-2 flex-shrink"
                    >
                      <Text className="text-gray-600 text-lg font-semibold">
                        {cls.courseCode}.{cls.section} [{cls.facultyInitial}]
                      </Text>
                      <Text className="text-gray-500 font-medium">
                        {cls.classStart} - {cls.classEnd}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
          )}
        </BottomSheetScrollView>
      )
}

export default DisplayRoutine;
const styles = StyleSheet.create({})