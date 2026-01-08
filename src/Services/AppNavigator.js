// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import AuthScreen from '../screens/AuthScreen';
// import HomeScreen from '../screens/HomeScreen';
// import SplashScreen from '../screens/SplashScreen';
//
// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();
//
// const HomeTabs = () => (
//     <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         {/* Add more tabs if needed */}
//     </Tab.Navigator>
// );
//
// export default function AppNavigator() {
//     return (
//         <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="SplashScreen" component={SplashScreen} />
//             <Stack.Screen name="AuthScreen" component={AuthScreen} />
//             <Stack.Screen name="Home" component={HomeTabs} />
//         </Stack.Navigator>
//     );
// }
