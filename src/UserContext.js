
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import { secretKey } from './Constants';

export const UserContext = createContext(
    {
    myCurrentUserObject: {},
    setUser: () => {},
    token: '',
    setToken: () => {},
    restoreUser: () => {},
        cartItems:[],
        addToCart:()=>{},
        updateQty:()=>{},
        deleteItem:()=>{}
}
);
export const UserProvider = ({ children }) => {

    const [myCurrentUserObject, setUser] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [token, setToken] = useState('');


    const addToCart = (order) => {
        setCartItems((prev) => [...prev, { ...order,productId: Date.now() }]);
    };

    const updateQty = (uid, delta) => {
        setCartItems((prev) =>
            prev.map(item =>
                item.uid === uid
                    ? { ...item, qty: Math.max(1, item.qty + delta) }
                    : item
            )
        );
    };

    const deleteItem = (uid) => {
        setCartItems((prev) => prev.filter((item) => item.uid !== uid));
    };





    const restoreUser = async (decodedUser, storedToken) => {
        try {
            setUser(decodedUser);
            setToken(storedToken);
            await AsyncStorage.setItem('auth_token', storedToken);
            console.log('User restored successfully');
        } catch (error) {
            console.error('Error restoring user:', error);
        }
    };

    // Optional: Auto-restore user on app launch
    useEffect(() => {
        const checkStoredAuth = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('auth_token');

                if (storedToken && storedToken.length > 20) {
                    const decoded = JWT.decode(storedToken, secretKey);

                    // Check if token is expired
                    const nowMs = Date.now();
                    if (decoded && (!decoded.exp || decoded.exp * 1000 > nowMs)) {
                        setUser({
                            username: decoded.unique_name || 'Unknown',
                            email: decoded.email || 'No email provided',
                            goal: decoded.gender || 'No goal specified',
                        });
                        setToken(storedToken);
            //            setMessage('Welcome Back! pip');

                        console.log('User auto-restored from storage');
                    } else {
                        // Token expired
                        await AsyncStorage.removeItem('auth_token');
                        console.log('Token expired, cleared storage');
                    }
                }
            } catch (error) {
                console.error('Error checking stored auth:', error);
                await AsyncStorage.removeItem('auth_token');
            }
        };

        checkStoredAuth();
    }, []);

    const contextValue = {
        myCurrentUserObject,
        setUser,
        token,
        setToken,
        restoreUser,
        addToCart,
        updateQty,
        deleteItem,
        cartItems

    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};