import { Alert, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Header from 'components/header'
import ContactInfo from 'components/contact/contactInfo'
import { FontAwesome } from "@expo/vector-icons";
import { Color } from 'components/color';
import AlertBox from 'components/alertBox';
import ReviewShortInfo from 'components/review/reviewShortInfo';
import ReviewsData from 'components/review/reviewData';
import BottomDialog from 'components/dialog/bottomDialog';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import ReviewDetails from 'components/review/reviewDetails';
import AddReview from 'components/review/addReview';

export default function Review() {
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

      const [alert, setAlert] = useState({
        success: false,
        message: "",
        color: "",
        visible: false,
      })

      

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
                    <ReviewShortInfo key={idx} totalReview={review.totalReviews} ratings={review.ratings} 
                      poor={review.poor} fair={review.fair} good={review.good}
                      veryGood={review.veryGood} excellent={review.excellent}
                      facultyName={review.facultyName} 
                      onPressReviewBtn={()=>{setCurrenReview(review); setDialog("review")}}
                      onPressAddBtn={()=>{setCurrenReview(review); setDialog("addReview")}}
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
              {dialog == "addReview" && <AddReview review={currenReview}/>}
              {dialog == "review" &&               
              <>
                <View className={"bg-gray-100 p-3"}>
                    <ReviewDetails className="mt-3" totalCmnt={currenReview.totalReviews} ratings={13} 
                        poor={5} fair={3} good={5}
                        veryGood={9} excellent={8}
                        facultyName={currenReview.facultyName} onClick={()=>{}}  />
                  </View>
                  <BottomSheetScrollView className={"bg-gray-100 px-3"}>
                        <View key={1} className="p-4 rounded-2xl shadow-md bg-white mb-2">
                          <Text className='text-base text-gray-500 p-3 bg-red-100 rounded-lg'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero dolorem id est nesciunt porro doloribus sunt? Perspiciatis deleniti debitis nemo?
                          </Text>
                        </View>
                  </BottomSheetScrollView>
                </>
              }
            </BottomSheet>
          }
        
        </>
      )
}

const styles = StyleSheet.create({})