import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import {Equipments, meals} from '../Constants';
import EquipmentsImages from './MealsScroller';
 import {ScrollView} from "react-native-virtualized-view";

//const { width } = Dimensions.get('window');

const Meal = () => {

    return (
        <View
            style={{
                marginHorizontal: 10,
                marginTop: 20,
                elevation:80

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
                <Text style={{ color: 'red' }}> Meal</Text>
            </Text>

            {/* LIST */}
            <FlatList
                data={meals}
                keyExtractor={(item) => item.id || item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: 5,
                }}
                renderItem={({ item }) =>
                    <EquipmentsImages equip={item}
                    />}
            />

         </View>
    );
};

export default Meal;
