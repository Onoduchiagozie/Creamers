import {React,  useContext, useRef} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-virtualized-view';

import { addExercise } from '../ApiServices';
import { UserContext } from "../UserContext";
import * as Haptics from "expo-haptics";

const ExerciseDetails = ({ route, navigation }) => {
    const { token } = useContext(UserContext);

    const exercise = useRef(route.params?.exercise).current;

    const instructions = Array.isArray(exercise?.instructions)
        ? exercise.instructions
        : typeof exercise?.instructions === "string"
            ? exercise.instructions.split("|").map(i => i.trim()) // split into array
            : []; // null or undefined
    const secondaryMuscles = Array.isArray(exercise?.secondaryMuscles)
        ? exercise.secondaryMuscles
        : exercise?.secondaryMuscles
            ? [exercise.secondaryMuscles] // if it's a string, wrap in array
            : []; // if null/undefined → empty array
    return (
        <LinearGradient
            colors={['#d7d2cc', '#304352']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingTop: 40,
                    paddingBottom: 120,
                }}
            >
                {/* TITLE */}
                <TouchableOpacity onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

                    addExercise(exercise, token);

                }}>
                    <View
                        style={{
                            maxWidth: 260,      // prevents overstretching
                            alignSelf: 'center',
                        }}
                    >
                        <Text
                            className="text-center"
                            style={{
                                fontSize: 20,
                                textAlign: 'center',
                                fontFamily: 'Oswald',
                                flexWrap: 'wrap',
                            }}
                        >
                            {exercise.name} for{' '}
                            <Text style={{ color: 'indigo', fontWeight: 'bold' }}>
                                {exercise.bodyPart}
                            </Text>
                        </Text>
                    </View>
                </TouchableOpacity>


                {/* ✅ CENTERED IMAGE */}
                <ImageBackground
                    source={{ uri: exercise.localImagePath }}
                    style={{
                        marginTop: 25,
                        height: 398,        // reduced by 2
                        width: 250,
                        alignSelf: 'center', // ✅ centers image
                        borderWidth: 5,
                        borderBottomWidth: 15,
                        borderBottomColor: 'indigo',
                        borderRadius: 10,
                    }}
                    resizeMode="stretch"
                />

                {/* INSTRUCTIONS */}
                <View style={{ marginTop: 30 }}
                      className="bg-red-900"
                >
                    <Text
                        className="bg-teal-950"
                        style={{
                            fontSize: 18,
                            marginBottom: 10,
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            textDecorationLine: 'underline',
                            fontWeight: '600',
                        }}
                    >
                        Instructions
                    </Text>



                    {instructions.length > 0 ? (
                        instructions.map((instruction, index) => (
                            <Text
                                key={index}
                                style={{
                                    fontSize: 22,
                                    marginBottom: 15,
                                    fontFamily: 'MouseMemoir',
                                    textAlign: 'left',
                                    width: 300,
                                }}
                            >
                                <Text style={{ color: 'indigo', fontSize: 20 }}>{index + 1}</Text>
                                . {instruction}
                            </Text>
                        ))
                    ) : (
                        <Text
                            style={{
                                fontSize: 18,
                                fontStyle: 'italic',
                                color: 'gray',
                                marginBottom: 15,
                                fontFamily: 'MouseMemoir',
                                width: 300,
                            }}
                        >
                            No instructions available.
                        </Text>
                    )}



                    {/* SECONDARY MUSCLES */}
                    <Text style={{ fontSize: 20 }}>
                        Secondary muscles:{' '}
                        {secondaryMuscles.map((muscle, index) => (
                            <Text
                                key={index}
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'Oswald',
                                    color: 'indigo',
                                }}
                            >
                                {muscle}
                                {index < secondaryMuscles.length - 1 ? ', ' : ''}
                            </Text>
                        ))}
                    </Text>
                </View>

                {/* START TIMER BUTTON */}
                <View style={{ marginTop: 30 }}>
                    <TouchableOpacity
                        onPress={() => {
                            const startTime = Date.now();
                            navigation.navigate('TimerScreen', { exercise, startTime });
                        }}
                        style={{
                            backgroundColor: 'indigo',
                            paddingVertical: 12,
                            paddingHorizontal: 24,
                            borderRadius: 8,
                        }}
                    >
                        <Text style={{ color: 'white', fontSize: 18, fontFamily: 'casual' }}>
                            Start  Timer
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default ExerciseDetails;
