import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from "expo-haptics";

const BodyPartsImages = ({ givenImage }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{
                width: 150,             // ✅ consistent card width
                alignItems: 'center',   // ✅ image + text perfectly centered
                marginHorizontal: 15,    // ✅ 2-point spacing between columns
            }}


            onPress={() =>{
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                navigation.navigate('BodyPartExerciseList', { workout: givenImage }       )}
            }
        >

            <Image
                source={givenImage.imagePath}
                style={{
                    height: 350,
                    width: '80%',         // ✅ takes 80% of screen width
                    alignSelf: 'center',  // ✅ centers it horizontally

                    resizeMode: 'cover',
                    borderWidth: 4,
                    borderRadius: 10,

                    marginBottom: 10,     // ✅ spacing from rows below
                    marginTop: 10,        // ✅ spacing from rows above
                }}
            />

            <Text
                style={{
                    fontFamily: 'MouseMemoir',
                    fontSize: 22,
                    textAlign: 'center',   // ✅ aligned under image
                }}
            >
                {givenImage.name
                    .split(' ')
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ')}
            </Text>

        </TouchableOpacity>
    );
};

export default BodyPartsImages;

