// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UmsApiRequest } from 'components/apiRequest';
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
            return Promise.reject({status:400})
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
          return {}
        }
    })
    .catch(e => {})

}


type AuthContextType = {
  authenticated: boolean;
  paymentData: any;
  studentInfo:any;
  classRecord:any;
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


  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) setUserToken(token);
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
    .then((response:any) => {
        // console.log("student-record",response.data.data)
        if(response.status == "200"){
            setClassRecord(response.data.data)
            return true
        }
    })
    .catch(e => false)
  }

  useEffect(() => {
    if(userToken){

      authenticateUser(userToken);
      const fetchPaymentData = async () => {
        const payment = await collectPaymentData(userToken);
        setPaymentData(payment);
      };
  
      fetchPaymentData();
    }
  },[userToken])
  
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
    .then((response:any) => {
        // console.log("dashboard",response)
        if(response.status == "200"){
            setStudentInfo(response.data.data)
            setAuthenticated(true)
            return true
        }else{
            setAuthenticated(false)
            return false
        }
    })
    .catch(e => false)
  }  
  

  const login = async (username:string,password:string) => {
    
    const response = await signIn(username,password)
    // console.log(response.data.token)
    if(response.code == "200"){
        await AsyncStorage.setItem('authToken', response.data.token);
        setUserToken(response.data.token)
    }
    return response
  };

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setUserToken(null);
    setAuthenticated(false)
  };

  return (
    <AuthContext.Provider value={{ authenticated,studentInfo,classRecord,paymentData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
