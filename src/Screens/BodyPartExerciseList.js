// import React, { useEffect, useState } from 'react';
// import {
//   FlatList,
//   Text,
//   TouchableOpacity,
//   View,
//   ActivityIndicator,
// } from 'react-native';
// import { Image, ImageBackground } from 'expo-image';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';
// import { ScrollView } from 'react-native-virtualized-view';
// import { ExcerciseDB_API_KEY } from '../Constants';
// import { LinearGradient } from 'expo-linear-gradient';
//
// export const BodyPartExerciseList = ({ route }) => {
//   const navigation = useNavigation();
//   const { workout } = route.params;
//
//   // State to store exercises fetched from the API
//   const [exercises, setExercises] = useState([]);
//   const [loading, setLoading] = useState(true);
//
//   const addExercise = async (exerciseData) => {
//     const options = {
//       method: 'POST',
//       url: 'http://192.168.100.67:5151/api/AddFavourite', // Adjust the endpoint based on your API's route
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       data: exercises, // Send the exercise object
//     };
//
//     try {
//       await axios.request(options);
//       alert('Exercise added successfully');
//     } catch (error) {
//       console.error('Error adding exercise:', error);
//     }
//   };
//
//   console.log('theeeeeeeeeeeese', exercises);
//   useEffect(() => {
//     const fetchExercises = async () => {
//       setLoading(true);
//       const options = {
//         method: 'GET',
//         url: `https://exercisedb.p.rapidapi.com/exercises/${encodeURIComponent(workout.selection)}/${encodeURIComponent(workout.name)}`,
//         headers: {
//           'x-rapidapi-key': ExcerciseDB_API_KEY,
//           'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
//         },
//       };
//
//       try {
//         const response = await axios.request(options);
//         setExercises(response.data);
//       } catch (error) {
//         console.error('Error fetching exercises:', error);
//       } finally {
//         setLoading(false); // Keep loading true even on error
//       }
//     };
//
//     fetchExercises();
//   }, [workout.name]); // Dependency array ensures the API is called when `workout.name` changes
//
//   return (
//     <LinearGradient
//       colors={['rgba(255,255,255,0.64)', 'rgb(25,49,62)']}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 0 }}
//       style={{ flex: 1 }}
//     >
//       <ScrollView>
//         <View style={{ margin: 50, flex: 1,  }} className="mt-6">
//           <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} onPress={addExercise}>
//             <Text
//               className="text-center "
//               style={{
//                 fontSize: 30,
//                 fontWeight: 'bold',
//                 color: 'indigo',
//                 fontFamily: 'MouseMemoir',
//               }}
//             >
//               Save
//             </Text>
//           </TouchableOpacity>
//
//           <Image
//             source={workout.imagePath}
//             style={{
//               margin: 10,
//               width: '95%',
//               height: '15%',
//               borderRadius: 10,
//               borderColor: 'ash',
//               borderWidth: 5,
//             }}
//           />
//           <Text
//             style={{
//               fontSize: 30,
//               marginTop: 20,
//               marginLeft: 20,
//               fontFamily: 'Oswald',
//             }}
//           >
//             {exercises.length}{' '}
//             <Text style={{ color: 'indigo' }}>
//               {workout.name
//                 .split(' ') // Split into words
//                 .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                 // Capitalize each word
//                 .join(' ')}{' '}
//             </Text>
//             Workouts
//           </Text>
//
//           {loading ? (
//             <ActivityIndicator color="black" size={'large'} />
//           ) : (
//             <FlatList
//               data={exercises}
//               keyExtractor={(item) => item.id || item.name || `${item.gifUrl}`}
//               numColumns={2}
//               style={{
//                 marginHorizontal: 20,
//                 paddingBottom: 400,
//                 borderRadius: 10,
//               }}
//               showsVerticalScrollIndicator={false}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={{
//                     alignItems: 'center',
//                     justifyContent: 'space-around',
//                   }}
//                   onPress={() => {
//                     console.log(item);
//                     navigation.navigate('ExerciseDetails', { exercise: item });
//                   }}
//                 >
//                   <ImageBackground
//                     source={{ uri: item.gifUrl }} // Use image from the API response
//                     resizeMode="stretch"
//                     style={{
//                       borderWidth: 4,
//                       borderColor: '#000435',
//                       height: 300,
//                       width: 170,
//                       borderRadius: 10,
//                       marginTop: 20,
//                       borderBottomWidth: 15,
//                       marginLeft: 10,
//                     }}
//                   />
//
//                   <Text
//                     className="text-center"
//                     style={{
//                       marginHorizontal: 30,
//                       fontFamily: 'MouseMemoir',
//                       fontSize: 20,
//                     }}
//                   >
//                     {item.name.length > 15
//                       ? `${item.name
//                           .split(' ')
//                           .map(
//                             (word) =>
//                               word.charAt(0).toUpperCase() + word.slice(1)
//                           )
//                           .join(' ')
//                           .slice(0, 15)}...`
//                       : item.name
//                           .split(' ')
//                           .map(
//                             (word) =>
//                               word.charAt(0).toUpperCase() + word.slice(1)
//                           )
//                           .join(' ')}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             />
//           )}
//         </View>
//       </ScrollView>
//     </LinearGradient>
//   );
// };

import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';
import { ExcerciseDB_API_KEY } from '../Constants';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from "expo-haptics";

const { width, height } = Dimensions.get('window');

export const BodyPartExerciseList = ({ route }) => {
    const navigation = useNavigation();
    const { workout } = route.params;

    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExercises = async () => {
            setLoading(true);
            const options = {
                method: 'GET',
                url: `https://exercisedb.p.rapidapi.com/exercises/${encodeURIComponent(
                    workout.selection
                )}/${encodeURIComponent(workout.name)}`,
                headers: {
                    'x-rapidapi-key': ExcerciseDB_API_KEY,
                    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                },
            };

            try {
                const response = await axios.request(options);
                setExercises(response.data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExercises();
    }, [workout.name]);

    return (
        <LinearGradient
            colors={['rgba(255,255,255,0.64)', 'rgb(25,49,62)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View style={{ margin: 30 }}>
                    <TouchableOpacity
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Text
                            style={{
                                fontSize: 30,
                                fontWeight: 'bold',
                                color: 'indigo',
                                fontFamily: 'MouseMemoir',
                            }}
                        >
                            {workout.name}s
                        </Text>
                    </TouchableOpacity>

                    {/* ✅ Responsive top image */}
                    <Image
                        source={workout.imagePath}
                        style={{
                            width: width * 0.9,   // ✅ 90% width
                            height: height * 0.35, // ✅ 25% height
                            borderRadius: 10,
                            borderWidth: 5,
                            alignSelf: 'center',
                            marginTop: 10,
                            resizeMode: 'stretch',
                        }}
                        resizeMode="cover"   // ✅ no stretch
                    />

                    <Text
                        style={{
                            fontSize: 30,
                            marginTop: 20,
                            marginLeft: 10,
                            fontFamily: 'Oswald',
                        }}
                    >
                        {exercises.length}{' '}
                        <Text style={{ color: 'indigo' }}>
                            {workout.name
                                .split(' ')
                                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                                .join(' ')}
                        </Text>{' '}
                        Workouts
                    </Text>

                    {loading ? (
                        <ActivityIndicator color="black" size="large" />
                    ) : (
                        <FlatList
                            data={exercises}
                            keyExtractor={(item) => item.id || `${item.gifUrl}`}

                            numColumns={2}

                            columnWrapperStyle={{
                                justifyContent: 'space-between', // ✅ force 2 columns
                                marginBottom: 20,
                            }}

                            contentContainerStyle={{
                                paddingBottom: 200,
                                paddingHorizontal: 5,
                            }}

                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{
                                        width: '48%',           // ✅ fits 2 columns
                                        alignItems: 'center',
                                        marginBottom: 10,
                                    }}
                                    onPress={() =>
                                    {
                                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                        navigation.navigate('ExerciseDetails', { exercise: item })
                                    }}
                                >
                                    <Image
                                        source={{ uri: item.gifUrl }}
                                        style={{
                                            width: '100%',         // ✅ fill card width
                                            height: 300,           // ✅ consistent height
                                            borderRadius: 10,
                                            borderWidth: 3,
                                            borderColor: '#000435',
                                            borderBottomWidth:14,
                                            resizeMode: 'cover',
                                        }}
                                        resizeMode="cover"       // ✅ correct ratio
                                    />

                                    <Text
                                        style={{
                                            fontFamily: 'MouseMemoir',
                                            fontSize: 18,
                                            textAlign: 'center',
                                            marginTop: 5,
                                        }}
                                    >
                                        {item.name
                                            .split(' ')
                                            .map(
                                                (word) =>
                                                    word.charAt(0).toUpperCase() + word.slice(1)
                                            )
                                            .join(' ')}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View>
            </ScrollView>
        </LinearGradient>
    );
};
