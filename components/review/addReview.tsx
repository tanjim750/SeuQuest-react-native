import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { Keyboard } from 'react-native';
import Toast from 'react-native-toast-message';

const AddReview = ({review}:any) => {
  const [teachingPrf, setTeachingPrf] = useState(1);
  const [assessment, setAssessment] = useState(1);
  const [communication, setCommunication] = useState(1);
  const [studyMatarial, setStudyMatarial] = useState(1);
  const [qnsDificulty, setQnsDificulty] = useState(1);
  const [isInputActive, setIsInputActive] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsInputActive(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsInputActive(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleAddReview = () => {
    Toast.show({
      type:"success",
      text1:"Success",
      text2:"Thanks for your honest review!",
      text1Style:{color: "green",fontSize:15},
      text2Style:{fontSize:13}
    })
  };

  return (
    <>
      <View className='p-4 rounded-2xl shadow-md bg-white'>
        <Text className='text-lg font-bold'>{review.facultyName}</Text>
        <Text className='text-base mb-3 text-gray-400'>We trust in your honest review.</Text>

        <View className={isInputActive ? styles.containerReversed:styles.container}>
          <View className='flex-col gap-3 p-5 bg-gray-200 rounded-lg'>
              <Text className='text-sm font-bold text-black'>Teaching Proficiency</Text>
              <View className='flex-row w-full h-10 items-center justify-between'>
                <TouchableOpacity onPress={() => setTeachingPrf(1)}>
                  <Text className={teachingPrf > 0? styles.reviewAdded:styles.review}>Poor</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTeachingPrf(2)}>
                  <Text className={teachingPrf > 1? styles.reviewAdded:styles.review}>Fair</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTeachingPrf(3)}>
                  <Text className={teachingPrf > 2? styles.reviewAdded:styles.review}>Good</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTeachingPrf(4)}>
                  <Text className={teachingPrf > 3? styles.reviewAdded:styles.review}>Very Good</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTeachingPrf(5)}>
                  <Text className={teachingPrf > 4? styles.reviewAdded:styles.review}>Exellent</Text>
                </TouchableOpacity>
                  
              </View>
          </View>

          <View className='flex-col gap-3 p-5 bg-gray-200 rounded-lg'>
              <Text className='text-sm font-bold text-black'>Assesment</Text>
              <View className='flex-row w-full h-10 items-center justify-between'>
                <TouchableOpacity onPress={() => setAssessment(1)}>
                  <Text className={assessment > 0? styles.reviewAdded:styles.review}>Poor</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAssessment(2)}>
                  <Text className={assessment > 1? styles.reviewAdded:styles.review}>Fair</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAssessment(3)}>
                  <Text className={assessment > 2? styles.reviewAdded:styles.review}>Good</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAssessment(4)}>
                  <Text className={assessment > 3? styles.reviewAdded:styles.review}>Very Good</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAssessment(5)}>
                  <Text className={assessment > 4? styles.reviewAdded:styles.review}>Exellent</Text>
                </TouchableOpacity>
                  
              </View>
          </View>

          <View className='flex-col gap-3 p-5 bg-gray-200 rounded-lg'>
              <Text className='text-sm font-bold text-black'>Communication</Text>
              <View className='flex-row w-full h-10 items-center justify-between'>
                <TouchableOpacity onPress={() => setCommunication(1)}>
                  <Text className={communication > 0? styles.reviewAdded:styles.review}>Poor</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCommunication(2)}>
                  <Text className={communication > 1? styles.reviewAdded:styles.review}>Fair</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCommunication(3)}>
                  <Text className={communication > 2? styles.reviewAdded:styles.review}>Good</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCommunication(4)}>
                  <Text className={communication > 3? styles.reviewAdded:styles.review}>Very Good</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCommunication(5)}>
                  <Text className={communication > 4? styles.reviewAdded:styles.review}>Exellent</Text>
                </TouchableOpacity>
                  
              </View>
          </View>

          <View className='flex-col gap-3 p-5 bg-gray-200 rounded-lg'>
              <Text className='text-sm font-bold text-black'>Stady Matarials</Text>
              <View className='flex-row w-full h-10 items-center justify-between'>
                <TouchableOpacity onPress={() => setStudyMatarial(1)}>
                  <Text className={studyMatarial > 0? styles.reviewAdded:styles.review}>Poor</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStudyMatarial(2)}>
                  <Text className={studyMatarial > 1? styles.reviewAdded:styles.review}>Fair</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStudyMatarial(3)}>
                  <Text className={studyMatarial > 2? styles.reviewAdded:styles.review}>Good</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStudyMatarial(4)}>
                  <Text className={studyMatarial > 3? styles.reviewAdded:styles.review}>Very Good</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStudyMatarial(5)}>
                  <Text className={studyMatarial > 4? styles.reviewAdded:styles.review}>Exellent</Text>
                </TouchableOpacity>
                  
              </View>
          </View>

          <View className='flex-col gap-3 p-5 bg-gray-200 rounded-lg'>
              <Text className='text-sm font-bold text-black'>Questions Dificulty</Text>
              <View className='flex-row w-full h-10 items-center justify-between'>
                <TouchableOpacity onPress={() => setQnsDificulty(1)}>
                  <Text className={qnsDificulty > 0? styles.reviewAdded:styles.review}>Poor</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setQnsDificulty(2)}>
                  <Text className={qnsDificulty > 1? styles.reviewAdded:styles.review}>Fair</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setQnsDificulty(3)}>
                  <Text className={qnsDificulty > 2? styles.reviewAdded:styles.review}>Good</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setQnsDificulty(4)}>
                  <Text className={qnsDificulty > 3? styles.reviewAdded:styles.review}>Very Good</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setQnsDificulty(5)}>
                  <Text className={qnsDificulty > 4? styles.reviewAdded:styles.review}>Exellent</Text>
                </TouchableOpacity>
                  
              </View>
          </View>
          
          <BottomSheetTextInput className={styles.textInput} 
          style={{textAlignVertical:"top"}}
          multiline={true}
          numberOfLines={1000}
          placeholder='Enter your comments (optional)'/>
        </View>

        <TouchableOpacity className={`py-2 bg-lime-400 rounded-md mt-5 mx-1`} onPress={handleAddReview}>
            <Text className='text-lg text-center text-black font-semibold'>Review Details</Text>
        </TouchableOpacity>
      </View>

    </>
  )
}

const styles = {
  "reviewAdded": 'text-white font-medium py-1 px-3 bg-[#8a86d8] rounded-full',
  "review": 'text-gray-600 font-medium py-1 px-3 bg-gray-400 rounded-full',
  "textInput": 'bg-gray-100 h-48 rounded-lg px-3 text-gray-500',
  "container": 'flex-col gap-3 mt-5',
  "containerReversed": 'flex-col-reverse gap-3 mt-5'
}

export default AddReview