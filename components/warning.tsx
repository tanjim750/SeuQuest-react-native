import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Color } from './color'
import { Link, useNavigation } from 'expo-router'
import { FontAwesome } from "@expo/vector-icons";

export default function Warning() {
    const navigation = useNavigation();
    
    return (
        <View className=''>
            <View className='flex-row gap-3 w-full justify-between bg-white p-3 mb-5 rounded-lg '>
                <View className='flex-row gap-3 items-center'>
                    <FontAwesome name="question-circle" size={20}/>
                    <View className='text-center '>
                        <Text className={`rounded-full font-normal text-red text-sm`}>Login failed</Text>
                    </View>
                </View>
                
            </View>
        </View>
    )
}
