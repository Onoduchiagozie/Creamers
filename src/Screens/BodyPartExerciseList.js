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
    }, []);

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
                            {workout.name}
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
                                        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
