import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome } from "@expo/vector-icons";
import { DownloadImages } from 'components/downloadImage';

export default function QuestionDetails({className,facultyName,totalImgs,onLayout,onPressReviewBtn,images}:any) {
  return (
    <View className={`p-4 rounded-2xl shadow-md bg-white ${className}`} onLayout={onLayout}>

      <View className="flex-row justify-between" >
        <View className="flex-col">
            <Text className="text-lg font-semibold text-black ">
                {facultyName}
            </Text>
            <Text className="text-sm font-base text-gray-400 mb-2">Spring 25</Text>

            <Text className="text-sm font-bold text-gray-700">{totalImgs} Images Uploaded</Text>

            <View className='flex-row gap-2 mt-5'>
                <TouchableOpacity className={`flex-row items-center gap-2 py-1 px-2 bg-lime-400 rounded-md`} 
                    onPress={()=> DownloadImages(images)}
                    >
                    <FontAwesome name='cloud-download' size={15}/>
                    <Text className='text-md text-gray-500 font-semibold'>Download</Text>
                </TouchableOpacity>
                
            </View>
        </View>
        <View className="flex-col justify-start">
            <View className="flex-row px-5 pt-3 bg-indigo-200 rounded-lg">
                <View className="relative w-[100px] h-[120px]">
                    {images.slice(0,3).map((image:any, index:number) =>
                        <Image
                            key={index}
                            source={{ uri: image }}
                            className='border border-slate-400'
                            style={{
                            width: 70,
                            height: 110,
                            position: "absolute",
                            left: index * 20,  // Adjust spacing dynamically
                            transform: [{ rotate: `${-10 + index * 5}deg` }], // Smooth rotation spread
                            zIndex: index,  // Ensures proper stacking order
                            opacity: 1 - index * 0.1, // Gradual transparency for better visibility
                        }}
                      />
                    )}
                </View>
            </View>


        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})