import { View, Text, TouchableOpacity, PermissionsAndroid, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { ImagePicker } from 'components/imagePicker';
import { FontAwesome } from "@expo/vector-icons";
import Toast from 'react-native-toast-message';

const UploadQuestion = ({review}:any) => {
    const [imageUri, setImageUri] = useState<any>([]);

  const handleAddReview = () => {
    Toast.show({
      type:"success",
      text1:"Success",
      text2:"Thanks to help us",
    })
  };

 
  return (
    <>
      <View className='p-4 rounded-2xl shadow-md bg-white'>
        <Text className='text-lg font-bold'>{review.facultyName}</Text>
        <Text className='text-base mb-3 text-gray-400'>Computer Science and Engineering</Text>

        <View className={styles.container}>
            <View className='flex-row justify-center items-center'>
                <View className="flex-col justify-center items-center bg-gray-100 h-48 w-60 rounded-lg px-3 text-gray-500">
                    {imageUri.length < 1 && 
                        <TouchableOpacity className='flex-col justify-center items-center' 
                            onPress={async () => setImageUri(await ImagePicker())}>
                            <FontAwesome name='cloud-download' size={70} color={"#6b7280"}/>
                            <Text className='text-gray-500'>Upload Question</Text>
                        </TouchableOpacity>
                    }
                    
                    {imageUri.length > 0 && 
                        <>
                            <View className="flex-row px-5 pt-3 rounded-lg">
                                <View className="relative w-[100px] h-[120px]">
                                    {imageUri.slice(0,3).map((image:any, index:number) =>
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
                                
                            <View className='flex-row w-full gap-3 justify-end'>
                                <TouchableOpacity onPress={() => setImageUri([])}>
                                    <FontAwesome name='refresh' size={25} color={"#6b7280"}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={async () => setImageUri([...(await ImagePicker()),...imageUri])}>
                                    <FontAwesome name='cloud-download' size={25} color={"#6b7280"}/>
                                </TouchableOpacity>
                            </View>
                        </>
                    }

                    
                </View>
            </View>

            <BottomSheetTextInput className={styles.textInput} 
                style={{textAlignVertical:"center"}}
                multiline={false}
                placeholder='Enter couser code(Ex. CSE261)'/>
            
            <BottomSheetTextInput className={styles.textInput} 
                style={{textAlignVertical:"center"}}
                multiline={false}
                placeholder='Enter session(ex. Spring 23)'/>

            <BottomSheetTextInput className={styles.textAreaInput} 
                style={{textAlignVertical:"top"}}
                multiline={true}
                numberOfLines={1000}
                placeholder='Enter your comments (optional)'/>
        </View>

        <TouchableOpacity className={`py-2 bg-lime-400 rounded-md mt-5 mx-1`} onPress={handleAddReview}>
            <Text className='text-lg text-center text-black font-semibold'>Upload</Text>
        </TouchableOpacity>
      </View>

    </>
  )
}

const styles = {
  "reviewAdded": 'text-white font-medium py-1 px-3 bg-[#8a86d8] rounded-full',
  "review": 'text-gray-600 font-medium py-1 px-3 bg-gray-400 rounded-full',
  "textAreaInput": 'bg-gray-100 h-32 rounded-lg px-3 text-gray-500',
  "textInput": 'bg-gray-100 h-14 rounded-lg px-3 text-gray-500',
  "container": 'flex-col gap-3 mt-5',
  "containerReversed": 'flex-col-reverse gap-3 mt-5'
}

export default UploadQuestion