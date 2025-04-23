// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkInternetConnection, UmsApiRequest } from 'components/apiRequest';
import Toast from 'react-native-toast-message';

const signIn = (username:string,password:string) => {
    const data = {
        username: username,
        password: password,
        rememberMe: true
    }

    return UmsApiRequest("/auth/v/2.0.0/sign-in","POST",null,data)
        .then(response => {
            // console.log(response);
            if(response.status != "200"){
                
                Toast.show({
                    type: 'error',
                    text1:"Warning",
                    text2: response.data.message,
                    text1Style:{color: "red"}
                })
                return Promise.reject(response.data)
            }else {
                Toast.show({
                    type: 'success',
                    text1:"Success",
                    text2: "Successfully logged in.",
                    text1Style:{color: "green"}
                })

                return response.data
            }
        })
        .catch(error => {
          const message =
          error?.message?.includes("Network Error") || error?.message === "Failed to fetch"
              ? "No internet connection. Please check your connection."
              : "Something went wrong. Please try again.";
          return Promise.reject({ status: 400, message });
        })
}

const collectPaymentData = async (token:any) => {
    

    return UmsApiRequest("/accounts/v/2.0.0/student-ledger/get","GET",token)
    .then(res=>{
        const paymentData:any = {

        }

        // console.log(res)
        if(res.status == "200"){
            const data = res.data.data;
            const allPaymentDetails = data.studentPerSemesterLedgerList;
            const allDebitPayments = allPaymentDetails.flatMap((payment:any) => payment.transactionList).filter((p:any) => p.transactionType == "DEBIT")
            const allCreditPayments = allPaymentDetails.flatMap((payment:any) => payment.transactionList).filter((p:any) => p.transactionType == "CREDIT")
            const totalDebitBalance = allDebitPayments.reduce((sum:number, p:any) => sum + (p.amount || 0), 0)
            const totalCreditBalance = allCreditPayments.reduce((sum:number, p:any) => sum + (p.amount || 0), 0)
            const prevSemesterBalance = allPaymentDetails.length > 1 ? allPaymentDetails[allPaymentDetails.length -2].semesterBalance:0

            const currentSemesterPaymentDetails:any = data.studentPerSemesterLedgerList[allPaymentDetails.length-1];
            const currentSemesterCreditPayments = currentSemesterPaymentDetails.transactionList.filter((payment:any) => payment.transactionType == "CREDIT");
            
            const totalWaiver = currentSemesterCreditPayments
                    .filter((payment:any) => payment.paymentDetails.waiverEligibility == "Granted")
                    .reduce((sum:number, p:any) => sum + (p.amount || 0), 0)

            const waiverPercentage = currentSemesterCreditPayments
                    .filter((payment:any) => payment.paymentDetails.waiverEligibility == "Granted")
                    .reduce((sum:number, p:any) => sum + (p.paymentDetails.waiverPercentage || 0), 0)

            const currentSemesterCreditBalance = prevSemesterBalance < 0 ? (currentSemesterPaymentDetails.semesterTotalCredit - totalWaiver + prevSemesterBalance):currentSemesterPaymentDetails.semesterTotalCredit - totalWaiver;
            const currentSemesterBalance = currentSemesterPaymentDetails.semesterBalance;
            const currentSemesterTotalPayment = (allPaymentDetails.length > 0 ? currentSemesterPaymentDetails.semesterTotalDebit + prevSemesterBalance :prevSemesterBalance) - totalWaiver;
            
            const firstInstallment =  currentSemesterTotalPayment * 0.40
            const secondInstallment =  currentSemesterTotalPayment * 0.30
            const thirdInstallment =  currentSemesterTotalPayment * 0.30
            
            // console.log("firstInstallment", firstInstallment)
            // console.log("secondInstallment",secondInstallment)
            // console.log("thirdInstallment",thirdInstallment)

            paymentData.totalCreditBalance = totalCreditBalance;
            paymentData.totalDebitBalance = totalDebitBalance;
            paymentData.semesterBalance = currentSemesterBalance;
            paymentData.semesterTotalPayment = currentSemesterTotalPayment;
            paymentData.firstInstallment = firstInstallment;
            paymentData.secondInstallment = secondInstallment;
            paymentData.thirdInstallment = thirdInstallment;
            paymentData.waiverPercentage = waiverPercentage;
            paymentData.currentSemesterCreditBalance = currentSemesterCreditBalance;

            // console.log()
            return paymentData
        }else{
          return null
        }
    })
    .catch(e => null)

}

const collectAdvisedCourses = async (token:any) => {

  return UmsApiRequest("/academic/v/2.0.0/course-advising/advising-table","GET",token)
  .then(async (response:any) => {
      // console.log("advised course",response.data.data.offeredSectionList)
      
      if(response.status == "200"){
          // setAdvisedCourses(response.data.data)
          // await AsyncStorage.setItem("advisedCourses",JSON.stringify(response.data.data))
          const offeredSectionList = response.data.data.offeredSectionList
          const advisedSections:any = {}

          if (offeredSectionList){
            for (const sec of offeredSectionList) {
              try{

                const code = sec.course.code;
                const title = sec.course.title
                const credits = sec.credits;
                const section = sec.section;
                const isLab = credits === 1;
                let facultyName = "";
                let facultyInitial = "";
                let facultyDepartment = "";
                
                if(sec.facultyList && sec.facultyList.length > 0){
                  facultyName = sec.facultyList[0].name.fullName;
                  facultyInitial = sec.facultyList[0].employmentInformation.facultyInitials;
                  facultyDepartment = sec.facultyList[0].employmentInformation?.primaryDesignation;
                }
              
                let classStart = "";
                let classEnd = "";
                const classDays = [];

                if(!sec.sectionScheduleList) continue;
              
                for (const schedule of sec.sectionScheduleList) {
                  classStart = schedule.timeSlot.startTime.slice(0, 5);
                  classEnd = schedule.timeSlot.endTime.slice(0, 5);
                  classDays.push(schedule.timeSlot.dayOfWeek.slice(0, 3).toLowerCase());
                }
              
                const sectionDetails = {
                  section: section,
                  facultyName: facultyName,
                  facultyInitial: facultyInitial,
                  facultyDepartment: facultyDepartment,
                  classStart: classStart,
                  classEnd: classEnd,
                  classDays: classDays
                };
              
                if (!advisedSections[code]) {
                  advisedSections[code] = {
                    courseCode: code,
                    courseTitle:title,
                    credits: credits,
                    isLab: isLab,
                    sections: [sectionDetails]
                  };
                } else {
                  advisedSections[code].sections.push(sectionDetails);
                }
              }catch(error){
                // console.log("Stack trace:",sec);
              }
            }
            
          }
          // console.log("advised course.....",Object.keys(advisedSections).length)
          
          if (Object.keys(advisedSections).length === 0) {
            return null;
          } else {
            return Object.values(advisedSections);
          }
        
      }else{
        return null;
      }
  })
  .catch((error) => {
    console.log(error)
    return null
  })
}


type AuthContextType = {
  authenticated: boolean;
  paymentData: any;
  studentInfo:any;
  classRecord:any;
  isLoading: boolean;
  advisedCourses: []|null;
  login: (username:string,password:string) => Promise<any>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false)
  const [studentInfo, setStudentInfo] = useState<null|{}>(null)
  const [paymentData, setPaymentData] = useState<null|{}>(null)
  const [classRecord,setClassRecord] = useState<null|{}>(null)
  const [advisedCourses, setAdvisedCourses] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) setUserToken(token);
      if (!token) setIsLoading(false);
    
    };
    loadToken();
  }, []);


  const collectclassRecord = (token:any,info:any) => {
    const semesterNumber = info.currentSemesterNumber;
    const registeredCourseList = info.registeredCourseList;

    if(!registeredCourseList){
      return
    }
    const offerSectionIdList:any = []
    registeredCourseList.map((c:any) => offerSectionIdList.push(c.offeredSection.id))
    
    const data = {offerSectionIdList,semesterNumber}

    UmsApiRequest("/academic/v/2.0.0/class-attendance/student-record","POST",token,data)
    .then(async  (response:any) => {
        // console.log("student-record",response.data.data)
        if(response.status == "200"){
            setClassRecord(response.data.data)
            await AsyncStorage.setItem("classRecord",JSON.stringify(response.data.data))
            return true
        }
    })
    .catch(e => false)
  }

  useEffect(() => {
    // console.log("token",userToken)
    if(userToken){
      checkInternetConnection().then(async (isConnected) => {
        // console.log("isConnected   ---",isConnected)
        if (isConnected) {
          authenticateUser(userToken);
        
        } else {
          const savedStudentInfo = await AsyncStorage.getItem('studentInfo');
          const savedPaymentData = await AsyncStorage.getItem('paymentData')
          const savedClassRecord = await AsyncStorage.getItem('classRecord')

          if (savedStudentInfo) setStudentInfo(JSON.parse(savedStudentInfo));
          if(savedPaymentData) setPaymentData(JSON.parse(savedPaymentData));
          if(savedClassRecord) setClassRecord(JSON.parse(savedClassRecord));

          if(savedStudentInfo && (savedClassRecord || savedPaymentData)){
            // return true
            setAuthenticated(true)
          }

          setIsLoading(false)
        }

      });
    }
  },[userToken])


  useEffect(()=>{

    if(authenticated){
      const fetchPaymentData = async () => {
        const payment = await collectPaymentData(userToken);
        let courses:any = await AsyncStorage.getItem("advisedCourses");
        
        setPaymentData(payment);
        await AsyncStorage.setItem("paymentData",JSON.stringify(payment))

        if(courses){
          setAdvisedCourses(JSON.parse(courses));
        }else{
          courses = await collectAdvisedCourses(userToken);
          setAdvisedCourses(courses)
          await AsyncStorage.setItem("advisedCourses", JSON.stringify(courses))
        }

      };
  
      fetchPaymentData();
    }
  },[authenticated])
  
  useEffect(() => {
    if(studentInfo){
      collectclassRecord(userToken,studentInfo);
    }
  },[studentInfo])

  // useEffect(() => {
  //   console.log("pay", paymentData)
  // },[paymentData])

  const authenticateUser = async (token:any) => {
    UmsApiRequest("/academic/v/2.0.0/course-registration/dashboard-data","GET",token)
    .then(async (response:any) => {
        // console.log("dashboard",response)
        setIsLoading(false) // set loading false

        if(response.status == "200"){
            setStudentInfo(response.data.data)
            await AsyncStorage.setItem("studentInfo",JSON.stringify(response.data.data))
            setAuthenticated(true)
            return true
        }else{
            setAuthenticated(false)
            return false
        }
    })
    .catch(async (error) => {
      return false
    })
  }  
  

  const login = async (username:string,password:string) => {
    checkInternetConnection().then(async (isConnected) => {
      if (isConnected) {
        const response = await signIn(username,password)
        // console.log(response.data.token)
        if(response.code == "200"){
            await AsyncStorage.setItem('authToken', response.data.token);
            setUserToken(response.data.token)
        }
        return response
      
      } else {
        Toast.show({
          type: 'error',
          text1: "Network error",
          text2: "Check Your internet connection",
          text1Style: { color: "red" }
        });
        return false
      }

    });
    
    
  };

  const logout = async () => {
    checkInternetConnection().then(async (isConnected) => {
      if (isConnected) {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('studentInfo');
        await AsyncStorage.removeItem('paymentData');
        await AsyncStorage.removeItem('classRecord');
        await AsyncStorage.removeItem("advisedCourses")

        setUserToken(null);
        setAuthenticated(false)
        setIsLoading(false)
      
      } else {
        Toast.show({
          type: 'error',
          text1: "Network error",
          text2: "Check Your internet connection",
          text1Style: { color: "red" }
        });
        return false
      }

    });
    
  };

  return (
    <AuthContext.Provider value={{ authenticated,studentInfo,classRecord,paymentData, isLoading,advisedCourses, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
