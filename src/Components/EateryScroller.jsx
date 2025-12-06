import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import {eateries, restaurants} from '../Constants';
import MealsScroller from './MealsScroller';
 import {ScrollView} from "react-native-virtualized-view";
import EateryScroller from "./Eater";

//const { width } = Dimensions.get('window');

const Eatery = () => {

    return (
        <View
            style={{
                marginHorizontal: 10,
                marginTop: 20,
            }}
        >
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginLeft: 10,
                    fontStyle: 'italic',
                    fontFamily:"casual",
                    marginBottom: 5, // ✅ closer to images
                }}
            >
                Choose
                <Text style={{ color: 'red' }}> Eatery</Text>
            </Text>

            {/* LIST */}
            <FlatList
                data={eateries}
                keyExtractor={(item) => item.id || item.name}
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: 5,
                }}
                renderItem={({ item }) =>
                    <EateryScroller equip={item}
                    />}
            />

        </View>
    );
};

export default Eatery;
