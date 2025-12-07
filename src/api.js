// api.js or config file
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseURL} from "./Constants";

const api = axios.create({
    baseURL: BaseURL
});

// Add interceptor to automatically add token to all requests
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;