import React from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import {ImageBackground} from "expo-image";

const { width } = Dimensions.get('window');
// responsive width

const EateryScroller = ({ equip }) => {
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
                    source={{uri:equip.logo_url}}
                    style={{
                        marginTop: 10,
                        borderWidth: 4,
                        borderColor: '#eeba10',
                        // borderRadius: 100,
                        width: IMAGE_WIDTH,
                        overflow: 'hidden',
                        height: IMAGE_HEIGHT*2.8,
                        resizeMode: 'cover',
                        marginLeft: 10,
                        elevation:8,
                        borderTopLeftRadius:25,
                        borderBottomRightRadius:30
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

export default EateryScroller;

