import React, { useContext, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import {Button, Divider, HelperText, Snackbar, TextInput} from 'react-native-paper';
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

    const [viewPassWord, setViewPassWord] = useState(false);


    console.error = (e) => {
        if (e && e.message) console.log("Caught error: =>", e.message);
        else console.log("🔍 Caught error =>:", e);
    };

    const userNameHasErrors = () => {
        return userName.length<3;
    };
    const passwordHasErrors = () => {
        return password.length<4;
    };
    // const emailHasErrors = () => {
    //     return !userName.includes('@');
    // };

    // If a valid token already exists, skip auth
    React.useEffect(() => {
        const checkExisting = async () => {
            try {
                const token = await AsyncStorage.getItem('auth_token');
                if (!token) return;
                const decoded = JWT.decode(token, secretKey);
                const nowMs = Date.now();
                if (decoded && (!decoded.exp || decoded.exp * 1000 > nowMs)) {
                    setUser( {
                        username: decoded.unique_name || 'unknown',
                        email: decoded.email || 'unknown',
                        goal: decoded.gender || 'unknown',
                    });

                  //  setUser(userObj);
                    setMessage('Welcome Back!');
                     setVisible(true);
                    navigation.replace('MainTabs');
                }
            } catch (e) {
                console.error("error in navigation components",e.message);
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
                setIsSignIn(true)

                await AsyncStorage.setItem('auth_token', result);
                setToken(result);

                const decoded = JWT.decode(result, secretKey);
                const userObj = {
                    username: decoded.unique_name || '',
                    email: decoded.email || '',
                    goal: decoded.gender || '',
                };

                setUser(userObj);

                navigation.replace('MainTabs');
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setMessage(`${error.response.data}`);
                setVisible(true);

                console.error('Status:', error.response.status);
                console.error('Response Data:', error.response.data);
                console.error('Headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an http.ClientRequest in node.js
                setMessage('No response From Server');
                setVisible(true);
                console.error('Request:', error.request);
            } else {

                setIsSignIn(true)
                // Something happened in setting up the request that triggered an Error
                setMessage('Login failed. (Something happened in setting up the request)');
                setVisible(true);
                console.error('Error config:', error.config);
            }
            console.log('Auth error:', error);
        } finally {
            setLoading(false);
            setVisible(true);
        }
    };

    // 🔒 Hide bottom tab navigation when on AuthScreen
    // React.useLayoutEffect(() => {
    //     navigation.setOptions({ tabBarStyle: {display: 'none'} });
    // }, [navigation]);

    function passwordVisible() {
        setViewPassWord(!viewPassWord);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : "height"}
            style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 10,
                backgroundColor: '#050112',
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

            <TextInput label="Username"
                       right={<TextInput.Icon icon="account" />}
                       value={userName} onChangeText={setUserName}  style={{ marginBottom: 10 ,borderRadius:30}} />
            <HelperText theme={{ colors: { primary: 'green' } }}  type="error" visible={userNameHasErrors()}>
                Username is invalid!
            </HelperText>
            {!isSignIn && (
                <>
                    {/*chnag ethe icon for the eyes to b ethe icon for done when the password is done entered or matches  */}
                    <TextInput label="Email" value={email}     right={<TextInput.Icon  icon="mail" />}
                               onChangeText={setEmail} style={{ marginBottom: 10 }} />
                    <TextInput label="Goal" value={goal} onChangeText={setGoal} style={{ marginBottom: 10 }} />
                </>
            )}
            {/*const viewPassword=useState(true)*/}
            <TextInput
                label="Password"
                value={password}
                secureTextEntry={viewPassWord}
                onChangeText={setPassword}
                style={{ marginBottom: 10 }}
                right={<TextInput.Icon icon="eye" onPress={passwordVisible} />}

            />
            <HelperText theme={{ colors: { primary: 'green' } }}  type="error" visible={passwordHasErrors()}>
            password is invalid!
        </HelperText>
            {!isSignIn && (
                <TextInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={{ marginBottom: 10 }}
                    secureTextEntry={viewPassWord}
                    right={<TextInput.Icon icon="eye" onPress={passwordVisible} />}

                />
            )}

            <Button mode="contained" onPress={handleAuth} loading={loading} disabled={loading} style={{ marginBottom: 10 }}>
                {isSignIn ? 'Sign In' : 'Register'}
            </Button>

            <Button onPress={toggleAuth} mode="elevated">
                {isSignIn ? "Don't have an account? Register" : 'Already have an account? Sign In'}
            </Button>


            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={3000}
                wrapperStyle={{ top: 90 }}
                style={{
                    borderRadius: 14,
                    backgroundColor: 'rgba(38,72,195,0.91)',
                    paddingHorizontal: 10,
                    elevation: 20,
                    position: 'absolute',
                    left: 20,
                    right: 20,
                }}
                action={{
                    label: 'Retry',
                    onPress: () => setVisible(false),
                }}
            >
                {message}
            </Snackbar>
        </KeyboardAvoidingView>
    );
};

export default AuthScreen;
