import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { Equipments } from '../Constants';
import EquipmentsImages from './EquipmentsImages';
 import {ScrollView} from "react-native-virtualized-view";
import MyMainScrollerScroller from "./MyMainScrollerScroller";

//const { width } = Dimensions.get('window');

const MyMainScroller = () => {

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
                <Text style={{ color: 'red' }}> Market</Text>
            </Text>

            {/* LIST */}
            <FlatList
                data={Equipments}
                keyExtractor={(item) => item.id || item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: 5,
                }}
                renderItem={({ item }) =>
                    <MyMainScrollerScroller equip={item}
                    />}
            />

        </View>
    );
};

export default MyMainScroller;
