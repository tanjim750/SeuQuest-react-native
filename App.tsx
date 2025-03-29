import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import LoginScreen from 'components/login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import Dashboard from 'components/dashboard';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Sample Screens
const HomeScreen = () => (
  <View className="flex-1 justify-center items-center bg-gray-100">
    <Text className="text-lg font-bold">🏠 Home Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View className="flex-1 justify-center items-center bg-gray-100">
    <Text className="text-lg font-bold">👤 Profile Screen</Text>
  </View>
);

const SettingsScreen = () => (
  <View className="flex-1 justify-center items-center bg-gray-100">
    <Text className="text-lg font-bold">⚙️ Settings Screen</Text>
  </View>
);

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "Home") iconName = "home";
        else if (route.name === "Profile") iconName = "user";
        else if (route.name === "Settings") iconName = "cog";

        return <FontAwesome name={iconName} size={20} color="gray" className="mr-2" />;
      },
      tabBarActiveTintColor: "#2563eb",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: { backgroundColor: "white", paddingBottom: 5 },
    })}
  >
    <Tab.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Dashboard} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
