

import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { BodyParts } from '../Constants';
import { useNavigation } from '@react-navigation/native';
import BodyPartsImages from './BodyPartsImages';

const BodyPartsWorkout = () => {
    const navigation = useNavigation();

    return (
        <View style={{
             backgroundColor:'green',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            alignItems: 'space-between'
        }}>

            {/* TITLE */}
            <Text
                style={{
                    fontSize: 30,
                    fontFamily: 'casual',
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    marginLeft: 8,     // ✅ 8-point shift from left
                    marginBottom: 5,   // ✅ close to images
                }}
            >
                Choose
                <Text style={{ color: 'red' }}> Dinner</Text>
            </Text>


            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                    backgroundColor:'blue'
                 }}
            >
                <FlatList
                    data={BodyParts}
                    keyExtractor={(item) => item.id || item.name}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}

                    renderItem={({ item }) => (
                        <BodyPartsImages givenImage={item} />
                    )}
                />
            </View>

        </View>
    );
};

export default BodyPartsWorkout;

