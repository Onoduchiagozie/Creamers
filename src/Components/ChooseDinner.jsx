import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { BodyParts,restaurants } from '../Constants';
import { useNavigation } from '@react-navigation/native';
import Dinner from './Dinner';

const ChooseDinner = () => {
    const navigation = useNavigation();

    return (
        <View style={{
             justifyContent:'center',
            alignItems: 'center',

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
                    marginTop: 10,
                    marginBottom: 100,
                    paddingHorizontal:40
                    }}
            >
                <FlatList
                    data={restaurants}
                    keyExtractor={(item) => item.id || item.name}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}

                    renderItem={({ item }) => (
                        <Dinner givenImage={item} />
                    )}
                />
            </View>

        </View>
    );
};

export default ChooseDinner;

