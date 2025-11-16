import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList,  TouchableOpacity, Alert } from 'react-native';
import { UserContext } from '../UserContext';
import { Divider } from 'react-native-paper';
import {Image, ImageBackground} from 'expo-image';
import { fetchFavourites } from '../ApiServices';
import axios from "axios";
import { BaseURL } from "../Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
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
//reloaading page
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
//console.log(touchedWorkout);
        debugger
    };

    // ✅ Row item (Card)
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
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#19313E' }}>
            {/* ✅ Profile Header */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '25%',
                    padding: 16,
                }}
            >
                {/* Profile Icon */}
                <View
                    style={{
                        width: 144,
                        height: 144,
                        borderRadius: 72,
                        backgroundColor: '#1E90FF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 16,
                    }}
                >
                    <TouchableOpacity onPress={handlePress}>
                        <Text style={{ color: '#fff', fontSize: 48 }}>
                            {myCurrentUserObject?.username?.[0]}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* User Info */}
                <View style={{ flex: 1, marginRight: 20, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>
                        {myCurrentUserObject.username}
                    </Text>
                    <Text style={{ color: '#fff' }}> : {myCurrentUserObject.email}</Text>
                    <Text style={{ color: '#fff' }}> : {myCurrentUserObject.goal}</Text>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            marginBottom: 8,
                            marginLeft: 8,
                            color: '#fff',
                        }}
                    >
                        {myCurrentUserObject.count} - Likes
                    </Text>
                    <Divider />
                </View>
            </View>

            {/* ✅ FlatList */}
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
                }}
                ListHeaderComponent={() => (
                    <View>
                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: 'bold',
                                marginBottom: 16,
                                marginLeft: 8,
                                color: '#fff',
                            }}
                        >
                            {savedWorkout.length} Saved workouts
                        </Text>
                        <Divider style={{ marginBottom: 16 }} />
                    </View>
                )}
            />
        </View>
    );
};

export default ProfileScreen;