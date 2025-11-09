


import { React, useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-virtualized-view';

import { addExercise } from '../ApiServices';
import { UserContext } from "../UserContext";
import * as Haptics from "expo-haptics";

const ExerciseDetails = ({ route }) => {
    const { setToken, setUser, token } = useContext(UserContext);
    const { exercise } = route.params;

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
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

                    addExercise(exercise, token);

                }}>
                    <View
                        style={{
                            maxWidth: 260,      // prevents overstretching
                            alignSelf: 'center',
                        }}
                    >
                        <Text
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
                    source={{ uri: exercise.gifUrl }}
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
                <View style={{ marginTop: 30 }}>
                    <Text
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

                    {exercise.instructions.map((instruction, index) => (
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
                            <Text style={{ color: 'indigo', fontSize: 20 }}>
                                {index + 1}
                            </Text>
                            . {instruction}
                        </Text>
                    ))}

                    {/* SECONDARY MUSCLES */}
                    <Text style={{ fontSize: 20 }}>
                        Secondary muscles:{' '}
                        {exercise.secondaryMuscles.map((muscle, index) => (
                            <Text
                                key={index}
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'Oswald',
                                    color: 'indigo',
                                }}
                            >
                                {muscle}
                                {index < exercise.secondaryMuscles.length - 1 ? ', ' : ''}
                            </Text>
                        ))}
                    </Text>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default ExerciseDetails;
