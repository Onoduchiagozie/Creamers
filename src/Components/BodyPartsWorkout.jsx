

import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { BodyParts } from '../Constants';
import { useNavigation } from '@react-navigation/native';
import BodyPartsImages from './BodyPartsImages';

const BodyPartsWorkout = () => {
    const navigation = useNavigation();

    return (
        <View style={{ paddingHorizontal: 10 }}>

            {/* TITLE */}
            <Text
                style={{
                    fontSize: 30,
                    fontFamily: 'casual',
                    fontWeight: 'bold',
                    marginLeft: 8,     // ✅ 8-point shift from left
                    marginBottom: 5,   // ✅ close to images
                }}
            >
                Body
                <Text style={{ color: 'red' }}> Workout</Text>
            </Text>


            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                    paddingBottom: 100,
                }}
            >
                <FlatList
                    data={BodyParts}
                    keyExtractor={(item) => item.id || item.name}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{
                        justifyContent: 'space-between', // ✅ makes spacing even
                        margin: 15,
                    }}
                    renderItem={({ item }) => (
                        <BodyPartsImages givenImage={item} />
                    )}
                />
            </View>

        </View>
    );
};

export default BodyPartsWorkout;

