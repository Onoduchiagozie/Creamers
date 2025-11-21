import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ImageBackground, Button, Image,FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import {Ionicons} from "@expo/vector-icons";
import {Divider} from "react-native-paper";
import {UserContext} from "../UserContext";
import {fetchFavourites} from "../ApiServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {BaseURL} from "../Constants";

// Custom components
export default function ProfileScreen({navigation}) {
    const [savedWorkout, setSaved] = useState([]);
    const { myCurrentUserObject, setUser, token } = useContext(UserContext);

    useEffect(() => {
        if (token) {
            try {
                fetchFavourites(setSaved, token);
            } catch (error) {
                console.error("Error from ", error);
            }
        }
    }, [token]);

    const handlePress = async (touchedWorkout) => {
        const storedToken = await AsyncStorage.getItem('auth_token');
        try {
            const response = await axios.get(`${BaseURL}/Favourites/GetUserFavourites`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            console.log('Saved exercises are ', response.data);
            setSaved(response.data);
        } catch (error) {
            console.error('Error fetching favourites:', error);
        }

    };
    const FavoriteItem = ({ item }) => (
        <TouchableOpacity
            style={{
                width: '46%',
                margin: '2%',
                backgroundColor: '#fff',
                borderRadius: 16,
                overflow:'auto',
            }}

            onPress={() => navigation.navigate(
                'ExerciseDetails',
                {time: `${Date.now()}`,
                    exercise: item     })
            }
        >

            <ImageBackground
                source={{ uri: item.localImagePath }}
                resizeMode="contain"
                style={{
                    height: 250,
                    width: '100%',
                }}
            />
            <View style={{ padding: 10 }}>
                <Text
                    style={{
                        fontSize: 14,
                        textAlign: 'center',
                        color: 'blue',
                    }}
                >
                    <Text style={{ color: 'indigo' }}>
                        {item.target.charAt(0).toUpperCase() + item.target.slice(1)}
                    </Text>

                    {'  |  '}

                    {item.equipment.charAt(0).toUpperCase() + item.equipment.slice(1)}
                </Text>
            </View>
        </TouchableOpacity>);

    return (
        <View style={{
            flex: 1,
         }}>
            <ImageBackground
                resizeMode="cover"
                source={require('./Bands.jpg')}
                style={{flex:1}}
            >
                <View style={{flexDirection:"row" , padding: 20,marginTop:30,justifyContent:"space-between"}}>
                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor:'cyan'}}>
                        <Text style={{
                            color: '#010712',
                             fontSize: 25,
                            letterSpacing: 0.9,
                            marginBottom: 10,
                            fontFamily: 'casual',

                        }}>{myCurrentUserObject.username}</Text>
                        <View style={{}}>
                            <Text style={{
                                fontFamily: 'casual',
                                fontSize: 16,
                                marginBottom: 3}}>{myCurrentUserObject.email}</Text>
                            <Text style={{
                                fontSize: 16,                                fontFamily: 'casual',
                            }}>React Native Starter</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' ,backgroundColor:'blue'}}>
                        <TouchableOpacity  onPress={handlePress}>
                            <Image style={{
                                borderRadius: 90,
                                height: 100,
                                width: 100,
                                backgroundColor: 'red',
                                marginLeft:5
                            }}/>
                            <Ionicons  style={{alignSelf:'flex-end'}} name="person" size={15} color="indigo" />

                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>

            <View style={{
                flex: 3,
                position: 'relative',
                backgroundColor:'purple'
            }}>
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#6a11cb', '#6946d8']}
                    style={{
                        height: 60,
                        flexDirection: 'row',
                    }}
                >

                    <TouchableOpacity style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 10,
                    }}>
                        <Text style={{
                            color: '#ffffff',
                            fontFamily: 'System',
                            fontSize: 14,
                        }}> {savedWorkout.length}</Text>
                        <Text style={{
                            color: '#ffffff',
                            fontFamily: 'System',
                            fontSize: 14,
                        }}>Projects</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 10,
                    }}>
                        <Text style={{
                            color: '#ffffff',
                            fontFamily: 'System',
                            fontSize: 14,
                        }}>1.3k</Text>
                        <Text style={{
                            color: '#ffffff',
                            fontFamily: 'System',
                            fontSize: 14,
                        }}>Followers</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 10,
                    }}>
                        <Text style={{
                            color: '#ffffff',
                            fontFamily: 'System',
                            fontSize: 14,
                        }}>816</Text>
                        <Text style={{
                            color: '#ffffff',
                            fontFamily: 'System',
                            fontSize: 14,
                        }}>Following</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <View style={{flex: 4,backgroundColor:'green'}}>



                    <FlatList

                        data={savedWorkout}
                        renderItem={FavoriteItem}
                        keyExtractor={(item) => item.name || item.gifUrl}
                        numColumns={2}
                        columnWrapperStyle={{
                            justifyContent: 'space-between',
                        }}
                        contentContainerStyle={{
                            paddingHorizontal: 10,
                            paddingBottom: 20,
                            backgroundColor:'green',

                        }}
                        ListHeaderComponent={() => (
                            <View style={{backgroundColor:'green'}}>
                                <Text
                                    style={{
                                        fontSize: 24,
                                        fontWeight: 'bold',
                                        marginBottom: 16,
                                        marginLeft: 8,
                                        color: '#fff',
                                        flex:2
                                    }}
                                >
                                    {savedWorkout.length} Saved workouts
                                </Text>
                                <Divider style={{ marginBottom: 16 }} />
                            </View>
                        )}
                    /></View>

            </View>

        </View>
    );
}