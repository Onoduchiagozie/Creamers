import React from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import {ImageBackground} from "expo-image";

const { width } = Dimensions.get('window');
// responsive width

const SellerScroller = ({ equip }) => {
    const navigation = useNavigation();
    const IMAGE_WIDTH = width * 0.20;  // 65% of screen
    const IMAGE_HEIGHT = IMAGE_WIDTH * 0.35; // keep a good proportion

    return (
        <View style={{ marginRight: 15 }}>
            <TouchableOpacity
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    navigation.navigate('BodyPartExerciseList', { workout: equip });
                }}
            >

            {/* IMAGE */}
                <ImageBackground
                    source={equip.image_url}
                    style={{
                        marginTop: 10,
                        borderWidth: 4,
                        borderColor: '#e1a614',
                        borderRadius: 10,
                        width: IMAGE_WIDTH*2,
                        height: IMAGE_HEIGHT*3,
                        resizeMode: 'cover',
                        overflow: 'hidden',
                        elevation:10,
                        marginLeft: 10, // ✅ 7+ spacing
                    }}
                />

                {/* TEXT */}
                <Text
                    style={{
                        marginLeft: 20,  // ✅ ensure left spacing
                        fontSize: 12,
                        marginTop: 8,
                        fontFamily: 'casual',
                        textAlign: 'left', // ✅ no more centered mismatch
                    }}
                >
                    {equip.name
                        .split(' ')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SellerScroller;

