import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from 'components/header'
import Payment from 'components/home/payment'
import Sechedule from 'components/home/sechedule'
import Result from 'components/home/result'
import RecomendedCourse from 'components/home/recomendedCourse'

export default function Index() {
  return (
    <ScrollView className='bg-[#f1f5f9] h-full p-5'>
      <View style={{gap:20, paddingBottom:40}}>
        <Header/>
        <Payment />
        <Sechedule/>
        <Result/>
        <RecomendedCourse/>
      </View>
      
    </ScrollView>
  )
}
