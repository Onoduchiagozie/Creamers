
import {SafeAreaView, StatusBar, View, TextInput, Text, TouchableOpacity, Image, Dimensions} from "react-native";
import {ScrollView} from "react-native-virtualized-view";
import {Feather, Ionicons} from "@expo/vector-icons";
import EateryScroller from "../Components/EateryScroller";
import Carousel from "react-native-reanimated-carousel/src/components/Carousel";
import {BaseURL, eateries} from "../Constants";
import * as Haptics from "expo-haptics";
import {ImageBackground} from "expo-image";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigation} from "@react-navigation/native";

const HomeScreenTwo = () =>  {
    const { width } = Dimensions.get('window');
    const [meals, setMeals] = useState([]);
    const navigation=useNavigation();
    const fetchMeals = async () => {
        try {
            const res = await axios.get(`${BaseURL}/Product/GetAllProducts`);
            console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",res.data);
            setMeals(res.data); // assuming API returns array of meals
        } catch (error) {
            console.log('Error fetching meals:', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchMeals();
    }, []);

    return (
        <SafeAreaView style={{  backgroundColor: '#f9f9f9' }}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={{ padding: 15, marginBottom:40 }}>

                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                     <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Creamers</Text>
                    <Feather name="bell" size={24} color="black" />
                </View>

                {/* Search */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#fff', borderRadius: 15, padding: 12, alignItems: 'center', marginRight: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 }}>
                        <Feather name="search" size={20} color="#FF914D" style={{ marginRight: 10 }} />
                        <TextInput placeholder="Search Something" style={{ flex: 1 }} />
                    </View>
                    <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 15 }}>
                        <Ionicons name="person-circle" size={20} color="#FF914D" />
                    </View>
                </View>

                {/* Order Status Cards */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
                    <View style={{ width: '48%', backgroundColor: '#fff', padding: 15, borderRadius: 15, shadowColor: '#000', shadowOpacity: 0.05 }}>
                        <Text style={{ fontSize: 12, color: '#888' }}>Order #2140</Text>
                        <View style={{ backgroundColor: '#FFEADD', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5, marginTop: 5 }}>
                            <Text style={{ color: '#FF914D', fontSize: 10, fontWeight: 'bold' }}>Delivered</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, fontWeight: '600' }}>2 Items</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>$9.87</Text>
                        </View>
                    </View>

                </View>

                {/* Categories */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20  }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Search By Category</Text>
                 </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
                    {['Pizza', 'Burger', 'Chicken', 'Drink'].map((item, index) => (
                        <View key={index} style={{ alignItems: 'center' }}>
                            <View style={{ width: 60, height: 60, backgroundColor: '#fff', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 5, shadowColor: '#000', shadowOpacity: 0.05 }}>
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
                        width={width*0.99}
                        height={width / 2}
                        autoPlay={true}
                        data={eateries}
                        scrollAnimationDuration={3000} // Speed of the scroll
                        onSnapToItem={(index) => console.log('current index:', index)}
                        renderItem={({ item, index }) => (
                            <View
                                style={{
                                    flex: 2,
                                    // justifyContent: 'center',
                                    // alignItems: 'center',
                                }}
                            ><TouchableOpacity
                                onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                    navigation.navigate('BodyPartExerciseList', { workout: item });
                                }}>
                                <ImageBackground
                                    source={{uri:item.logo_url}}
                                    style={{
                                        borderRadius:15,
                                        overflow: 'hidden',
                                        resizeMode: "contain",
                                        height: width/2,
                                        elevation:1,
                                        marginRight:20,
                                        borderWidth:4,
                                        borderColor:"#ff6f61"

                                    }}
                                />
                            </TouchableOpacity>

                            </View>
                        )}
                    />
                </View>

                {/* Popular Items (Clickable) */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Popular Items</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,marginVertical:30}}>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 30 }}>
                        {meals.map((meal, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigation.navigate('FoodDetail', { meal:meal })}
                                style={{
                                    width: '48%',
                                    backgroundColor: '#fff',
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