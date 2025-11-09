import React, {useContext, useEffect} from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import {UserContext} from "../UserContext";   // or your own jwt decoder
import { secretKey } from "../Constants";

export default function SplashScreen({ navigation }) {
    const { restoreUser } = useContext(UserContext);


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('auth_token');

                if (!storedToken) {
                    // No token → go to auth (login mode)
                    navigation.replace('Auth', { mode: 'login' });
                    return;
                }

                // Decode stored JWT
                const decoded = JWT.decode(storedToken, secretKey);

                // Validate expiry if present
                const nowMs = Date.now();
                if (!decoded || (decoded.exp && decoded.exp * 1000 < nowMs)) {
                    await AsyncStorage.removeItem('auth_token');
                    navigation.replace('Auth', { mode: 'login' });
                    return;
                }

                const userObj = {
                    username: decoded.unique_name || '',
                    email: decoded.email || '',
                    goal: decoded.gender || '',
                };
                restoreUser(userObj, storedToken);

                // Go straight to main app
                navigation.replace('MainTabs');
            } catch (error) {
                // Token invalid/corrupt
                await AsyncStorage.removeItem('auth_token');
                navigation.replace('Auth', { mode: 'login' });
            }
        };

        checkAuth();
    }, []);

    return (
        <View className="flex-1 justify-center items-center">
            <View style={{backgroundColor:'red'}}>

            </View>
            <ActivityIndicator size="large" />
        </View>
    );
}



