import axios from 'axios';
import { BaseURL, secretKey, tokenGlobal } from './Constants';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import {useContext, useState} from 'react';
import {UserContext} from "./UserContext";
//import {UserContext} from "./UserContext";
//const [profileUser, setProfileUser] = useState({});

export async function addExercise(exercise,token) {
 //   const { token } = useContext(UserContext);

 //   const tokenToUse = token;
  const ExerciseDTO = {
    ...exercise,
    ExerciseId: exercise.id,
    instructions: exercise.instructions.join(' | '), // Convert array to single string with separator
    secondaryMuscles: exercise.secondaryMuscles.join(', '), // Convert array to comma-separated string
  };
  try {
      const storedToken = await AsyncStorage.getItem('auth_token');
      const myToken = storedToken;

      const response = await axios.post(
      `${BaseURL}/Favourites/AddFavourite`,
      JSON.stringify(ExerciseDTO),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    //add response to message body
    Alert.alert(
      'Exercise added!',
      `${ExerciseDTO.name} has been added to your favourites.`
    );
    //console.log('response from portal', response.data);
    const result = response.data.message;
  } catch (error) {
    Alert.alert(
      'Error Adding Workout!',
      `we will be with you just try again later .`
    );
    console.error('Error adding exercise:', error);
  }
}



export const fetchFavourites = async (setSaved, token) => {
  try {
    const response = await axios.get(`${BaseURL}/Favourites/GetUserFavourites`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Saved exercises are ', response.data);
    setSaved(response.data);
  } catch (error) {
    console.error('Error fetching favourites:', error);
  }
};