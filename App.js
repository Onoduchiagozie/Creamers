import {StyleSheet, View,Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper'; //
import './global.css';
import AuthScreen from './src/Screens/AuthScreen';
import {UserProvider} from './src/UserContext';
import HomeScreen from "./src/HomeScreen";
import {BodyPartExerciseList} from "./src/Screens/BodyPartExerciseList";
import ExerciseDetails from "./src/Screens/ExerciseDetails";
import {EvilIcons, Ionicons} from "@expo/vector-icons";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

// const RootStack = createStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
/* ✅ Inner stack for HOME tab */
function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName="HomePage"
            screenOptions={{
                headerShown: false,
            }}

        >
            <Stack.Screen name="HomePage" component={HomeScreen} />
            {/*<Stack.Screen name="BodyPartExerciseList" component={BodyPartExerciseList}/>*/}
            {/*<Stack.Screen name="ExerciseDetails" component={ExerciseDetails} />*/}
            {/*<Stack.Screen name="TimerScreen" component={TimerScreen} />*/}
         </Stack.Navigator>
    );
}
// //
// function ProfileStack() {
//     return (
//         <Stack.Navigator initialRouteName="ProfileScreen"
//                          screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
//             <Stack.Screen name="ExerciseDetails" component={ExerciseDetails} />
//             {/*<Stack.Screen name="TimerScreen" component={TimerScreen} />*/}
//
//         </Stack.Navigator>
//
//     );
// }

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
                    elevation:0
                },
            })}>
            <Tab.Screen name="Home" component={HomeStack} />
         {/*//   <Tab.Screen name="MyFont" component={FontPreviewScreen} />*/}
         {/*   <Tab.Screen name="Profile" component={ProfileStack} />*/}
        </Tab.Navigator>
    );
}

/* ✅ Root stack – tabs + ExerciseDetails accessible from ANYWHERE */
export default function App() {
    return (
        <UserProvider>
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator
                    // initialRouteName="Auth"
                    screenOptions={{headerShown: false}}
                 >
                    {/*/!* Startup auth gate *!/*/}
                    {/*<RootStack.Screen name="Splash" component={SplashScreen} />*/}

                    {/*/!* Public auth screen *!/*/}
                    {/*<RootStack.Screen name="Auth" component={AuthScreen} />*/}

                    {/* Main app (tabs) */}
                    <Stack.Screen name="MainTabs" component={MainTabs} />

                    {/* ✅ GLOBAL ROUTES accessible from all tabs */}
                    {/*<RootStack.Screen name="ExerciseDetails" component={ExerciseDetails} />*/}
                    {/*<RootStack.Screen name="TimerScreen" component={TimerScreen} />*/}
                </Stack.Navigator>

        </NavigationContainer>
        </PaperProvider>
        </UserProvider>
    );
}

