import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Color } from './color'
import { Link, useNavigation } from 'expo-router'
import { useAuth } from './context/AuthContext';

export default function Header() {
    const { logout, studentInfo } = useAuth();
    const navigation = useNavigation();
    
    return (
    <View className='flex-row gap-3 justify-between bg-white p-3 rounded-lg'>
        <View className='flex-row gap-3 items-center'>
            <Image source={require("assets/logo.png")} className='border border-gray-300 rounded-full w-10 h-10' />
            <View className='text-center '>
                <Text className={`rounded-full font-bold text-black text-lg`}>{studentInfo.name.fullName}</Text>
            </View>
        </View>
        <TouchableOpacity className='text-end' onPress={logout}>
            <Text className={`rounded-full font-bold text-[${Color.text}] text-lg`}>Logout</Text>
        </TouchableOpacity>
    </View>
    )
}
