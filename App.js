 import './global.css';
import AuthScreen from './src/Screens/AuthScreen';
import {UserProvider} from './src/Services/Context/UserContext';
import HomeScreen from "./src/HomeScreen";
 import {EvilIcons, Ionicons} from "@expo/vector-icons";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ProfileScreen from "./src/Screens/Profile/ProfileScreen";
 import FoodDetailsScreen from "./src/Screens/Home/FoodDetailsScreen";
import CheckoutPage  from "./src/Screens/Cart/UnUsed/CheckoutPage";
import MainHomeScreen from "./src/Screens/Home/MainHomeScreen";
import MenuScreen from "./src/Screens/Home/comp/MenuScreen";
import AddProductScreen from "./src/Screens/Profile/AddProduct";
import SettingsScreen from "./src/Screens/Profile/Settings";
import CartScreen from "./src/Screens/Cart/CartScreen";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Provider, BottomNavigation, PaperProvider} from 'react-native-paper';
 import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
 import {CommonActions, NavigationContainer} from '@react-navigation/native';
 import CheckoutScreen from "./src/Screens/Cart/UnUsed/CheckoutScreen";
 import NotificationScreen from "./src/Screens/Home/comp/Unused/NotificationScreen";



 const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();
 function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName="HomeTwo"
            screenOptions={{
                headerShown: false,
                 animationDuration: 1100,
                animationEasing: "ease-in-out",
                animation:'fade'
             }}

        >

            <Stack.Screen name="HomePage" component={HomeScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} options={{headerShown: false,
          }} />
            <Stack.Screen name="FoodDetail" component={FoodDetailsScreen} options={{  animation:'fade_from_bottom',animationDuration:6000}} />
            <Stack.Screen name="Cart" component={CartScreen}    options={{ title: 'Payment' }}
            />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="HomeTwo" component={MainHomeScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />

         </Stack.Navigator>
    );
}
// //
function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName="ProfileScreen"
                         screenOptions={{ headerShown: false ,animationDuration: 900 ,
                         animation:'slide_from_right',}}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="AddProduct" component={AddProductScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="FoodDetail" component={FoodDetailsScreen} />


        </Stack.Navigator>

    );
}

/* ✅ Bottom tab navigator */
 function MainTabs() {
     return (
         <PaperProvider>
             {/* Provider wraps your app to give access to React Native Paper's theming system */}

             <Tab.Navigator
                 screenOptions={{
                     headerShown: false,
                     // Hides the header at the top of each screen
                 }}

                 // tabBar is a function that REPLACES the default tab bar with your custom one
                 tabBar={({ navigation, state, descriptors, insets }) => (
                     // navigation: object to navigate between screens
                     // state: contains current tab index and all routes/tabs
                     // descriptors: contains options for each screen
                     // insets: safe area measurements (notch, home indicator areas)

                     <BottomNavigation.Bar
                         // This is the actual bottom navigation bar component

                         navigationState={state}
                         // Passes the current state (which tab is active, all tabs info)

                         safeAreaInsets={insets}
                         // Ensures the bar doesn't overlap with iPhone notch/home indicator

                         shifting={true}
                         // FLOATING EFFECT: When true, active tab icon "floats up" and shows label
                         // Inactive tabs hide their labels - creates that modern look you want

                         onTabPress={({ route, preventDefault }) => {
                             // This function runs when user taps a tab

                             const event = navigation.emit({
                                 type: 'tabPress',
                                 target: route.key,
                                 canPreventDefault: true,
                             });
                             // Announces "hey, a tab was pressed!" to React Navigation
                             // Other parts of your app can listen to this event

                             if (event.defaultPrevented) {
                                 preventDefault();
                                 // If something else says "don't navigate", we stop here
                             } else {
                                 navigation.dispatch({
                                     ...CommonActions.navigate(route.name, route.params),
                                     target: state.key,
                                 });
                                 // Actually navigate to the tapped screen
                             }
                         }}

                         renderIcon={({ route, focused, color }) => {
                             // This function decides WHAT ICON to show for each tab
                             // route: info about this specific tab (name, etc)
                             // focused: true if this tab is currently active
                             // color: the color to use (purple for active, white for inactive)

                             let iconName;
                             if (route.name === 'Home') iconName = 'home';
                             else if (route.name === 'Profile') iconName = 'person';
                             // Picks the correct icon based on which tab this is

                             return (
                                 <Ionicons
                                     name={iconName}
                                     size={24}
                                     color={color}  // Uses the color passed from BottomNavigation.Bar
                                 />
                             );
                         }}

                         getLabelText={({ route }) => {
                             // This function decides what TEXT to show under the icon
                             const { options } = descriptors[route.key];
                             return options.title || route.name;
                             // Uses the title from screen options, or falls back to screen name
                         }}

                         activeColor="purple"
                         // Color for the active/selected tab

                         inactiveColor="white"
                         // Color for inactive/unselected tabs

                         style={{
                            backgroundColor: '#050112',
                           //  backgroundColor: '#00000000',
                             // Dark background color for the navigation bar
                         }}
                     />
                 )}
             >
                 {/* These are   actual screens/tabs */}

                 <Tab.Screen
                     name="Home"  // This name is used in route.name above
                     component={HomeStack}  // The component to show for this tab
                     options={{ title: 'Home' }}  // Used by getLabelText
                 />

                 <Tab.Screen
                     name="Profile"
                     component={ProfileStack}
                     options={{ title: 'Profile' }}
                 />
                 <Tab.Screen
                     name="Add"
                     component={AddProductScreen}
                     options={{ title: 'AddProduct' }}
                 />
             </Tab.Navigator>
         </PaperProvider>
     );
 }

 /* ✅ Root stack – tabs + ExerciseDetails accessible from ANYWHERE */
export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

        <UserProvider>
        <PaperProvider>
            <NavigationContainer>
                <RootStack.Navigator
                    initialRouteName="Auth"
                    screenOptions={{headerShown: false,animation:'slide_from_bottom'}}
                 >

                    <RootStack.Screen name="Auth" component={AuthScreen} />

                    {/* Main app (tabs) */}
                    <RootStack.Screen name="MainTabs" component={MainTabs} />

                </RootStack.Navigator>

        </NavigationContainer>
        </PaperProvider>
        </UserProvider>
            </GestureHandlerRootView>
    );
}

