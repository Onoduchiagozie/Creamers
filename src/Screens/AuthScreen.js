import React, { useContext, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../UserContext';
import { BaseURL, secretKey } from '../Constants';

const AuthScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { setToken, setUser } = useContext(UserContext);

    const [isSignIn, setIsSignIn] = useState(false);
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [goal, setGoal] = useState('');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Respect incoming mode from Splash (e.g., login)
    React.useEffect(() => {
        if (route?.params?.mode === 'login') {
            setIsSignIn(true);
        }
    }, [route?.params?.mode]);

    // If a valid token already exists, skip auth
    React.useEffect(() => {
        const checkExisting = async () => {
            try {
                const token = await AsyncStorage.getItem('auth_token');
                if (!token) return;
                const decoded = JWT.decode(token, secretKey);
                const nowMs = Date.now();
                if (decoded && (!decoded.exp || decoded.exp * 1000 > nowMs)) {
                    navigation.replace('MainTabs');
                }
            } catch (e) {
                // ignore
            }
        };
        checkExisting();
    }, []);

    const toggleAuth = () => setIsSignIn(!isSignIn);

    const handleAuth = async () => {
        if (!userName || !password || (!isSignIn && password !== confirmPassword)) {
            setMessage('Please fill all fields correctly.');
            setVisible(true);
            return;
        }

        const endpoint = isSignIn ? 'Login' : 'Register';
        setLoading(true);

        try {
            const response = await axios.post(`${BaseURL}/Auth/${endpoint}`, {
                userName,
                password,
                ...(isSignIn ? {} : { confirmPassword, email, goal }),
            });

            const result = response.data;

            if (response.status === 200 && typeof result === 'string') {
                await AsyncStorage.setItem('auth_token', result);
                setToken(result);

                const decoded = JWT.decode(result, secretKey);
                const userObj = {
                    username: decoded.unique_name || 'Unknown',
                    email: decoded.email || '',
                    goal: decoded.gender || '',
                };

                setUser(userObj);
                navigation.replace('MainTabs');
            }
        } catch (error) {
            console.log('Auth error:', error);
            setMessage('Authentication failed. Try again.');
        } finally {
            setLoading(false);
            setVisible(true);
        }
    };

    // 🔒 Hide bottom tab navigation when on AuthScreen
    React.useLayoutEffect(() => {
        navigation.setOptions({ tabBarStyle: { display: 'none' } });
    }, [navigation]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
                flex: 1,
                justifyContent: 'center',
                padding: 20,
                backgroundColor: '#19313E',
            }}
        >
            <Text
                style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 25,
                    color: '#fff',
                }}
            >
                {isSignIn ? 'Login' : 'Join Us'}
            </Text>

            <TextInput label="Username" value={userName} onChangeText={setUserName} style={{ marginBottom: 10 }} />
            {!isSignIn && (
                <>
                    <TextInput label="Email" value={email} onChangeText={setEmail} style={{ marginBottom: 10 }} />
                    <TextInput label="Goal" value={goal} onChangeText={setGoal} style={{ marginBottom: 10 }} />
                </>
            )}
            <TextInput
                label="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                style={{ marginBottom: 10 }}
            />
            {!isSignIn && (
                <TextInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={{ marginBottom: 10 }}
                />
            )}

            <Button mode="contained" onPress={handleAuth} loading={loading} disabled={loading} style={{ marginBottom: 10 }}>
                {isSignIn ? 'Sign In' : 'Register'}
            </Button>

            <Button onPress={toggleAuth} mode="text">
                {isSignIn ? "Don't have an account? Register" : 'Already have an account? Sign In'}
            </Button>

            {/* Snackbar moved UPWARD */}
            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={1500}
                style={{
                    backgroundColor: '#3A8DFF',
                    position: 'absolute',
                    top: 80, // 👈 moves it higher on screen
                    alignSelf: 'center',
                }}
            >
                {message}
            </Snackbar>
        </KeyboardAvoidingView>
    );
};

export default AuthScreen;
