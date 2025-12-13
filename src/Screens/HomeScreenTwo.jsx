
import {SafeAreaView, StatusBar, View, Text, TouchableOpacity,TextInput ,Image, Dimensions} from "react-native";
import {ScrollView} from "react-native-virtualized-view";
import {Feather, Ionicons} from "@expo/vector-icons";
import EateryScroller from "../Components/EateryScroller";
import Carousel from 'react-native-reanimated-carousel';
import {BaseURL, eateries} from "../Constants";
import * as Haptics from "expo-haptics";
import {ImageBackground} from "expo-image";
 import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigation} from "@react-navigation/native";
import {UserContext} from "../UserContext";
import OrderHeadline from "../Components/ActiveOrders";

const HomeScreenTwo = () =>  {
    const { width } = Dimensions.get('window');
    const [meals, setMeals] = useState([]);
    const navigation=useNavigation();


    const { myCurrentUserObject ,orders} = useContext(UserContext);

    const fetchMeals = async () => {
        try {
            const res = await axios.get(`${BaseURL}/Product/GetAllProducts`);
             setMeals(res.data); // assuming API returns array of meals
        } catch (error) {
            console.log('Error fetching meals:', error.response?.data || error.message);
        }
    };
    console.log("here is the food ",meals)

    useEffect(() => {
        fetchMeals();
    }, []);

    return (
        <SafeAreaView style={{  backgroundColor: '#f9f9f9' }}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={{ padding: 15, marginBottom:40 }}>

                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                     <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Hi {myCurrentUserObject.username}</Text>
                    <Feather name="bell" size={24} color="red" />
                </View>

                {/* Search */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#fff', borderRadius: 5, padding: 12, alignItems: 'center', marginRight: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 }}>
                         <TextInput
                             placeholder="Search Something"
                             style={{ flex: 1,borderRadius:35 }} />
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#fff',
                            padding: 12,
                            borderRadius: 15
                            }}>
                        <Ionicons onPress={()=>navigation.navigate("Cart")}
                            name="cart"
                                  size={20}
                                  color="red"
                        />
                    </TouchableOpacity>
                </View>

                {/* Order Status Cards */}
                {orders.length > 0 && (
                    <OrderHeadline

                        orders={
                        orders.map(order => ({
                            id: order.id,
                            status: order.status,
                            items: order.items,
                            total: order.subtotal,
                        }))}
                    />
                )}

                {/* Categories */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20  }}>
                     <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Search By Category</Text>
                 </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25,  borderRadius:10}}>
                    {['Pizza', 'Burger', 'Chicken', 'Drink'].map((item, index) => (
                        <View key={index} style={{ alignItems: 'center' }}>
                            <View style={{ width: 60, borderWidth:2,borderColor:'red',height: 60, backgroundColor: '#fff', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 5, shadowColor: '#000', shadowOpacity: 0.5 }}>
                                <Text style={{ fontSize: 25 }}>{item === 'Pizza' ? '🍕' : item === 'Burger' ? '🍔' : item === 'Chicken' ? '🍗' : '🥤'}</Text>
                            </View>
                            <Text style={{ fontSize: 12, fontWeight: '500' }}>{item}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20  }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Our Promotions</Text>
                    </View>

                    <Carousel
                        loop
                        width={width}
                        height={width / 2}
                        autoPlay={true}
                        data={eateries}
                        scrollAnimationDuration={3000} // Speed of the scroll
                        onSnapToItem={(index) => console.log('current index:', index)}
                        renderItem={({ item }) => (
                         <TouchableOpacity
                                onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                    navigation.navigate('BodyPartExerciseList', { workout: item });
                                }}>
                                <Image
                                    source={{uri:'https://1000logos.net/wp-content/uploads/2017/03/Kfc_logo.png'}}
                                    style={{
                                        borderRadius:20,
                                        overflow: 'hidden',
                                        resizeMode: "contain",
                                        height: width/2,
                                        elevation:10,
                                        marginRight:20,
                                        borderWidth:1,
                                        borderColor:"#ff6f61"

                                    }}
                                />
                            </TouchableOpacity>


                        )}
                    />
                </View>

                {/* Popular Items (Clickable) */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Popular Items</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical:30}}>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 30 }}>
                        {meals.map((meal, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigation.navigate('FoodDetail', { meal:meal })}
                                style={{
                                    width: '45%',
                                    backgroundColor: '#eae0e0',
                                    marginBottom: 20,
                                    borderRadius: 20,
                                    padding: 10,
                                    shadowColor: '#000',
                                    shadowOpacity: 0.05
                                }}
                            >
                                <Image
                                    source={{
                                        uri: meal.imageUrl
                                            ? `${meal.imageUrl}` // prepend http:// if your backend is local
                                            : 'https://via.placeholder.com/150'
                                    }}
                                    style={{ width: '100%', height: 100, borderRadius: 15 }}
                                />

                                <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 14 }}>{meal.name}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, alignItems: 'center' }}>
                                    <Text style={{ color: '#FF914D', fontWeight: 'bold' }}>${meal.cost ?? '0.00'}</Text>
                                    <View style={{ backgroundColor: '#F5F5F5', borderRadius: 5, width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>+</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>




                </View>

            </ScrollView>
        </SafeAreaView>
    );

};

export default HomeScreenTwo