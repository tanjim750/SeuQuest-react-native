import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome } from "@expo/vector-icons";

export default function SectionChoise({sections, setDialogContent, setSection}:any) {
  
  return (
    <View className={`p-4 rounded-2xl shadow-md bg-white`}>
      <Text className='text-md font-medium text-gray-700 mb-5'>Section Choice</Text>
      <View className='flex-wrap flex-row gap-3'>
            {!sections && 
              <Text className='px-2 py-1 text-gray-500 font-medium bg-gray-200 rounded-l-sm'>
                  Empty
              </Text>
            }
            {sections && 
            Object.entries(sections).map(([key,value]:any,idx) => 
                <View key={idx} className='flex-row'>
                    <Text className='px-2 py-1 text-gray-500 font-medium bg-gray-200 rounded-l-sm'>
                        {key}{` [${value.length > 0? value.join(","):"Any"}]`}
                    </Text>
                    <TouchableOpacity className='py-1 px-2 flex justify-center items-center bg-green-200 rounded-r-sm' 
                      onPress={() => {
                        setDialogContent("sectionChoice")
                        setSection(key)
                      }}>
                        <Text className=' text-gray-500 font-medium'>Choose</Text>
                    </TouchableOpacity>
                </View>
            )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})