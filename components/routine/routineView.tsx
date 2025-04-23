import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

type Course = {
  courseCode: string;
  section: number;
  facultyInitial: string;
  classDays: string[];
  classStart: string;
  classEnd: string;
};

type Props = {
  schedule: Course[];
};

const daysOrder = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu'];

const RoutineView: React.FC<Props> = ({ schedule }) => {
    // Group by days
  const routineByDay: { [day: string]: Course[] } = {};
  schedule.forEach((course) => {
    course.classDays.forEach((day) => {
      if (!routineByDay[day]) routineByDay[day] = [];
      routineByDay[day].push(course);
    });
  });

  // Sort classes in each day by start time
  const parseTime = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  return (
    <BottomSheetScrollView contentContainerStyle={{ padding: 0 }}>
      {daysOrder.map((day,idx) => (
        routineByDay[day] && 
        <View key={idx} className='bg-white px-2 py-1 rounded-lg'>
          {routineByDay[day]?.length && (
            <View key={day} style={{ marginBottom: 24 }} className='flex-row flex-wrap gap-5 items-center' >
              <Text className='text-gray-800 text-xl font-bold '>
                {day.toUpperCase()}
              </Text>
              {routineByDay[day]
                .sort((a, b) => parseTime(a.classStart) - parseTime(b.classStart))
                .map((cls, idx) => (
                  <View
                    key={idx}
                    className='bg-slate-200 px-3 py-1 rounded-md'
                  >
                    <Text className='text-gray-600 text-lg font-semibold'>
                      {cls.courseCode}.{cls.section} ({cls.facultyInitial})
                    </Text>
                    <Text className='text-gray-500 font-medium'>
                      {cls.classStart} - {cls.classEnd}
                    </Text>
                  </View>
                ))}
            </View>
          )}
        </View>
      ))}
    </BottomSheetScrollView>
  );
};

export default RoutineView;
