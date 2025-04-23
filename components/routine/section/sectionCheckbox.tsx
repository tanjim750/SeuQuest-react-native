import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomButton } from 'components/buttons/buttons'
import Checkbox from 'expo-checkbox';

export default function SectionCheckbox({courseCode, section, facultyName,classDays,classTime, selected, addSection, removeSection}:any) {
  const [checkbox, setCheckbox] = useState(selected);

  const handleBtnPress = () => {
    if(!checkbox){
        addSection(courseCode,section);
    }else{
        removeSection(courseCode,section);
    }

    setCheckbox(!checkbox);
  };

  return (
    <View className='p-4 rounded-2xl shadow-md bg-white overflow-hidden mb-3'>
        <View className='flex-row justify-between'>
            <View className='max-w-[93%]'>
                <Text className="text-lg font-semibold text-black ">
                        {facultyName}
                </Text>
                <Text className='font-medium text-gray-400'>{courseCode}.{section} </Text>
                <Text className='font-medium text-gray-400'>{classDays.join("/")} @{classTime.join(" - ")}</Text>
            </View>

            <View>
                <TouchableOpacity className="flex bg-gray-100 p-2 justify-center items-center rounded-md" onPress={handleBtnPress}>
                    <Checkbox
                        value={checkbox}
                        color={checkbox? "#4ade80":"#6b7280"} 
                        style={{width:17, height:17}}
                        onValueChange={handleBtnPress}
                        
                    />
                </TouchableOpacity>
                
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})