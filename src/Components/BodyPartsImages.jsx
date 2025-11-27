import React from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from "expo-haptics";
import {ImageBackground} from "expo-image";

const BodyPartsImages = ({ givenImage }) => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
const breadth=width*0.8;
const length=breadth*0.5;

    return (
        <TouchableOpacity
            style={{
                 backgroundColor:'red',
                justifyContent:'space-between',


                // ✅ consistent card width
             }}


            onPress={() =>{
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                navigation.navigate('BodyPartExerciseList', { workout: givenImage }       )}
            }
        >

            <ImageBackground
                source={givenImage.imagePath}
                style={{

                    alignSelf: 'center',  // ✅ centers it horizontally
                     borderWidth: 4,
                    borderRadius: 10,
                    marginBottom: 10,     // ✅ spacing from rows below
                    marginTop: 10,        // ✅ spacing from rows above
                }}
            >
                <Text
                    style={{
                        fontFamily: 'MouseMemoir',
                        fontSize: 22,
                        textDecorationStyle:'dotted',
                        textAlign: 'center',   // ✅ aligned under image
                    }}
                >
                    {givenImage.name
                        .split(' ')
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ')}
                </Text>            </ImageBackground>


        </TouchableOpacity>
    );
};

export default BodyPartsImages;

