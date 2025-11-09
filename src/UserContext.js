import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import { secretKey } from './Constants';
import {useNavigation} from "@react-navigation/native";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
   const navigation = useNavigation();

  const [myCurrentUserObject, setUser] = useState({});
  const [token, setToken] = useState('');
    const restoreUser = (decodedUser, storedToken) => {
        setUser(decodedUser);
        setToken(storedToken);
    };

  useEffect(() => {
      const restoreUser = (decodedUser, storedToken) => {
          setUser(decodedUser);
          setToken(storedToken);
      };



    //ship to auth screen
    // const checkAuth = async (setUser) => {
    //   try {
    //     const storedToken = await AsyncStorage.getItem('auth_token');
    //     // setToken(storedToken);
    //     console.log('C Phone-MEMORY-TOKEN=', storedToken);
    //     if (storedToken.length > 20) {
    //       //token expired should indicate here so no need for extra code JEFFREY
    //       const decoded = JWT.decode(storedToken, secretKey);
    //       console.log('C DECODED USER = ', decoded);
    //       setUser({
    //         username: decoded.unique_name || 'Unknown',
    //         email: decoded.email || 'No email  provided',
    //         goal: decoded.gender || 'No goal specified',
    //         //add saved favourite count here
    //         count: 22,
    //       });
    //       //CONVERT THE CONSOLE TO SNACKBAR POP UP OR ALERT , SAYING WELCOME USER.USERNAME
    //       console.log('C user has just Been set');
    //     } else {
    //       //SNACKBAR MESSAGE TO PLEASE LOG IN
    //       //this also indicates first tim user
    //       console.log('C no stored tokens ');
    //       navigation.navigate('AuthScreen');
    //     }
    //   } catch (error) {
    //     //EITHER DECODING DID NOT WORK, OR TOKEN DOESN'T EXIST OR expired //SOMETHING MORE SPECIAL
    //     console.log('C Error checking authentication:', error);
    //     await AsyncStorage.removeItem('auth_token');
    //     console.log('C deleting tokens');
    //     //GO BACK TO LOG IN WITH MESSAGE (PLEASE TRY AGAIN)
    //     navigation.navigate('AuthScreen');
    //   }
    // };

    //checkAuth();
  }, []);

  return (
    <UserContext.Provider
      value={{ myCurrentUserObject, setUser, setToken, token ,restoreUser}}
    >
      {children}
    </UserContext.Provider>
  );
};
