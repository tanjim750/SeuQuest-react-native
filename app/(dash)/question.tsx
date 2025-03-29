import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReviewsData from 'components/review/reviewData';
import Header from 'components/header';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Color } from 'components/color';
import { FontAwesome } from "@expo/vector-icons";
import QuestionShortInfo from 'components/question/questionShortInfo';
import BottomSheet, { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import QuestionDetails from 'components/question/questionDetails';
import { DownloadImages } from 'components/downloadImage';
import UploadQuestion from 'components/question/uploadQns';

const Question = () => {
      const sheetRef = useRef<BottomSheet>(null);
      const snapPoints = useMemo(() => ["15%","25%", "50%", "90%", "100%"], []);
      const [dialog, setDialog] = useState<any>(false);
      const [searchText, setSearchText] = useState("")
      const [filteredReview , setFilteredReview] = useState<any>([])
      const [currenReview, setCurrenReview] = useState<any>(null);
      const [loading, setLoading] = useState(true);
      const [isRendered, setIsRendered] = useState(false)
      const renderCount = useRef(0)
      const reviews = ReviewsData;

      // callbacks
      const handleSheetChange = useCallback((index:any) => {
        if(index == 0){
          sheetRef.current?.close();
        }
      }, []);
      

      const searchReview = () => {
        if (searchText.length < 1){
          setFilteredReview(reviews)
          return;
        }
        const filters = reviews.filter(review => review.facultyName.toLocaleLowerCase().includes(searchText.toLocaleLowerCase().trim()) || 
                    review.ratings.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase().trim())
                  );
    
        setFilteredReview(filters)
      }

      useEffect(() =>{
        setFilteredReview(reviews);
        handleRender();
      },[]);

      useEffect(() =>{
        searchReview();
      },[searchText]);

      const handleRender = () => {
        setTimeout(() => setIsRendered(true),50);
      };

    

  return (
    <>
          <View className='bg-[#f1f5f9] p-5 gap-2 pb-1' style={{paddingBottom:5}}>
            <Header/>
    
            <View className='p-4 rounded-2xl shadow-md bg-white overflow-hidden'>
                <View className='flex-row gap-3 justify-center items-center'>
                    <TextInput
                        className="w-[90%] p-3 border border-gray-300 rounded-lg bg-white shadow-sm"
                        style={{width:"90%"}}
                        keyboardType="default"
                        placeholder='Enter your keyboard'
                        value={searchText}
                        onChangeText={(text) => setSearchText(text)}
                    />
                    <TouchableOpacity>
                        <FontAwesome name='search' size={25} color={Color.primary} className='bg-gray-100 p-2 rounded-md'/>
                    </TouchableOpacity>
                </View>
            </View>
          </View>

        <ScrollView className='bg-[#f1f5f9] h-full p-5 pt-0'>
            {isRendered && 
              <View style={{gap:10, marginBottom:20}}>
                  {filteredReview.map((review:any,idx:any) => 
                    <QuestionShortInfo key={idx} totalQns={review.totalReviews}
                      facultyName={review.facultyName} 
                      onPressReviewBtn={()=>{setCurrenReview(review); setDialog("qnsDetails")}}
                      onPressAddBtn={()=>{setCurrenReview(review); setDialog("uploadQns")}}
                      />
                  )}
              </View>
            }
        </ScrollView>

        { dialog && 

            <BottomSheet
              ref={sheetRef}
              index={1}
              snapPoints={snapPoints}
              enableDynamicSizing={false}
              onChange={handleSheetChange}
              onClose={() => setDialog(false)}
              handleIndicatorStyle={{width: 70, backgroundColor:Color.primary}}
              handleStyle={{backgroundColor:"#d1d5db", borderTopEndRadius:15, borderTopLeftRadius:15}}
              
            >
              {dialog == "qnsDetails" &&
                <>
                  <View className='p-3 bg-gray-100'>
                      <View className='p-4 bg-white rounded-lg flex-row gap-3 justify-center items-center'>
                          <TextInput
                              className="w-[90%] p-3 border border-gray-300 rounded-lg bg-white shadow-sm"
                              style={{width:"90%"}}
                              keyboardType="default"
                              placeholder='Enter your keyboard'
                          />
                          <TouchableOpacity>
                              <FontAwesome name='search' size={25} color={Color.primary} className='bg-gray-100 p-2 rounded-md'/>
                          </TouchableOpacity>
                      </View>
                  </View>

                  <BottomSheetScrollView className={"bg-gray-100 px-3"}>
                    {filteredReview.map((review:any,idx:any) => 
                      <QuestionDetails key={idx} totalImgs={review.totalReviews}
                        className={"mb-2"}
                        facultyName={review.facultyName}
                        images={[
                          "https://www.shaalaa.com/images/cbse-banking-class-12-2023-2024-set-4_2:cac68ee9c3ec41d6ba25ffd9b5ef7017.jpg",
                          "https://udayapublicschool.edu.in/wp-content/uploads/2022/03/class-III-English_1-791x1024.jpg",
                          "https://teachmint.storage.googleapis.com/public/656367544/StudyMaterial/d3cd007f-7a80-4749-ba0c-7036f7f17153.jpg",
                          "https://teachmint.storage.googleapis.com/public/656367544/StudyMaterial/d3cd007f-7a80-4749-ba0c-7036f7f17153.jpg"
                        ]}
                        />
                    )}
                  </BottomSheetScrollView>
                </>
              }

              {dialog == "uploadQns" && <UploadQuestion review={currenReview} />}

            </BottomSheet>
        }
            
        </>
  )
}

export default Question

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    borderRadius: 25,
    aspectRatio: 1,
    backgroundColor: 'white',
    opacity: 0.6,
  },
});