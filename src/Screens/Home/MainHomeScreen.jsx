
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,

} from "react-native";
import {ScrollView} from "react-native-virtualized-view";
import {Feather, Ionicons} from "@expo/vector-icons";
 import Carousel from 'react-native-reanimated-carousel';
import {BaseURL, eateries, restaurants} from "../../Constants";
import * as Haptics from "expo-haptics";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigation} from "@react-navigation/native";
import {UserContext} from "../../Services/Context/UserContext";
import OrderHeadline from "../../Components/ActiveOrders";
import {MD3Colors,ActivityIndicator} from "react-native-paper";
import {LinearGradient} from "expo-linear-gradient";
import {red600} from "react-native-paper/src/styles/themes/v2/colors";
import api from "../../Services/api";
import {getTimeAgo} from "../../Services/ApiServices";
import AnimatedText from "react-native-animated-text";
import HomeCategory from "../../Components/HomeCategory";
import HomeHeader from "./comp/HomeHeader";

const MainHomeScreen = () => {
    const {width} = Dimensions.get('window');
    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);


    const {myCurrentUserObject, orders,addToCart,setOrders,meals,setMeals} = useContext(UserContext);
     const fetchMeals = async () => {
        try {
            const res = await axios.get(`${BaseURL}/Product/GetAllProducts`);
            setMeals(res.data); // assuming API returns array of meals
         } catch (error) {
            console.log('Error fetching meals:', error.response?.data || error.message);
        } finally {
            setLoading(false)
        }
    };
const getOrders = async () => {
    try {
        const res = await api.get(`Order/GetOrders`);
         setOrders(res.data);
    }catch(error) {
        console.error(error);
    }
}
    console.log("here is the food ", meals)

    useEffect(() => {
        fetchMeals();
        getOrders()
    }, []);

    return (

            <LinearGradient
                colors={['#d7d2cc', '#f6f1f1']}
         //       colors={['#d7d2cc', '#04121e']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{flex: 1}}
            >

                     <ScrollView contentContainerStyle={{padding: 20, marginBottom: 40}}>
<HomeHeader/>


                        {/* Search */}


                        {orders.length > 0 && (
                            <OrderHeadline
                                orders={orders.map(order => ({
                                    id: order.orderId,
                                    status: order.status,
                                   items: order.totalItems,
                                    total: order.total,
                                    createdAt: order.createdAt,
                                    timeAgo: getTimeAgo(order.createdAt),
                                }))}

                            />
                        )}

                        {/* Categories */}
                       <HomeCategory readyMeals={meals}/>
                        <View style={{flex: 1}}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginVertical: 20
                            }}>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Our Promotions</Text>
                            </View>
<View style={{marginHorizontal:-25}}>
    <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={restaurants}
        scrollAnimationDuration={3000} // Speed of the scroll
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({item}) => (
            <TouchableOpacity

                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    navigation.navigate('BodyPartExerciseList', {workout: item});
                }}>
                <Image
                    source={{uri: item.image_url}}
                    style={{
                        borderRadius: 20,
                        overflow: 'hidden',
                        resizeMode: "cover",
                        height: width / 2,
                        elevation: 6,
                         borderWidth: 1.5,
                        borderColor: "#ff6f61",
                 marginHorizontal: 10

                    }}
                />

            </TouchableOpacity>


        )}
    />
</View>

                        </View>

                        {/* Popular Items (Clickable) */}
                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          //  alignItems: 'center',
                            marginVertical: 10
                        }}>



                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 20}}>
                            {loading ? (
                                <ActivityIndicator
                                    animating
                                    size="large"
                                    color={MD3Colors.primary50}
                                />
                            ) : meals.length > 0 ? (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        justifyContent: 'space-between',
                                        marginVertical: 30,
                                    }}
                                >
                                    {meals.map((meal, index) => (
                                        <TouchableOpacity
                                            key={meal.id ?? index}
                                            onPress={() =>{ console.log("the current meal to meal details screen ",meal)
                                                navigation.navigate('FoodDetail', {meal:meal})}}
                                            style={{
                                                width: '45%',
                                                backgroundColor: '#eae0e0',
                                                marginBottom: 20,
                                                borderRadius: 20,
                                                padding: 10,
                                                elevation: 10,
                                                borderWidth: 0.5,
                                                borderColor: 'red',
                                            }}
                                        >
                                            <Image
                                                source={{
                                                    uri: meal.imageUrl ,
                                                }}
                                                style={{
                                                    width: '100%',
                                                    height: 100,
                                                    borderRadius: 15,
                                                    borderWidth: 1,
                                                }}
                                            />
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'space-between',
                                                shadowColor: 'green'
                                            }}>
                                                <Text style={{marginTop: 10, fontWeight: 'bold'}}>
                                                    {meal.name}
                                                </Text>
                                                <Text style={{marginTop: 10, fontWeight: 'bold'}}>
                                                    {meal.rating}
                                                </Text>
                                            </View>


                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    marginTop: 5,
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Text style={{color: 'rgba(5,0,0,0.91)', fontWeight: 'bold'}}>
                                                    Price <Text style={{color:'red'}}>
                                                    ${meal.cost ?? '0.00'}
                                                </Text>
                                                </Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        const order = {
                                                            productId: meal.id,
                                                            name: meal.name,
                                                            image: meal.imageUrl,
                                                            qty:1,
                                                            Price: meal.cost,
                                                        };
                                                        try {
                                                            addToCart(order);
                                                            console.log("running block ",order);
                                                         }catch (e) {
                                                            console.error(e);
                                                        }
                                                    }}

                                                    style={{
                                                        backgroundColor: '#F5F5F5',
                                                        borderRadius: 5,
                                                        width: 25,
                                                        height: 25,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        elevation: 10,
                                                    }}
                                                >
                                                    <Text>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ) : (
                                <Text style={{textAlign: 'center', marginTop: 50}}>
                                    No meals available
                                </Text>
                            )}


                        </View>
                    </ScrollView>



            </LinearGradient>

    )
}



export default MainHomeScreen;