import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { Equipments } from '../Constants';
import EquipmentsImages from './EquipmentsImages';
 import {ScrollView} from "react-native-virtualized-view";

//const { width } = Dimensions.get('window');

const MyBanner = () => {

    return (
        <View
            style={{
                marginHorizontal: 10,
                marginTop: 20,
                marginBottom: 40,
            }}
        >
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginLeft: 10,
                    fontFamily:"casual",
                    marginBottom: 5, // ✅ closer to images
                }}
            >
                Choose
                <Text style={{ color: 'red' }}> Seller</Text>
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
                renderItem={({ item }) => <EquipmentsImages equip={item} />}
            />

        </View>
    );
};

export default MyBanner;
