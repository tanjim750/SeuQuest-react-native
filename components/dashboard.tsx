import React from 'react'
import { Image, ScrollView, ScrollViewBase, ScrollViewComponent, Text, TouchableOpacity, View } from 'react-native'
import { Color } from './color'
import Header from './header'
import LoginScreen from './login'

export default function Dashboard() {
    
    return (
        <ScrollView>
            <Header/>
            <Header/>
            <Header/>
            <Header/>

            <LoginScreen/>
        </ScrollView>
    )
}
