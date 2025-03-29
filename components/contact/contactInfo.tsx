import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from "@expo/vector-icons";
import { Color } from 'components/color';
import * as Clipboard from "expo-clipboard";
import { Linking } from 'react-native';
import AlertBox from 'components/alertBox';

const ContactInfo = ({name, dept, mail, phone, setAlert}:any) => {

    const makeCall = () => {
        const phoneUrl = `tel:${phone}`; // Create the phone call URL
        Linking.canOpenURL(phoneUrl)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(phoneUrl); // Initiate the call
                } else {
                    // Alert.alert("Error", "Unable to make a call"); // Error handling
                    setAlert({
                        success: false,
                        message: "Unable to make a call",
                        color: "red",
                        visible: true,
                    })
                }
            })
            .catch((error) => {
               
            });
    };


  return (
    <>
        <View className='p-4 rounded-2xl shadow-md bg-white overflow-hidden'>

            <View className='flex-row justify-between'>
                <View className='max-w-[93%]'>
                    <Text className="text-lg font-semibold text-black ">
                            {name}
                    </Text>
                    <Text className='font-light text-black'>{dept} </Text>
                    <TouchableOpacity className='flex-row gap-2 items-center' onPress={async () => await Clipboard.setStringAsync(mail) }>
                        <Text className='font-light text-black'>{mail} </Text>
                        <FontAwesome name='copy' color={Color.primary}/>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={makeCall}>
                    <FontAwesome name='phone-square' size={25} color={Color.primary} className='bg-gray-100 p-2 rounded-md'/>
                </TouchableOpacity>
                
            </View>

        </View>
    </>
  )
}

export default ContactInfo