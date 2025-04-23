import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Checkbox from 'expo-checkbox';

export default function DayCheckbox({selected, day, handleBtnPress}:any) {
  const [checked,setChecked] = useState<boolean>(selected);

  useEffect(() => {
    handleBtnPress(checked,day)
  },[checked])

  return (
    <TouchableOpacity
        className="flex-row gap-2 px-2 py-1 text-gray-00 font-medium bg-gray-200 rounded-l-sm"
        onPress={() => setChecked(!checked)}>
        <Checkbox
            value={checked}
            color={checked? "#4ade80":"#6b7280"} 
            style={{width:17, height:17}}
            
        />
        <Text className=' text-gray-500 font-medium'>{day}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})