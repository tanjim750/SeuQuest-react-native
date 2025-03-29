import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from "@expo/vector-icons";
import Index from './index'
import Contact from './contact'
import Review from './review'
import Question from './question'
import Routin from './routine'
import { Color } from 'components/color'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Tab = createBottomTabNavigator();
const Layout = () => {
  return (
      <GestureHandlerRootView style={{flex:1}}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Contact") {
                iconName = "phone-square";
              } else if (route.name === "Review") {
                iconName = "bandcamp";
              }else if (route.name === "Question") {
                iconName = "paragraph";
              }else if (route.name === "Routine"){
                iconName = "renren"
              }else{
                iconName = "question"
              }

              return <FontAwesome name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: Color.primary, // Active tab color
            tabBarInactiveTintColor: "gray",  // Inactive tab color
          })}
        >
          

            <Tab.Screen name="Home" component={Index} />
            <Tab.Screen name="Contact" component={Contact} />
            <Tab.Screen name="Review" component={Review} />
            <Tab.Screen name="Question" component={Question} />
            <Tab.Screen name="Routine" component={Routin} />
          
        </Tab.Navigator>
      </GestureHandlerRootView>

  )
}

export default Layout