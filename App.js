import { Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import './global.css';

import HomeScreen from './src/HomeScreen';
import ExerciseDetails from './src/Screens/ExerciseDetails';
import TimerScreen from './src/Screens/TimerScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import AuthScreen from './src/Screens/AuthScreen';
import { UserProvider } from './src/UserContext';
import { BodyPartExerciseList } from './src/Screens/BodyPartExerciseList';
import SplashScreen from "./src/Screens/SplashScreen";

const RootStack = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* ✅ Inner stack for HOME tab */
function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName="HomePage"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="HomePage" component={HomeScreen} />
            <Stack.Screen
                name="BodyPartExerciseList"
                component={BodyPartExerciseList}
                options={{
                    title: ' ',
                    headerTransparent: true,
                }}
            />

            {/* ✅ Keep ExerciseDetails ONLY HERE */}
            <Stack.Screen name="ExerciseDetails" component={ExerciseDetails} />

            <Stack.Screen name="TimerScreen" component={TimerScreen} />
        </Stack.Navigator>
    );
}

/* ✅ Bottom tab navigator */
function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') iconName = 'home';
                 //   else if (route.name === 'Favourites') iconName = 'heart';
                    else if (route.name === 'Profile') iconName = 'person';

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'purple',
                tabBarInactiveTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: '#050112',
                    position: 'absolute',
                    borderTopWidth: 0,
                    elevation: 5
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            {/*<Tab.Screen name="Favourites" component={AuthScreen} />*/}
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

/* ✅ Root stack – tabs + ExerciseDetails accessible from ANYWHERE */
export default function App() {
    return (
        <NavigationContainer>
            <UserProvider>
                <RootStack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                    {/* Startup auth gate */}
                    <RootStack.Screen name="Splash" component={SplashScreen} />

                    {/* Public auth screen */}
                    <RootStack.Screen name="Auth" component={AuthScreen} />

                    {/* Main app (tabs) */}
                    <RootStack.Screen name="MainTabs" component={MainTabs} />

                    {/* ✅ GLOBAL ROUTES accessible from all tabs */}
                    <RootStack.Screen name="ExerciseDetails" component={ExerciseDetails} />
                </RootStack.Navigator>
            </UserProvider>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});




// import { Pressable, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import './global.css';
// import HomeScreen from './src/HomeScreen';
//
// import ExerciseDetails from './src/Screens/ExerciseDetails';
// import TimerScreen from './src/Screens/TimerScreen';
// import ProfileScreen from './src/Screens/ProfileScreen'; // Create this screen
// import { Ionicons } from '@expo/vector-icons'; // For tab icons
// import AuthScreen from './src/Screens/AuthScreen';
// import { UserProvider } from './src/UserContext';
// import { BodyPartExerciseList } from './src/Screens/BodyPartExerciseList';
// import SplashScreen from "./src/Screens/SplashScreen";
// import {Image} from "expo-image";
//
// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
//
// export default function App() {
//   // Stack Navigator for the Home Tab
//   function HomeStack() {
//     return (
//         <Stack.Navigator
//         initialRouteName="AuthScreen"
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         <Stack.Screen name="HomePage" component={HomeScreen} />
//
//             <Stack.Screen
//           name="BodyPartExerciseList"
//           component={BodyPartExerciseList}
//           options={{
//             headerShown: true,
//             title: ' ',
//             headerTransparent: true,
//           }}
//         />
//         <Stack.Screen
//           name="ExerciseDetails"
//           component={ExerciseDetails}
//           // options={{
//           //   headerShown: true,
//           //   title: '',
//           //   headerTransparent: true,
//           //   // headerRight: (props) => (
//           //   //   <Pressable
//           //   //     style={{ marginRight: 19 }}
//           //   //     android_ripple={{
//           //   //       color: 'rgba(0,0,0,0.2)',
//           //   //       foreground: true,
//           //   //       borderless: true
//           //   //
//           //   //     }}
//           //   //     onPress={() => {
//           //   //       console.log('added to favourite');
//           //   //     }}
//           //   //   >
//           //   //     <Ionicons name="heart" size={35} color="indigo" />
//           //   //   </Pressable>
//           //   // ),
//           // }}
//         />
//         <Stack.Screen name="TimerScreen" component={TimerScreen} />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//         <Stack.Screen name="AuthScreen" component={AuthScreen} />
//       </Stack.Navigator>
//     );
//   }
//
//   return (
//
//
//             <NavigationContainer>
//                 <UserProvider>
//         <Tab.Navigator
//           screenOptions={({ route }) => ({
//             headerShown: false,
//
//             tabBarIcon: ({ color, size }) => {
//               let iconName;
//
//               if (route.name === 'Home') {
//                 iconName = 'home';
//               } else if (route.name === 'Favourites') {
//                 iconName = 'heart';
//               } else if (route.name === 'Profile') {
//                 iconName = 'person';
//               }
//
//               return <Ionicons name={iconName} size={size} color={color} />;
//             },
//             tabBarActiveTintColor: 'purple',
//             tabBarInactiveTintColor: 'black',
//             tabBarStyle: {
//               backgroundColor: 'transparent',
//               position: 'absolute', // Keeps the tab bar floating
//               borderTopWidth: 0, // Removes border
//               elevation: 0, // Removes shadow on Android
//             },
//           })}
//         >
//           <Tab.Screen name="Home" component={HomeStack} />
//           <Tab.Screen name="Favourites" component={AuthScreen} />
//           <Tab.Screen name="Profile" component={ProfileScreen} options={{
//               // tabBarBadge: user.count > 0 ? user.count : null, // Show badge if count > 0
//           //    tabBarBadgeStyle: { backgroundColor: 'red', color: 'white' },
//             }}
//           />
//         </Tab.Navigator>
//          </UserProvider>
//             </NavigationContainer>
//
//
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
