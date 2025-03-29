import { Alert, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from 'components/header'
import ContactInfo from 'components/contact/contactInfo'
import { FontAwesome } from "@expo/vector-icons";
import { Color } from 'components/color';
import AlertBox from 'components/alertBox';

const Contact = () => {
  const [alert, setAlert] = useState({
    success: false,
    message: "",
    color: "",
    visible: false,
  })
  const [searchText, setSearchText] = useState("")
  const [filteredContact , setFilteredContact] = useState<any>([])

  useEffect(() =>{
    const timer = setTimeout(() => setAlert(
        {
            success: false,
            message: "",
            color: "",
            visible: false,
        }
    ),7000)
    return () => clearTimeout(timer);
  },[alert])

  const searchContact = () => {
    if (searchText.length < 1){
      setFilteredContact(contacts)
      return;
    }
    const filters = contacts.filter(contact => contact.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) || 
                  contact.mail.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) || 
                  contact.phone.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
                  contact.dept.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
              );

    setFilteredContact(filters)
  }

  const contacts = [
    {
        "name": "Sara Rahman",
        "dept": "Lecturer, Computer Science and Engineering",
        "mail": "2023000000046@seu.edu.bd",
        "phone": "01631596699"
    },
    {
        "name": "Rafi Ahmed",
        "dept": "Assistant Professor, Information Technology",
        "mail": "2023000000047@seu.edu.bd",
        "phone": "01631596700"
    },
    {
        "name": "Muntasir Kahn",
        "dept": "Senior Lecturer, Software Engineering",
        "mail": "2023000000048@seu.edu.bd",
        "phone": "01631596701"
    },
    {
        "name": "Nadia Islam",
        "dept": "Lecturer, Computer Science and Engineering",
        "mail": "2023000000049@seu.edu.bd",
        "phone": "01631596702"
    },
    {
        "name": "Shadman Rahman",
        "dept": "Lecturer, Network Engineering",
        "mail": "2023000000050@seu.edu.bd",
        "phone": "01631596703"
    },
    {
        "name": "Fatima Zohra",
        "dept": "Assistant Professor, Cybersecurity",
        "mail": "2023000000051@seu.edu.bd",
        "phone": "01631596704"
    },
    {
        "name": "Rina Sultana",
        "dept": "Lecturer, Data Science",
        "mail": "2023000000052@seu.edu.bd",
        "phone": "01631596705"
    },
    {
        "name": "Arif Alvi",
        "dept": "Senior Lecturer, Web Development",
        "mail": "2023000000053@seu.edu.bd",
        "phone": "01631596706"
    },
    {
        "name": "Dalia Chowdhury",
        "dept": "Lecturer, AI and Machine Learning",
        "mail": "2023000000054@seu.edu.bd",
        "phone": "01631596707"
    },
    {
        "name": "Khalid Noor",
        "dept": "Lecturer, Cloud Computing",
        "mail": "2023000000055@seu.edu.bd",
        "phone": "01631596708"
    }
];

useEffect(() => {
  setFilteredContact(contacts);
},[]);

useEffect(() => {
  searchContact()
},[searchText]);

  return (
    <>
      <AlertBox message={alert.message} visible={alert.visible} color={alert.color} success={alert.success}/>
    <ScrollView className='bg-[#f1f5f9] h-full p-5'>

      <View style={{gap:20, paddingBottom:40}}>
        <Header/>

        <View className='p-4 rounded-2xl shadow-md bg-white overflow-hidden'>
            <View className='flex-row gap-3 justify-center items-center'>
                <TextInput
                    className="w-[90%] p-3 border border-gray-300 rounded-lg bg-white shadow-sm"
                    style={{width:"90%"}}
                    keyboardType="default"
                    placeholder='Enter your keyboard'
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}
                />
                <TouchableOpacity>
                    <FontAwesome name='search' size={25} color={Color.primary} className='bg-gray-100 p-2 rounded-md'/>
                </TouchableOpacity>
            </View>
        </View>
        
        <View style={{gap:10}}>
          {filteredContact.map((contact:any,idx:any) => 
            <ContactInfo key={idx} name={contact.name} mail={contact.mail} dept={contact.dept} phone={contact.phone} setAlert={setAlert} />
          )}
        </View>
      </View>
      
    </ScrollView>
    </>
  )
}

export default Contact

const styles = StyleSheet.create({})